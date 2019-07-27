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
import FormLogin from '../Component/FormLogin'
import '../assets/css/books.css'
import { getBooks } from '../redux/actions/books'
import { inputBook } from '../redux/actions/books'

class Books extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: Data,
            modal: false,
            name: '',
            writer: '',
            description: '',
            location: '',
            id_category: '',
            bookspage: [],
            books: [],
            formLogin: false,
            selectedFile: null

        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    showFormLogin = () => {

        this.setState({
            formLogin: true
        })

    }
    hideFormLogin = () => {

        this.setState({
            formLogin: false
        })
    }
    onChangeFile = (e) => {
        console.log(e.target.files[0])
        this.setState({
            selectedFile: e.target.files[0],
            loaded: 0,
        })
    }
    setIduser = (e) => {
        this.setState({
            id_user: e
        })
    }
    prosesInput = async (event) => {
        event.preventDefault()
        const dataFile = new FormData()
        dataFile.append('image', this.state.selectedFile)
        dataFile.append('name', this.state.name)
        dataFile.append('writer', this.state.location)
        dataFile.append('location', this.state.writer)
        dataFile.append('description', this.state.description)
        dataFile.append('id_category', this.state.id_category)

        console.log(this.state)
        await this.props.dispatch(inputBook(dataFile))
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



    componentDidMount = async () => {

        await this.props.dispatch(getBooks())
        console.log(this.props.token)
    }

    render() {
        console.log(this.props.role_id)
        return (

            <div>


                <Header showLogin={this.showFormLogin} />
                <Container>
                    <Search />
                    <div>
                        <div className="button-modal">
                            {(parseInt(this.props.role_id) === 2) ? <Button onClick={this.toggle}>{this.props.buttonLabel}ADD</Button> : <div></div>}
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className="{this.props.className} modal-lg">
                            <Form onSubmit={this.prosesInput}>
                                <ModalHeader toggle={this.toggle}><b>Add Data</b></ModalHeader>
                                <ModalBody>
                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={3} size="lg">Image</Label>
                                        <Col sm={9}>
                                            <Input type="file" name="file" id="file" placeholder="Url Image.." bsSize="lg" onChange={this.onChangeFile} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="name" sm={3} size="lg">Nama Buku</Label>
                                        <Col sm={9}>
                                            <Input type="text" name="name" id="name" placeholder="name" bsSize="lg" value={this.state.name} onChange={this.handlerChange} />
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
                        {(this.props.id_user === null) ? <FormLogin hideLogin={this.hideFormLogin} showLogin={this.showFormLogin} formLogin={this.state.formLogin} /> : <div></div>}
                        {/* // {this.state.formLogin ? <FormLogin hidelogin={this.hideFormLogin} /> : <a href="" onClick={this.showFormLogin}><i class="fas fa-angle-double-left"></i></a>} */}

                    </div>

                    {/* <Buttonmodal /> */}


                    <Listbuku />

                    <Paging />

                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

        jumlahbuku: state.books.jumlahbuku,
        bookshow: state.books.bookshow,
        token: state.users.token,
        id_user: state.users.id_user,
        role_id: state.users.role_id
    }

}

export default connect(mapStateToProps)(Books);
