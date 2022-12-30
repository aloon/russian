export default function Login() {
    return (
        <><br/>
            <section className="pb-4 w-30">
                <div className="bg-white border rounded-5">
                    <section className="w-100 p-4 d-flex justify-content-center pb-4">
                        <form>
                            <div className="form-outline mb-4">
                                <input type="email" id="email" className="form-control" />
                                <label className="form-label" for="email">Email address</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="password" id="pass" className="form-control" />
                                <label className="form-label" for="pass">Password</label>
                            </div>

                            <div className="row mb-4">
                                <div className="col d-flex justify-content-center">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="remember" checked />
                                        <label className="form-check-label" for="remember"> Remember me </label>
                                    </div>
                                </div>
                            </div>

                            <button type="button" className="btn btn-primary btn-block mb-4">Sign in</button>

                        </form>
                    </section>
                </div>
            </section>
        </>
    )
}