import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'
import Login from '../../login'
import { url_site } from '../../../lib/constants';
import Back from '../../../lib/back';
import { Layout } from '../../../lib/layout';

const ContentCategory = () => {

    const [categories, setCategories] = useState([]);
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(localStorage.getItem("token") || sessionStorage.getItem("token"));
        if (token != null) {
            fetch(url_site + '/api/admin/categories', {
                headers: {
                    'token': token
                }
            })
                .then(response => response.json())
                .then(data => setCategories(data));
        }
    }, [token]);


    function add(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            fetch(url_site + '/api/admin/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'token': token
                },
                body: JSON.stringify({
                    word: e.target.value
                })
            })
                .then(response => response.json())
                .then(data => {
                    setCategories(data);
                    document.getElementById('new_cat').value = "";
                });
        }
    }

    const active = (catId, action) => {
        fetch(url_site + '/api/admin/categories', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'token': token
            },
            body: JSON.stringify({
                catId: catId,
                active: action
            })
        })
            .then(response => response.json())
            .then(setCategories);
    }

    if (token == null)
        return (<Login />)
    else
        return (
            <table className="table form-check table-bordered form-check-inline">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category name</th>
                        <th scope="col">Num. words</th>
                        <th scope="col">Active</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map((c, i) => {
                            return <tr key={c.id}>
                                <th>{i + 1}</th>
                                <td><Link href={"/admin/join-words/" + c.id}>{c.word}</Link></td>
                                <td>{c.counts}</td>
                                <td>
                                    <input type="checkbox" className='' checked={c.active} onChange={() => active(c.id, !c.active)} />
                                </td>
                            </tr>
                        })}
                    <tr>
                        <th scope="row">{categories.length + 1}</th>
                        <td colSpan="3">
                            <input type="text" className="form-control" placeholder="New Category" id='new_cat' onKeyUp={(e) => add(e)} />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
}

export default function AdminCategories() {
    return (
        <Layout>
            <Back href={"/admin"} />
            <ContentCategory />
        </Layout>
    )
}