import React, { Component } from 'react';
import { Jumbotron, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input } from 'reactstrap';
import { BrowserRouter, Redirect } from 'react-router-dom';
import './style.css';
import Data from '../Helpers/Datadummy'
class Detailbuku extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            id: props.match.params.idbook,
            modal: false,
            redirect: false

        }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    componentWillMount() {
        Data.forEach(element => {
            if (element.id == this.state.id) {
                this.setState({ data: element })
            }
        });
    }
    deleteBook() {
        alert('item Deleted Success !!')

        this.state.redirect = true;
    }

    render() {
        console.log(this.state.data)
        return (
            <div>
                <Jumbotron className="p-0 header-book">
                    <div className="button-detail">
                        <a href="#" onClick={this.toggle}><h3>Edit</h3></a><a href="#" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteBook() }}><h3>Delete</h3></a>
                    </div>
                    <div className="header-book">
                        <img src={this.state.data.url} width="100%" alt="" />
                    </div>

                </Jumbotron>
                <div className="book-child">
                    <img src={this.state.data.url} alt="" width="150px" className="img-thumbnail" />
                </div>
                <Container className="body-detailbook">
                    <h2>{this.state.data.title}</h2>
                    <p>
                        {this.state.data.description}
                    </p>
                </Container>

                {/* modal */}
                <div>

                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup row>
                                    <Label for="exampleEmail" sm={3} size="lg">Url</Label>
                                    <Col sm={9}>
                                        <Input type="text" name="urlImage" id="ulrImage" placeholder="Url Image.." bsSize="lg" value={this.state.data.url} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="title" sm={3} size="lg">Title</Label>
                                    <Col sm={9}>
                                        <Input type="text" name="title" id="title" bsSize="lg" value={this.state.data.title} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleEmail" sm={3} size="lg">Description</Label>
                                    <Col sm={9}>

                                        <Input type="textarea" name="text" id="exampleText" value={this.state.data.description} />
                                    </Col>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Edit Book</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div >
        )
    }
}

export default Detailbuku