import React, { Component } from 'react';
import Header from '../Component/Header';
import Api from '../axios/Api';
import '../assets/css/user.css';
import ListUser from '../Component/ListUser';
import moment from 'moment';
import { connect } from 'react-redux'
import { borrowBookUser } from '../redux/actions/loanbooks'
import { async } from 'q';
import { getuserid } from '../redux/actions/users'
import { timingSafeEqual } from 'crypto';
import { updateuser } from '../redux/actions/users'
import swal from 'sweetalert';

class Editprofile extends Component {

    constructor() {
        super();
        this.state = {
            bookBorrow: [],
            card_number: "",
            email: "",
            fullname: "",
            phone: "",
            job: "",
            address: "",
            photo: "",
            selectedFile: null,

        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeFile = (e) => {
        console.log(e.target.files[0])
        this.setState({
            selectedFile: e.target.files[0],
            loaded: 0,
        })
    }

    handleEditUser = async () => {
        console.log(this.state.selectedFile)
        const dataFile = new FormData()
        dataFile.append('photo', this.state.selectedFile)
        dataFile.append('card_number', this.state.card_number)
        dataFile.append('fullname', this.state.fullname)
        dataFile.append('phone', this.state.phone)
        dataFile.append('job', this.state.job)
        dataFile.append('address', this.state.address)

        console.log(this.state)
        await this.props.dispatch(updateuser(this.props.id_user, dataFile, {
            "authorization": "jangan-coba-coba",
            "x-access-token": "bearer " + this.props.token,
            "x-control-user": this.props.id_user
        }))
            .then((response) => {
                console.log(response.data)
                swal({
                    title: "Insert !",
                    text: "Insert Success !!",
                    icon: "success",
                    button: "oke"

                });

            })
            .catch(
                swal({
                    title: "delete",
                    text: "Delete Failed!",
                    icon: "warning",
                    buttons: "oke",
                })
            )
        this.getUser()
    }

    getUser = async () => {
        await this.props.dispatch(getuserid(this.props.id_user, {
            "authorization": "jangan-coba-coba",
            "x-access-token": "bearer " + this.props.token,
            "x-control-user": this.props.id_user
        }))
            .then((response) => {
                this.setState({
                    card_number: this.props.userid.card_number,
                    email: this.props.userid.email,
                    fullname: this.props.userid.fullname,
                    phone: this.props.userid.phone,
                    job: this.props.userid.job,
                    address: this.props.userid.address,
                    photo: this.props.userid.photo
                })
            })
        console.log(this.props.userid);
    }

    componentDidMount = () => {
        this.getUser()
    }

    render() {

        return (
            <div>
                <Header />
                <div className="row">
                    <div className="col-md-3">
                        <ListUser />
                    </div>
                    <div className="col-md-9">
                        <div class="card">
                            <div class="card-header">
                                History Borrow
                            </div>
                            <br />
                            <h4 className="text-center">Edit Profile</h4>
                            <div class="card-body">
                                <div className="row">
                                    <div className="col-3">
                                        <img src={this.state.photo} alt="..." class="img-thumbnail"></img>
                                    </div>
                                    <div className="col-9">
                                        <div className="row">

                                            <div className="col-3">Card Number</div>
                                            <div className="col-9">: {this.state.card_number} </div>
                                            <div className="col-3">Email</div>
                                            <div className="col-9">: {this.state.email} </div>
                                            <div className="col-3">Full Name</div>
                                            <div className="col-9">: {this.state.fullname} </div>
                                            <div className="col-3">Phone</div>
                                            <div className="col-9">: {this.state.phone} </div>
                                            <div className="col-3">Job</div>
                                            <div className="col-9">: {this.state.job}</div>
                                            <div className="col-3">Address</div>
                                            <div className="col-9">: {this.state.address}</div>
                                        </div>
                                        <button className="btn btn-danger" data-toggle="modal" data-target=".bd-editprofile-modal-lg">Edit Profile</button>
                                    </div>
                                </div>



                                {/* modal cari buku */}
                                <div class="modal fade bd-editprofile-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-lg">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="cariBukulLabel">Cari Buku</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <form>
                                                    <div class="form-group row">
                                                        <label for="inputPassword" class="col-sm-3 col-form-label">Card Number</label>
                                                        <div class="col-sm-9">
                                                            <input type="text" name="card_number" class="form-control" id="card_number" placeholder="Card Number" value={this.state.card_number} onChange={this.handleChange} />
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="inputPassword" class="col-sm-3 col-form-label">Photo</label>
                                                        <div class="col-sm-9">
                                                            <input type="file" name="files" class="form-control" id="files" onChange={this.onChangeFile} />
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="inputPassword" class="col-sm-3 col-form-label">Email</label>
                                                        <div class="col-sm-9">
                                                            <input type="text" name="email" class="form-control" id="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="inputPassword" class="col-sm-3 col-form-label">Full Name</label>
                                                        <div class="col-sm-9">
                                                            <input type="text" name="fullname" class="form-control" id="fullname" placeholder="Full Name" value={this.state.fullname} onChange={this.handleChange} />
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="inputPassword" class="col-sm-3 col-form-label">Phone</label>
                                                        <div class="col-sm-9">
                                                            <input type="text" name="phone" class="form-control" id="phone" placeholder="Phone" value={this.state.phone} onChange={this.handleChange} />
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="inputPassword" class="col-sm-3 col-form-label">Job</label>
                                                        <div class="col-sm-9">
                                                            <input type="text" name="job" class="form-control" id="job" placeholder="Job" value={this.state.job} onChange={this.handleChange} />
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="inputPassword" class="col-sm-3 col-form-label">Address</label>
                                                        <div class="col-sm-9">
                                                            <input type="text" name="address" class="form-control" id="Address" placeholder="Address" value={this.state.address} onChange={this.handleChange} />
                                                        </div>
                                                    </div>

                                                </form>

                                            </div>
                                            <div class="modal-footer">

                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary" onClick={() => this.handleEditUser()} data-dismiss="modal">Edit Profile</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* end modal cari buku */}



                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )
    }

}
const mapStateToProps = state => {
    return {
        token: state.users.token,
        card_number: state.users.card_number,
        id_user: state.users.id_user,
        userid: state.users.userid[0]
    }

}

export default connect(mapStateToProps)(Editprofile);