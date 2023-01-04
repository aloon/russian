import React from 'react';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'
import Login from './login'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  componentDidMount() {
    this.setState({ 
      isLoggedIn: localStorage.getItem("token") || sessionStorage.getItem("token") ,
      userTypeId: localStorage.getItem("userTypeId") || sessionStorage.getItem("userTypeId")
    })
  }

  render() {
    if (!this.state.isLoggedIn) return (<Login />)

    return (<ul>
      <li>
        <Link href="/join-words/categories">Join Words</Link>
      </li>
      {this.state.userTypeId == 1 && 
      <li>
        <Link href="/admin">Admin</Link>
      </li>
      }
    </ul>)
  }
}

export default Home