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
            category: 'Feature Films', // Default category
            files: false,
            ipfsFile: false,
            advertiserId: '',
            status: ''
        }
    }

    componentDidMount() {
        if(this.props.editFile) {
            this.refs.title.value = this.props.editFile.title
            this.refs.tags.value = this.props.editFile.tags
            this.refs.description.value = this.props.editFile.description
            this.refs.category.value = this.props.editFile.category

            this.setState({
                title: this.props.editFile.title,
                tags: this.props.editFile.tags,
                description: this.props.editFile.description,
                category: this.props.editFile.category,
                ipfsFile: this.props.editFile.file,
                advertiserId: this.props.editFile.advertiserId,
                _id: this.props.editFile._id
            })
        }
    }

    cleanMetaTags(tags) {
        // Removes spaces between commas, multiple commas, commas at the beginning and commas at the end
        tags = tags.replace(/\s*,\s*/g, ',').replace(/,+/g,",").replace(/^,*/, "").replace(/,*$/, "")
        this.setState({ tags })
    }

    async uploadFile() {
        let editedFile = false
        const data = new FormData()
        let stateCopy = Object.assign({}, this.state)
        let uploadUrl
        let response
        let editOrUploadUrl

        // If there are props for the edit file, we set the edition as true
        if(Object.keys(this.props.editFile).length > 0) editedFile = true

        // If you select a new file update this else just show a message if you are adding a new file
        if(this.state.files) {
            data.append('file', this.state.files[0])
            delete stateCopy.files
            stateCopy.fileName = this.state.files[0].name
        } else if(!editedFile && !this.state.files) {
            return showStatus('Error you must select a file to upload')
        }
        data.append('stateObject', JSON.stringify(stateCopy))

        if(window.location.origin == config.productionDomain) uploadUrl = config.productionDomain
        else uploadUrl = config.developmentDomain

        if(editedFile) {
            editOrUploadUrl = `${uploadUrl}/edit-file`
        } else {
            editOrUploadUrl = `${uploadUrl}/upload-file`
        }

        // It's important to not setup the 'content-type': 'multipart/form-data' header because fetch sets up the right version
        response = await fetch(editOrUploadUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: data
        })

        response = await response.json()
        if(response.success) {
            scrollTo(0, 0)
            this.showStatus('File uploaded successfully')
        } else {
            scrollTo(0, 0)
            this.showStatus('Error uploading the file, try again')
        }
    }

    showStatus(message) {
        this.setState({
            status: message
        })
        this.refs.status.className = "status"
        setTimeout(() => {
            this.refs.status.className = "status hidden"
        }, 5e3)
    }

    async editFile(_id) {

    }

    render() {
        return (
            <div>
                <ContentProviderNav activePage='add'/>

                <div ref="status" className="status hidden">{this.state.status}</div>

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
                                    <input ref="title" onChange={event => { this.setState({ title: event.target.value })}} type="text" className="form-control" aria-describedby="inputTitle" placeholder="Title of your file..." />
                                </div>

                                <div className="form-group">
                                    <p>Meta tags</p>
                                    <input ref="tags" onChange={event => { this.cleanMetaTags(event.target.value) }} type="text" className="form-control" aria-describedby="inputTags" placeholder="Meta tags separated by commas..." />
                                </div>

                                <div className="form-group">
                                    <p>Description</p>
                                    <textarea ref="description" onChange={event => { this.setState({description: event.target.value}) }} type="text" className="form-control" aria-describedby="inputTitle" placeholder="File description..." ></textarea>
                                </div>

                                <div className="form-group">
                                    <p>Category</p>
                                    <select ref="category" className="form-control" onChange={event => { this.setState({category: event.target.value}) }} >
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
                                                selected={this.state.advertiserId}
                                            />
                                            <Advertiser
                                                id="2"
                                                updateAdvertiserSelected={id => this.setState({advertiserId: id})}
                                                selected={this.state.advertiserId}
                                            />
                                            <Advertiser
                                                id="3"
                                                updateAdvertiserSelected={id => this.setState({advertiserId: id})}
                                                selected={this.state.advertiserId}
                                            />
                                            <Advertiser
                                                id="4"
                                                updateAdvertiserSelected={id => this.setState({advertiserId: id})}
                                                selected={this.state.advertiserId}
                                            />
                                            <Advertiser
                                                id="5"
                                                updateAdvertiserSelected={id => this.setState({advertiserId: id})}
                                                selected={this.state.advertiserId}
                                            />
                                            <Advertiser
                                                id="6"
                                                updateAdvertiserSelected={id => this.setState({advertiserId: id})}
                                                selected={this.state.advertiserId}
                                            />
                                            <Advertiser
                                                id="7"
                                                updateAdvertiserSelected={id => this.setState({advertiserId: id})}
                                                selected={this.state.advertiserId}
                                            />
                                            <Advertiser
                                                id="8"
                                                updateAdvertiserSelected={id => this.setState({advertiserId: id})}
                                                selected={this.state.advertiserId}
                                            />
                                            <Advertiser
                                                id="9"
                                                updateAdvertiserSelected={id => this.setState({advertiserId: id})}
                                                selected={this.state.advertiserId}
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
    let isThisSelected = false
    if(props.selected == props.id) isThisSelected = true

    return (
        <div id={props.id} className={(isThisSelected) ? "advertiser-block selected" : "advertiser-block"} onClick={e => {
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
