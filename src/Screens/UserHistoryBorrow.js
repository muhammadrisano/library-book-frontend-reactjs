import React, { Component } from 'react';
import Header from '../Component/Header';
import Api from '../axios/Api';
import '../assets/css/user.css';
import ListUser from '../Component/ListUser';
import moment from 'moment';

class UserHistoryBorrow extends Component {

    constructor() {
        super();
        this.state = {
            bookBorrow: [],

        }
    }

    async componentDidMount() {
        await Api.get('loanbooks/cardnumber/12341234')
            .then((response) => {
                let bookShow = []
                let buku = response.data.result.map((item) => {
                    if (item.information === "SELESAI") {
                        return bookShow.push(item)
                    }
                })
                console.log(bookShow)
                this.setState({
                    bookBorrow: bookShow
                })
            })
    }
    render() {
        let noUrut = 1;
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="col-md-3">
                        <ListUser />
                    </div>
                    <div className="col-md-9">
                        <div class="card">
                            <div class="card-header">
                                History Borrow
                            </div>
                            <br />
                            <h4 className="text-center">Histori Peminjaman Buku</h4>
                            <div class="card-body">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Judul Buku</th>
                                            <th scope="col">Penulis</th>
                                            <th scope="col">Tanggal Pengembalian</th>
                                            <th scope="col">Kover</th>
                                            <th scope="col">Denda</th>
                                            <th scope="col">status</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.state.bookBorrow.map((item) =>
                                            <tr>
                                                <th scope="row">{noUrut++}</th>
                                                <td>{item.title}</td>
                                                <td>{item.writer}</td>
                                                <td>{item.expired_date}</td>
                                                <td><img src={item.image} alt="" width="80px" /></td>
                                                <td>{item.forfeit}</td>
                                                <td>{item.information}</td>
                                            </tr>
                                        )}



                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default UserHistoryBorrow;