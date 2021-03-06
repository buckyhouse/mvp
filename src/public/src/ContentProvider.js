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
        const response = await fetch(`${uploadUrl}/get-files?c=100`)
        let res = await response.json()
        let cards = res.map((file, i) => (
            <Card key={file._id} id={file._id} className="col-md" updateState={() => {
                this.setState({deleteId: file._id})
            }} editFile={() => {
                let data = {
                    _id: file._id,
                    title: file.title,
                    tags: file.tags,
                    description: file.description,
                    category: file.category,
                    file: file.ipfs,
                    advertiserId: file.advertiserId,
                    revenueModel: file.revenueModel,
                    fixedPayment: file.fixedPayment,
                    daysAvailable: file.daysAvailable,
                    snapshotIpfsFile: file.snapshotIpfsFile
                }

                this.props.editFile(this.props.history, data)
            }} {...file} />
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

class Card extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="card-dashboard list-group-item list-group-item-action flex-column align-items-start">

                <div className="card-container-dashboard">
                    <img className="snapshot-image-content-provider" src={"https://gateway.ipfs.io/ipfs/" + this.props.snapshotIpfsFile} />

                    <div className="container">
                        <div className="row">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="col-md-8">{this.props.title}</h5>
                                <small className="col-md-4 text-right">3 days ago</small>
                            </div>
                            <p className="mb-1">{this.props.description}</p>
                        </div>
                        <div className="row">
                            <a className="col-md-8 padding-left-0" href={"https://gateway.ipfs.io/ipfs/" + this.props.ipfs} target="_blank">{this.props.ipfs}</a>
                        </div>
                        <div className="row">
                            <p className="tags-dashboard">{'#' + this.props.tags.split(',').join(' #')}</p>
                        </div>
                        <div className="row">
                            <p>{this.props.category}</p>
                        </div>
                        <div className="row">
                            <small className="col-md-3 padding-left-0">253 downloads</small>
                            <small className={(this.props.revenueModel == 'Fixed payment') ? 'col-md-4' : 'hidden'}>Pay per view of <span className="bucky-small-text">{this.props.fixedPayment} BUCKY</span></small>
                            <small className={(this.props.revenueModel == 'Fixed payment') ? 'col-md-3 padding-left-0' : 'hidden'}>Fixed Payment</small>
                            <small className={(this.props.revenueModel == 'Advertising') ? 'col-md-4 padding-left-0' : 'hidden'}>Pay per 1000 views of <span className="bucky-small-text">50 BUCKY</span></small>
                            <small className={(this.props.revenueModel == 'Advertising') ? 'col-md-3 padding-left-0' : 'hidden'}>Advertiser B</small>
                            <small className={(this.props.revenueModel == 'Free') ? 'col-md-3 padding-left-0' : 'hidden'}>Free content</small>
                        </div>
                        <div className={(this.props.revenueModel == 'Fixed payment') ? "row" : 'hidden'}>
                            <i>The content will be available for {this.props.daysAvailable} after payment for each user</i>
                        </div>
                    </div>
                    <div className="buttons-list">
                        <button className="btn btn-outline-primary" onClick={() => {
                            this.props.editFile()
                        }}>Edit</button>
                        <button className="btn btn-outline-secondary" data-toggle="modal" data-target="#delete-modal" onClick={() => {
                            this.props.updateState()
                        }}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContentProvider
