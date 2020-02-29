function BubbleSort(array) {
    var inOrderComparingNode = [];
    for(let i=0; i<array.length-1; i++) {
        for(let j=0; j < array.length-i-1; j++) {
            if(array[j].value > array[j+1].value){
                let temp = array[j]; 
                    array[j] = array[j + 1]; 
                    array[j + 1] = temp;
                inOrderComparingNode.push(CreateNode(j, j+1, true, 0, false));
                inOrderComparingNode.push(CreateNode(j, j+1, true, 1, false));
                inOrderComparingNode.push(CreateNode(j, j+1, true, 2, false));
                inOrderComparingNode.push(CreateNode(j, j+1, true, 3, false));
            }
            inOrderComparingNode.push(CreateNode(j, j+1, false, 0, j == array.length-i-2));
        }
    }
    return inOrderComparingNode;
}

function swap(item1, item2) {
    var tempItem = item1;
    item1 = item2;
    item2 = tempItem;
    return;
}

function CreateNode(comparingIndex1, comparingIndex2, shouldSwap, swapProcessIndex, isAtRightPlace) {
    return {
        comparingIndex1,
        comparingIndex2,
        shouldSwap,
        swapProcessIndex,
        isAtRightPlace
    }
}

export default BubbleSort;