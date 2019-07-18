import React, { Component } from 'react'
import Header from '../Component/Header'
import ListLeft from '../Component/ListLeft'
import '../assets/css/peminjaman.css'
class Peminjaman extends Component {

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
                                    <label for="inputEmail3" class="col-sm-4 col-form-label">Nomor Identitas</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="card_number" name="card_number" placeholder="Nomor Identitas" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="inputEmail3" class="col-sm-4 col-form-label">Nama Peminjam</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="nama_peminjam" nanme="nama_peminjam" placeholder="Nama Peminjamm" disabled />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="inputEmail3" class="col-sm-4 col-form-label">Alamat Peminjam</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="alamat_peminjam" name="alamat_peminjam" placeholder="Alamat Peminjam" disabled />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="inputEmail3" class="col-sm-4 col-form-label">ID Buku</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="id_book" name="id_book" placeholder="ID Buku" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="nama_buku" class="col-sm-4 col-form-label">Nama Buku</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="nama_buku" name="nama_buku" placeholder="Nama Buku" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="inputtext3" class="col-sm-4 col-form-label" ReadOnly>Tanggal Pengembalian</label>
                                    <div class="col-sm-8">
                                        <input type="date" class="form-control" id="inputtext3" placeholder="Email" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}
export default Peminjaman