import React from 'react'
import { Link } from 'react-router-dom'

let ListLeft = () => {

    return (
        <div>
            <div class="list-group">
                <Link to="#" class="list-group-item list-group-item-action disabled bg-primary text-white active font-weight-bold">
                    Transaksi Buku</Link>
                <Link to="Transaksi" class="list-group-item list-group-item-action">Daftar Transaksi Buku</Link>
                <Link to="Peminjaman" class="list-group-item list-group-item-action">Peminjaman</Link>
                <Link to="#" class="list-group-item list-group-item-action">Pengembalian</Link>


                <Link to="#" class="list-group-item list-group-item-action disabled bg-primary text-white active font-weight-bold">
                    Registrasi </Link>
                <Link to="#" class="list-group-item list-group-item-action">Peminjam</Link>
                <Link to="#" class="list-group-item list-group-item-action">Buku Baru</Link>

            </div>
        </div>
    )
}
export default ListLeft