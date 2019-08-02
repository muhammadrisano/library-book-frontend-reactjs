import React, { Component } from 'react';
import { Jumbotron, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input } from 'reactstrap';
import './style.css';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { SIGTSTP } from 'constants';
import { async } from 'q';
import axios from 'axios';
import Api from '../axios/Api'
import moment from 'moment'
import { borrowuser } from '../redux/actions/loanbooks'

class Detailbuku extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            id_params: props.match.params.idbook,
            modal: false,
            redirect: false,
            id_book: '',
            id_category: '',
            name: '',
            name_category: '',
            image: '',
            writer: '',
            description: '',
            status: '',
            location: '',
            updated_at: ''



        }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    componentWillMount() {

        if (this.props.books.length == 0) {
            this.props.history.push('/books')
        } else {

            let dataBook = this.props.books.find((item) => {
                return item.id_book == this.state.id_params
            })

            this.setState({
                id_book: dataBook.id_book,
                id_category: dataBook.id_category,
                name: dataBook.name,
                name_category: dataBook.name_category,
                image: dataBook.image,
                writer: dataBook.writer,
                description: dataBook.description,
                status: dataBook.status,
                location: dataBook.location,
                updated_at: dataBook.updated_at
            })

        }


    }
    deleteBook() {

        swal({
            title: "Delete !",
            text: "Deleted Success !!",
            icon: "success",
            button: "oke"

        });

        // this.state.redirect = true;

    }

    handlerChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    borrowBook = (e) => {
        e.preventDefault();
        if (parseInt(this.props.id_user) === 3) {

        }

    }
    borrowUser = async () => {
        await this.props.dispatch(borrowuser({
            card_number: this.props.card_number,
            id_book: this.state.id_book,
            expired_date: moment().add(6, 'days').format('l'),
            forfeit: 0,
            information: "PENDING",
            updated_at: new Date()
        }, {
                "authorization": "jangan-coba-coba",
                "x-access-token": "bearer " + this.props.token,
                "x-control-user": this.props.id_user
            }))
            .then((response) => {
                swal({
                    title: "Borrow",
                    text: "Borrow Book Success !!",
                    icon: "success",
                    button: "oke"

                })
                this.props.history.push('/books')
            })
            .catch((error) => {
                swal({
                    title: "Borrow",
                    text: "Borrow Book Failed!",
                    icon: "warning",
                    buttons: "oke",
                })
            })
    }

    updateFinish = async (e) => {
        e.preventDefault();

        await Api.patch("books/" + this.state.id_params, {
            name: this.state.name,
            image: this.state.image,
            writer: this.state.writer,
            description: this.state.description,
            location: this.state.location,
            id_category: this.state.id_category,
            status: this.state.status
        })
            .then(response =>
                console.log(response.data)
            )
        swal({
            title: "Update!",
            text: "Update Success !!",
            icon: "success",
            button: "oke"

        })
        this.props.history.push('/')
    }


    deleteBook = () => {


        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    await Api.delete('books/' + this.state.id_book)
                        .then(response =>
                            console.log(response.data)
                        )
                    this.props.history.push('/')
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                } else {

                }
            });


    }
    render() {
        console.log(this.props.token);
        return (
            <div>

                <Jumbotron className="p-0 header-book">
                    {(parseInt(this.props.role_id) === 2) ?
                        <div className="button-detail">
                            <a href="#" onClick={this.toggle}><h3>Edit</h3></a>  <a href='#' onClick={() => this.deleteBook()}><h3>Delete</h3></a>
                        </div> : <div></div>
                    }
                    <div className="header-book">
                        <img src={this.state.image} width="100%" alt="" />

                    </div>

                </Jumbotron>
                <div className="book-child">
                    <img src={this.state.image} alt="" width="150px" className="img-thumbnail" />
                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target=".bd-example-modal-lg">
                        Borrow
</button>
                </div>
                <Container className="body-detailbook">
                    <h2>{this.state.name}</h2>
                    <h3 className="tgl-detail">{this.state.writer}</h3>
                    <p>
                        {this.state.description}
                    </p>
                </Container>

                <div>

                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <Form onSubmit={this.updateFinish}>
                            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                            <ModalBody>

                                <FormGroup row>
                                    <Label for="exampleEmail" sm={3} size="lg">Url Image</Label>
                                    <Col sm={9}>
                                        <Input type="text" name="image" id="image" placeholder="Url Image.." bsSize="lg" value={this.state.image} onChange={this.handlerChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleEmail" sm={3} size="lg">Nama Buku</Label>
                                    <Col sm={9}>
                                        <Input type="text" name="name" id="title" placeholder="Title..." bsSize="lg" value={this.state.name} onChange={this.handlerChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleEmail" sm={3} size="lg">Penulis</Label>
                                    <Col sm={9}>
                                        <Input type="text" name="writer" id="writer" placeholder="Penulis..." bsSize="lg" value={this.state.writer} onChange={this.handlerChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleEmail" sm={3} size="lg">Lokasi Buku</Label>
                                    <Col sm={9}>
                                        <Input type="text" name="location" id="location" placeholder="Lokasi..." bsSize="lg" value={this.state.location} onChange={this.handlerChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleEmail" sm={3} size="lg">Deskripsi</Label>
                                    <Col sm={9}>

                                        <Input type="textarea" name="description" id="description" placeholder="Deskripsi..." value={this.state.description} onChange={this.handlerChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleEmail" sm={3} size="lg">Kategory</Label>
                                    <Col sm={9}>
                                        <Input type="text" name="id_category" id="id_category" placeholder="Kategori..." bsSize="lg" value={this.state.id_category} onChange={this.handlerChange} />
                                    </Col>
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button type="submit" color="primary" onClick={this.toggle}>Finish</Button>{' '}

                            </ModalFooter>
                        </Form>
                    </Modal>
                    {/* modal borrow book */}

                    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">

                                    <div className="row">
                                        <div className="col-4">
                                            <img src={this.state.image} width="250px" alt="" />
                                        </div>
                                        <div className="col-8" >
                                            <div className="row">
                                                <div className="col-5">
                                                    Judul Buku
            </div>

                                                <div className="col-7">
                                                    <b> {this.state.name} </b>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-5">
                                                    Penulis
            </div>
                                                <div className="col-7">
                                                    {this.state.writer}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-5">
                                                    Kategori
            </div>
                                                <div className="col-7">
                                                    {this.state.name_category}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-5">
                                                    Deskripsi
            </div>

                                                <div className="col-7">
                                                    {this.state.description.slice(0, 300)}

                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-5">
                                                    Tahun
            </div>

                                                <div className="col-7">
                                                    {moment(this.state.updated_at).format('LL')}
                                                </div>
                                            </div>

                                            <hr />
                                            <br />

                                            <h5>Tanggal Kembali : {moment().add(6, 'days').format('ll')} </h5>
                                            <br />
                                            <h6>Keterangan</h6>
                                            <p>Keterlambatan akan di denda 5000/hari</p>
                                        </div>
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.borrowUser}>Borrow Now</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* end modal borrow book */}
                </div>
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        books: state.books.bookshow,
        id_user: state.users.id_user,
        card_number: state.users.card_number,
        token: state.users.token,
        role_id: state.users.role_id
    }
}

export default connect(mapStateToProps)(Detailbuku)