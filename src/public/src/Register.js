import React from 'react'
import config from './config'
import Nav from './Nav'

class Register extends React.Component {
    constructor() {
        super()

        this.state = {
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            accountType: '',
            wallet: '',
            gender: '',
            email: '',
            phone: '',
            country: '',
            city: ''
        }
    }

    async componentDidMount() {
        if(window.web3 == undefined) {
            return this.status('You must be connected to Metamask in Ropsten to register, reload the page after that')
        } else {
            const accounts = await web3.eth.getAccounts()
            if(accounts[0] == undefined) return this.status('You must be connected to Metamask in Ropsten to register, reload the page after that')
            this.refs.wallet.value = accounts[0]
            this.setState({ wallet: accounts[0] })
        }

        if(window.location.search.includes('not-logged')) {
            this.status('You must be logged or registered to access that page. Make sure your Metamask account is unlocked.')
        }

        $('[data-toggle="datepicker"]').datepicker();
    }

    status(message) {
        this.setState({
            status: message
        })
        this.refs.status.className = "status"
        scrollTo(0, 0)
        setTimeout(() => {
            this.refs.status.className = "status hidden"
        }, 5e3)
    }

    setStateAsync(state) {
        return new Promise(resolve => {
            this.setState(state, () => {
                resolve()
            })
        })
    }

    async registerButton() {
        const data = new FormData()
        data.append('data', JSON.stringify(this.state))

        await this.setStateAsync({ dateOfBirth: this.refs.dateOfBirth.value })

        if(this.state.firstName.length == 0) return this.status('You must set your first name')
        if(this.state.lastName.length == 0) return this.status('You must set your last name')
        if(this.state.dateOfBirth.length == 0) return this.status('You must set your date of birth')
        if(this.state.wallet.length == 0) return this.status('You must be connected to Metamask to set your wallet')
        if(this.state.gender.length == 0) return this.status('You must choose your gender')
        if(this.state.accountType.length == 0) return this.status('You must choose your account type')
        if(this.state.email.length == 0) return this.status('You must set your email')
        if(this.state.phone.length == 0) return this.status('You must set your phone')
        if(this.state.country.length == 0) return this.status('You must set your country')
        if(this.state.city.length == 0) return this.status('You must set your city')

        if(this.state.firstName.length >= 300) return this.status('Your first name is too long, reduce the length of it')
        if(this.state.lastName.length >= 300) return this.status('Your last name is too long, reduce the length of it')
        if(this.state.dateOfBirth.length >= 100) return this.status('Your date of birth is invalid please use a valid date')
        if(this.state.email.length >= 300) return this.status('Your email is too long, reduce the length of it')
        if(this.state.phone.length >= 300) return this.status('Your phone number is too long, reduce the length of it')
        if(this.state.country.length >= 300) return this.status('Your country is too long, reduce the length of it')
        if(this.state.city.length >= 300) return this.status('Your city is too long, reduce the length of it')

        // Check if the email is properly formatted
        if(!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(this.state.email)) {
            return this.status('The email is not properly formatted, please use a valid email')
        }

        let response = await fetch('/register-new', {
            method: 'post',
            body: data
        })
        response = await response.json()

        if(response.success) {
            this.status('Success! Your account was created')
        } else {
            this.status(response.msg)
        }

        setTimeout(() => {
            this.props.redirectTo(this.props.history, '/')
        }, 5e3)
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
                            <form className="width-100">
                                <div className="form-group">
                                    <p>First name</p>
                                    <input ref="firstName" onChange={event => { this.setState({ firstName: event.target.value })}} type="text" className="form-control" aria-describedby="inputTitle" placeholder="Your fist name..." />
                                </div>

                                <div className="form-group">
                                    <p>Last name</p>
                                    <input ref="lastName" onChange={event => { this.setState({ lastName: event.target.value })}} type="text" className="form-control" placeholder="Your last name..." />
                                </div>

                                <div className="form-group">
                                    <p>Your date of birth</p>
                                    <input ref="dateOfBirth" data-toggle="datepicker" className="form-control" placeholder="Click to choose..."/>
                                    <div data-toggle="datepicker"></div>
                                </div>

                                <div className="form-group">
                                    <p>Your ethereum wallet (automatic)</p>
                                    <input ref="wallet" type="text" className="form-control" readOnly/>
                                </div>

                                <div className="form-group">
                                    <p>Gender</p>

                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="customRadioInline1" name="customRadioInline1" onChange={event => { this.setState({ gender: 'male' }) }} className="custom-control-input"/>
                                        <label className="custom-control-label" htmlFor="customRadioInline1">Male</label>
                                    </div>

                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="customRadioInline2" name="customRadioInline1" onChange={event => { this.setState({ gender: 'female' }) }} className="custom-control-input"/>
                                        <label className="custom-control-label" htmlFor="customRadioInline2">Female</label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <p>Account type</p>
                                    <select ref="accountType" defaultValue="A" className="form-control" onChange={event => {
                                        this.setState({ accountType: event.target.value })
                                    }} >
                                        <option disabled value="A">--- choose your account type ---</option>
                                        <option value="subscriber">Subscriber</option>
                                        <option value="content-provider">Content Provider</option>
                                        <option value="advertiser">Advertiser</option>
                                        <option value="node">Node</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <p>Email</p>
                                    <input ref="email" onChange={event => { this.setState({ email: event.target.value })}} type="email" className="form-control" placeholder="Your email..." />
                                </div>

                                <div className="form-group">
                                    <p>Phone number</p>
                                    <input ref="phone" onChange={event => { this.setState({ phone: event.target.value })}} type="number" className="form-control" placeholder="Your phone number..." />
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
