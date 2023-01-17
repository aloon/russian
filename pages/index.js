import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Login from './login'
import PrettyList from '../lib/prettyList'

const Home = () => {

  const [token, setToken] = useState(null);
  const [userTypeId, setUserTypeId] = useState(-1);

  useEffect(() => {
    setToken(localStorage.getItem("token") || sessionStorage.getItem("token"));
    setUserTypeId(localStorage.getItem("userTypeId") || sessionStorage.getItem("userTypeId"));
  }, [])

  const items = [{ href: "/join-words/categories", text: "Join Words" }]
  if (userTypeId == 1) {
    items.push({ href: "/admin", text: "Admin" })
  }

  return (token == null) ? <Login /> : <PrettyList items={items} />
}


export default Home