import React, { Component } from 'react';
import axios from 'axios';
import {Appbar, Container, Panel} from 'muicss/react';
import './App.css';


class App extends Component {
  constructor(){
    super();
    this.state = {
      data: []
    }
  }


// calling the componentDidMount() method after a component is rendered for the first time
 componentDidMount() {
  var th = this;
  this.serverRequest = axios.get(this.props.source)
   .then(function(event) {
         th.setState({
            data: event.data
          });
      })
}

  // calling the componentWillUnMount() method immediately before a component is unmounted from the DOM
  componentWillUnmount() {
       this.serverRequest.abort();
  }


  render() {
//THIS WILL GO TO COMPONENT WHEN REFACTORED
    var event = []
    this.state.data.forEach(item => {
       event.push(
         <div>
           <Panel>
           <h3 className="events">{item.title[0].value}</h3>
           <p>{item.field_location[0].value} - {item.field_date[0].value}</p>
           <p>{item.field_description[0].value}</p>
           </Panel>
         </div>
      );
    })

    return (
      <div className="App">
          <Appbar>
            <Container>
              <table width="100%">
               <tbody>
                 <tr>
                   <td className="mui--appbar-height"><h3>Drupal Events REST API</h3></td>
                 </tr>
               </tbody>
              </table>
            </Container>
          </Appbar>
          <br />
          <Container>

              {event}

          </Container>
      </div>
    );
  }
}

export default App;
