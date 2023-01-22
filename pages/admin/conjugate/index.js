import React, { useState, useEffect } from 'react';
import Login from '../../login'
import Back from '../../../lib/back';
import { Layout } from '../../../lib/layout';

const InsertConjugate = (props) => {

  //const [conjugate, setConjugate] = useState({ verb: '', sentense: '', options: [] });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
  }


  return <form>
  <div className='form-group row'>
    <label htmlFor='verb' className='col-sm-2 col-form-label'>Verb</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="verb" placeholder="ex: Cocinar" required />
    </div>
  </div>
    <div className='form-group row'>
      <label htmlFor='sentence' className='col-sm-2 col-form-label'>Sentence</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="sentence" placeholder="ex: Ellos XXX muy bien" required />
      </div>
    </div>
    <div className='form-group row'>
    <label htmlFor='sentence' className='col-sm-2 col-form-label'>Options</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="options" placeholder="ex: cocinan, cocinamos, cocino, berenjena" required />
      </div>
    </div>
  </form>
}

const ListConjugate = (props) => {
  const [conjugates, setConjugates] = useState([]);
  return <div>ListConjugate</div>
}

const ConjugateAdmin = () => {

  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token") || sessionStorage.getItem("token"));
  })


  return (token == null) ? <Login /> :
    <Layout>
      <Back href={"/admin"} />
      <InsertConjugate token={token} />
      <ListConjugate token={token} />
    </Layout>

}

export default ConjugateAdmin