import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'
import Login from '../../login'
import { url_site } from '../../../lib/constants';
import Back from '../../../lib/back';

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
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                setCategories(data);
                document.getElementById('new_cat').value = "";
            });
        }
    }

    if (token == null)
        return (<Login />)
    else
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category name</th>
                        <th scope="col">Number of words</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map((c, i) => {
                            return <tr key={"t" + i}>
                                <th scope="row" key={"th" + i}>{i + 1}</th>
                                <td><Link href={"/admin/join-words/" + c.id}>{c.word}</Link></td>
                                <td>{c.counts}</td>
                            </tr>
                        })}
                    <tr>
                        <th scope="row">{categories.length + 1}</th>
                        <td>
                            <input type="text" className="form-control" placeholder="New Category" id='new_cat' onKeyUp={(e) => add(e)} />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
}

export default function AdminCategories() {
    return (
        <div>
            <main>
                <Back href={"/admin"} />
                <ContentCategory />
            </main>
            <footer>
            </footer>
        </div>
    )
}