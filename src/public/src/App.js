import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import Nav from './Nav'
import ContentProvider from './ContentProvider'
import ContentProviderAdd from './ContentProviderAdd'
import './index.styl'

class App extends React.Component {
	constructor () {
		super()
	}

	redirectTo(history, location) {
		history.push(location)
	}

	render () {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" render={() => (
						<Home />
					)} />
					<Route path="/content-provider/add" render={() => (
						<ContentProviderAdd />
					)} />
					<Route path="/content-provider" render={() => (
						<ContentProvider />
					)} />
				</Switch>
			</BrowserRouter>
		)
	}
}

class Home extends React.Component {
	render() {
		return (
			<div>
				<Nav />
				<div className="container home-page-container">
					<br/>
					<br/>
					<div className="row fluid">
						<h3 className="small-margin-left">Motion Content</h3>
					</div>
					<div className="row">
						<Card className="col-md"/>
						<Card className="col-md"/>
						<Card className="col-md"/>
						<Card className="col-md"/>
						<Card className="col-md"/>
					</div>
					<br/>
					<br/>
					<div className="row">
						<h3 className="small-margin-left">Music</h3>
					</div>
					<div className="row">
						<Card className="col-md"/>
						<Card className="col-md"/>
						<Card className="col-md"/>
						<Card className="col-md"/>
						<Card className="col-md"/>
					</div>
					<br/>
					<br/>
					<div className="row">
						<h3 className="small-margin-left">Animation</h3>
					</div>
					<div className="row">
						<Card className="col-md"/>
						<Card className="col-md"/>
						<Card className="col-md"/>
						<Card className="col-md"/>
						<Card className="col-md"/>
					</div>
					<br/>
					<br/>
					<div className="row">
						<h3 className="small-margin-left">E-books</h3>
					</div>
					<div className="row">
						<Card className="col-md"/>
						<Card className="col-md"/>
						<Card className="col-md"/>
						<Card className="col-md"/>
						<Card className="col-md"/>
					</div>
					<br/>
					<br/>
					<br/>
				</div>
			</div>
		)
	}
}

class Card extends React.Component {
	constructor() {
		super()
	}

	render() {
		return (
			<div className={`card card-container ${this.props.className}`}>
				<img className="card-img-top" src="imgs/placeholder.png" />
				<div className="card-body">
					<h4>This is the title</h4>
					<p>This is the descriptive content of the video or file that we want to display</p>
				</div>
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.querySelector('#root')
)
