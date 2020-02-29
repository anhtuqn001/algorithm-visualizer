import React from 'react';
import NodeGrid from '../Node/NodeGrid';
import NavBarForPathFinding from '../NavigationBar/NavBarForPathFinding'
import Dijktra from '../Algorithms/Dijktra';
import BreathFirstSearch from '../Algorithms/BreathFirstSearch';
import DepthFirstSearch from '../Algorithms/DepthFirstSearch';
import Notation from '../Notation/Notation'

const NUMBER_OF_ROW = 20;
const START_NODE_ROW = 10;
const START_NODE_COL = 20;
const NUMBER_OF_COLUMN = 54;
const END_NODE_ROW = 10;
const END_NODE_COL = 40;


class PathFindingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            isWallOn: false,
            isWeightOn: false,
            isMouseDown: false,
            algorithm: null,
            isStartNodeClicked: false,
            isEndNodeClicked: false,
            justLeftNode: {row: null, col: null},
            isRunning: false
        };
        this.startSorting = this.startSorting.bind(this);
        this.animateAlgorithm = this.animateAlgorithm.bind(this);
        this.animateShortestPath = this.animateShortestPath.bind(this);
        this.setWall = this.setWall.bind(this);
        this.setWeight = this.setWeight.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.makeWallOrWeight = this.makeWallOrWeight.bind(this);
        this.onListChange = this.onListChange.bind(this);
        this.refresh = this.refresh.bind(this);
        this.removeOldStartEndNode = this.removeOldStartEndNode.bind(this);
    }

    componentDidMount() {
        this.setState({
            grid: [...CreateGrid()]
        });
    }

    startSorting() {
        const { grid, algorithm } = this.state;
        let newGrid = grid.map(row => row.map(i => Object.assign({}, i)));
        var startNode = GetStartNode(newGrid);
        var endNode = GetEndNode(newGrid);
        var chosenAlgorithm = getAlgorithm(algorithm);
        if (chosenAlgorithm == null) {
            console.log("Please choose algorithm");
        }
        else {
            var inOrderVisitedList = chosenAlgorithm(newGrid, startNode, endNode);
            this.setState({ isRunning : true, isWallOn: false, isWeightOn: false })
            this.animateAlgorithm(inOrderVisitedList);
        }
        
    }

    animateAlgorithm(inOrderVisitedList) {
        for (let i = 0; i < inOrderVisitedList.length; i++) {
            if (i === inOrderVisitedList.length - 1 && inOrderVisitedList[i].isDestination) {
                setTimeout(() => {
                    this.animateShortestPath(inOrderVisitedList[i]);
                }, i * 20);
            }
            setTimeout(() => {
                const node = inOrderVisitedList[i];
                const { row, col } = node;
                document.getElementById(`${row}-${col}`).classList.add("node-isVisited");
            }, i * 20);
        }
    }

    animateShortestPath(endNode) {
        var shortestPathInOrder = [];
        while (endNode != null) {
            endNode.isShortestPathNode = true;
            shortestPathInOrder.unshift(endNode);
            endNode = endNode.previousNode;
        }

        for (let i = 0; i < shortestPathInOrder.length; i++) {
            if (i == 0 || i == shortestPathInOrder.length - 1) {
                setTimeout(() => {
                    const node = shortestPathInOrder[i];
                    const { row, col } = node;
                    document.getElementById(`${row}-${col}`).classList.add("node-shortest");
                }, i * 30);
                if (i === 0) continue;
                if (i === shortestPathInOrder.length - 1) {
                    this.setState({ isRunning: false });
                    break;
                } 
            }
            setTimeout(() => {
                const node = shortestPathInOrder[i];
                const nextnode = shortestPathInOrder[i + 1];
                const { row, col } = node;
                const { row: nextRow, col: nextCol } = nextnode;
                if (nextRow > row) {
                    document.getElementById(`${row}-${col}`).classList.add("node-shortest-down");
                }
                if (nextRow < row) {
                    document.getElementById(`${row}-${col}`).classList.add("node-shortest-up");
                }
                if (nextCol < col) {
                    document.getElementById(`${row}-${col}`).classList.add("node-shortest-left");
                }
                if (nextCol > col) {
                    document.getElementById(`${row}-${col}`).classList.add("node-shortest-right");
                }
            }, i * 30);
        }
    }

    setWall() {
        var { isWallOn, isWeightOn } = this.state;
        if (isWeightOn == true) {
            this.setState({ isWeightOn: false });
        }
        this.setState({ isWallOn: !isWallOn });
    }

    setWeight() {
        var { isWallOn, isWeightOn } = this.state;
        if (isWallOn == true) {
            this.setState({ isWallOn: false });
        }
        this.setState({ isWeightOn: !isWeightOn });
    }

    handleMouseDown(e) {
        var { grid, isMouseDown } = this.state;
        if(isMouseDown) return;
        let nodeId = e.target.id;
        let rowColArray = nodeId.split("-");
        let row = rowColArray[0];
        let col = rowColArray[1];
        if (grid[row][col].isStart) {
            this.setState({
                isMouseDown: true,
                isStartNodeClicked: true,
            });
        } else if (grid[row][col].isDestination) {
            this.setState({
                isMouseDown: true,
                isEndNodeClicked: true,
            })
        } else {
            this.setState({
                isMouseDown: true
            })
        }
    }

    handleMouseUp() {
        this.setState({
            isMouseDown: false,
            isStartNodeClicked: false,
            isEndNodeClicked: false
        })
    }

    makeWallOrWeight(row, col, isAnimationEnd) {
        let { isWallOn, isWeightOn, grid, isStartNodeClicked, isEndNodeClicked, justLeftNode } = this.state;
        let { row : justLeftRow, col : justLeftCol } = justLeftNode;
        let newGrid = grid.slice();
        let node = newGrid[row][col];
        let leftNode = newGrid[justLeftRow][justLeftCol];
        let nodeToBeAnimated = document.getElementById(`${row}-${col}`);
        let leftNodeToBeAnimated = document.getElementById(`${justLeftRow}-${justLeftCol}`);
        let isleftNodeAndCurrentNodeTheSame = justLeftRow == row && justLeftCol == col;
        if (isStartNodeClicked) {
            nodeToBeAnimated.classList.add("node-start");
            node.isStart = true;
            if(!isleftNodeAndCurrentNodeTheSame){
                leftNodeToBeAnimated.classList.remove("node-start");
                leftNode.isStart = false;
            }
        } else if (isEndNodeClicked) {
                nodeToBeAnimated.classList.add("node-destination");
                node.isDestination = true;
                if(!isleftNodeAndCurrentNodeTheSame){
                    leftNodeToBeAnimated.classList.remove("node-destination");
                    leftNode.isDestination = false;
                }
            } 
        else {
        if(isWallOn) {
            if (nodeToBeAnimated.classList.contains("node-wall") && isAnimationEnd) {
                nodeToBeAnimated.classList.remove("node-wall");
                node.isWall = false;
            } else if(!node.isStart && !node.isDestination){
                if(node.isWeight){
                    node.isWeight = false;
                    nodeToBeAnimated.classList.remove("node-weight");       
                }
                nodeToBeAnimated.classList.add("node-wall");
                node.isWall = true;
                
            }
        }
        if (isWeightOn) {
            if (nodeToBeAnimated.classList.contains("node-weight") && isAnimationEnd) {
                nodeToBeAnimated.classList.remove("node-weight");
                node.isWeight = false;
            } else if(!node.isStart && !node.isDestination){
                if(node.isWall){
                    node.isWall = false;
                    nodeToBeAnimated.classList.remove("node-wall");       
                }
                nodeToBeAnimated.classList.add("node-weight");
                node.isWeight = true;
            }
        }
    }   
    }

    removeOldStartEndNode(id, isAnimationEnd) {
        let { grid, isStartNodeClicked, isEndNodeClicked, justLeftNode } = this.state;
        let newGrid = grid.slice();
        let rowColArray = id.split("-");
        let row = rowColArray[0];
        let col = rowColArray[1];
        let node = newGrid[row][col];
        let currentNode = document.getElementById(`${row}-${col}`);
        if (isStartNodeClicked && isAnimationEnd) {
            currentNode.classList.remove("node-start");
            node.isStart = false;
        } else
            if (isEndNodeClicked && isAnimationEnd) {
                currentNode.classList.remove("node-destination");
                node.isDestination = false;
            }
        justLeftNode.row = row;
        justLeftNode.col = col;
    }

    onListChange(e) {
        let targetedAlgorithm = e.target.value;
        if((targetedAlgorithm == 'DepthFirstSearch' || targetedAlgorithm == 'BreathFirstSearch')) {
            this.refresh('weight');
            this.setState({ isWeightOn : false});
        }
        this.setState({ algorithm: targetedAlgorithm });
    }

    refresh(typeOfNodeToRefresh) {
        let { grid } = this.state;
        if(typeOfNodeToRefresh == 'weight'){
            grid.forEach(row => row.forEach(node => node.isWeight = false));
            var visitedNodes = document.getElementsByClassName('node');
            for (let node of visitedNodes) {
                node.classList.remove('node-weight');
            }
        } else {         
        this.setState({ grid: [...CreateGrid()] })
        var visitedNodes = document.getElementsByClassName('node');
        for (let node of visitedNodes) {
            node.classList.remove('node-isVisited', 'node-shortest', 'node-shortest-down', 'node-shortest-up', 'node-shortest-left', 'node-shortest-right', 'node-wall', 'node-weight');
            }
        }
    }

    render() {
        var { grid, isMouseDown, isRunning , isWallOn, isWeightOn, algorithm } = this.state;
        var listItems = grid.map((row, index) => {
            var row = row.map(item => <NodeGrid makeWallOrWeight={this.makeWallOrWeight} removeOldStartEndNode={this.removeOldStartEndNode} row={item.row} col={item.col} isStart={item.isStart} isDestination={item.isDestination} isVisited={item.isVisited} isShortestPathNode={item.isShortestPathNode} isWall={item.isWall} isMouseDown={isMouseDown} />);
            return (<div className="node-row">{row}</div>);
        })
        return (
            <div >
                <div className="node-container" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>{listItems}</div>
                <Notation />
                <NavBarForPathFinding algorithm={algorithm} isRunning={isRunning} isWallOn={isWallOn} isWeightOn={isWeightOn} startSorting={this.startSorting} setWall={this.setWall} setWeight={this.setWeight} onListChange={this.onListChange} refresh={this.refresh} />
            </div>
        )
    }
}

