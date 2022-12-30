import React from 'react';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'

class ContentCategory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: []
        };

        const t = this;
        const url = (process.env.NODE_ENV == "production") ? "https://russian.fly.dev" : "http://localhost:3000";
        fetch(url + '/api/admin/categories')
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                t.setState({ categories: data })
            });
    }

    add(e) {
        const t = this;
        if (e.key === "Enter") {
            e.preventDefault();
            fetch('/api/admin/categories', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8'
                }),
                body: JSON.stringify({
                    word: e.target.value
                })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                t.setState({ categories: data })
                document.getElementById('new_cat').value = "";
            });
        }
    }

    render() {
        return (<>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.categories.map((c, i) => {
                            return <tr key={"t" + i}>
                                <th scope="row" key={"th" + i}>{i + 1}</th>
                                <td><Link href={"/admin/join-words/" + c.id}>{c.word}</Link></td>
                            </tr>
                        })}
                    <tr>
                        <th scope="row">{this.state.categories.length + 1}</th>
                        <td>
                            <input type="text" className="form-control" placeholder="New Category" id='new_cat' onKeyUp={(e) => this.add(e)} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>);
    }
}

export default function Categories() {
    return (
        <div>
            <main>
                <Link href={"/admin"}>Back</Link>
                <ContentCategory />
            </main>
            <footer>
            </footer>
        </div>
    )
}