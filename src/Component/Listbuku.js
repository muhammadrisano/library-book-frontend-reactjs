import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, Row, Col, CardTitle, Button } from 'reactstrap';
import { BrowserRouter, Link } from 'react-router-dom';
import swal from 'sweetalert';
export default class Listbuku extends Component {
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
    deleteBook() {

        swal({
            title: "Delete !",
            text: "Deleted Success !!",
            icon: "success",
            button: "oke"

        });

        this.state.redirect = true;

    }


    render() {
        console.log(this.props);
        return (
            <Row>
                <Col md={{ size: 10, offset: 1 }}>
                    <Row>
                        {this.props.data.map((item, index) =>

                            <Col md={3} className="p-4">

                                <Card key={index} className="cardbuku">
                                    <Button close className="btn-close" />
                                    <Link to={'/books/' + index}>
                                        <CardImg top width="100%" src={item.url} alt="Card image cap" className="cardimg" />
                                    </Link>
                                    <CardBody>
                                        <CardTitle>{item.title}</CardTitle>
                                    </CardBody>
                                </Card>
                            </Col>
                        )}

                    </Row>
                </Col >
            </Row >




        )
    }
}