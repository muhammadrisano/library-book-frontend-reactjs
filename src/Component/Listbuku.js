import React, { Component } from 'react';
import { Card, CardImg, CardBody, Row, Col, CardTitle, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { async } from 'q';
import Axios from 'axios';
import Api from '../axios/Api';

class Listbuku extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    // deleteBook() {

    //     swal({
    //         title: "Delete !",
    //         text: "Deleted Success !!",
    //         icon: "success",
    //         button: "oke"

    //     });

    //     this.state.redirect = true;

    // }

    hapusBook = async (item) => {
        await Api.delete("http://localhost:4000/books/" + item)
            .then((response) => {
                swal({
                    title: "Delete !",
                    text: "Deleted Success !!",
                    icon: "success",
                    button: "oke"
                });

            })
        // < Redirect to = '/sdf' />
        this.props.history.push('/')
    }

    componentDidMount() {
        this.setState({
            books: this.props.books
        })

    }



    render() {
        let lihatKondisi = () => {
            if (this.props.books.length < 1) {
                return (

                    <h1 style={{ margin: '0 auto' }}>404 Bro..!!</h1>

                )
            }

        }
        let buku = this.props.books.map((item, index) => {
            return (

                <Col md={3} className="p-4">

                    <Card key={item.id_book} className="cardbuku">
                        <Button close className="btn-close" onClick={() => this.hapusBook(item.id_book)} />
                        <Link to={'/books/' + item.id_book}>
                            <CardImg top width="100%" src={item.image} alt="Card image cap" className="cardimg" />
                        </Link>
                        <CardBody className="text-center">
                            <CardTitle>{item.name}</CardTitle>
                        </CardBody>
                    </Card>
                </Col>
            )
        })




        return (
            <Row>
                <Col md={{ size: 10, offset: 1 }}>
                    <Row>
                        {buku}
                        {lihatKondisi()}
                    </Row>
                </Col >
            </Row >




        )
    }
}
const mapStateToProps = (state) => {
    return {
        books: state.books,
        jumlah: state.jumlah
    }
}

export default connect(mapStateToProps)(Listbuku)