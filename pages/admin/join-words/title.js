import { withRouter } from 'next/router';
import React from 'react';

class Title extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: ""
        };

        const _this = this;
        const url = (process.env.NODE_ENV == "production") ? process.env["SITE_URL"] : "http://localhost:3000";
        fetch(url + '/api/admin/category?cat=' + props.catId)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                _this.setState({ category: data.data })
            });
    }

    render() {
        return (<>
            <h1>Join <u>{this.state.category}</u> words.</h1>
        </>)
    }
}

export default withRouter(Title);