import React from 'react'
import ContentProviderNav from './ContentProviderNav'

// This is the dashboard of the content provider
class ContentProviderAdd extends React.Component {
    constructor() {
        super()
        this.state = {
            title: '',
            tags: '',
            description: '',
            files: ''
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
        data.append('title', this.state.title)
        data.append('description', this.state.description)
        data.append('tags', this.state.tags)

        // It's important to not setup the 'content-type': 'multipart/form-data' header because fetch sets up the right version
        const response = await fetch('http://localhost:8123/upload-file', {
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
                    <h2>Upload a new file</h2>
                    <br/>
                    <form>
                        <div className="form-group">
                            <input onChange={event => { this.setState({ title: event.target.value })}} type="text" className="form-control" aria-describedby="inputTitle" placeholder="Title of your file"/>
                        </div>

                        <div className="form-group">
                            <input onChange={event => { this.cleanMetaTags(event.target.value) }} type="text" className="form-control" aria-describedby="inputTags" placeholder="Meta tags separated by commas"/>
                        </div>

                        <div className="form-group">
                            <textarea onChange={event => { this.setState({description: event.target.value}) }} type="text" className="form-control" aria-describedby="inputTitle" placeholder="File description"></textarea>
                        </div>

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
                            <h4>Choose the advertiser</h4>
                            <div className="container">
                                <div className="row">
                                    <Advertiser />
                                    <Advertiser />
                                    <Advertiser />
                                    <Advertiser />
                                    <Advertiser />
                                    <Advertiser />
                                    <Advertiser />
                                    <Advertiser />
                                    <Advertiser />
                                    <Advertiser />
                                    <Advertiser />
                                </div>
                            </div>
                        </div>

                        <br/>
                        <br/>

                        <button className="btn btn-primary" type="button" onClick={() => { this.uploadFile() }}>Upload Now</button>
                    </form>
                </div>
            </div>
        )
    }
}

function Advertiser(props) {
    return (
        <div>
            <b>Advertiser name</b>
            <p>Pays 15 BUCKY per 1000 downloads</p>
        </div>
    )
}

export default ContentProviderAdd
