import React, { Component } from 'react';
import { async } from 'q';
import axios from 'axios';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import ReactDOM from "react-dom";


class Paging extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
        };
    }


    handlePageChange = async (pageNumber) => {
        await axios.get("http://localhost:4000/books?page=" + pageNumber)
            .then((response) => {
                this.props.pageList(response.data)
                this.setState({ activePage: pageNumber })
            }
            )

    }
    render() {


        return (
            <div className="pagination-head">
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={12}
                    totalItemsCount={this.props.jumlahbuku}
                    pageRangeDisplayed={5}
                    itemClass="page-item"
                    linkClass="page-link"
                    onChange={this.handlePageChange.bind(this)}
                />

            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        books: state.books,
        jumlahbuku: state.jumlahbuku
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        pageList: (data) => dispatch({ type: "PAGE_LIST", dataPage: data })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Paging)