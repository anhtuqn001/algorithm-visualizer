import React from 'react';
import logoWeightLarge from '../logo_weight_large.png';
import logoStartLarge from '../logo_start_large.png';
import logoEndLarge from '../logo_end_large.png';
import logoWallLarge from '../logo_wall_large.png'

class Notation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="container d-flex justify-content-between align-items-center" style={{height: '45px'}}>
            <div className="d-flex align-items-center"><img src={logoStartLarge}/><span className="logo-text">Start Node</span></div>
            <div className="d-flex align-items-center"><img src={logoEndLarge}/><span className="logo-text">End Node</span></div>
            <div className="d-flex align-items-center"><div className="logo-visited-large"></div><div className="logo-text">Visited Node</div></div>
            <div className="d-flex align-items-center"><img src={logoWallLarge}/><span className="logo-text">Wall Node</span></div>
            <div className="d-flex align-items-center"><div className="logo-shortest-large"></div><div className="logo-text">Shortest Path</div></div>
            <div className="d-flex align-items-center"><img src={logoWeightLarge}/><span className="logo-text">Weight Node</span></div>
            
        </div>
        );
    }
}
export default Notation;