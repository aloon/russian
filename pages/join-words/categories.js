import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { url_site } from '../../lib/constants';
import Back from '../../lib/back';
import Login from '../login'
import { Layout } from '../../lib/layout';
import PrettyList from '../../lib/prettyList';

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
        const list = categories.map(cat => ({ href: "/join-words/" + cat.id, text: cat.word }));
        return <PrettyList items={list} />
    }

}

export default function IndexJoinWords() {

    return (
        <Layout>
            <Back href={"/"} />
            <JoinWordsCategories />
        </Layout>
    )
}

