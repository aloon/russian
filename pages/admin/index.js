import React, { useState, useEffect } from 'react';
import Login from '../login'
import Back from '../../lib/back';
import PrettyList from '../../lib/prettyList'

const HomeAdmin = () => {

  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token") || sessionStorage.getItem("token"));
  })

  const items = [
    { href: "/admin/join-words/categories", text: "Categories in join words" },
    { href: "/admin/users/", text: "Users" }
  ]

  return (token == null) ? <Login /> : <div>
  <main>
      <div className='p-2'>
      <Back href={"/"} />
      <PrettyList items={items} />
      </div>
  </main>
  <footer>
  </footer>
</div>
}

export default HomeAdmin