import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
// EVERYTHING ABOVE IS SET UP FOR THE COMPONENT

import FriendList from './Components/FriendList/FriendList'
import Btn from './Components/Btn/Btn'
import FriendForm from './Components/FriendForm/FriendForm'
import Axios from 'axios';
// ABOVE WE ARE IMPORTING THE COMPONENTS WE HAVE CREATED

class App extends Component {
	constructor() {
		super()
		// SETTING UP SOME INITIAL STATE
		this.state = { 
			friends: [],
			loading: false,
			hasLoadedFriends: false
		}
	}
	// EVERYTHING BELOW ARE CUSTOM METHODS WE CREATE. THEY DO VARIOUS THINGS FOR US
	handleButtonClick = () => {
		this.setState({ loading: true })
		// HERE WE ARE USING Axios. AXIOS IS SIMILAR TO .FETH IN JQUERY BUT AXIOS IS PROMISE BASED
		// WE MAKE A REQUEST TO OUR SERVER AT THE /API/FRIENDS ROUTE. ONCE WE GET THAT DATA BACK, WE SET STATE
		axios.get('/api/friends').then((res) => {
			this.setState({
				friends: res.data,
				loading: false,
				hasLoadedFriends: true
			})
		})
	}
	// NOTICE WE HAVE A PARAM CALLED DATAFROMFRIEND
	// ESENTIALLY THIS METHOD IS A CALLBACK THAT WE WILL PASS DOWN AS A PROP TO THE FRIEND COMPONENT
	// THIS IS USING THE SPREAD OPERATOR TO ADD ANY NEW DATA TO OUR FRIENDS ARRAY
	handleUpdateFriend = (dataFromFriend) => {
		this.setState({
			friends: [...dataFromFriend]
		})
	}
	// NOTICE THIS METHOD HAS TO PARAM; EVT AND DATAFROMFRIENDFORM
	// THIS IS ALSO A CALLBACK THAT WILL BE USED TO UPDATE OUR FRIEND LIST ON STATE WITH A NEW FRIEND
	handleAddFriend = (evt, dataFromFriendForm) => {
		evt.preventDefault()
		axios
			.post('/api/addFriend', {
				name: dataFromFriendForm.name,
				state: dataFromFriendForm.state
			})
			.then((res) => {
				console.log(res.data)
				this.state.hasLoadedFriends && this.handleButtonClick()
			})
	}
	render() {
		return (
			<div className='App'>
			{/* USING THE BTN COMPONENT WE CREATED */}
			{/* WE ARE PASSING THREE PROPS DOWN. 1. CLASSES WHICH IS ALL THE CLASSES WE WANT ON THE COMPONENT 2. METHOD WHICH WILL BE A METHOD OUR BTN WILL RUN ONCE WE CLICK IT AND 3. TEXT. THIS IS THE TEXT INSIDE OF THE BUTTON TAG */}
			{/* WHILE THIS PATTERN MAY BE CONFUSING AT FIRST, KNOW THAT IT MAKES OUR BTN COMPONENT VERY DYNAMIC */}
				<Btn
					classes={`btn data-btn`}
					method={this.handleButtonClick}
					text={`Get Friends`}
				/>
				{/* THIS SYNTAX IS LIKE SAYING "IF STATE.LOADING IS TRUE THEN SHOW THIS". IT IS LIKE A SHORTER TERNARY */}
				{this.state.loading && <h2>Loading Friends</h2>}
				{/* USING OUR FRIENDLIST COMPONENT */}
				{/* FRIENDLIST HAS TWO PROPS. 1. FRIENDS WHICH IS THE ARRAY OF FRIENDS ON STATE AND 2. FRIENDLISTUPDATE WHICH IS JUST A CALLBACK WE ARE PASSING DOWN */}
				<FriendList
					friends={this.state.friends}
					friendListUpdate={this.handleUpdateFriend}
				/>
				{/* USING OUR FRIENDFORM COMPONENT */}
				<FriendForm friendListAdd={this.handleAddFriend} />
			</div>
		)
	}
}

export default App
