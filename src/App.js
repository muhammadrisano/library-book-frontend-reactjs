import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import books from './Screens/Books';
import detailbook from './Screens/Detailbuku';

function NoMacth() {
  return <h2>404, Halama tidak ditemukan</h2>
}

class App extends Component {

  render() {
    return (

      <BrowserRouter>
        <Switch>
          <Route path='/books' exact component={books} />
          <Route path='/books/:idbook' exact component={detailbook} />
          <Route component={NoMacth} />
        </Switch>
      </BrowserRouter>
    )
  }
}



export default App;
