import React from 'react';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'
import { url_site } from '../../lib/contants';


class JoinWordsCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const userTypeId = localStorage.getItem("userTypeId") || sessionStorage.getItem("userTypeId");
        fetch(url_site + '/api/join-words/categories', {
            headers: {
                'token': token
            }
        }).then(response => response.json())
            .then(data => this.setState({ categories: data }));
    }

    render() {
        return (<>
            <ul className="list-group">
                {this.state.categories.map((category) => (
                    <li className="list-group-item text-center" key={"l" + category.id}><Link href={"/join-words/" + category.id} key={"c" + category.id}>{category.word}</Link></li>
                ))}
            </ul>
        </>);
    }
}

export default function IndexJoinWords() {

    return (
        <div>
            <main>
                <Link href={"/"}>Back</Link>
                <JoinWordsCategories />
            </main>
            <footer>
            </footer>
        </div>
    )
}

