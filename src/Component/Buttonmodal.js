import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input, FormText } from 'reactstrap';
export default class Buttonmodal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <div>
                <div className="button-modal">
                    <Button onClick={this.toggle}>{this.props.buttonLabel}ADD</Button>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="{this.props.className} modal-lg">
                    <ModalHeader toggle={this.toggle}><b>Add Data</b></ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label for="exampleEmail" sm={3} size="lg">Url Image</Label>
                                <Col sm={9}>
                                    <Input type="text" name="urlImage" id="ulrImage" placeholder="Url Image.." bsSize="lg" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="exampleEmail" sm={3} size="lg">Title</Label>
                                <Col sm={9}>
                                    <Input type="text" name="title" id="title" placeholder="Title..." bsSize="lg" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="exampleEmail" sm={3} size="lg">Description</Label>
                                <Col sm={9}>

                                    <Input type="textarea" name="text" id="exampleText" placeholder="Desciption..." />
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="warning" onClick={this.toggle}><span className="button-add">SAVE</span></Button>{' '}

                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    // render() {
    //     return (
    //         // <div className="button-modal">
    //         //     <Button color="warning" size="lg"><span className="button-add">ADD</span></Button>
    //         // </div>
    //     )
    // }
}