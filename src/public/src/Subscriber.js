import React from 'react'
import AccessManager from './AccessManager'

class Subscriber extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <AccessManager accountType="subscriber" />
                This is the subscriber page
            </div>
        )
    }
}

export default Subscriber
