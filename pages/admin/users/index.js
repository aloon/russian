import Link from 'next/link'
import React from 'react';
import Login from '../../login'

class UsersAdmin extends React.Component {
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
                <Link href={"/admin/"}>Back</Link>
              
            </>
        )
    }

}

export default UsersAdmin