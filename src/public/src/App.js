import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import Nav from './Nav'
import ContentProvider from './ContentProvider'
import ContentProviderAdd from './ContentProviderAdd'
import config from './config'
import Register from './Register'
import Node from './Node'
import Advertiser from './Advertiser'
import Subscriber from './Subscriber'
import './index.styl'

class App extends React.Component {
	constructor () {
		super()
		this.state = {
			editFile: {}
		}
	}

	componentDidMount() {
		if(window.web3 == undefined) alert("Warning: you must be connected to Metamask to use this dApp. It won't work properly unless you do so. Please reload the page after connecting to Ropsten.")
	}

	redirectTo(history, location) {
		history.push({
			pathname: location
		})
	}

	render () {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" render={context => (
						<Home
							history={context.history}
							redirectTo={(history, location) => {
								this.redirectTo(history, location)
							}}
						/>
					)} />
					<Route path="/content-provider/add" render={() => (
						<ContentProviderAdd editFile={this.state.editFile} />
					)} />
					<Route path="/content-provider" render={context => (
						<ContentProvider
							history={context.history}
							editFile={(history, data) => {
								this.setState({
									editFile: data
								}, () => {
									this.redirectTo(history, '/content-provider/add')
								})
							}} />
					)} />
					<Route path="/subscriber" render={() => (
						<Subscriber />
					)} />
					<Route path="/node" render={() => (
						<Node />
					)} />
					<Route path="/advertiser" render={() => (
						<Advertiser />
					)} />
					<Route path="/register" render={context => (
						<Register
							history={context.history}
							redirectTo={(history, location) => {
								this.redirectTo(history, location)
							}}
						/>
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
				<Nav
					redirectTo={location => {
						this.props.redirectTo(this.props.history, location)
					}}
				/>
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
