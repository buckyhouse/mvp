// Makes calls to the server to see if the user should be accessing this page or nay
import React from 'react'
import Web3 from 'web3'

class AccessManager extends React.Component {
    constructor(props) {
        super(props)
        window.web3 = new Web3(web3.currentProvider)
        this.checkAccess()
    }

    async checkAccess() {
        const account = (await web3.eth.getAccounts())[0]

        let response = await fetch(`/check-access?account-type=${this.props.accountType}&wallet=${account}`)
        response = await response.json()

        if(!response.hasAccess) window.location = '/register?not-logged'
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default AccessManager
