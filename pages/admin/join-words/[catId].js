import React, { useState, useEffect } from 'react';
import Title from './title';
import { useRouter } from 'next/router'
import { url_site } from '../../../lib/constants';
import Back from '../../../lib/back';
import { Layout } from '../../../lib/layout';

export async function getServerSideProps(context) {
    const { catId } = context.params;
    return { props: { catId: catId } }
}

const JoinWords = (props) => {
    const [token, setToken] = useState(null);
    const [words, setWords] = useState([]);

    useEffect(() => {
        setToken(localStorage.getItem("token") || sessionStorage.getItem("token"));
        if (token != null) {
            fetch(url_site + '/api/admin/join-words?cat=' + props.catId, {
                headers: {
                    'token': token
                }
            })
                .then(function (response) {
                    return response.json();
                })
                .then((data) => setWords(data));
        }
    }, [token]);

    function add(e) {
        const _this = this;
        if (e.key === "Enter") {
            e.preventDefault();
            fetch(url_site + '/api/admin/join-words?cat=' + props.catId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'token': token
                },
                body: JSON.stringify({
                    word1: document.getElementById('word1').value,
                    word2: document.getElementById('word2').value
                })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                setWords(data)
                document.getElementById('word1').value = "";
                document.getElementById('word2').value = "";
            });
        }
    }

    function remove(id) {
        const _this = this;
        fetch(url_site + '/api/admin/join-words?id=' + id + "&cat=" + props.catId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'token': token
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            setWords(data)
        });
    }

    return (<>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">word1</th>
                    <th scope="col">word2</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    words.map((c, i) => {
                        return <tr key={"t" + i}>
                            <th scope="row" key={"th" + i}>{i + 1}</th>
                            <td>{c.word1}</td>
                            <td>{c.word2}</td>
                            <td><button onClick={() => remove(c.id)}>Delete</button></td>
                        </tr>
                    })}
                <tr>
                    <th scope="row">{words.length + 1}</th>
                    <td>
                        <input type="text" className="form-control" placeholder="word 1" id='word1' onKeyUp={(e) => add(e)} />
                    </td>
                    <td>
                        <input type="text" className="form-control" placeholder="word 2" id='word2' onKeyUp={(e) => add(e)} />
                    </td>
                </tr>
            </tbody>
        </table>
    </>);
}

export default function JoinWordsAdmin() {
    const router = useRouter()
    const { catId } = router.query
    return (
        <Layout>
            <Back href={"/admin/join-words/categories"} />
            <Title catId={catId} />
            <JoinWords catId={catId} />
        </Layout>
    )
}