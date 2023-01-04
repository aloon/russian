import Link from 'next/link'
import React from 'react';
import Login from '../login'

class HomeAdmin extends React.Component {
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

        return (
            <>
                <Link href={"/"}>Back</Link>
                <ul>
                    <li>
                        <Link href="/admin/join-words/categories">Categories in join words</Link>
                    </li>
                    <li>
                        <Link href="/admin/users/">Users</Link>
                    </li>
                </ul>
            </>
        )
    }

}

export default HomeAdmin