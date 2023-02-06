import React, { useState, useEffect } from 'react';
import Login from '../../login'
import Back from '../../../lib/back';
import { Layout } from '../../../lib/layout';
import { url_site } from '../../../lib/constants';

const InsertConjugate = (props) => {

  const [conjugates, setConjugates] = useState([]);
  const { token } = props;


  const add = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const conjugate = {
        verb: document.getElementById('verb').value,
        sentence: document.getElementById('sentence').value,
        choices: document.getElementById('choices').value.split(',').map(item => item.trim())
      }

      fetch(url_site + '/api/admin/conjugate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'token': token
        },
        body: JSON.stringify(conjugate)
      })
        .then(response => response.json())
        .then(data => {
          setConjugates(data)
          document.getElementById('verb').value = "";
          document.getElementById('sentence').value = "";
          document.getElementById('choices').value = "";
        })
    }
  }


  return <>
  <form>
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
      <label htmlFor='sentence' className='col-sm-2 col-form-label'>Choices</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="choices" placeholder="ex: cocinan, cocinamos, cocino, berenjena" required onKeyUp={(e) => add(e)} />
      </div>
    </div>
  </form>
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Verb</th>
      <th scope="col">Sentence</th>
      <th scope="col">Choices</th>
    </tr>
  </thead>
  <tbody>
    {conjugates.map((conjugate, index) => 
    <tr key={index}>
      <th scope="row">{index+1}</th>
      <td>{conjugate.verb}</td>
      <td>{conjugate.sentence}</td>
      <td>{conjugate.choices.join(', ')}</td>
    </tr>
    )}
  </tbody>
</table>
  </>
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
    </Layout>

}

export default ConjugateAdmin