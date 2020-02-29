import React from 'react';
import NodeArray from '../Node/NodeArray';
import BubbleSort from '../Algorithms/BubbleSort'
import SelectionSort from '../Algorithms/SelectionSort';
import QuickSort from '../Algorithms/QuickSort';
import MergeSort from '../Algorithms/MergeSort';
import NavBarForSorting from '../NavigationBar/NavBarForSorting';


var Speed = 20;

class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            algorithm: null,
            numberOfItem: 75,
            speedStatus: 'Fast',
            speed : 5,
            isRunning : false,
            isDone: false,
            containerWidth: 0
        }
        this.startSorting = this.startSorting.bind(this);
        this.animateBubbleSorting = this.animateBubbleSorting.bind(this);
        this.animateSelectionSorting = this.animateSelectionSorting.bind(this);
        this.animateQuickSorting = this.animateQuickSorting.bind(this);
        this.animateMergeSorting = this.animateMergeSorting.bind(this);
        this.getCompatibleAnimation = this.getCompatibleAnimation.bind(this);
        this.onListChange = this.onListChange.bind(this);
        this.changeNumberOfItem = this.changeNumberOfItem.bind(this);
        this.changeSortingSpeed = this.changeSortingSpeed.bind(this);
        this.calculateSpeed = this.calculateSpeed.bind(this);
    }
    componentDidMount() {
        let { numberOfItem } = this.state;
        let cContainer = document.getElementById('c-container');
        let containerWidth = parseInt(cContainer.style.height.slice(0,3));
        this.setState({
            array: [...CreateArray(numberOfItem)],
            containerWidth
         })
         
    }
    startSorting() {
        let { array, algorithm } = this.state;
        console.log(array.length);
        let newArr = array.map(i => Object.assign({}, i));
        if(algorithm == null) {
            console.log("Please choose algorithm");
        } else {
        this.setState({ isRunning: true });
        this.animateSorting(algorithm, newArr);
        // console.log(inOrderSortin gArray);
        }
    }

    animateSorting(algorithm, array) {
        let chosenAlgorithm = getAlgorithm(algorithm);
        let compatibleAnimation = this.getCompatibleAnimation(algorithm);
        let inOrderSortingArray;
        if(algorithm === 'Quick' || algorithm === 'Merge') {
            inOrderSortingArray = chosenAlgorithm(array, 0, array.length - 1);
        } else {
            inOrderSortingArray = chosenAlgorithm(array);
        }
        compatibleAnimation(inOrderSortingArray, array);
    }

    animateBubbleSorting(inOrderSortingArray, array) {
        var { speed } = this.state;
        for(let i = 0; i< inOrderSortingArray.length; i++) {
            setTimeout(() => {
                let { comparingIndex1, comparingIndex2, shouldSwap, swapProcessIndex, isAtRightPlace} = inOrderSortingArray[i];
                let allNodeArray = document.getElementsByClassName('node-array');
                for(let node of allNodeArray) {
                    node.classList.remove('yellow-node');
                }
                if(i == inOrderSortingArray.length - 1) {
                    for(let node of allNodeArray) {
                        node.classList.add('green-node');
                    }
                    this.setState({ isRunning: false, isDone: true, array }); 
                }
                let comparingNode1 = document.getElementById(`${comparingIndex1}`);
                let comparingNode2 = document.getElementById(`${comparingIndex2}`);
                comparingNode1.classList.add("yellow-node");
                comparingNode2.classList.add("yellow-node");
                if(shouldSwap) {
                    switch (swapProcessIndex) {
                        case 0: 
                        break;
                        case 1: 
                        comparingNode1.classList.add("red-node");
                        comparingNode2.classList.add("red-node");
                        break;
                        case 2:
                        let comparingNode1Height =  comparingNode1.style.height;
                        comparingNode1.style.height = comparingNode2.style.height;
                        comparingNode2.style.height = comparingNode1Height;
                        break;
                        case 3:
                        comparingNode1.classList.remove("red-node");
                        comparingNode2.classList.remove("red-node");
                        break;
                    }
                }
                if(isAtRightPlace) {
                    comparingNode2.classList.add("green-node");
                }
            }, i*speed);
        }
    }

    animateSelectionSorting(inOrderSortingArray, array) {
        var { speed } = this.state;
        for(let i = 0; i< inOrderSortingArray.length; i++) {
            setTimeout(() => {
                let { traversingNodeIndex, minNodeIndex, swapPlaceIndex, shouldSwap, swapProcessIndex } = inOrderSortingArray[i];
                let allNodeArray = document.getElementsByClassName('node-array');
                for(let node of allNodeArray) {
                    node.classList.remove('yellow-node', 'blue-node');
                }
                if(i == inOrderSortingArray.length - 1) {
                for(let node of allNodeArray) {
                    node.classList.add('green-node');
                    this.setState({ isRunning: false, isDone: true, array });
                }   
                }
                let traversingNode = document.getElementById(`${traversingNodeIndex}`);
                let minNode = document.getElementById(`${minNodeIndex}`);
                if(shouldSwap) { 
                    let swapPlaceIndexNode = document.getElementById(`${swapPlaceIndex}`);
                    switch (swapProcessIndex) {
                        case 1:
                        minNode.classList.remove('blue-node');
                        traversingNode.classList.remove('yellow-node');
                        swapPlaceIndexNode.classList.add("red-node");
                        minNode.classList.add("red-node");
                        break;
                        case 2:
                        let swapPlaceIndexHeight =  swapPlaceIndexNode.style.height;
                        swapPlaceIndexNode.style.height = minNode.style.height;
                        minNode.style.height = swapPlaceIndexHeight;
                        break;
                        case 3:
                        swapPlaceIndexNode.classList.remove("red-node");
                        swapPlaceIndexNode.classList.add("green-node");
                        minNode.classList.remove("red-node");
                        break;
                    }
                } else {
                traversingNode.classList.add("yellow-node");
                if(!minNode.classList.contains("blue-node")) {
                    minNode.classList.add("blue-node");
                }
            }
            }, i*speed)
        }
    }

    animateQuickSorting(inOrderSortingArray, array) {
        var { speed } = this.state;
        for(let i=0; i<inOrderSortingArray.length; i++) {
            setTimeout(() => {
                let allNodeArray = document.getElementsByClassName('node-array');
                for(let node of allNodeArray) {
                    node.classList.remove('yellow-node');
                }
                if(i == inOrderSortingArray.length - 1) {
                    this.setState({ isRunning: false, isDone: true, array });
                }
                let {pivotIndex, pIndex, comparingIndex, isLessThanPivot, isPartitionDone, isRightSideSorted, oneNodeArrayIndex} = inOrderSortingArray[i];
                let pIndexElement = document.getElementById(`${pIndex}`);
                let pivotElement = document.getElementById(`${pivotIndex}`);
                if(isRightSideSorted) {
                    pivotElement.classList.add('green-node');
                    return;
                }
                
                if(oneNodeArrayIndex != null){
                document.getElementById(`${oneNodeArrayIndex}`).classList.add('green-node');
                return;
                }

                if(isPartitionDone) {
                    let pIndexElementHeight = pIndexElement.style.height;
                    pIndexElement.style.height = pivotElement.style.height;
                    pivotElement.style.height = pIndexElementHeight;
                    pIndexElement.classList.add('green-node');
                    return;
                }
                if(!pivotElement.classList.contains('blue-node') ){
                    pivotElement.classList.add('blue-node');
                }
                let comparingNode = document.getElementById(`${comparingIndex}`);
                comparingNode.classList.add('yellow-node');
                if(isLessThanPivot) {
                    let previousPIndexNode = document.getElementById(`${pIndex - 1}`);
                    let temp = previousPIndexNode.style.height;
                    previousPIndexNode.style.height = comparingNode.style.height;
                    comparingNode.style.height = temp;
                    previousPIndexNode.classList.remove('pink-node');
                }
                if(!pIndexElement.classList.contains('pink-node')) {
                pIndexElement.classList.add('pink-node');
                }
            }, i*speed); 
        }
    }

    animateMergeSorting(inOrderSortingArray, array){
        var { speed } = this.state;
        for(let i=0; i < inOrderSortingArray.length; i++){
            setTimeout(() => {
                let allNodeArray = document.getElementsByClassName('node-array');
                for(let node of allNodeArray) {
                    node.classList.remove('yellow-node','blue-node', 'green-node');
                }
                if(i == inOrderSortingArray.length - 1) {
                    for(let node of allNodeArray) {
                        node.classList.add('green-node');
                    }
                    this.setState({ isRunning: false, isDone: true, array });
                }
                let { kIndex, leftArrayIndex, rightArrayIndex, isRightIndexSmaller, swapProcessIndex } = inOrderSortingArray[i];
                let kElement = document.getElementById(`${kIndex}`);
                let leftElement = document.getElementById(`${leftArrayIndex}`);
                let rightElement = document.getElementById(`${rightArrayIndex}`)
                kElement.classList.add('blue-node');
                // leftElement.classList.add('green-node');
                rightElement.classList.add('yellow-node');
                if(isRightIndexSmaller){
                    switch (swapProcessIndex){
                        case 0:
                        break;
                        case 1:
                        // kElement.classList.add('red-node');
                        rightElement.classList.add('red-node');
                        break;
                        case 2:
                        let rightElementHeight = rightElement.style.height;
                        for(let i = rightArrayIndex; i > kIndex; i--){
                            let currentNode = document.getElementById(`${i}`)
                            let previousNode = document.getElementById(`${i-1}`);
                            currentNode.style.height = previousNode.style.height; 
                        }
                        kElement.style.height = rightElementHeight;
                        rightElement.classList.remove('red-node');
                        rightElement.classList.remove('yellow-node');
                        kElement.classList.add('red-node');
                        kElement.nextSibling.classList.add('blue-node')
                        break;
                        case 3:
                        kElement.classList.remove('red-node');
                        kElement.classList.remove('blue-node');
                        kElement.nextSibling.classList.remove('blue-node')
                        rightElement.classList.remove('yellow-node');
                    }
                }
            }, i * speed);
        }        
    }

    getCompatibleAnimation(algorithm) {
        switch(algorithm) {
            case 'Bubble': 
            return this.animateBubbleSorting;
            case 'Selection': 
            return this.animateSelectionSorting;
            case 'Quick': 
            return this.animateQuickSorting;
            case 'Merge':
            return this.animateMergeSorting;
            default: 
            return null;
        }
    }

    onListChange(e) {
        this.setState({ algorithm : e.target.value });
    }

    changeNumberOfItem(e) {
        let { speedStatus, isDone } = this.state;
        if(isDone){
            let allNodeArray = document.getElementsByClassName('node-array');
                for(let node of allNodeArray) {
                    node.classList.remove('yellow-node','blue-node', 'green-node', 'pink-node');
                }
            this.setState({ isDone: false });
        }
        this.setState({
            array: CreateArray(e.target.value), 
            numberOfItem : e.target.value 
        });
        this.calculateSpeed(speedStatus, e.target.value);
    }

    changeSortingSpeed(e) {
        let { numberOfItem } = this.state;
        this.setState({ speedStatus : e.target.value});
        this.calculateSpeed(e.target.value, numberOfItem);
    }

    calculateSpeed(speedStatus, numberOfItem) {
        let speed = 750/numberOfItem;
        switch (speedStatus) {
            case 'Low':
            speed *= 4;
            break;
            case 'Normal':
            speed *= 2;
            break;
            case 'Fast':
            break;
        }
        this.setState({ speed });
    }

    render() {
        var { array, isRunning, numberOfItem, containerWidth } = this.state;
        console.log(numberOfItem);
        var Items = array.map((item, index) => <NodeArray value={item.value} index={index} numberOfItem={numberOfItem}></NodeArray>);
        return (
                <div style={{margin:'auto'}}>
                <div className="d-flex justify-content-center align-items-end" id="c-container" style={{height: '550px', width: '50%', margin: 'auto'}}>
                    {Items}
                </div>
                <NavBarForSorting isRunning={isRunning} changeSortingSpeed={this.changeSortingSpeed} changeNumberOfItem={this.changeNumberOfItem} startSorting={this.startSorting} onListChange={this.onListChange}></NavBarForSorting>
                </div>
            );
    }
}

function getAlgorithm(algorithm, array) {
    switch(algorithm) {
        case 'Bubble': 
        return BubbleSort;
        case 'Selection': 
        return SelectionSort;
        case 'Quick': 
        return QuickSort;
        case 'Merge':
        return MergeSort;
        default: 
        return null;
    }
}

function CreateArray(numberOfItem) {
    var newArray = [];
    for(let i = 0; i < numberOfItem; i++) {
        newArray.push(GetItemArray(i));
    }
    return newArray;
}

function GetItemArray(i) {
    return {
       index: i,  
       value: Math.ceil(Math.random()*500)
    }
}

export default SortingVisualizer;

