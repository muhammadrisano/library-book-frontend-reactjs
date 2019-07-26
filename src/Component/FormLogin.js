import React, { Component } from 'react';
import Api from '../axios/Api';
import { connect } from 'react-redux'
import swal from 'sweetalert';
import { loginUser } from '../redux/actions/users'
import { Link } from 'react-router-dom';
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
        e.preventDefault();
        await this.props.dispatch(loginUser({
            email: this.state.email,
            password: this.state.password
        }))
            .then((response) => {
                sessionStorage.setItem('token', response.action.payload.data.result.token)
                sessionStorage.setItem('id_user', response.action.payload.data.result.id_user)
                sessionStorage.setItem('role_id', response.action.payload.data.result.role_id)
                sessionStorage.setItem('card_number', response.action.payload.data.result.card_number)
                window.location.reload();
                swal({
                    title: "Insert !",
                    text: "Insert Success !!",
                    icon: "success",
                    button: "oke"

                });
            })




    }
    hideForm = (e) => {
        e.preventDefault()
        this.props.hideLogin()
    }
    showLogin = (e) => {
        e.preventDefault()
        this.props.showLogin()
    }
    render() {
        console.log(this.props.user);
        console.log(this.props.formLogin);
        if (!this.props.formLogin) {
            return (
                <div>
                    <a href="" onClick={this.showLogin}><i class="fas fa-angle-double-left"></i></a>

                </div>
            )
        } else {
            return (
                // <div>
                <div className="form-login">
                    <div className="form-content">
                        <div className="icon-login">
                            <img src="https://image.shutterstock.com/image-vector/library-icon-260nw-394498765.jpg" alt="" width="142px" />
                        </div>
                        <br />
                        <form action="#" method="post" onSubmit={this.handleLogin}>
                            <h4 className="text-center">Login Here !</h4>
                            <hr />
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" id="email" className="form-control" value={this.state.email} placeholder="Email" onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" value={this.state.password} className="form-control" placeholder="*****" onChange={this.handleChange} />
                            </div>
                            <p>Have you not registered yet ? <Link to="/registeruser">Register Here</Link></p>
                            <button type="submit" className="btn btn-primary btn-block btn-lg">Login</button>

                        </form>
                        <div className="arrow"> <a href="" onClick={this.hideForm}><i class="fas fa-angle-double-right"></i></a></div>

                    </div>
                </div>
                //     
            )

        }

    }
}

const mapStateToProps = (state) => {
    return {
        user: state.users.user,
        bookshow: state.books.bookshow
    }

}
export default connect(mapStateToProps)(FormLogin);