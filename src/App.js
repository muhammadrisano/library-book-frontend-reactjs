import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import books from './Screens/Books';
import detailbook from './Screens/Detailbuku';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import peminjaman from './Screens/Peminjaman';
import transaksi from './Screens/Transaksi';
import riwayat from './Screens/Riyawat';
import register from './Screens/Register';
import registerUser from './Screens/RegisterUser';
import userborrow from './Screens/Userborrow';
import userHistoryBorrow from './Screens/UserHistoryBorrow';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

function NoMacth() {
  return (
    <div>
      <h2>404, Halama tidak ditemukan, route yang benar <a href="http://localhost:3000/books">http://localhost:3000/books</a></h2>
    </div>
  )
}
const globalState = {
  books: [],
  jumlahbuku: 0,
  user: null
}

// Reducer
const rootReducer = (state = globalState, action) => {

  switch (action.type) {
    case 'GET_ALL':
      return {
        ...state,
        books: action.dataBook.result,
        jumlahbuku: action.dataBook.jumlah
      }

    case 'SEARCH_BOOK':
      return {
        ...state,
        books: action.search
      }
    case 'PAGE_LIST':
      return {
        ...state,
        books: action.dataPage.result
      }
    case 'LOGIN_USER':
      return {
        ...state,
        user: action.dataLogin
      }
    default:
      return state
      break;
  }
  // if (action.type === 'GET_ALL') {
  //   return {
  //     ...state,
  //     books: action.dataBook
  //   }
  // }


}

const storeRedux = createStore(rootReducer);
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)



class App extends Component {

  render() {
    return (
      <div>
        <Provider store={storeRedux}>
          <BrowserRouter>
            <Switch>
              <Redirect exact from="/" to="/books" />
              <Route path='/books' exact component={books} />
              <Route path='/books/:idbook' exact component={detailbook} />
              <Route path='/peminjaman' exact component={peminjaman} />
              <Route path='/transaksi' exact component={transaksi} />
              <Route path='/riwayat' exact component={riwayat} />
              <Route path='/register' exact component={register} />
              <Route path='/registeruser' exact component={registerUser} />
              <Route path='/user/borrow' exact component={userborrow} />
              <Route path='/user/historyborrow' exact component={userHistoryBorrow} />
              <Route component={NoMacth} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </div>
    )
  }
}



export default App;