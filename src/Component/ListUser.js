import React from 'react'
import { Link } from 'react-router-dom'

let ListUser = () => {

    return (
        <div>
            <ul class="list-group">
                <li class="list-group-item body-foto">
                    <div className="border-foto">
                        heloo
                                </div>
                    <hr />

                    <h6 className="txt-bold">Muhammad Risano Akbar</h6>
                    <h6>12324324123123123</h6>

                </li>
                <li class="list-group-item bg-dark text-white"><b>Menu</b></li>
                <Link to="/user/borrow" type="button" class="list-group-item list-group-item-action">Borrow Book</Link>
                <Link to="/user/historyborrow" class="list-group-item list-group-item-action">History Book</Link>
                <Link to="" class="list-group-item list-group-item-action">Edit Profile</Link>
                <li class="list-group-item"><br /><br /><br /><br /><br /><br /><br /><br /><br /></li>
            </ul>
        </div>
    )
}

export default ListUser