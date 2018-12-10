import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

class App extends Component {
	constructor() {
		super()
		this.state = {
			data: []
    }
    // this.handleButtonClick = this.handleButtonClick.bind(this) // OLD METHOD OF BINDING THIS
	}
	// componentDidMount(){
	//   axios.get('/api/world')
	//   .then((res) => {
	//     this.setState({data: res.data})
	//   })
	// }
	handleButtonClick = () => {
		axios.get('/api/world').then((res) => {
			this.setState({ data: res.data })
		})
  }
  // THE ABOVE METHOD AUTOMATICALLY BINDS THIS FOR US
	render() {
		const displayData = this.state.data.map((number, index) => {
			return <p key={index}>{number}</p>
		})
		return (
			<div className='App'>
				<button onClick={this.handleButtonClick}>Get Data</button>
				{this.state.data.length ? displayData : 'Loading Data'} {/*USING A TERNARY TO EITHER DISPLAY OUR DATA OR SHOW 'LOADING DATA'*/}
			</div>
		)
	}
}

export default App
