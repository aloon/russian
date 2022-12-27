import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'

class ContentCategory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: []
        };
    }

    add(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            alert(e.target.value);
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
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                    </tr>
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