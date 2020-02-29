import React from 'react';
import logo from '../logo_transparent.png'
class NavBarForSorting extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var {startSorting, onListChange, changeNumberOfItem, changeSortingSpeed, isRunning} = this.props; 
        return (
        <div className="nav-container-s">
        <ul class="nav justify-content-center">
            <li className="nav-item">
            <img src={logo} className="image-logo" alt="logo"/>
            <div className="text-logo">Sorting Visualizer</div>
            </li>
            <li className="nav-item">
                <button className="btn btn-start-s" onClick={startSorting} disabled={isRunning}>START!</button>
            </li>
            <li className="nav-item align-self-center">
                <SelectAlgorithmList onListChange={onListChange} isRunning={isRunning}/>
            </li>
            <li className="nav-item">
                <label for="customRangeForNumberOfItem">Change Array Sizes</label>
                <input id="customRangeForNumberOfItem"className="custom-range" type="range" min="10" max="150" step='5' onChange={changeNumberOfItem} disabled={isRunning}/>
            </li>
            <li className="nav-item mr-auto">
                <label for="customRangeForSpeed" style={{marginBottom:'3px'}}>Choose Speed</label>
                {/* <input id="customRangeForSpeed"className="custom-range" type="range" min="0" max="1000" step='5' onChange={changeSortingSpeed}/> */}
                <select class="form-control form-control-sm" onChange={changeSortingSpeed} disabled={isRunning}>
                    <option>Low</option>
                    <option>Normal</option>
                    <option selected>Fast</option>
                </select>
            </li>
        </ul>
        </div>
        );
    }
}

function SelectAlgorithmList(props) {
    var { onListChange, isRunning } = props;
    return <select onChange={onListChange} className="browser-default custom-select" disabled={isRunning} >
            <option>Please Choose Algorithm</option>
            <option value="Bubble">Bubble Sort</option>
            <option value="Selection">Selection Sort</option>
            <option value="Quick">Quick Sort</option>
            <option value="Merge">Merge Sort</option>
            </select>
    }

export default NavBarForSorting;