import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import { Link } from 'react-router-dom'

class Nav extends React.Component {
	constructor (props) {
		super()
        window.web3 = new Web3(web3.currentProvider)
        this.state = {
            account: ''
        }

        this.getAccount()
    }

    async getAccount() {
        const myAccounts = await web3.eth.getAccounts()
        this.setState({account: myAccounts[0]})
    }

	// db.collection('users').findOne({
	//    wallet: wallet
	// })

	async loginRegisterButton() {
		// Make a fetch to get what page to show it can be:
		// node, advertiser, contentProvider, subscriber or register
		// Then redirect to that page inside react router
		const accounts = await web3.eth.getAccounts()
		let accountType = await fetch(`/get-account-type?wallet=${accounts[0]}`)
		accountType = await accountType.text()

		if(accountType == 'register') {
			// ad
		} else if(accountType == 'Content Provider') {

		} else if(accountType == 'Subscriber') {

		} else if(accountType == 'Advertiser') {

		} else if(accountType == 'Node') {

		}
	}

	render () {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<Link className="navbar-brand" to="/">BuckyHouse</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
				  <span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
					<ul className="navbar-nav">
						<li className="nav-item active">
		                	<a className="nav-link" href="#">Home</a>
						</li>
						<li className="nav-item dropdown">
		                	<a href="#" className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Motion Content</a>
							<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
							   <a className="dropdown-item" href="#">Feature Films</a>
							   <a className="dropdown-item" href="#">Short Movies</a>
							   <a className="dropdown-item" href="#">Web Series</a>
							   <a className="dropdown-item" href="#">Documentary</a>
							   <a className="dropdown-item" href="#">Celebrity Content</a>
							 </div>
						</li>
						<li className="nav-item dropdown">
							<a href="#" className="nav-link dropdown-toggle" role="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Music</a>
							<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
							   <a className="dropdown-item" href="#">Music Videos</a>
							   <a className="dropdown-item" href="#">Movie Music</a>
							   <a className="dropdown-item" href="#">Singer Specials</a>
							   <a className="dropdown-item" href="#">Spiritual Music</a>
							   <a className="dropdown-item" href="#">Instrumental Music</a>
							 </div>
						</li>
						<li className="nav-item dropdown">
							<a href="#" className="nav-link dropdown-toggle" role="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Animation</a>
							<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
							   <a className="dropdown-item" href="#">Animation Episodes</a>
							   <a className="dropdown-item" href="#">Animation Movies</a>
							   <a className="dropdown-item" href="#">Animation Clips</a>
							   <a className="dropdown-item" href="#">Animation Webseries</a>
							 </div>
						</li>
						<li className="nav-item dropdown">
							<a href="#" className="nav-link dropdown-toggle" role="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">E-books</a>
							<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
							   <a className="dropdown-item" href="#">Historical</a>
							   <a className="dropdown-item" href="#">Mythological</a>
							   <a className="dropdown-item" href="#">Scientific</a>
							   <a className="dropdown-item" href="#">Comics</a>
							   <a className="dropdown-item" href="#">Moral Stories</a>
							 </div>
						</li>
						<li className="nav-item dropdown">
							<a href="#" className="nav-link dropdown-toggle" role="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">New Arrivals</a>
							<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
							   <a className="dropdown-item" href="#">New Motion Content</a>
							   <a className="dropdown-item" href="#">New Music</a>
							   <a className="dropdown-item" href="#">New Animation</a>
							   <a className="dropdown-item" href="#">New E-books</a>
							 </div>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link" role="button">Other Content</a>
						</li>
						<li className="nav-item">
							{/* TODO when clicking this button, it should make a get call to the server to see if the user is registered. If so, he's redirected to the corresponding page, else he is goes to the register page */}
		                	<a href="#" className={this.props.activePage == 'register' ? 'nav-link active' : 'nav-link'} onClick={() => {
								this.loginRegisterButton()
							}}>Sign Up / Login</a>
						</li>
						{/* Temporary button to test the content provider dashboard */}
						<li className="nav-item">
		                	<Link className="nav-link" to="/content-provider">Content Provider</Link>
						</li>
					</ul>
				</div>
			</nav>
		)
	}
}

export default Nav
