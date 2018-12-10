// intially setting up our server by requiring a few pacakges
const express = require('express')
const { json } = require('body-parser')
const app = express()

app.use(json())

// imagine we got this data from our sequelize statement instead or a external api call
const friends = [
	{ name: 'Lindsey', state: 'Utah', id: 0 },
	{ name: 'Taz', state: 'California', id: 1 },
	{ name: 'Daniel', state: 'California', id: 2 },
	{ name: 'Meagan', state: 'Hawaii', id: 3 },
	{ name: 'Landy', state: 'Utah', id: 4 }
]

// server route to get all of our friends
app.get('/api/friends', (req, res) => {
	// setTimeout(() => res.send(friends), 3000)
	res.send(friends)
})

// route to handle a friend update
app.put('/api/update/:id', (req, res) => {
	const { id } = req.params
	const { name, state } = req.body
	let friendId = null
	friends.forEach((friend) => {
		if (friend.id == id) {
			friendId = id
		}
	})
	friends[friendId] = {
		name: name || friends[friendId].name,
		state: state || friends[friendId].state,
		id: friends[friendId].id
	}
	res.send(friends)
})

// route to delete friend
app.delete('/api/delete/:', (req, res) => {
	const { id } = req.params
	friends.forEach((friend, index) => {
		if (friend.id == id) {
			friends.splice(index, 1)
		}
	})
	res.send(friends)
})

// route to create friend
app.post('/api/addFriend', (req, res) => {
	const { name, state } = req.body
	const newFriend = {
		name: name,
		state: state,
		id: friends[friends.length - 1].id + 1
	}
	friends.push(newFriend)
	res.send(friends)
})

const port = 3333
app.listen(port, () => console.log(`magic is happening on ${port}`))
