import React, { Component } from 'react'
import Header from '../Component/Header'
import ListLeft from '../Component/ListLeft'
import '../assets/css/peminjaman.css'
import axios from 'axios'
import { async } from 'q';
import Api from '../axios/Api'
import swal from 'sweetalert';
import { getUser } from '../redux/actions/users'
import { connect } from 'react-redux'
import { borrowuser } from '../redux/actions/loanbooks'
import moment from 'moment'

class Peminjaman extends Component {
    constructor() {
        super()
        this.state = {
            cariPeminjam: [],
            cariBuku: [],
            id_user: '',
            card_number: '',
            name: '',
            phone: '',
            address: '',
            id_book: '',
            nama_buku: '',
            writer: '',
            tgl: new Date(),
            tgl_pengembalian: '',
        }
    }
    // testtgl = (e) => {
    //     this.setState({
    //         tgl_pengembalian: e.target.value
    //     })

    // }

    pinjamBuku = async () => {
        console.log(this.state)
        this.props.dispatch(borrowuser({
            card_number: this.state.card_number,
            id_book: this.state.id_book,
            expired_date: this.state.tgl_pengembalian,
            forfeit: 0,
            information: 'DIPINJAM',
        }, {
                "authorization": "jangan-coba-coba",
                "x-access-token": "bearer " + this.props.token,
                "x-control-user": this.props.id_user
            }))
            .then((response) => {
                swal({
                    title: "Peminjaman!",
                    text: "Peminjaman Success !!",
                    icon: "success",
                    button: "oke"

                })
                this.setState({
                    id_user: '',
                    card_number: '',
                    name: '',
                    phone: '',
                    address: '',
                    id_book: '',
                    nama_buku: '',
                    writer: '',
                })

            })
            .catch(
                swal({
                    title: "Peminjaman",
                    text: "Peminjaman Failed!",
                    icon: "warning",
                    buttons: "oke",
                })
            )
    }
    componentWillMount() {
        this.setState({
            tgl_pengembalian: moment().add(6, 'days').format('l')
        })

    }
    handlerCange = (e) => {
        this.setState({
            tgl_pengembalian: e.target.value
        })
    }
    cariPeminjam = async (e) => {

        await this.props.dispatch(getUser(e.target.value,
            {
                "authorization": "jangan-coba-coba",
                "x-access-token": "bearer " + this.props.token,
                "x-control-user": this.props.id_user
            }
        ))
            .then((response) => {
                this.setState({
                    cariPeminjam: response.action.payload.data.result
                })
            })
            .catch(
                this.setState({
                    cariPeminjam: []
                })
            )
        // await Api.get("user?search=" + e.target.value)
        //     .then((response) => {
        //         this.setState({
        //             cariPeminjam: response.data.result
        //         })
        //     })
        //     .catch(
        //         this.setState({
        //             cariPeminjam: []
        //         })
        //     )
    }

    cariBuku = async (e) => {
        await Api.get("books?search=" + e.target.value)
            .then((response) => {
                this.setState({
                    cariBuku: response.data.result
                })
            })
            .catch(
                this.setState({
                    cariBuku: []
                })
            )

    }
    pilihPeminjam = (id_user) => {
        // this.state.cariPeminjam.map((item)=>{
        //     return item.id_user == id_user
        // })
        let userPilih = this.state.cariPeminjam.find((item) => {
            return item.id_user == id_user
        })

        this.setState({
            id_user: userPilih.di_user,
            card_number: userPilih.card_number,
            name: userPilih.name,
            phone: userPilih.phone,
            address: userPilih.address
        })

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

    render() {

        return (
            <div>
                <Header />
                <div className="row head-loan">
                    <div className="col-3">
                        <ListLeft />
                    </div>
                    <div className="col-9 body-loan">
                        <div class="card">
                            <h5 class="card-header">Peminjaman</h5>
                            <div class="card-body">
                                <div className="form-group row">
                                    <label for="inputEmail3" class="col-sm-3 col-form-label">Nomor Identitas</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="card_number" name="card_number" value={this.state.card_number} placeholder="Nomor Identitas" />
                                    </div>
                                    <button className="btn btn-danger" data-toggle="modal" data-target=".bd-cari-modal-lg">Cari</button>
                                </div>
                                <div className="form-group row">
                                    <label for="inputEmail3" class="col-sm-3 col-form-label">Nama Peminjam</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="nama_peminjam" name="nama_peminjam" value={this.state.name} placeholder="Nama Peminjamm" disabled />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="inputEmail3" class="col-sm-3 col-form-label">Alamat Peminjam</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="alamat_peminjam" name="alamat_peminjam" value={this.state.address} placeholder="Alamat Peminjam" disabled />
                                    </div>
                                </div>
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
                                        <input type="text" class="form-control" id="tanggal" name="tanggal" value={this.state.tgl_pengembalian} />

                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-3"></div><div className="col-sm-8"><button type="submit" className="btn btn-primary" onClick={() => this.pinjamBuku()}>Pinjam Buku</button> <button type="submit" className="btn btn-warning">Batal</button></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* modal cari peminjam */}
                <div class="modal fade bd-cari-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="cariBukulLabel">Cari Peminjam</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">

                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label">Cari</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="caripeminjam" name="caripeminjam" placeholder="Cari.." onChange={this.cariPeminjam} />
                                    </div>
                                </div>
                                <div className="kotak-pencarian">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>

                                                <th scope="col">No. Identitas</th>
                                                <th scope="col">Nama</th>
                                                <th scope="col">No. HP</th>
                                                <th scope="col">Aksi</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.cariPeminjam.map((item, index) =>
                                                <tr>
                                                    <td>{item.card_number}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.phone}</td>
                                                    <td><button className="btn btn-success" onClick={() => this.pilihPeminjam(item.id_user)} data-dismiss="modal">Pilih</button></td>
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

                {/* end modal cari peminjam */}


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

export default connect(mapStateToProps)(Peminjaman);