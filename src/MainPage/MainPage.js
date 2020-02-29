import React from 'react';
import { Link } from 'react-router-dom';
class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <div className="container-fluid main-page">
            <div className="row content-container justify-content-center">
                <div className="text-center color-white">WELCOME TO ALGORITHM VISUALIZER APPLICATION</div>
                <p></p>
            </div>
            <div className="row">
            <div className="col-sm">
            <Link className="sorting-shape" to="/sorting"><span>SORTING VISUALIZER</span></Link>
            </div>
            <div className="col-sm">
            <Link className="path-finding-shape" to="/path-finding"><span>PATH FINDING VISUALIZER</span></Link>
            </div>
            </div>
        </div>
        );
    }
}

export default MainPage;