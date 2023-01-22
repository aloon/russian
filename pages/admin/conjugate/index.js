import React, { useState, useEffect } from 'react';
import Login from '../../login'
import Back from '../../../lib/back';
import { Layout } from '../../../lib/layout';

const ConjugateAdmin = () => {

  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token") || sessionStorage.getItem("token"));
  })


  return (token == null) ? <Login /> :
    <Layout>
      <Back href={"/admin"} />
      WIP
    </Layout>

}

export default ConjugateAdmin