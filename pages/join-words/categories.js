import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'
import { url_site } from '../../lib/contants';
import Back from '../../lib/back';
import Login from '../login'

const JoinWordsCategories = () => {

    const [categories, setCategories] = useState([]);
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(localStorage.getItem("token") || sessionStorage.getItem("token"));
        if (token != null) {
            fetch(url_site + '/api/join-words/categories', {
                headers: {
                    'token': token
                }
            }).then(response => response.json())
                .then(data => setCategories(data));
        }
    }, [token])

    if (token == null)
        return (<Login />)
    else
        return (
            <ul className="list-group">
                {categories.map((category) => (
                    <li className="list-group-item text-center" key={"l" + category.id}><Link href={"/join-words/" + category.id} key={"c" + category.id}>{category.word}</Link></li>
                ))}
            </ul>
        );

}

export default function IndexJoinWords() {

    return (
        <div>
            <main>
                <Back href={"/"} />
                <JoinWordsCategories />
            </main>
            <footer>
            </footer>
        </div>
    )
}

