import React, { Component } from 'react';
import Header from './Component/Header'
import {
  ButtonToolbar,
  Button,
  Container
} from 'reactstrap';
import Search from './Component/Search';
import Buttonmodal from './Component/Buttonmodal';
import Listbuku from './Component/Listbuku';
import Data from './Helpers/Datadummy'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'



function detailbook() {
  return <h2>tesets</h2>
}
function NoMacth() {
  return <h2>404, Halama tidak ditemukan</h2>
}

class App extends Component {

  constructor() {
    super()
    this.state = {
      data: Data
    }

  }
  render() {
    return (

      <div>
        <Header />

        <Container>
          <Search />
          <Buttonmodal />
          <Listbuku data={this.state.data} />
        </Container>
        <br></br>

        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={App} />
            <Route path='/detailbook' exact component={detailbook} />
            <Route component={NoMacth} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}



export default App;
