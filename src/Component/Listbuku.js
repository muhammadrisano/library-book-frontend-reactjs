import React, { Component } from 'react';
import { Card, CardImg, CardBody, Row, Col, CardTitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { connect } from 'react-redux';

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

    componentDidMount() {
        this.setState({
            books: this.props.books
        })

    }



    render() {

        let buku = this.props.books.map((item, index) => {
            return (

                <Col md={3} className="p-4">

                    <Card key={item.id_book} className="cardbuku">
                        <Button close className="btn-close" />
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