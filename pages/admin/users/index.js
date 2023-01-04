import React from 'react';
import Login from '../../login'
import Back from '../../../lib/back';

class UsersAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  componentDidMount() {
    this.setState({
      isLoggedIn: localStorage.getItem("token") || sessionStorage.getItem("token"),
      userTypeId: localStorage.getItem("userTypeId") || sessionStorage.getItem("userTypeId")
    })
  }


  render() {
    if (!this.state.isLoggedIn) return (<Login />)

    return (
      <>
        <Back href={"/admin"} />
      </>
    )
  }

}

export default UsersAdmin