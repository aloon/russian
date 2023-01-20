import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Login from './login'
import PrettyList from '../lib/prettyList'
import { Layout } from '../lib/layout';

const Home = () => {

  const [token, setToken] = useState(null);
  const [userTypeId, setUserTypeId] = useState(-1);

  useEffect(() => {
    setToken(localStorage.getItem("token") || sessionStorage.getItem("token"));
    setUserTypeId(localStorage.getItem("userTypeId") || sessionStorage.getItem("userTypeId"));
  }, [])

  const items = [{ href: "/join-words/categories", text: "Join Words" }]
  if (userTypeId == 1) {
    items.push({ href: "/conjugate", text: "Match conjugations" })
    items.push({ href: "/admin", text: "Admin" })
  }

  return (token == null) ? <Login /> : <Layout><PrettyList items={items} /></Layout>
}


export default Home