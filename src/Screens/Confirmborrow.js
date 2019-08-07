import React, { Component } from 'react'
import Header from '../Component/Header'
import ListLeft from '../Component/ListLeft'
import Api from '../axios/Api'
import { connect } from 'react-redux';
import { getConfirmborrow } from '../redux/actions/loanbooks'
import { async, timeout } from 'q';
import moment from 'moment';
import { prosesConfirmBorrow } from '../redux/actions/loanbooks'
import '../assets/css/libraryanconfirm.css'
import swal from 'sweetalert';
import { cancelborrow } from '../redux/actions/loanbooks'


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





    // hitungDenda = () => {
    //     let tgl = new Date()
    //     var hitung = 0
    //     var hariTerlambat = 0
    //     let tanggal = tgl.getDate();
    //     let bulan = tgl.getMonth();
    //     let tahun = tgl.getFullYear();
    //     let expired = this.state.expired_date.split('-')
    //     console.log(expired)
    //     if (parseInt(bulan) > parseInt(expired[1])) {
    //         hitung += (parseInt(expired[1]) - parseInt(bulan)) * 5000 * 30
    //         hariTerlambat += (parseInt(expired[1]) - parseInt(bulan)) * 30
    //     }
    //     if (parseInt(tanggal) > parseInt(expired[2])) {
    //         hitung += (parseInt(expired[2]) - parseInt(tanggal)) * 5000
    //         hariTerlambat += parseInt(expired[2]) - parseInt(tanggal)
    //     }

    //     this.setState({
    //         denda: hitung,
    //         terlambat: hariTerlambat
    //     })

    //     return hitung
    // }
    // componentDidMount() {
    //     Api.get("loanbooks")
    //         .then((response) => {

    //             this.setState({
    //                 transaksiBuku: response.data.result
    //             })
    //         })
    // }

    getConfirmborrow = async () => {
        await this.props.dispatch(getConfirmborrow())
    }
    componentDidMount = async () => {
        this.getConfirmborrow()
    };

    handlerCancelBorrow = (id_loanbook, dataid_book) => {
        console.log(id_loanbook)
        console.log(dataid_book)
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    await this.props.dispatch(cancelborrow(id_loanbook, {
                        id_book: dataid_book
                    }))
                        .then((result) => {
                            swal("Poof! Your maginary file has been deleted!", {
                                icon: "success",
                            });
                            this.getConfirmborrow()
                        })

                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }
    handlerConfimBorrow = async (id_loanbook) => {
        await this.props.dispatch(prosesConfirmBorrow(id_loanbook, {
            information: "DIPINJAM"
        }))
            .then((response) => {
                this.getConfirmborrow()
            })
    }

    render() {
        console.log(this.props.borrowConfirm)
        // console.log(this.state.transaksiBuku)
        // let tgl_sekarang = new Date()
        // let aturTanggal = (tgl) => {
        //     let tglarr = tgl.split('-')
        //     tglarr.reverse()
        //     return tglarr.join('-')

        // }
        let no = 1;

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
                                                <th scope="col">Card Number</th>
                                                <th scope="col">Nama</th>
                                                <th scope="col">Judul Buku</th>
                                                <th scope="col">Penulis</th>
                                                <th scope="col">Tanggal Pinjam</th>
                                                <th scope="col">Cover</th>
                                                <th scope="col">Confirm Borrow</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.borrowConfirm.map((item) =>

                                                < tr key={item.id_loanbook}>
                                                    <td scope="col">{no++}</td>
                                                    <td scope="col">{item.card_number}</td>
                                                    <td scope="col">{item.fullname}</td>
                                                    <td scope="col">{item.title}</td>
                                                    <td scope="col">{item.writer}</td>
                                                    <td scope="col">{moment(item.created_at).format('LL')}</td>
                                                    <td scope="col"><img src={item.image} alt={item.title} width="70px" /></td>
                                                    <td scope="col">
                                                        <buttom className="btn btn-primary btn-confirm" onClick={() => this.handlerConfimBorrow(item.id_loanbook)}>Confirm</buttom>
                                                        <buttom className="btn btn-danger btn-confirm" onClick={() => this.handlerCancelBorrow(item.id_loanbook, item.id_book)}>Cancel</buttom>
                                                    </td>
                                                </tr>

                                            )}
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

const mapStateToProps = (state) => {
    return {
        borrowConfirm: state.loanbooks.borrowConfirm,
    }
}

export default connect(mapStateToProps)(Confirmborrow)
