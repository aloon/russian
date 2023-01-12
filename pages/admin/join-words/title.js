import { withRouter } from 'next/router';
import React from 'react';
import { url_site } from '../../../lib/constants';

class Title extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: ""
        };

        const _this = this;
        fetch(url_site + '/api/admin/category?cat=' + props.catId)
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