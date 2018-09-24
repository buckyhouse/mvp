import React from 'react'
import ContentProviderNav from './ContentProviderNav'

// This is the dashboard of the content provider
class ContentProviderAdd extends React.Component {
    render() {
        return (
            <div>
                <ContentProviderNav activePage='add'/>

                <div className="content-provider-container">
                    <h2>Upload a new file</h2>
                    <br/>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" aria-describedby="inputTitle" placeholder="Title of your file"/>
                        </div>

                        <div className="form-group">
                            <input type="text" className="form-control" aria-describedby="inputTitle" placeholder="Meta tags separated by commas"/>
                        </div>

                        <div className="form-group">
                            <textarea type="text" className="form-control" aria-describedby="inputTitle" placeholder="File description"></textarea>
                        </div>

                        <div className="custom-file">
                          <input type="file" className="custom-file-input" id="validatedCustomFile" required />
                          <label className="custom-file-label" htmlFor="validatedCustomFile">Choose file...</label>
                          <div className="invalid-feedback">Example invalid custom file feedback</div>
                        </div>

                        <br/>
                        <br/>

                        <button className="btn btn-primary">Upload Now</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ContentProviderAdd
