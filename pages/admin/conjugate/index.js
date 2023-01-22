import React, { useState, useEffect } from 'react';
import Login from '../../login'
import Back from '../../../lib/back';
import { Layout } from '../../../lib/layout';

const InsertConjugate = () => {

  const [conjugate, setConjugate] = useState({verb:'',sentense:'',options:[]});

  return <form>
    <div className='form-group row'>
      <label htmlFor='verb' className='col-sm-2 col-form-label'>Verb</label>
    </div>
    <div>Verb</div>
    <div>Sentense</div>
    <div>Options</div>
  </form>
}

const ConjugateAdmin = () => {

  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token") || sessionStorage.getItem("token"));
  })


  return (token == null) ? <Login /> :
    <Layout>
      <Back href={"/admin"} />
      <InsertConjugate />
    </Layout>

}

export default ConjugateAdmin