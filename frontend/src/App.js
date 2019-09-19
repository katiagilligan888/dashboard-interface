import React from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { addData } from './actions'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      socket: 'http://localhost:4000'
    }
  }

  componentDidMount(){
    console.log(this.props)
    const socket = io(this.state.socket)
    socket.on('connection', this.connected)
    socket.on('disconnect', this.disconnected)
    socket.on('data', data => this.props.addData(data));
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

const bindActions = dispatch => ({
  addData: data => dispatch(addData(data))
})

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, bindActions)(App);
