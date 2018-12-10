# React is hard. You are all doing great though. Take this information in pieces and try to think through what is happening.

I am first going to go over some key vocabulary for React

## Components

Components are the building blocks of React. Following a component based architecture for your application will allow you to reason with your code and what is happening. Whenever you start to write code that may or may not be relevant to your current component, think "Does the current component need to know about this information?" If you can answer yes, keep writing. If you answer no, then remove that information into a separate component.

There are two types of components; Function and Class.

### Functional Component

```jsx
import React from 'react'

const ComponentName = (props) => {
	return <div>// JSX</div>
}
```

Functional components cannot have state or methods and do not have access to lifecycle methods.

### Class Component

```jsx
import React from 'react'

class ComponentName extends Component{
  constructor(){
    super()
    this.state = {
      // state
    }
  }
  // Methods go here
  MethodName = () => {

  }
  render(){
    return (
      // JSX
    )
  }
}
```

## State

State is the intial data for your component. It is an object that can contain anything that is strictly relevant to that component

## Props

Props are just things that can be passed onto components. Eventually you will need to pass some information from one parent component to a child component. You can do this with props.

### App.js
```jsx
import React, {Component} from 'react'
import DisplayName from './Components/DisplayName'

class App extends Component {
	constructor() {
		super()
		this.state = {
			name: 'Bryan'
		}
	}
	render() {
		return (
			<div>
				<DisplayName name={this.state.name} />
			</div>
		)
	}
}

export default App
```
### DisplayName.js as functional component
```jsx
import React from 'react'

const DisplayName = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

export default DisplayName
```

Above, why is it called `props.name`? Because we called it name when we passed it down on the `DisplayName` component in App.js

### DisplayName.js as class component
```jsx
import React, {Component} from 'react'

class DisplayName extends Component {
	render() {
		return (
			<div>
				<h1>{this.props.name}</h1>
			</div>
		)
	}
}

export default App
```

Above, why is it called `this.props.name`? Because we called it name when we passed it down on the `DisplayName` component in App.js

Remember, you will want to use functional components for presentation and class components for most things with some sort of logic.

## Let's check out the code inside of this repo.

If you've gotten this far, good work. React is tough. It took me a full 9 months of working with it to finally feel comfortable with it. Stick with it.

## App.js
- [ ] Let's start in App.js. Take a look at the file and read the notes and then come back.

- [ ] Great, now go read the notes again. There is a lot of info to take in.


## Btn.js
Let's next look to the `Btn` component we created. We are looking at this one first to see how props are used and hw `Btn` follows a pattern that allows our code to be very flexible.

- [ ] Read the notes in `Btn.js`

## FriendList.js
Here you are exposed to your first presentational parent component. All Friend list does is return a `ul` element and then the `Friend` component we created. Notice that there are a few props being passed down here as well

- [ ] Read the notes in `FriendList.js`

## Friend.js
Here is where the magic happens, as they say. This is where most of our logic is happening.

- [ ] Read the notes in `Friend.js`

## Server Side
Let's take a look at the server. There are notes in there, read them

The server side code is where you will see the most plain javascript. Try to reason with this code. Why is it doing what it is doing and how is it doing it? If you can talk yourself through this code, you will be in good shape.

- [ ] Read the notes in `server/index.js`

- [ ] Read through the code in `server/index.js` and think about what it is doing.

Please let me know if you have any questions
