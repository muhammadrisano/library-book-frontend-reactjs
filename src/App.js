import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import books from './Screens/Books';
import detailbook from './Screens/Detailbuku';

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
            <Route component={NoMacth} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}



export default App;
