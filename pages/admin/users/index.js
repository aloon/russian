import React from 'react';
import Login from '../../login'
import Back from '../../../lib/back';
import { url_site } from '../../../lib/constants';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };

    const _this = this;
    fetch(url_site + '/api/admin/users/index')
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            _this.setState({ users: data })
        });

  }

  render() {
    return (<>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">isAdmin</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.users.map((c, i) => {
                        return <tr key={"t" + i}>
                            <th scope="row" key={"th" + i}>{i + 1}</th>
                            <td>{c.email}</td>
                            <td>{c.isAdmin}</td>
                            <td><button onClick={() => this.delete(c.id)}>Delete</button></td>
                        </tr>
                    })}
                <tr>
                    <th scope="row">{this.state.users.length + 1}</th>
                    <td>
                        <input type="text" className="form-control" placeholder="Email" id='email' onKeyUp={(e) => this.add(e)} />
                    </td>
                    <td>
                        <input type="text" className="form-control" placeholder="Password" id='password' onKeyUp={(e) => this.add(e)} />
                    </td>
                </tr>
            </tbody>
        </table>
    </>);
}

}

class UsersAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  componentDidMount() {
    this.setState({
      isLoggedIn: localStorage.getItem("token") || sessionStorage.getItem("token"),
      userTypeId: localStorage.getItem("userTypeId") || sessionStorage.getItem("userTypeId")
    })
  }


  render() {
    if (!this.state.isLoggedIn) return (<Login />)

    return (
      <>
        <Back href={"/admin"} />
        <Users />
      </>
    )
  }

}

export default UsersAdmin