import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class ListUser extends Component {
    render() {


        return (
            <div>
                <ul class="list-group">
                    <li class="list-group-item body-foto">
                        <div className="border-foto">
                            <img src={this.props.photo} width="140px" />
                        </div>
                        <hr />

                        <h6 className="txt-bold">{this.props.fullname}</h6>
                        <h6>{this.props.card_number}</h6>

                    </li>
                    <li class="list-group-item bg-dark text-white"><b>Menu</b></li>
                    <Link to="/user/borrow" type="button" class="list-group-item list-group-item-action">Borrow Book</Link>
                    <Link to="/user/historyborrow" class="list-group-item list-group-item-action">History Book</Link>
                    <Link to="/user/editprofile" class="list-group-item list-group-item-action">Edit Profile</Link>
                    <li class="list-group-item"><br /><br /><br /><br /><br /><br /><br /><br /><br /></li>
                </ul>
            </div >
        )
    }
}
const mapStateToProps = state => {
    return {

        jumlahbuku: state.books.jumlahbuku,
        bookshow: state.books.bookshow,
        token: state.users.token,
        id_user: state.users.id_user,
        role_id: state.users.role_id,
        photo: state.users.photo,
        fullname: state.users.fullname,
        card_number: state.users.card_number
    }

}

export default connect(mapStateToProps)(ListUser);

