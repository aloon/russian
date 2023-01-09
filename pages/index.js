import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'
import Login from './login'

const Home = () => {

  const [token, setToken] = useState(null);
  const [userTypeId, setUserTypeId] = useState(-1);

  useEffect(() => {
    setToken(localStorage.getItem("token") || sessionStorage.getItem("token"));
    setUserTypeId(localStorage.getItem("userTypeId") || sessionStorage.getItem("userTypeId"));
  })

  if (token == null)
    return (<Login />)
  else
    return (<ul>
      <li>
        <Link href="/join-words/categories">Join Words</Link>
      </li>
      {userTypeId == 1 &&
        <li>
          <Link href="/admin">Admin</Link>
        </li>
      }
    </ul>)
}


export default Home