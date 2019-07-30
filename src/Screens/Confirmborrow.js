import React, { Component } from 'react'
import Header from '../Component/Header'
import ListLeft from '../Component/ListLeft'
import Api from '../axios/Api'




class Confirmborrow extends Component {
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
            if (item.information == "SELESAI") {
                return (
                    < tr key={item.id_loanbook}>
                        <th scope="col">{no++}</th>
                        <th scope="col">{item.card_number}</th>
                        <th scope="col">{item.name}</th>
                        <th scope="col">{item.title}</th>
                        <th scope="col">{item.writer}</th>
                        <th scope="col">{aturTanggal(item.expired_date)}</th>
                        <th scope="col"><img src={item.image} alt={item.title} width="70px" /></th>
                        <th scope="col">{item.forfeit}</th>
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
                                <h5 class="card-header">Riwayat</h5>
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

                </div>
            </div >
        )

    }


}

export default Confirmborrow