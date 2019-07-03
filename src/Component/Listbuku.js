import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, Row, Col, CardTitle } from 'reactstrap';
export default class Listbuku extends Component {

    render() {
        return (
            <Row>
                <Col md={{ size: 10, offset: 1 }}>
                    <Row>
                        {this.props.data.map((item, index) =>

                            <Col md={3} className="p-4">

                                <Card key={index} className="cardbuku">
                                    <a href="http://">
                                        <CardImg top width="100%" src={item.url} alt="Card image cap" className="cardimg" />
                                    </a>
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