import React from 'react'
import ContentProviderNav from './ContentProviderNav'
import config from './config'

// This is the dashboard of the content provider
class ContentProviderAdd extends React.Component {
    constructor() {
        super()
        this.state = {
            title: '',
            tags: '',
            description: '',
            category: '',
            files: '',
            advertiserId: ''
        }
    }

    cleanMetaTags(tags) {
        // Removes spaces between commas, multiple commas, commas at the beginning and commas at the end
        tags = tags.replace(/\s*,\s*/g, ',').replace(/,+/g,",").replace(/^,*/, "").replace(/,*$/, "")
        this.setState({ tags })
    }

    async uploadFile() {
        const data = new FormData()
        data.append('file', this.state.files[0])
        let stateCopy = Object.assign({}, this.state)
        delete stateCopy.files
        stateCopy.fileName = this.state.files[0].name
        data.append('stateObject', JSON.stringify(stateCopy))

        let uploadUrl
        if(window.location.origin == config.productionDomain) uploadUrl = config.productionDomain
        else uploadUrl = config.developmentDomain

        // It's important to not setup the 'content-type': 'multipart/form-data' header because fetch sets up the right version
        const response = await fetch(`${uploadUrl}/upload-file`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: data
        })
    }

    render() {
        return (
            <div>
                <ContentProviderNav activePage='add'/>

                <div className="content-provider-container">
                    <div className="container">
                        <div className="row">
                            <h2>Upload a new file</h2>
                        </div>

                        <br/>

                        <div className="row">
                            <form>
                                <div className="form-group">
                                    <p>Title</p>
                                    <input onChange={event => { this.setState({ title: event.target.value })}} type="text" className="form-control" aria-describedby="inputTitle" placeholder="Title of your file..."/>
                                </div>

                                <div className="form-group">
                                    <p>Meta tags</p>
                                    <input onChange={event => { this.cleanMetaTags(event.target.value) }} type="text" className="form-control" aria-describedby="inputTags" placeholder="Meta tags separated by commas..."/>
                                </div>

                                <div className="form-group">
                                    <p>Description</p>
                                    <textarea onChange={event => { this.setState({description: event.target.value}) }} type="text" className="form-control" aria-describedby="inputTitle" placeholder="File description..."></textarea>
                                </div>

                                <div className="form-group">
                                    <p>Category</p>
                                    <select className="form-control" onChange={event => { this.setState({category: event.target.value}) }}>
                                        <option>Feature Films</option>
                                        <option>Short Movies</option>
                                        <option>Web Series</option>
                                        <option>Documentary</option>
                                        <option>Celebrity Content</option>
                                        <option>Music Videos</option>
                                        <option>Movie Music</option>
                                        <option>Singer Specials</option>
                                        <option>Spiritual Music</option>
                                        <option>Instrumental Music</option>
                                        <option>Animation Episodes</option>
                                        <option>Animation Movies</option>
                                        <option>Animation Clips</option>
                                        <option>Animation Webseries</option>
                                        <option>Historical</option>
                                        <option>Mythological</option>
                                        <option>Scientific</option>
                                        <option>Comics</option>
                                        <option>Moral Stories</option>
                                    </select>
                                </div>

                                <p>File</p>
                                <div className="custom-file">
                                    <input onChange={event => {
                                      this.setState({files: event.target.files})
                                      this.refs.fileLabel.innerHTML = event.target.files[0].name
                                    }} type="file" className="custom-file-input" id="validatedCustomFile" required />
                                    <label ref="fileLabel" className="custom-file-label" htmlFor="validatedCustomFile">Choose file...</label>
                                    <div className="invalid-feedback">Example invalid custom file feedback</div>
                                </div>

                                <br/>
                                <br/>

                                <div className="choose-advertiser">
                                    <p>Advertiser</p>
                                    <div className="container">
                                        <div className="row">
                                            <Advertiser
                                                id="1"
                                                updateAdvertiserSelected={id => this.setState({advertiserId: id})}
                                            />
                                            <Advertiser
                                                id="2"
                                                updateAdvertiserSelected={id => this.setState({advertiserId: id})}
                                            />
                                            <Advertiser
                                                id="3"
                                                updateAdvertiserSelected={id => this.setState({advertiserId: id})}
                                            />
                                            <Advertiser
                                                id="4"
                                                updateAdvertiserSelected={id => this.setState({advertiserId: id})}
                                            />
                                            <Advertiser
                                                id="5"
                                                updateAdvertiserSelected={id => this.setState({advertiserId: id})}
                                            />
                                            <Advertiser
                                                id="6"
                                                updateAdvertiserSelected={id => this.setState({advertiserId: id})}
                                            />
                                            <Advertiser
                                                id="7"
                                                updateAdvertiserSelected={id => this.setState({advertiserId: id})}
                                            />
                                            <Advertiser
                                                id="8"
                                                updateAdvertiserSelected={id => this.setState({advertiserId: id})}
                                            />
                                            <Advertiser
                                                id="9"
                                                updateAdvertiserSelected={id => this.setState({advertiserId: id})}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <br/>
                                <br/>

                                <button className="btn btn-primary" type="button" onClick={() => { this.uploadFile() }}>Upload Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function Advertiser(props) {
    return (
        <div id={props.id} className="advertiser-block" onClick={e => {
            document.querySelectorAll('.advertiser-block.selected').forEach(element => {
                element.className = 'advertiser-block'
            })
            e.currentTarget.className = 'advertiser-block selected'
            props.updateAdvertiserSelected(props.id)
        }}>
            <img src={`imgs/logo${props.id}.png`} />
            <b>Advertiser name</b>
            <p>Pays 15 BUCKY per 1000 downloads</p>
        </div>
    )
}

export default ContentProviderAdd
