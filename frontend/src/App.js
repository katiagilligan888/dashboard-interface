import React from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { addData } from './actions'
import { Scatter } from 'react-chartjs-2'
import moment from 'moment'

const options = {
  scales: {
    xAxes: [
      {
        position: 'bottom',
        ticks: {
          callback: function(value, index, values) {
            return moment.unix(value).format("MMMM Do hh:mm a")
        }
        },
      }
    ],
    yAxes: [
      {
        position: 'left',
        gridLines: {
          zeroLineColor: 'rgba(0,255,0,1)'
        },
      }
    ]
  }
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      socket: 'http://localhost:4000'
    }
  }

  componentDidMount () {
    const socket = io(this.state.socket)
    socket.on('connection', this.connected)
    socket.on('disconnect', this.disconnected)
    socket.on('data', data => this.props.addData(data))
  }

  connected () {
    // ADD TOASTER HERE TO SHOW CONNECTION ESTABLISHED
    console.log('Socket Connected')
  }

  disconnected () {
    // ADD TOASTER HERE TO SHOW DISCONNECTION OCCURRED
    console.log('Socket Disconnected')
  }

  render () {
    const data = {
      datasets: [
        {
          label: 'Data',
          showLine: true,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.props.data
        }
      ]
    }

    return (
      <div>
        <Scatter data={data} options = {options} />
      </div>
    )
  }
}

const bindActions = dispatch => ({
  addData: data => dispatch(addData(data))
})

const mapStateToProps = state => ({
  data: state
})

export default connect(
  mapStateToProps,
  bindActions
)(App)
