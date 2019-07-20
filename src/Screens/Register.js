import React, { Component } from 'react'
import Header from '../Component/Header'
import ListLeft from '../Component/ListLeft'
import Api from '../axios/Api'
import swal from 'sweetalert';



class Register extends Component {
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
                        <td scope="col">{no++}</td>
                        <td scope="col">{item.card_number}</td>
                        <td scope="col">{item.name}</td>
                        <td scope="col">{item.title}</td>
                        <td scope="col">{item.writer}</td>
                        <td scope="col">{aturTanggal(item.expired_date)}</td>
                        <td scope="col"><img src={item.image} alt={item.title} width="70px" /></td>
                        <td scope="col">{item.forfeit}</td>
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
                                <h5 class="card-header">Register Peminjam</h5>
                                <div class="card-body">
                                    <div className="form-group row">
                                        <label for="inputEmail3" class="col-sm-3 col-form-label">Nomor Identitas</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" id="card_number" name="card_number" value={this.state.card_number} placeholder="Nomor Identitas" />
                                        </div>

                                    </div>
                                    <div className="form-group row">
                                        <label for="inputEmail3" class="col-sm-3 col-form-label">Nama Peminjam</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" id="nama_peminjam" name="nama_peminjam" value="" placeholder="Nama Peminjamm" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="inputEmail3" class="col-sm-3 col-form-label">Alamat Peminjam</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" id="alamat_peminjam" name="alamat_peminjam" value="" placeholder="Alamat Peminjam" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="inputEmail3" class="col-sm-3 col-form-label">No HP</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" id="phone" name="phone" value="" placeholder="No HP" />
                                        </div>


                                    </div>
                                    <div className="form-group row">
                                        <label for="nama_buku" class="col-sm-3 col-form-label">Pekerjaan</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" id="job" name="job" value="" placeholder="Pekerjaan" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-sm-3"></div><div className="col-sm-8"><button type="submit" className="btn btn-primary" onClick={() => this.pinjamBuku()}>Pinjam Buku</button> <button type="submit" className="btn btn-warning">Batal</button></div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div >
        )

    }


}

export default Register