import React from 'react';
import logo from '../logo_transparent.png'
class NavBarForPathFinding extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var {algorithm, startSorting , setWall , setWeight , onListChange, refresh, isWallOn, isWeightOn, isRunning} = this.props;
        var isWeightNotAvailable = algorithm == 'BreathFirstSearch' || algorithm == 'DepthFirstSearch' ? true : false;  
        return (
        <div className="nav-container-pf">
        <ul class="nav justify-content-center">
            <li className="nav-item">
            <img src={logo} className="image-logo" alt="logo"/>
            <div className="text-logo">Path Finding Visualizer</div>
            </li>
            <li className="nav-item">
                <button className="btn btn-start" onClick={startSorting} disabled={isRunning}>START!</button>
            </li>
            <li className="nav-item align-self-center">
                <SelectAlgorithmList onListChange={onListChange}/>
            </li>
            <li className="nav-item">
                <button className={`btn ${isWallOn ? 'text-danger': ''}`} onClick={setWall} disabled={isRunning} >WALL</button>
            </li>
            <li className="nav-item">
                <button className={`btn ${isWeightOn ? 'text-danger': ''}`} onClick={setWeight} disabled={isRunning || isWeightNotAvailable}>WEIGHT</button>
            </li>
            <li className="nav-item mr-auto">
                <button className="btn" onClick={refresh} disabled={isRunning}>REFRESH</button>
            </li>
        </ul>
        </div>
        );
    }
}

function SelectAlgorithmList(props) {
    var { onListChange } = props;
    return <select onChange={onListChange} className="browser-default custom-select">
            <option>Please Choose Algorithm</option>
            <option value="Dijktra">Dijktra</option>
            <option value="BreathFirstSearch">Breath First Search</option>
            <option value="DepthFirstSearch">Depth First Search</option>
            </select>
    }

export default NavBarForPathFinding;