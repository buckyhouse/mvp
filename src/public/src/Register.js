import React from 'react'
import config from './config'
import Nav from './Nav'

class Register extends React.Component {
    constructor() {
        super()

        this.state = {
            firstName: '',
            lastName: '',
            accountType: '',
            wallet: '',
            gender: '',
            email: '',
            phone: '',
            country: '',
            city: ''
        }
    }

    componentDidMount() {
        if(window.web == undefined) {
            this.status('You must be connected to Metamask in Ropsten to register')
        } else {
            this.refs.wallet.value = web3.eth.defaultAccount
            this.setState({ wallet: web3.eth.defaultAccount })
        }
    }

    status(message) {
        this.setState({
            status: message
        })
        this.refs.status.className = "status"
        setTimeout(() => {
            this.refs.status.className = "status hidden"
        }, 5e3)
    }

    registerButton() {
        if(this.state.firstName.length == 0) return this.status('You must set your first name')
        if(this.state.lastName.length == 0) return this.status('You must set your last name')
        if(this.state.accountType.length == 0) return this.status('You must choose your account type')
        if(this.state.wallet.length == 0) return this.status('You must be connected to Metamask to set your wallet')
        if(this.state.gender.length == 0) return this.status('You must choose your gender')
        if(this.state.email.length == 0) return this.status('You must set your email')
        if(this.state.phone.length == 0) return this.status('You must set your phone')
        if(this.state.country.length == 0) return this.status('You must set your country')
        if(this.state.city.length == 0) return this.status('You must set your city')
    }

    render() {
        return (
            <div>
                <Nav />

                <div ref="status" className="status hidden">{this.state.status}</div>

                <div className="content-provider-container">
                    <div className="container">
                        <div className="row">
                            <h2>Register new user</h2>
                        </div>

                        <br/>

                        <div className="row">
                            <form>
                                <div className="form-group">
                                    <p>First name</p>
                                    <input ref="firstName" onChange={event => { this.setState({ firstName: event.target.value })}} type="text" className="form-control" aria-describedby="inputTitle" placeholder="Your fist name..." />
                                </div>

                                <div className="form-group">
                                    <p>Last name</p>
                                    <input ref="lastName" onChange={event => { this.setState({ lastName: event.target.value })}} type="text" className="form-control" placeholder="Your last name..." />
                                </div>

                                <div className="form-group">
                                    <p>Your ethereum wallet (automatic)</p>
                                    <input ref="wallet" type="text" className="form-control" readonly/>
                                </div>

                                <div className="form-group">
                                    <p>Gender</p>

                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="customRadioInline1" onChange={event => { this.setState({ gender: 'male' }) }} class="custom-control-input"/>
                                        <label class="custom-control-label" for="customRadioInline1">Male</label>
                                    </div>

                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="customRadioInline2" onChange={event => { this.setState({ gender: 'female' }) }} class="custom-control-input"/>
                                        <label class="custom-control-label" for="customRadioInline2">Female</label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <p>Account type</p>
                                    <select ref="accountType" className="form-control" onChange={event => { this.setState({ accountType: event.target.value }) }} >
                                        <option>Content Provider</option>
                                        <option>Subscriber</option>
                                        <option>Advertiser</option>
                                        <option>Node</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <p>Email</p>
                                    <input ref="email" onChange={event => { this.setState({ email: event.target.value })}} type="email" className="form-control" placeholder="Your email..." />
                                </div>

                                <div className="form-group">
                                    <p>Phone number</p>
                                    <input ref="phone" onChange={event => { this.setState({ phone: event.target.value })}} type="tel" className="form-control" placeholder="Your phone number..." />
                                </div>

                                <div className="form-group">
                                    <p>Country</p>
                                    <input ref="country" onChange={event => { this.setState({ country: event.target.value })}} type="text" className="form-control" placeholder="Your country..." />
                                </div>

                                <div className="form-group">
                                    <p>City</p>
                                    <input ref="city" onChange={event => { this.setState({ city: event.target.value })}} type="text" className="form-control" placeholder="Your city..." />
                                </div>

                                <br/>
                                <br/>

                                <button className="btn btn-primary" type="button" onClick={() => { this.registerButton() }}>Register Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Register
