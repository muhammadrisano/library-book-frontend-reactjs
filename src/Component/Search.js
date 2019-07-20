import React, { Component } from 'react';
import { Form, Input, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import Api from '../axios/Api'
class Search extends Component {


    searchBook = async (e) => {

        await Api.get('books?search=' + e.target.value)
            .then(response =>
                this.props.searchBook(response.data.result)
            )
            .catch(response =>
                this.props.searchBook([])
            )
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
const mapDispatchToProps = (dispatch) => {
    return {
        searchBook: (data) => dispatch({ type: "SEARCH_BOOK", search: data })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)