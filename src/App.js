import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import books from './Screens/Books';
import detailbook from './Screens/Detailbuku';
import { connect } from 'react-redux'
import Peminjaman from './Screens/Peminjaman';
import Transaksi from './Screens/Transaksi';
import Riwayat from './Screens/Riyawat';
import Register from './Screens/Register';
import registerUser from './Screens/RegisterUser';
import Userborrow from './Screens/Userborrow';
import UserHistoryBorrow from './Screens/UserHistoryBorrow';
import Confirmborrow from './Screens/Confirmborrow';
import { PersistGate } from 'redux-persist/integration/react'
import Editprofile from './Screens/Editprofile'
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'



function NoMacth() {
  return (
    <div>
      <h2>404, Halama tidak ditemukan, route yang benar <a href="http://localhost:3000/books">http://localhost:3000/books</a></h2>
    </div>
  )
}






class App extends Component {

  render() {

    return (
      <div>


        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/books" />
            <Route path='/books' exact component={books} />
            <Route path='/books/:idbook' exact component={detailbook} />
            <Route path='/librarian/peminjaman' exact render={() => (
              parseInt(this.props.role_id) === 2 ? <Peminjaman /> : <Redirect to='/books' />
            )} />
            <Route path='/librarian/transaksi' exact render={() => (
              parseInt(this.props.role_id) === 2 ? <Transaksi /> : <Redirect to='/books' />
            )} />
            <Route path='/librarian/riwayat' exact render={() => (
              parseInt(this.props.role_id) === 2 ? <Riwayat /> : <Redirect to='/books' />
            )} />
            <Route path='/librarian/Confirmborrow' exact render={() => (
              parseInt(this.props.role_id) === 2 ? <Confirmborrow /> : <Redirect to='/books' />
            )} />

            <Route path='/librarian/register' exact render={() => (
              parseInt(this.props.role_id) === 2 ? <Register /> : <Redirect to='/books' />
            )} />
            <Route path='/registeruser' exact component={registerUser} />
            <Route path='/user/borrow' exact render={() => (
              parseInt(this.props.role_id) === 3 ? <Userborrow /> : <Redirect to='/books' />
            )} />
            <Route path='/user/historyborrow' exact render={() => (
              parseInt(this.props.role_id) === 3 ? <UserHistoryBorrow /> : <Redirect to='/books' />
            )} />
            <Route path='/user/editprofile' exact render={() => (
              parseInt(this.props.role_id) === 3 ? <Editprofile /> : <Redirect to='/books' />
            )} />

            <Route component={NoMacth} />
          </Switch>
        </BrowserRouter>


      </div >
    )
  }
}



const mapStateToProps = state => {
  return {
    token: state.users.token,
    role_id: state.users.role_id
  }

}

export default connect(mapStateToProps)(App);