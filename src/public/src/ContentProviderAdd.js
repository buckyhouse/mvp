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
            status: '',
            revenueModel: '',
            fixedPayment: '',
            daysAvailable: ''
        }
    }

    componentDidMount() {
        if(Object.keys(this.props.editFile).length > 0) {
            this.refs.title.value = this.props.editFile.title
            this.refs.tags.value = this.props.editFile.tags
            this.refs.description.value = this.props.editFile.description
            this.refs.category.value = this.props.editFile.category
            this.refs.revenueModel.value = this.props.editFile.revenueModel
            this.refs.fixedPayment.value = this.props.editFile.fixedPayment

            if(this.props.editFile.revenueModel == 'Fixed payment') {
                this.refs.fixedPaymentContainer.className = 'form-group'
                this.refs.advertiserContainer.className = 'choose-advertiser hidden'
                this.refs.daysAvailable.value = this.props.editFile.daysAvailable
            } else if(this.props.editFile.revenueModel == 'Advertising') {
                this.refs.fixedPaymentContainer.className = 'form-group hidden'
                this.refs.advertiserContainer.className = 'choose-advertiser'
                this.refs.fixedPayment.value = ''
            }

            this.setState({
                _id: this.props.editFile._id,
                title: this.props.editFile.title,
                tags: this.props.editFile.tags,
                description: this.props.editFile.description,
                category: this.props.editFile.category,
                ipfsFile: this.props.editFile.file,
                advertiserId: this.props.editFile.advertiserId,
                revenueModel: this.props.editFile.revenueModel,
                fixedPayment: this.props.editFile.fixedPayment,
                daysAvailable: this.props.editFile.daysAvailable
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

        if(this.state.title.length > 100) return this.showStatus('The title is limited to 100 characters, please reduce it')
        if(this.state.description.length > 500) return this.showStatus('The description is limited to 500 characters, please reduce it')
        if(this.state.tags.length > 500) return this.showStatus('The total length of the tags is limited to 500 characters, please reduce it')
        if(this.state.revenueModel == 'Fixed payment' && this.state.fixedPayment.length == 0) return this.showStatus('You must setup a fixed payment per view')
        if(this.state.revenueModel == 'Advertising' && this.state.advertiserId.length == 0) return this.showStatus('You must choose an advertiser')

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
            if(this.refs.status) this.refs.status.className = "status hidden"
        }, 5e3)
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
                            <form className="width-100">
                                <div className="form-group">
                                    <p>Title</p>
                                    <input ref="title" onChange={event => { this.setState({ title: event.target.value })}} type="text" className="form-control" aria-describedby="inputTitle" placeholder="Title of your file, max 100 characters..." maxLength="100"/>
                                </div>

                                <div className="form-group">
                                    <p>Meta tags</p>
                                    <input ref="tags" onChange={event => { this.cleanMetaTags(event.target.value) }} type="text" className="form-control" aria-describedby="inputTags" placeholder="Meta tags separated by commas, without the hash icon (#)..." maxLength="500"/>
                                </div>

                                <div className="form-group">
                                    <p>Description</p>
                                    <textarea ref="description" onChange={event => {
                                        let description = event.target.value.replace(/(\s\s+)/g, " ").split(' ', 50).join(' ')
                                        this.refs.description.value = description

                                        this.setState({description: description})
                                    }} type="text" className="form-control" aria-describedby="inputTitle" placeholder="File description, max 500 characters and 50 words..." maxLength="500"></textarea>
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
                                        <option>Other</option>
                                    </select>
                                </div>

                                <p>File</p>
                                <div className="custom-file">
                                    <input onChange={event => {
                                      this.setState({files: event.target.files})
                                      this.refs.fileLabel.innerHTML = event.target.files[0].name
                                  }} type="file" className="custom-file-input" id="validatedCustomFile" required />
                                    <label ref="fileLabel" className="custom-file-label" htmlFor="validatedCustomFile">Choose file...</label>
                                </div>

                                <br/>
                                <br/>

                                <div className="form-group">
                                    <p>Revenue model</p>
                                    <select ref="revenueModel" defaultValue="A" className="form-control" onChange={event => {
                                        const optionSelected = event.target.value
                                        this.setState({revenueModel: optionSelected})
                                        if(optionSelected == 'Fixed payment') {
                                            this.refs.fixedPaymentContainer.className = 'form-group'
                                            this.refs.advertiserContainer.className = 'choose-advertiser hidden'
                                            this.refs.daysAvailable.value = ''
                                            this.setState({advertiserId: ''})
                                        } else if(optionSelected == 'Advertising') {
                                            this.refs.fixedPaymentContainer.className = 'form-group hidden'
                                            this.refs.advertiserContainer.className = 'choose-advertiser'
                                            this.refs.fixedPayment.value = ''
                                            this.refs.daysAvailable.value = ''
                                            this.setState({fixedPayment: ''})
                                        } else {
                                            this.refs.fixedPaymentContainer.className = 'form-group hidden'
                                            this.refs.advertiserContainer.className = 'choose-advertiser hidden'
                                            this.refs.fixedPayment.value = ''
                                            this.refs.daysAvailable.value = ''
                                            this.setState({fixedPayment: '', advertiserId: ''})
                                        }
                                    }} >
                                        <option disabled value="A">--- choose one ---</option>
                                        <option>Fixed payment</option>
                                        <option>Advertising</option>
                                        <option>Free</option>
                                    </select>
                                </div>

                                <div ref="fixedPaymentContainer" className="form-group hidden">
                                    <div className="form-group">
                                        <input ref="fixedPayment" onChange={event => {
                                            this.setState({fixedPayment: event.target.value})
                                        }} type="number" className="form-control" placeholder="Number of BUCKY tokens per view/download..." />
                                    </div>

                                    <div className="form-group">
                                        <select ref="daysAvailable" defaultValue="" className="form-control" onChange={event => {
                                            const optionSelected = event.target.value
                                            this.setState({daysAvailable: optionSelected})
                                        }} >
                                            <option disabled value="">--- choose how many days the content will be available for buyers ---</option>
                                            <option>30 days</option>
                                            <option>60 days</option>
                                            <option>90 days</option>
                                        </select>
                                    </div>
                                </div>

                                <div ref="advertiserContainer" className="choose-advertiser hidden">
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
