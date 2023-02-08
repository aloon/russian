import React, { useState, useEffect } from 'react';
import Login from '../../login'
import Back from '../../../lib/back';
import { url_site } from '../../../lib/constants';
import { Layout } from '../../../lib/layout';

const Users = () => {

  const urlApiUsers = url_site + '/api/admin/users';
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token") || sessionStorage.getItem("token"));
    if (token != null) {
      fetch(urlApiUsers, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'token': token
        }
      })
        .then((response) => response.json())
        .then(setUsers);
    }
  }, [token]);

  const remove = (id) => {
    fetch(urlApiUsers + '?id=' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'token': token
      }
    }).then((response) => response.json())
      .then(setUsers);
  }

  const add = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetch(urlApiUsers, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'token': token
        },
        body: JSON.stringify({
          email: document.getElementById('email').value,
          passwd: document.getElementById('password').value
        })
      }).then((response) => response.json())
        .then((data) => {
          setUsers(data);
          document.getElementById('email').value = "";
          document.getElementById('password').value = "";
        });
    }
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((c, i) => {
            return <tr key={"t" + c.id}>
              <th scope="row" key={"th" + c.id}>{i + 1}</th>
              <td>{c.email}</td>
              <td><button onClick={() => remove(c.id)}>Delete</button></td>
            </tr>
          })}
        <tr>
          <th scope="row">{users.length + 1}</th>
          <td>
            <input type="text" className="form-control" placeholder="Email" id='email' onKeyUp={(e) => add(e)} />
          </td>
          <td>
            <input type="text" className="form-control" placeholder="Password" id='password' onKeyUp={(e) => add(e)} />
          </td>
        </tr>
      </tbody>
    </table>
  );

}

const UsersAdmin = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token") || sessionStorage.getItem("token"));
  }, [token]);


  return (token == null) ? <Login /> : (
    <Layout>
      <Back href={"/admin"} />
      <Users />
    </Layout>
  )
}

export default UsersAdmin
