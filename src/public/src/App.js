import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import Nav from './Nav'
import ContentProvider from './ContentProvider'
import ContentProviderAdd from './ContentProviderAdd'
import config from './config'
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
	constructor() {
		super()
		this.state = {
			cards: []
		}
		this.getFiles()
	}

	async getFiles() {
		let uploadUrl
		if(window.location.origin == config.productionDomain) uploadUrl = config.productionDomain
		else uploadUrl = config.developmentDomain
		const response = await fetch(`${uploadUrl}/get-files?c=10`)
		let res = await response.json()
		let cards = res.map((file, i) => (
			<Card key={i} className="col-md" title={file.title} description={file.description} ipfs={file.ipfs} />
		))

		this.setState({cards})
	}

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
						{this.state.cards.slice(0, 5)}
					</div>
					<div className="row">
						{this.state.cards.slice(5, 10)}
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
					<h4>{this.props.title}</h4>
					<p>{this.props.description}</p>
					<i>{this.props.ipfs}</i>
				</div>
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.querySelector('#root')
)
