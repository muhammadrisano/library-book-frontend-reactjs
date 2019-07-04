import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, Row, Col, CardTitle, Button } from 'reactstrap';
import { BrowserRouter, Link } from 'react-router-dom'
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

    render() {

        return (
            <Row>
                <Col md={{ size: 10, offset: 1 }}>
                    <Row>
                        {this.props.data.map((item, index) =>

                            <Col md={3} className="p-4">

                                <Card key={index} className="cardbuku">
                                    <Button close className="btn-close" />
                                    <Link to={'/books/' + item.id}>
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