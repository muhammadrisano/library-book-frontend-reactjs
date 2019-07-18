import React, { Component } from 'react';
import Header from '../Component/Header'
import {
    ButtonToolbar,
    Button,
    Container, Col, Input, FormGroup, Label, Modal, ModalHeader, ModalBody, Form, ModalFooter
} from 'reactstrap';
import Search from '../Component/Search';

import Listbuku from '../Component/Listbuku';
import Paging from '../Component/Paging';
import Data from '../Database/Datadummy'
import swal from 'sweetalert';
import queryString from 'query-string';
import { connect } from 'react-redux'
import axios from 'axios'
import Api from '../axios/Api'


class Books extends Component {

    constructor() {
        super()
        this.state = {
            data: Data,
            modal: false,
            name: '',
            writer: '',
            description: '',
            location: '',
            id_category: '',
            bookspage: [],
            books: []
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    prosesInput = async (event) => {
        event.preventDefault()
        console.log(this.state)

        await Api.post("books", {
            name: this.state.name,
            image: this.state.image,
            writer: this.state.writer,
            description: this.state.description,
            location: this.state.location,
            id_category: this.state.id_category,
        })
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
        this.props.history.push('/')
    }
    handlerChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    async componentDidMount() {

        await Api.get('books?page=1')
            .then(response =>
                this.props.getBooks(response.data)
            )
    }

    render() {
        console.log(this.props.jumlahbuku);
        return (

            <div>
                <Header />
                <Container>
                    <Search />
                    <div>
                        <div className="button-modal">
                            <Button onClick={this.toggle}>{this.props.buttonLabel}ADD</Button>
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className="{this.props.className} modal-lg">
                            <Form onSubmit={this.prosesInput}>
                                <ModalHeader toggle={this.toggle}><b>Add Data</b></ModalHeader>
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
                                    <Button type="submit" color="warning" onClick={this.toggle}><span className="button-add">SAVE</span></Button>{' '}

                                </ModalFooter>
                            </Form>
                        </Modal>

                    </div>

                    {/* <Buttonmodal /> */}


                    <Listbuku />

                    <Paging />

                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books,
        jumlahbuku: state.jumlahbuku
    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        getBooks: (data) => dispatch({ type: "GET_ALL", dataBook: data })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Books);