function GetStartNode(grid) {
    for (let row of grid) {
        for (let node of row) {
            if (node.isStart) return node;
        }
    }
}

function GetEndNode(grid) {
    for (let row of grid) {
        for (let node of row) {
            if (node.isDestination) return node;
        }
    }
}

function CreateGrid() {
    var grid = [];
    for (let row = 0; row < NUMBER_OF_ROW; row++) {
        grid[row] = [];
        for (let col = 0; col < NUMBER_OF_COLUMN; col++) {
            grid[row].push(GetNode(row, col));
        }
    }
    return grid;
}

function GetNode(row, col) {
    return {
        row,
        col,
        isStart: (row == START_NODE_ROW && col == START_NODE_COL) ? true : false,
        isDestination: (row == END_NODE_ROW && col == END_NODE_COL) ? true : false,
        isVisited: false,
        previousNode: null,
        distance: Infinity,
        isShortestPathNode: false,
        isWall: false,
        isWeight: false
    };
}


function getAlgorithm(algorithm) {
    switch (algorithm) {
        case 'Dijktra':
            return Dijktra;
        case 'BreathFirstSearch':
            return BreathFirstSearch;
        case 'DepthFirstSearch':
            return DepthFirstSearch;
        default:
            return null;
    }
}


export default PathFindingVisualizer;