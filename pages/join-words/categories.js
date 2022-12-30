import React from 'react';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'


class JoinWordsCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        const url = (process.env.NODE_ENV == "production") ? "https://russian.fly.dev" : "http://localhost:3000";
        fetch(url + '/api/join-words/categories')
            .then(response => response.json())
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

