import React from 'react'
import ContentProviderNav from './ContentProviderNav'

// This is the dashboard of the content provider
class ContentProvider extends React.Component {
    render() {
        return (
            <div>
                <ContentProviderNav activePage='dashboard'/>
                <div className="list-group">
                    <a href="" className="list-group-item list-group-item-action flex-column align-items-start active">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">This is the title of your file</h5>
                            <small>29 days ago</small>
                        </div>
                        <p className="mb-1">This is the descriptive content of the file that you just uploaded</p>
                        <small>Hi</small>
                    </a>
                </div>
            </div>
        )
    }
}

export default ContentProvider
