import React, { Component } from 'react';
import Api from '../axios/Api';
import {connect} from 'react-redux';



class FormLogin extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: ""

        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleLogin = async (e) => {
        e.preventDefault()
        await Api.post('user/login', {
            email: this.state.email,
            password: this.state.password
        })
            .then((response) => {
                console.log(response.data)
            })

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
                    <form action="post" onSubmit={this.handleLogin}>
                        <h4 className="text-center">Login Here !</h4>
                        <hr />
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" className="form-control" value={this.state.email} placeholder="Email" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" value={this.state.password} className="form-control" placeholder="*****" onChange={this.handleChange}/>
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
const mapDispatchToProps = (dispatch)=>{

}
export default connect(mapDispatchToProps)(FormLogin);