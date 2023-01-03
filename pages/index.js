import React from 'react';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'
import Login from './login'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true
    };
  }

  render() {
    if (!this.state.isLoggedIn) return (<Login />)

    return (<ul>
      <li>
        <Link href="/join-words/categories">Join Words</Link>
      </li>
      <li>
        <Link href="/admin">Admin</Link>
      </li>
    </ul>)
  }
}

export default Home