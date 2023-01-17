import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'
import { url_site } from '../../lib/constants';
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
    else {
        const list = categories.map((category) => {
            return {href: "/join-words/" + category.id, text: category.word}
        });
        return (
            <ul className="list-group">
                {categories.map((category) => (
                    <Link href={"/join-words/" + category.id} key={"c" + category.id} style={{textDecoration: 'none'}}><li className="list-group-item text-center" key={"l" + category.id}>{category.word}</li></Link>
                ))}
            </ul>
        );
    }

}

export default function IndexJoinWords() {

    return (
        <div>
            <main>
                <div className='p-2'>
                <Back href={"/"} />
                <JoinWordsCategories />
                </div>
            </main>
            <footer>
            </footer>
        </div>
    )
}

