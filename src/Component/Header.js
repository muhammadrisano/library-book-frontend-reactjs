import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import '../assets/css/header.css'
import {

    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink

} from 'reactstrap';
import { relative } from 'path';


class Header extends Component {

    logout = (e) => {
        sessionStorage.removeItem("role_id")
        sessionStorage.removeItem("card_number")
        sessionStorage.removeItem("id_user")
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("photo")
        sessionStorage.removeItem("fullname")
        window.location.reload();

    }
    showFormLogin = (e) => {
        e.preventDefault()
        return this.props.showLogin()
    }
    render() {
        console.log(this.props.role_id)
        return (
            <div>

                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a class="navbar-brand" href="http://localhost:3000/books">Risano Library Books</a>

                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>


                        <div class="collapse navbar-collapse" id="navbarSupportedContent">

                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Pengetahuan <span class="sr-only">(current)</span></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Komputer</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Agama</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Kedokteran</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Majalah</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Sosial</a>
                                </li>
                                {(parseInt(this.props.role_id) === 3) ?
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <div className="photo-header">
                                                <img src={this.props.photo} style={{ position: "absolute", top: " -3px", left: "-5px" }} width="60px" alt="buku" />
                                            </div>
                                        </a>
                                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <Link to="/user/borrow" class="dropdown-item" >Borrow</Link>
                                            <Link to="/user/historyborrow" class="dropdown-item">History Borrow</Link>
                                            <Link to="/user/editprofile" class="dropdown-item">Edit Profile</Link>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#" onClick={this.logout}>Logout</a>
                                        </div>
                                    </li>
                                    : <li class="nav-item">
                                        <a class="nav-link" href="#" onClick={this.showFormLogin}>Sign In</a>
                                    </li>}

                                {(parseInt(this.props.role_id) === 2) ?
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                            <div className="photo-header">
                                                <img src={this.props.photo} style={{ position: "absolute", top: " -3px", left: "-5px" }} width="60px" alt="buku" />
                                            </div>
                                        </a>
                                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <Link to="/librarian/peminjaman" class="dropdown-item" >borrowing</Link>
                                            <Link to="/librarian/transaksi" class="dropdown-item">loan history</Link>
                                            <Link to="/librarian/riwayat" class="dropdown-item">loan history</Link>
                                            <Link to="/librarian/register" class="dropdown-item">Register User</Link>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#" onClick={this.logout}>Logout</a>
                                        </div>
                                    </li>
                                    : <li class="nav-item">
                                    </li>}

                            </ul>
                        </div>

                    </div>
                </nav>

                {/* <Navbar color="light" light expand="md" className="headernav fixed-top">
                    <NavbarBrand href="/books" className="font-weight-bold brand">BOOKS</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/Transaksi"><h4 className="mr-5">Transaksi Buku</h4></NavLink>
                        </NavItem>
                    </Nav>
                </Navbar> */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

        jumlahbuku: state.books.jumlahbuku,
        bookshow: state.books.bookshow,
        token: state.users.token,
        id_user: state.users.id_user,
        role_id: state.users.role_id,
        photo: state.users.photo
    }

}

export default connect(mapStateToProps)(Header);
