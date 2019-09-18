import React from 'react'
import io from 'socket.io-client'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      socket: 'http://localhost:3000'
    }
  }

  componentDidMount(){
    const socket = io(this.state.socket)
    socket.on('connection', this.connected)
    socket.on('disconnect', this.disconnected)
    socket.on('data', function (data) {
      console.log(data);
    });
  }

  connected(){
    console.log("Socket Connected")
  }

  disconnected(){
    console.log("Socket Disconnected")
  }

  render () {
    return (
      <div>
        <p> This works </p>
      </div>
    )
  }
}

export default App;
