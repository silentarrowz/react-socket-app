import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';


class App extends Component {
  constructor(){
    super()

    this.state = {
      endpoint: "http://localhost:8080", // this is where we are connecting to with sockets
      heading:'Change Heading'
    }
this.handleChange = this.handleChange.bind(this);
  }

//method for emitting a socket.io event
  send = () => {
    const socket = socketIOClient(this.state.endpoint);

    socket.emit('change color',this.state.color);
    socket.emit('change heading',this.state.heading);
    
  }

 

  setColor = (color) =>{
    this.setState({color});
  }

  handleChange(e){
    this.setState({heading:e.target.value})
  }

  render() {
    const socket = socketIOClient(this.state.endpoint);
    
    socket.on('change color',(color)=>{
      document.body.style.backgroundColor = color;
    });

    socket.on('change heading',(heading)=>{
      console.log('new heading is : ',heading);
      this.setState({heading:heading});
    });


    return (
      <div style={{ textAlign: "center" }}>

      <h1>{this.state.heading}</h1>
      <input type="text" onChange={this.handleChange} />
      <button onClick={() => this.send() }>Change Heading</button>

        <button onClick={() => this.send() }>Change Color</button>


       
        <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
        <button id="red" onClick={() => this.setColor('red')}>Red</button>
        

      </div>

    );
  }
}

export default App;
