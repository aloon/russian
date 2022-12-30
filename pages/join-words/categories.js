import React from 'react';
import Link from 'next/link'


class JoinWordsCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/join-words/categories')
            .then(response => response.json())
            .then(data => this.setState({ categories: data }));
    }

    render() {
        return (<>
            <ul>
                {this.state.categories.map((category) => (
                <li><Link href={"/join-words/"+category.id}>{category.word}</Link></li>
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

