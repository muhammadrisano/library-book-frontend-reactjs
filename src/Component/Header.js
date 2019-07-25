import React, { Component } from 'react';
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

    render() {
        return (
            <div>

                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a class="navbar-brand" href="#">Risano Library Books</a>

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

                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img src="https://img.icons8.com/bubbles/2x/user.png" style={{ position: "absolute", top: " -8px", left: "-5px" }} width="60px" alt="buku" />
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="#">Borrow</a>
                                        <a class="dropdown-item" href="#">Confirm Borrow</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#">Logout</a>
                                    </div>
                                </li>

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

export default Header;