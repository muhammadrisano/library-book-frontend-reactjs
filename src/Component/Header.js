import React from 'react';
import {

    Navbar,
    NavbarToggler,
    NavbarBrand,

} from 'reactstrap';


export default class H extends React.Component {

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md" className="headernav fixed-top">
                    <NavbarBrand href="/books" className="font-weight-bold brand">BOOKS</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                </Navbar>
            </div>
        );
    }
}