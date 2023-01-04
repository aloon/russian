import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
    }

    signIn() {
        const dataLogin = {
            email: document.getElementById("email").value,
            password: document.getElementById("pass").value
        }
        const url = (process.env.NODE_ENV == "production") ? process.env["SITE_URL"] : "http://localhost:3000";
        const remember = document.getElementById("remember").checked;
        const _this = this;
        fetch(url + '/api/login', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            }),
            body: JSON.stringify(dataLogin)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.status == "success") {
                if (remember) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("email", dataLogin.email);
                    localStorage.setItem("userTypeId", data.userTypeId);
                } else {
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("email", dataLogin.email);
                    sessionStorage.setItem("userTypeId", data.userTypeId);
                }
                window.location.href = "/";
            } else {
                _this.setState({ error: true })
            }
        })
    }

    render() {
        return (<section className="pb-4 w-30">
            <div className="bg-white border rounded-5 m-4">
                <section className="p-4 d-flex justify-content-center pb-4">
                    <form>
                        <div className="form-outline mb-4">
                            <input type="email" id="email" className="form-control" placeholder="email" />
                        </div>

                        <div className="form-outline mb-4">
                            <input type="password" id="pass" className="form-control" placeholder="Password" />
                        </div>

                        <div className="row mb-4">
                            <div className="col d-flex">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="remember" />
                                    <label className="form-check-label" htmlFor="remember"> Remember me </label>
                                </div>
                            </div>
                        </div>

                        <button type="button" className="btn btn-primary btn-block mb-4" onClick={() => this.signIn()}>Sign in</button>

                        {this.state.error &&
                            <div class="alert alert-danger" role="alert">Wrong email or password</div>
                        }

                    </form>
                </section>
            </div>
        </section>)
    }
}
export default Login