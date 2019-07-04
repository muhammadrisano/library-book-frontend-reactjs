import React, { Component } from 'react';
import { Jumbotron, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input } from 'reactstrap';
import './style.css';
import Data from '../Database/Datadummy';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

class Detailbuku extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            id_params: props.match.params.idbook,
            modal: false,
            redirect: false,
            id: '',
            title: '',
            url: '',
            description: '',
            created_at: '',
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
        let dataBook = Data[this.state.id_params];
        this.setState({
            id: dataBook.id,
            title: dataBook.title,
            url: dataBook.url,
            description: dataBook.description,
            created_at: dataBook.created_at,
            updated_at: dataBook.updated_at
        })


    }
    deleteBook() {

        swal({
            title: "Delete !",
            text: "Deleted Success !!",
            icon: "success",
            button: "oke"

        });

        this.state.redirect = true;

    }

    changeUrl = (event) => {
        this.setState({ url: event.target.value })
    }
    changeTitle = (event) => {
        this.setState({ title: event.target.value })

    }
    changeDescription = (event) => {
        this.setState({ description: event.target.value })
    }

    updateFinish = (e) => {
        e.preventDefault();
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
            id: 10,
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
    render() {

        return (
            <div>

                <Jumbotron className="p-0 header-book">
                    <div className="button-detail">
                        <a href="#" onClick={this.toggle}><h3>Edit</h3></a>    <Link to={'/books/?delete=' + this.state.id_params} onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteBook() }}><h3>Delete</h3></Link>
                    </div>
                    <div className="header-book">
                        <img src={this.state.url} width="100%" alt="" />
                    </div>

                </Jumbotron>
                <div className="book-child">
                    <img src={this.state.url} alt="" width="150px" className="img-thumbnail" />
                </div>
                <Container className="body-detailbook">
                    <h2>{this.state.title}</h2>
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
                                    <Label for="exampleEmail" sm={3} size="lg">Url</Label>
                                    <Col sm={9}>
                                        <Input type="text" name="urlImage" id="ulrImage" placeholder="Url Image.." bsSize="lg" value={this.state.url} onChange={this.changeUrl} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="title" sm={3} size="lg">Title</Label>
                                    <Col sm={9}>
                                        <Input type="text" name="title" id="title" bsSize="lg" value={this.state.title} onChange={this.changeTitle} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleEmail" sm={3} size="lg">Description</Label>
                                    <Col sm={9}>

                                        <Input type="textarea" name="text" id="exampleText" value={this.state.description} onChange={this.changeDescription} />
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

export default Detailbuku