import React from 'react'
import ContentProviderNav from './ContentProviderNav'
import config from './config'

// This is the dashboard of the content provider
class ContentProvider extends React.Component {
    constructor() {
        super()
        this.state = {
            cards: [],
            deleteId: '',
            status: ''
        }
        this.getFiles()
    }

    async getFiles() {
        let uploadUrl
        if(window.location.origin == config.productionDomain) uploadUrl = config.productionDomain
        else uploadUrl = config.developmentDomain
        const response = await fetch(`${uploadUrl}/get-files?c=10`)
        let res = await response.json()
        let cards = res.map((file, i) => (
            <Card key={file._id} id={file._id} className="col-md" updateState={() => {
                this.setState({deleteId: file._id})
            }} title={file.title} description={file.description} ipfs={file.ipfs} />
        ))

        this.setState({cards})
    }

    async deleteFile() {
        let uploadUrl
        if(window.location.origin == config.productionDomain) uploadUrl = config.productionDomain
        else uploadUrl = config.developmentDomain
        let response = await fetch(`${uploadUrl}/delete-file?id=${this.state.deleteId}`)
        response = await response.json()

        // Close the modal
        document.querySelector('.close').click()
        if(response.success) {
            this.setState({
                status: 'File deleted successfully'
            })
        } else {
            this.setState({
                status: 'Error deleting the file, try again'
            })
        }

        scrollTo(0, 0)
        this.refs.status.className = "status"

        setTimeout(() => {
            this.refs.status.className = "status hidden"
        }, 5e3)

        $('#delete-modal').on('hidden.bs.modal', () => {
            scrollTo(0, 0)
        })

        this.getFiles()
    }

    render() {
        return (
            <div>
                <ContentProviderNav activePage='dashboard'/>

                <div ref="status" className="status hidden">{this.state.status}</div>

                <div className="content-provider-container">
                    <div className="container">
                        <div className="row">
                            <h2>Your files</h2>
                        </div>

                        <br/>

                        <div className="row">
                            <div className="list-group">
                                {this.state.cards}
                            </div>
                            {/* Modal for deleting elements */}
                            <div className="modal fade" id="delete-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Are you sure that you want to delete that file?</h5>
                                    <a href="#" className="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </a>
                                  </div>
                                  <div className="modal-body">
                                    The file will be deleted from all IPFS nodes and you won't be able to recover it unless you upload a new copy.
                                  </div>
                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    <button type="button" className="btn btn-primary" onClick={() => {this.deleteFile()}}>Delete now</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function Card(props) {
    return (
        <div className="card-dashboard list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="col-md-8">{props.title}</h5>
                <small className="col-md-4 text-right">3 days ago</small>
            </div>
            <p className="mb-1">{props.description}</p>
            <div className="container no-space-left">
                <div className="row">
                    <a className="col-md-8" href={"https://gateway.ipfs.io/ipfs/" + props.ipfs} target="_blank">{props.ipfs}</a>
                    <small className="col-md-2">253 downloads</small>
                    <small className="col-md-2 bucky-small-text">50 BUCKY</small>
                </div>
            </div>
            <div className="buttons-list">
                <button className="btn btn-outline-primary" data-toggle="modal" data-target="#delete-modal" onClick={() => {
                    props.updateState()
                }}>Edit</button>
                <button className="btn btn-outline-secondary" data-toggle="modal" data-target="#delete-modal" onClick={() => {
                    props.updateState()
                }}>Delete</button>
            </div>
        </div>
    )
}

export default ContentProvider
