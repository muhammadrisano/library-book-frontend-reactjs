import React, { Component } from 'react';
import Header from '../Component/Header'
import {
    ButtonToolbar,
    Button,
    Container, Col, Input, FormGroup, Label, Modal, ModalHeader, ModalBody, Form, ModalFooter
} from 'reactstrap';
import Search from '../Component/Search';

import Listbuku from '../Component/Listbuku';
import Data from '../Database/Datadummy'
import swal from 'sweetalert';
import queryString from 'query-string';
import { connect } from 'react-redux'
import axios from 'axios'


class Books extends Component {

    constructor() {
        super()
        this.state = {
            data: Data,
            modal: false,
            inputUrl: '',
            inputTitle: '',
            inputDescription: '',
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
    prosesInput = (event) => {
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
        swal({
            title: "Insert!",
            text: "Insert Success !!",
            icon: "success",
            button: "oke"

        })
    }
    changeUrl = (event) => {
        this.setState({ inputUrl: event.target.value })


    }
    changeTitle = (event) => {
        this.setState({ inputTitle: event.target.value })

    }
    changeDescription = (event) => {
        this.setState({ inputDescription: event.target.value })


    }

    async componentDidMount() {

        await axios.get('http://localhost:4000/books')
            .then(response =>
                //     this.setState({
                //         test: response.data.result
                //     })

                this.props.getBooks(response.data.result)
                // console.log(response.data.result)
                // response.data.result.map((dat, index) => {
                //     return (
                //         console.log(dat)
                //     )
                // })
            )

        // this.setState({
        //     books: this.props.books
        // })

        // const query = queryString.parse(this.props.location.search);
        // if (query.delete) {
        //     let dataBook = this.state.data;
        //     dataBook.splice(query.delete, 1);
        //     console.log(dataBook);
        //     this.setState({
        //         data: dataBook
        //     })
        // }

    }

    render() {
        let tes = this.props.books.map((data) => {
            console.log(data);
        })
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
                                            <Input type="text" name="urlImage" id="ulrImage" placeholder="Url Image.." bsSize="lg" value={this.state.inputUrl} onChange={this.changeUrl} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={3} size="lg">Title</Label>
                                        <Col sm={9}>
                                            <Input type="text" name="title" id="title" placeholder="Title..." bsSize="lg" value={this.state.inputTitle} onChange={this.changeTitle} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={3} size="lg">Description</Label>
                                        <Col sm={9}>

                                            <Input type="textarea" name="text" id="exampleText" placeholder="Desciption..." value={this.state.inputDescription} onChange={this.changeDescription} />
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
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books
    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        getBooks: (data) => dispatch({ type: "GET_ALL", dataBook: data })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Books);
