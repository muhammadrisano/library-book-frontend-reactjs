import React from 'react';
import {

    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink

} from 'reactstrap';


export default class H extends React.Component {

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md" className="headernav fixed-top">
                    <NavbarBrand href="/books" className="font-weight-bold brand">BOOKS</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/Transaksi"><h4 className="mr-5">Transaksi Buku</h4></NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}