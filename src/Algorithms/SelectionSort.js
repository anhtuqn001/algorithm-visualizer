function SelectionSort(array) {
    var inOrderComparingNode = [];
    for(let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for(let j = i+1; j < array.length; j++ ){
            if(array[j].value < array[minIndex].value) {
                minIndex = j;
            }
            inOrderComparingNode.push(CreateNode(j, minIndex, i, false, 0));
            if(j == array.length - 1) {
                inOrderComparingNode.push(CreateNode(j, minIndex, i, true, 1));
                inOrderComparingNode.push(CreateNode(j, minIndex, i, true, 2));
                inOrderComparingNode.push(CreateNode(j, minIndex, i, true, 3));
            }
        }
        let temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
    }
    return inOrderComparingNode;
}

function CreateNode(traversingNodeIndex, minNodeIndex, swapPlaceIndex ,shouldSwap, swapProcessIndex) {
    return {
        traversingNodeIndex,
        minNodeIndex,
        swapPlaceIndex,
        shouldSwap,
        swapProcessIndex
    }
}

export default SelectionSort;