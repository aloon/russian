import React from 'react';
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
            });
        }
    }

    render() {
        console.log(this.state.categories)
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
                    //console.log(this.state.categories)
                    this.state.categories.map((c, i) => {
                    <tr>
                        <th scope="row">{i}</th>
                        <td>{c}</td>
                    </tr>
                    })}
                    <tr>
                        <th scope="row">2</th>
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
                <ContentCategory />
            </main>
            <footer>
            </footer>
        </div>
    )
}