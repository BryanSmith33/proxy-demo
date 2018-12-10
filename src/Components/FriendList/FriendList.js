// importing react
import React from 'react'
// importing our friend component
import Friend from './Friend'

// notice here we are passing in a props para,. I know, I know, confusing terminology. The reason we pass props in as param is so we can then access it like we do inside of the Friend component.
const FriendList = (props) => {
	return (
		// some inline styling
		// don't worry about this, styling isn't the main focus here
		<ul style={{ listStyle: `none`, margin: `0`, padding: `0` }}>
			{/* friend is using two props, 1 friends and 2 friendListUpdate
			friends is the array of friends on state from app and friendListUpdate is the callback we created. don't remember that we created a callback? go back and read the notes in App.js */}
			<Friend friends={props.friends} friendListUpdate={props.friendListUpdate} />
		</ul>
	)
}

export default FriendList
