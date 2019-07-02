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
class App extends Component {
  render() {
    return (
      <div>
        <Header />

        <Container>
          <Search />
          <Buttonmodal />
          <Listbuku />
        </Container>
        <br></br>
      </div>

    )
  }
}



export default App;
