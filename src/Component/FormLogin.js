import React, { Component } from 'react';





class FormLogin extends Component {
    constructor() {
        super()

    }

    hideForm = (e) => {
        e.preventDefault()
        this.props.hidelogin()
    }
    render() {
        return (

            <div className="form-login">
                <div className="form-content">
                    <div className="icon-login">

                    </div>
                    <br />
                    <form action="post">
                        <h4 className="text-center">Login Here !</h4>
                        <hr />
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" className="form-control" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" className="form-control" placeholder="*****" />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary btn-block btn-lg">Login</button>
                    </form>
                    <div className="arrow"> <a href="" onClick={this.hideForm}><i class="fas fa-angle-double-right"></i></a></div>

                </div>
            </div>
        )

    }
}

export default FormLogin;