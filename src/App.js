import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import books from './Screens/Books';
import detailbook from './Screens/Detailbuku';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
function NoMacth() {
  return (
    <div>
      <h2>404, Halama tidak ditemukan, route yang benar <a href="http://localhost:3000/books">http://localhost:3000/books</a></h2>
    </div>
  )
}
const globalState = {
  books: [],
  jumlah: 1
}

// Reducer
const rootReducer = (state = globalState, action) => {
  if (action.type === 'GET_ALL') {
    return {
      ...state,
      books: action.dataBook
    }
  }

  return state
}

const storeRedux = createStore(rootReducer);

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
              <Route component={NoMacth} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </div>
    )
  }
}



export default App;
