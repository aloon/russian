import React, { useState, useEffect } from 'react';
import Login from '../login'
import Back from '../../lib/back';
import PrettyList from '../../lib/prettyList'
import { Layout } from '../../lib/layout';

const HomeAdmin = () => {

  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token") || sessionStorage.getItem("token"));
  })

  const items = [
    { href: "/admin/join-words/categories", text: "Categories in join words" },
    { href: "/admin/conjugate/", text: "Match conjugations" },
    { href: "/admin/users/", text: "Users" }
  ]

  return (token == null) ? <Login /> :
    <Layout>
      <Back href={"/"} />
      <PrettyList items={items} />
    </Layout>

}

export default HomeAdmin