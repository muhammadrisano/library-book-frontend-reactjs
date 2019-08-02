import React, { Component } from 'react';
import Header from '../Component/Header';
import Api from '../axios/Api';
import '../assets/css/user.css';
import ListUser from '../Component/ListUser';
import moment from 'moment';
import { connect } from 'react-redux'
import { borrowBookUser } from '../redux/actions/loanbooks'

class Userborrow extends Component {

    constructor() {
        super();
        this.state = {
            bookBorrow: [],
            cariBuku: [],
            id_book: "",
            nama_buku: "",
            writer: "",
            tglSkarang: ""
        }
    }

    cariBuku = async (e) => {
        await Api.get("books?search=" + e.target.value)
            .then((response) => {
                this.setState({
                    cariBuku: response.data.result,
                    tgl: new Date(),
                    tgl_pengembalian: ""
                })
            })
            .catch(
                this.setState({
                    cariBuku: []
                })
            )
    }

    pilihBuku = (id_book) => {
        let bukuPilih = this.state.cariBuku.find((item) => {
            return item.id_book == id_book
        })

        this.setState({
            id_book: bukuPilih.id_book,
            nama_buku: bukuPilih.name,
            writer: bukuPilih.writer,
        })

    }

    componentWillMount() {
        let tglSkarang = moment().add(10, 'days').calendar().split("/").reverse().join("-")
        this.setState({
            tglSkarang: tglSkarang
        })
    }
    async componentDidMount() {
        console.log(this.props.card_number)
        this.props.dispatch(borrowBookUser(this.props.card_number, {
            "authorization": "jangan-coba-coba",
            "x-access-token": "bearer " + this.props.token,
            "x-control-user": this.props.id_user
        }))
            .then((response) => {

                let bookShow = []
                let buku = response.action.payload.data.result.map((item) => {
                    if (item.information != "SELESAI") {
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
        let no = 1
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
                                Borrow Book
                            </div>

                            <div class="card-body">

                                <div className="form-group row">
                                    <label for="inputEmail3" class="col-sm-3 col-form-label">ID Buku</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="id_book" name="id_book" value={this.state.id_book} placeholder="ID Buku" />
                                    </div>
                                    <button className="btn btn-danger" data-toggle="modal" data-target=".bd-caribuku-modal-lg">Cari</button>

                                </div>
                                <div className="form-group row">
                                    <label for="nama_buku" class="col-sm-3 col-form-label">Nama Buku</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="nama_buku" name="nama_buku" value={this.state.nama_buku} placeholder="Nama Buku" disabled />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="nama_buku" class="col-sm-3 col-form-label">Pengarang</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="pengarang" name="pengarang" value={this.state.writer} placeholder="Pengarang" disabled />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="inputtext3" class="col-sm-3 col-form-label" >Tanggal Pengembalian</label>
                                    <div class="col-sm-8">
                                        <input type="date" class="form-control" id="tanggal" name="tanggal" onChange={this.handlerCange} value={this.state.tglSkarang} disabled />

                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-3"></div><div className="col-sm-8"><button type="submit" className="btn btn-primary" onClick={() => this.pinjamBuku()}>Pinjam Buku</button> <button type="submit" className="btn btn-warning">Batal</button></div>
                                </div>
                                <hr />
                                <h5>Daftar Peminjaman Buku Anda</h5>
                                <div className="show-borrow-book">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">No</th>
                                                <th scope="col">Judul Buku</th>
                                                <th scope="col">Penulis</th>
                                                <th scope="col">Tgl Kembali</th>
                                                <th scope="col">Cover</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.bookBorrow.map((item, index) =>
                                                < tr >
                                                    <th scope="row">{no++}</th>
                                                    <td>{item.title}</td>
                                                    <td>{item.writer}</td>
                                                    <td>{item.expired_date}</td>
                                                    <td><img src={item.image} alt={index} width="80px" /></td>
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

                {/* modal cari buku */}
                <div class="modal fade bd-caribuku-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="cariBukulLabel">Cari Buku</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">

                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label">Cari Buku</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="caripeminjam" name="caribuku" placeholder="Cari.." onChange={this.cariBuku} />
                                    </div>
                                </div>
                                <div className="kotak-pencarian">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID Buku</th>
                                                <th scope="col">Judul</th>
                                                <th scope="col">Pengarang</th>
                                                <th scope="col">Cover</th>
                                                <th scope="col">Aksi</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.cariBuku.map((item, index) =>
                                                <tr>
                                                    <td>{item.id_book}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.writer}</td>
                                                    <td><img src={item.image} width="100px" /></td>
                                                    <td><button className="btn btn-success" onClick={() => this.pilihBuku(item.id_book)} data-dismiss="modal">Pilih</button></td>
                                                </tr>

                                            )}

                                        </tbody>

                                    </table>
                                </div>


                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                            </div>
                        </div>
                    </div>
                </div>

                {/* end modal cari buku */}

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {

        token: state.users.token,
        card_number: state.users.card_number,
        id_user: state.users.id_user
    }

}

export default connect(mapStateToProps)(Userborrow);
