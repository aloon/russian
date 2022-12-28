import { withRouter } from 'next/router';
import React from 'react';

class JoinWordsTitle extends React.Component {    

    constructor(props) {
        super(props);
        const router = this.props.router;
        const { cat } = router.query;
        this.state = {
            category: cat
        };

        const t = this;
        const url = (process.env.NODE_ENV == "production") ? "https://russian.fly.dev" : "http://localhost:3000";
        fetch(url + '/api/admin/category?cat=' + cat)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                t.setState({ category: data.data })
            });
    }

    render() {
        
        return (<>
            <h1>Join words</h1>
            <p>Category: {this.state.category}</p>
        </>)
    }
}

export default withRouter(JoinWordsTitle);