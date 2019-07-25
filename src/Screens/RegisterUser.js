import React, { Component } from 'react';
import '../assets/css/register-user.css';
import Api from '../axios/Api';
import swal from 'sweetalert';
class RegisterUser extends Component {
    constructor() {
        super();
        this.setState({
            email: "",
            card_number: "",
            fullname: "",
            password: "",
            password2: "",
            salt: "",
            phone: "",
            job: "",
            address: ""

        })
    }

    handleChange = (e) => {
        console.log(this.state)
        this.setState({
            [e.target.name]: e.target.value
        })

    }
    handleSubmit = async (e) => {
        e.preventDefault()
        if (this.state.password === this.state.password2) {

            await Api.post('user/register', {
                email: this.state.email,
                card_number: this.state.card_number,
                fullname: this.state.fullname,
                password: this.state.password,
                password2: this.state.password2,
                salt: this.state.salt,
                phone: this.state.phone,
                job: this.state.job,
                address: this.state.address
            })
                .then((response) => {
                    this.setState({
                        email: "",
                        card_number: "",
                        fullname: "",
                        password: "",
                        password2: "",
                        salt: "",
                        phone: "",
                        job: "",
                        address: ""
                    })
                    swal({
                        title: "Register Success",
                        text: "Please Login again",
                        icon: "success",
                        button: "oke"

                    })
                        .then((value) => {
                            this.props.history.push('/books')
                        });

                })
                .catch(response => console.log(response))
        } else {
            this.setState({
                password: "",
                password2: ""
            })
            swal({
                title: "Failed",
                text: "Confirm Password Failed!",
                icon: "warning",
                buttons: "oke",
            })

        }
    }
    render() {
        return (
            <div className="container">
                <div className="form-register-user">
                    <h1 className="text-center">Form Pendaftaran</h1>
                    <hr />
                    <form action="post" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" className="form-control" placeholder="Password" onChange={this.handleChange} required />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" className="form-control" placeholder="Password" onChange={this.handleChange} required />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="password2" required>Confirm Password</label>
                                <input type="password" name="password2" id="password2" className="form-control" placeholder="Confirm Password" onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="fullnane">Full Name</label>
                                <input type="text" name="fullname" id="fullname" className="form-control" placeholder="Full Name" onChange={this.handleChange} required />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="card_number">Card Number</label>
                                <input type="text" name="card_number" id="card_number" className="form-control" placeholder="Card Number" onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="phone">No Phone</label>
                                <input type="text" name="phone" id="phone" className="form-control" placeholder="No Phone" onChange={this.handleChange} required />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="job">Job</label>
                                <input type="text" name="job" id="job" className="form-control" placeholder="job" onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <textarea name="address" id="address" className="form-control" placeholder="Address" onChange={this.handleChange} required></textarea>
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary">Register</button> <button type="cencel" className="btn btn-warning" onChange={this.handleChange}>Cencel</button>
                    </form>
                </div>


            </div>
        )
    }
}
export default RegisterUser