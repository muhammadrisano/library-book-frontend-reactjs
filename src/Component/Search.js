import React, { Component } from 'react';
import { Form, Input, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
class Search extends Component {
    render() {
        return (
            <div className="menusearch">
                <Form>
                    <Row>
                        <Col sm={12} md={{ size: 8, offset: 2 }}>
                            <Input type="text" name="search" id="search" placeholder="Search Book" />
                        </Col>
                    </Row>
                </Form>

            </div>
        )
    }
}

export default connect(Search)