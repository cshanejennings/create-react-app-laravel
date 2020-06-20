import React, { Fragment } from 'react';
import './App.css';

import axios from 'axios';

axios.defaults.withCredentials = true;

axios.defaults.headers.common = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const URI_BASE = 'http://localhost:8000';

const ENDPOINT = {
  // not sure if this is necessary
  csrf: `${URI_BASE}/sanctum/csrf-cookie`,
  login: `${URI_BASE}/login`,
  user: `${URI_BASE}/api/user`,
}

axios.get(ENDPOINT.csrf, {
  'Access-Control-Allow-Origin': '*',
}).then(response=>{
  // ? not sure if this is needed
});


function App() {
  const [ email, set_email ] = React.useState('admin@test.com');
  const [ password, set_password ] = React.useState('12345678');

  const [ token, set_token ] = React.useState('');

  const update_email = e => set_email(e.target.value);
  const update_pw = e => set_password(e.target.value);

  const test_credentials = () => {
    axios.post(ENDPOINT.login, {email, password}, {
      'Access-Control-Allow-Origin': '*',
    }).then(response => {
      const tkn = response.data; // wherever the token is stored
      set_token(tkn);
    });
  }

  const test_token = () => {
    axios.get(ENDPOINT.user, {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`,
    }).then(response => {
      console.log(response);
    });
  }

  const form_area = (!token) ? (
    <Fragment>
      <input className="form-text" onChange={ update_email } value={ email } type="text"/>
      <input className="form-text" onChange={ update_pw } value= { password } type="text"/>
      <button className="submit-btn" onClick={ test_credentials }>Test Credentials</button>
      <button className="submit-btn" onClick={ test_token }>Load User Data</button>
    </Fragment>
  ) : (
    <Fragment>
      <h4>Token</h4>
      <input className="form-text" type="text" value={ token } onChange={ () => {} }/>
      <p>Test the { ENDPOINT.user } webservice.</p>
      <button className="submit-btn" onClick={ test_token }>Load User Data</button>
    </Fragment>
  );

  return (
    <div className="App">
      <header className="App-header">Login test harness</header>
      <hr/>
      { form_area }
    </div>
  );
}

export default App;
