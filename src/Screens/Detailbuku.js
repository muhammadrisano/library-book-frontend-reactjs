import React, { Component } from 'react';
import { Jumbotron, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input } from 'reactstrap';
import './style.css';
import Data from '../Database/Datadummy';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { SIGTSTP } from 'constants';
import { async } from 'q';
import axios from 'axios';

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

    updateFinish = async (e) => {
        e.preventDefault();

        await axios.patch("http://localhost:4000/books/" + this.state.id_params, {
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
        this.props.history.push('/')



        swal({
            title: "Update!",
            text: "Update Success !!",
            icon: "success",
            button: "oke"

        })
    }

    prosesEdit = (event) => {
        event.preventDefault()
        let stateData = this.state.data
        let data = {
            title: this.state.inputTitle,
            description: this.state.inputDescription,
            url: this.state.inputUrl,
            created_at: Date(),
            updated_at: Date()
        }
        stateData = [...stateData, data]
        this.setState({
            data: stateData,
            inputTitle: '',
            inputUrl: '',
            inputDescription: ''
        })
    }
    deleteBook = () => {


        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete('http://localhost:4000/books/' + this.state.id_book)
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
        console.log(this.props.books);
        return (
            <div>

                <Jumbotron className="p-0 header-book">
                    <div className="button-detail">
                        <a href="#" onClick={this.toggle}><h3>Edit</h3></a>  <a href='#' onClick={() => this.deleteBook()}><h3>Delete</h3></a>
                    </div>
                    <div className="header-book">
                        <img src={this.state.image} width="100%" alt="" />
                    </div>

                </Jumbotron>
                <div className="book-child">
                    <img src={this.state.image} alt="" width="150px" className="img-thumbnail" />
                </div>delete
                <Container className="body-detailbook">
                    <h2>{this.state.name}</h2>
                    <h3 className="tgl-detail">{this.state.created_at}</h3>
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
                </div>
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(Detailbuku)