import React from 'react';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'
import Login from '../../login'
import { url_site } from '../../../lib/contants';
import Back from '../../../lib/back';

class ContentCategory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            isLoggedIn: false,
            userTypeId: 0
        };
    }

    componentDidMount() {

        const _this = this;

        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const userTypeId = localStorage.getItem("userTypeId") || sessionStorage.getItem("userTypeId");

        this.setState({
            isLoggedIn: token,
            userTypeId: userTypeId
        })

        fetch(url_site + '/api/admin/categories', {
            headers: {
                'token': token
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            _this.setState({ categories: data })
        }).catch(function (error) {
            _this.setState({ isLoggedIn: false })
        });
    }

    add(e) {
        const _this = this;
        if (e.key === "Enter") {
            e.preventDefault();
            fetch(url_site + '/api/admin/categories', {
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
                _this.setState({ categories: data })
                document.getElementById('new_cat').value = "";
            });
        }
    }

    render() {
        if (!this.state.isLoggedIn) return (<Login />)
        return (<>
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
                        this.state.categories.map((c, i) => {
                            return <tr key={"t" + i}>
                                <th scope="row" key={"th" + i}>{i + 1}</th>
                                <td><Link href={"/admin/join-words/" + c.id}>{c.word}</Link></td>
                                <td>{c.counts}</td>
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
                <Back href={"/admin"} />
                <ContentCategory />
            </main>
            <footer>
            </footer>
        </div>
    )
}