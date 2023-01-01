import React from 'react';
import Title from './title';
import Link from 'next/link';
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
    const { catId } = context.params;
    return { props: { catId: catId } }
}

class JoinWords extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            words: [],
            catId: props.catId
        };

        const _this = this;
        const url = (process.env.NODE_ENV == "production") ? "https://russian.fly.dev" : "http://localhost:3000";
        fetch(url + '/api/admin/join-words?cat=' + this.state.catId)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                _this.setState({ words: data })
            });
    }

    add(e) {
        const _this = this;
        if (e.key === "Enter") {
            e.preventDefault();
            fetch('/api/admin/join-words?cat=' + this.state.catId, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8'
                }),
                body: JSON.stringify({
                    word1: document.getElementById('word1').value,
                    word2: document.getElementById('word2').value
                })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                _this.setState({ words: data })
                document.getElementById('word1').value = "";
                document.getElementById('word2').value = "";
            });
        }
    }
    delete(id) {
        const _this = this;
        fetch('/api/admin/join-words?id=' + id + "&cat=" + this.state.catId, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            _this.setState({ words: data })
        });
    }

    render() {
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
                        this.state.words.map((c, i) => {
                            return <tr key={"t" + i}>
                                <th scope="row" key={"th" + i}>{i + 1}</th>
                                <td>{c.word1}</td>
                                <td>{c.word2}</td>
                                <td><button onClick={() => this.delete(c.id)}>Delete</button></td>
                            </tr>
                        })}
                    <tr>
                        <th scope="row">{this.state.words.length + 1}</th>
                        <td>
                            <input type="text" className="form-control" placeholder="word 1" id='word1' onKeyUp={(e) => this.add(e)} />
                        </td>
                        <td>
                            <input type="text" className="form-control" placeholder="word 2" id='word2' onKeyUp={(e) => this.add(e)} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>);
    }
}

export default function JoinWordsAdmin() {
    const router = useRouter()
    const { catId } = router.query
    return (
        <div>
            <main>
                <Link href={"/admin/categories"}>Back</Link>
                <Title catId={catId} />
                <JoinWords catId={catId} />
            </main>
            <footer>
            </footer>
        </div>
    )
}