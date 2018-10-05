import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import { Link } from 'react-router-dom'
import AccessManager from './AccessManager'

class ContentProviderNav extends React.Component {
	constructor (props) {
		super(props)
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

	render () {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<AccessManager
					accountType="content-provider"
				/>

				<Link className="navbar-brand" to="/">BuckyHouse</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
				  <span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
					<ul className="navbar-nav">
                        <li className="nav-item">
		                	<Link className={this.props.activePage == 'dashboard' ? 'nav-link active' : 'nav-link'} to="/content-provider">Dashboard</Link>
						</li>
                        <li className="nav-item">
		                	<Link className={this.props.activePage == 'add' ? 'nav-link active' : 'nav-link'} to="/content-provider/add">Add Content</Link>
						</li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Log out</Link>
                        </li>
					</ul>
				</div>
			</nav>
		)
	}
}

export default ContentProviderNav
