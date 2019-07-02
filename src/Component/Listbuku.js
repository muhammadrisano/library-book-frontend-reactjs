import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, Row, Col, CardTitle } from 'reactstrap';
export default class Listbuku extends Component {

    render() {
        return (
            <Row>
                <Col md={{ size: 10, offset: 1 }}>
                    <Row>
                        <Col md={3} className="p-4">

                            <Card className="cardbuku">
                                <a href="http://">
                                    <CardImg top width="100%" src="http://localhost/buku/BOOK-COVER-STELLA-768x994.jpg" alt="Card image cap" className="cardimg" />
                                </a>
                                <CardBody>
                                    <CardTitle>Setella Kalisa</CardTitle>

                                </CardBody>
                            </Card>

                        </Col>

                        <Col md={3} className="p-4">

                            <Card className="cardbuku">
                                <CardImg top width="100%" src="http://localhost/buku/tamara.jpg" alt="Card image cap" className="cardimg" />
                                <CardBody>
                                    <CardTitle>Setella Kalisa</CardTitle>
                                </CardBody>
                            </Card>

                        </Col>

                        <Col md={3} className="p-4">

                            <Card className="cardbuku">
                                <CardImg top width="100%" src="http://localhost/buku/felix-cover-11-science.jpg" alt="Card image cap" className="cardimg" />
                                <CardBody>

                                    <CardTitle>Setella Kalisa</CardTitle>
                                </CardBody>
                            </Card>

                        </Col>

                        <Col md={3} className="p-4">

                            <Card className="cardbuku">
                                <CardImg top width="100%" src="http://localhost/buku/vindy-cover-book.jpg" alt="Card image cap" className="cardimg" />
                                <CardBody>
                                    <CardTitle>Setella Kalisa</CardTitle>
                                </CardBody>
                            </Card>

                        </Col>
                    </Row>
                </Col >

            </Row >
        )
    }
}