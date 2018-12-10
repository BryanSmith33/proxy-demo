// importing react and destructuring component to make use of a class based component
import React, { Component } from 'react'
import axios from 'axios'
import './Friend.css'

// import Btn so we can use it
import Btn from '../Btn/Btn'

class Friend extends Component {
	// setting some intial state outside of a constructor
	state = {
		editId: null,
		editFriendName: '',
		editFriendState: ''
	}
	// custom method that takes one param we call id
	// this method will run whenever we double click a name so we can update it
	// this method is crucial to allow us to easily go from a div with some text to two inputs and some buttons
	handleFriendEdit = (id) => {
		const selectedFriend = this.props.friends.find((friend) => {
			return friend.id === id
		})
		this.setState({
			editId: id,
			editFriendName: selectedFriend.name,
			editFriendState: selectedFriend.state
		})
	}
	// this method could be more dynamic but will do. This just updates the editFriendName on state as we type
	handleFriendNameUpdate = (evt) => {
		this.setState({ editFriendName: evt.target.value })
	}
	// this method could be more dynamic but will do. This just updates the editFriendState on state as we type
	handleFriendStateUpdate = (evt) => {
		this.setState({ editFriendState: evt.target.value })
	}
	// this method just cancels out us being able to edit
	// we are just seeting the id, which we use to determine which item on the list we should make editable, to null
	handleFriendEditCancel = () => {
		this.setState({ editId: null })
	}
	// this method is deleting our friend. we pass in one param called friend
	// use use that friend param to get an id which we will use on our server to determine which friend we should delete
	// we also then use the this.handleFriendEditCancel method to close the friend
	handleFriendDelete = (friend) => {
		axios.delete(`/api/delete/${friend.id}`).then((res) => {
			this.props.friendListUpdate(res.data)
			this.handleFriendEditCancel()
		})
	}
	// here we are updating our friend by using a single param we are calling friend
	// this will make a request to our server and pass in some data on the body
	// once that has happened, we run the friendLIstUpdate method we passed down via props while passing in res.data
	// we also then use the this.handleFriendEditCancel method to close the friend
	handleFriendUpdate = (friend) => {
		axios
			.put(`/api/update/${friend.id}`, {
				name: this.state.editFriendName,
				state: this.state.editFriendState
			})
			.then((res) => {
				this.props.friendListUpdate(res.data)
				this.handleFriendEditCancel()
			})
	}
	render() {
		// hhere we render over all of the friends data that is passed down via props
		// we determine that if friend.id is equal to the edit id we have on state, then that is the friend we would like to edit
		// otherwise we return an li with a div and some text
		const friends = this.props.friends.map((friend, index) => {
			if (friend.id === this.state.editId) {
				return (
					<li key={friend.id} className='friend'>
						<div className='input-container'>
						{/* one thing that hangs students up about props is that elements like this input have what look like props and guess what? They are in React. React handles a lot of stuff for us and one of them is determining what to do with things like value and className that are regularly available in HTML. We just never have to render out the input tag so we don't worry about them as react will handle that */}
							<input
								className='friend-input name'
								onChange={this.handleFriendNameUpdate}
								value={this.state.editFriendName}
							/>
							<input
								className='friend-input state'
								onChange={this.handleFriendStateUpdate}
								value={this.state.editFriendState}
							/>
						</div>
						<div>
							<div>
								<Btn
									classes='btn sm-btn submit'
									method={() => this.handleFriendUpdate(friend)}
									text={`✔`}
								/>
								<Btn
									classes='btn sm-btn cancel'
									method={this.handleFriendEditCancel}
									text={`✘`}
								/>
							</div>
							<Btn
								classes='btn bg-btn delete'
								method={() => this.handleFriendDelete(friend)}
								text={`Delete`}
							/>
						</div>
					</li>
				)
			} else {
				return (
					<li
						className='friend'
						key={friend.id}
						onDoubleClick={() => this.handleFriendEdit(friend.id)}>
						<div>
							{friend.name} - {friend.state}
						</div>
					</li>
				)
			}
		})
		// here we use something called a fragment that will not display anyting once react has rendered. This is good because we don't want a spare dive in our ul tag that is being rendered as FriendList
		return <>{friends}</>
	}
}

export default Friend
