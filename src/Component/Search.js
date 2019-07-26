import React, { Component } from 'react';
import { Form, Input, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { searchBook } from '../redux/actions/books';
import Api from '../axios/Api'
class Search extends Component {


    searchBook = async (e) => {

        this.props.dispatch(searchBook(e.target.value))
    }
    render() {
        return (
            <div className="menusearch">
                <Form>
                    <Row>
                        <Col sm={12} md={{ size: 8, offset: 2 }}>
                            <Input type="text" name="search" id="search" placeholder="Search Book" onChange={this.searchBook} />
                        </Col>
                    </Row>
                </Form>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books
    }
}


export default connect(mapStateToProps)(Search)