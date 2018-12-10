import React, { Component } from 'react'
import Btn from '../Btn/Btn'

import './FriendForm.css'

class friendForm extends Component {
	state = {
		name: '',
		state: ''
	}

	handleNameChange = (evt) => {
		this.setState({name: evt.target.value})
	}

	handleStateChange = (evt) => {
		this.setState({ state: evt.target.value })
	}
	render() {
		return (
			<form onSubmit={(evt) => this.props.friendListAdd(evt, this.state)}>
				<input
					type='text'
					onChange={this.handleNameChange}
					placeholder='Name'
					value={this.state.name}
					required
				/>
				<input
					type='text'
					onChange={this.handleStateChange}
					placeholder='State'
					value={this.state.state}
					required
				/>
				<Btn classes={`btn`} text={`Add Friend`} />
			</form>
		)
	}
}

export default friendForm
