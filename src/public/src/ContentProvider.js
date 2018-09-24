import React from 'react'
import ContentProviderNav from './ContentProviderNav'

// This is the dashboard of the content provider
class ContentProvider extends React.Component {
    render() {
        return (
            <div>
                <ContentProviderNav activePage='dashboard'/>

                <div className="content-provider-container">
                    <h2>Your files</h2>
                    <br/>

                    <div className="list-group">
                        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">This is the title of your file</h5>
                                <small>3 days ago</small>
                            </div>
                            <p className="mb-1">This is the descriptive content of the file that you just uploaded</p>
                            <small>253 downloads</small>
                            <small className="bucky-small-text">50 BUCKY</small>
                            <div className="buttons-list">
                                <button className="btn btn-outline-primary" data-toggle="modal" data-target="#delete-modal">Edit</button>
                                <button className="btn btn-outline-secondary" data-toggle="modal" data-target="#delete-modal">Delete</button>
                            </div>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">This is the title of your file</h5>
                                <small>5 days ago</small>
                            </div>
                            <p className="mb-1">This is the descriptive content of the file that you just uploaded</p>
                            <small>957 downloads</small>
                            <small className="bucky-small-text">655 BUCKY</small>
                            <div className="buttons-list">
                                <button className="btn btn-outline-primary">Edit</button>
                                <button className="btn btn-outline-secondary">Delete</button>
                            </div>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">This is the title of your file</h5>
                                <small>201 days ago</small>
                            </div>
                            <p className="mb-1">This is the descriptive content of the file that you just uploaded</p>
                            <small>15,044 downloads</small>
                            <small className="bucky-small-text">9756 BUCKY</small>
                            <div className="buttons-list">
                                <button className="btn btn-outline-primary">Edit</button>
                                <button className="btn btn-outline-secondary">Delete</button>
                            </div>
                        </a>
                    </div>


                    {/* Modal for deleting elements */}
                    <div className="modal fade" id="delete-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Are you sure that you want to delete that file?</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            The file will be deleted from all IPFS nodes and you won't be able to recover it unless you upload a new copy.
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary">Delete now</button>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContentProvider
