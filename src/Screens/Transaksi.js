import React, { Component } from 'react'
import Header from '../Component/Header'
import ListLeft from '../Component/ListLeft'
import Api from '../axios/Api'
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom'



class Transaksi extends Component {
    constructor() {
        super()
        this.state = {
            transaksiBuku: [],
            id_loanbook: '',
            id_book: '',
            image: '',
            title: '',
            writer: '',
            name: '',
            card_number: '',
            phone: '',
            expired_date: '',
            terlambat: 0,
            denda: 0,
            modal: false

        }
    }
    updatePengembalian = async (e) => {

        console.log("hello");
        await Api.patch('loanbooks/' + this.state.id_loanbook, {
            card_number: this.state.card_number,
            id_book: this.state.id_book,
            expired_date: this.state.expired_date,
            forfeit: this.state.denda,
            information: "SELESAI"
        })
            .then((response) => {
                swal({
                    title: "Pengembalian!",
                    text: "Pengembalian Success !!",
                    icon: "success",
                    button: "oke"
                })

            })
            .catch(
                swal({
                    title: "Pengembalian",
                    text: "Pengembalian!",
                    icon: "warning",
                    buttons: "oke",
                })
            )

    }




    prosesPengembalian = (id_loanbook) => {

        let pilihTransaksi = this.state.transaksiBuku.find((item) => {
            return item.id_loanbook == id_loanbook
        })
        let tgl = new Date()
        var hitung = 0
        var hariTerlambat = 0
        let tanggal = tgl.getDate();
        let bulan = tgl.getMonth() + 1;
        let tahun = tgl.getFullYear();
        let expired = pilihTransaksi.expired_date.split('-')

        if (parseInt(bulan) > parseInt(expired[1])) {
            hitung += (parseInt(bulan) - parseInt(expired[1])) * 5000 * 30
            hariTerlambat += (parseInt(bulan) - parseInt(expired[1])) * 30
            hariTerlambat += parseInt(expired[2])
        } else if (parseInt(bulan) == parseInt(expired[1]) && parseInt(tanggal) > parseInt(expired[2])) {
            hitung += (parseInt(tanggal) - parseInt(expired[2])) * 5000
            hariTerlambat += parseInt(tanggal) - parseInt(expired[2])
        }
        console.log(expired);
        console.log(parseInt(hariTerlambat));
        this.setState({
            id_loanbook: pilihTransaksi.id_loanbook,
            image: pilihTransaksi.image,
            title: pilihTransaksi.title,
            id_book: pilihTransaksi.id_book,
            writer: pilihTransaksi.writer,
            card_number: pilihTransaksi.card_number,
            name: pilihTransaksi.name,
            phone: pilihTransaksi.phone,
            expired_date: pilihTransaksi.expired_date,
            denda: hitung,
            terlambat: hariTerlambat
        })
        console.log(this.state.id_loanbook)
    }

    hitungDenda = () => {
        let tgl = new Date()
        var hitung = 0
        var hariTerlambat = 0
        let tanggal = tgl.getDate();
        let bulan = tgl.getMonth();
        let tahun = tgl.getFullYear();
        let expired = this.state.expired_date.split('-')
        console.log(expired)
        if (parseInt(bulan) > parseInt(expired[1])) {
            hitung += (parseInt(expired[1]) - parseInt(bulan)) * 5000 * 30
            hariTerlambat += (parseInt(expired[1]) - parseInt(bulan)) * 30
        }
        if (parseInt(tanggal) > parseInt(expired[2])) {
            hitung += (parseInt(expired[2]) - parseInt(tanggal)) * 5000
            hariTerlambat += parseInt(expired[2]) - parseInt(tanggal)
        }

        this.setState({
            denda: hitung,
            terlambat: hariTerlambat
        })

        return hitung
    }
    componentDidMount() {
        Api.get("loanbooks")
            .then((response) => {

                this.setState({
                    transaksiBuku: response.data.result
                })
            })
    }

    render() {
        console.log(this.state.transaksiBuku)
        let tgl_sekarang = new Date()
        let aturTanggal = (tgl) => {
            let tglarr = tgl.split('-')
            tglarr.reverse()
            return tglarr.join('-')

        }
        let no = 1;
        const tampilkanBuku = this.state.transaksiBuku.map((item) => {
            if (item.information == "DIPINJAM") {
                return (
                    < tr key={item.id_loanbook}>
                        <td scope="col">{no++}</td>
                        <td scope="col">{item.card_number}</td>
                        <td scope="col">{item.name}</td>
                        <td scope="col">{item.title}</td>
                        <td scope="col">{item.writer}</td>
                        <td scope="col">{aturTanggal(item.expired_date)}</td>
                        <td scope="col"><img src={item.image} alt={item.title} width="70px" /></td>
                        <td scope="col"><button className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={() => this.prosesPengembalian(item.id_loanbook)}>Proses</button></td>
                    </tr>
                )
            }

        })



        // }
        return (

            <div>

                <div>
                    <Header />
                    <div className="row head-loan">
                        <div className="col-3">
                            <ListLeft />
                        </div>
                        <div className="col-9 body-loan">
                            <div class="card">
                                <h5 class="card-header">Transaksi</h5>
                                <div class="card-body">
                                    <h4 className="text-center">Daftar Transaksi Peminjaman</h4>
                                    <br />
                                    <table class="table">
                                        <caption>List of users</caption>
                                        <thead>
                                            <tr>
                                                <th scope="col">No</th>
                                                <th scope="col">No Card</th>
                                                <th scope="col">Nama</th>
                                                <th scope="col">Judul Buku</th>
                                                <th scope="col">Penulis</th>
                                                <th scope="col">Tanggal Pengembalian</th>
                                                <th scope="col">Cover</th>
                                                <th scope="col">Pengembalian</th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tampilkanBuku}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Modal Pengembalian */}

                    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">

                                    <div className="row">
                                        <div className="col-4">
                                            <img src={this.state.image} width="250px" alt="" />
                                        </div>
                                        <div className="col-8" >
                                            <div className="row">
                                                <div className="col-5">
                                                    Judul Buku
                                                </div>

                                                <div className="col-7">
                                                    {this.state.title}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-5">
                                                    Penulis
                                                </div>
                                                <div className="col-7">
                                                    {this.state.writer}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-5">
                                                    Nama Peminjam
                                                </div>

                                                <div className="col-7">
                                                    {this.state.name}

                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-5">
                                                    No HP
                                                </div>

                                                <div className="col-7">
                                                    {this.state.phone}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-5">
                                                    Tanggal Pengembalian
                                                </div>
                                                <div className="col-7">
                                                    {this.state.expired_date}
                                                </div>
                                            </div>
                                            <hr />
                                            <br />
                                            <h5>Denda/Hari :Rp. 5.000</h5>
                                            <h5>Terlambat : {this.state.terlambat} Hari</h5>
                                            <h5>Denda : Rp. {this.state.denda}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <a href="/transaksi" class="btn btn-primary" onClick={this.updatePengembalian} data-dismiss="modal">Proses Pengembalian</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Modal Pengembalian */}

                </div>
            </div >
        )

    }


}

export default Transaksi