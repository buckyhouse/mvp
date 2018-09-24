import React from 'react'
import ReactDOM from 'react-dom'
import Nav from './Nav'
import './index.styl'

class App extends React.Component {
	constructor () {
		super()
	}

	render () {
		return (
			<div>
				<Nav />
				Welcome
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.querySelector('#root')
)
