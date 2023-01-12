import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { url_site } from '../lib/constants';


const Login = () => {

    const [error, setError] = useState(false);

    function signIn() {
        const dataLogin = {
            email: document.getElementById("email").value,
            password: document.getElementById("pass").value
        }
        const remember = document.getElementById("remember").checked;
        const _this = this;
        fetch(url_site + '/api/login', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            }),
            body: JSON.stringify(dataLogin)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.status == "success") {
                const clientStorage = remember ? localStorage : sessionStorage;
                clientStorage.setItem("token", data.token);
                clientStorage.setItem("userTypeId", data.userTypeId);
                window.location.href = "/";
            } else {
               setError(true);
            }
        })
    }

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

                    <button type="button" className="btn btn-primary btn-block mb-4" onClick={() => signIn()}>Sign in</button>

                    {error &&
                        <div class="alert alert-danger" role="alert">Wrong email or password</div>
                    }

                </form>
            </section>
        </div>
    </section>)
}

export default Login