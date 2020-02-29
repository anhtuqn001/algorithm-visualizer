

function QuickSort(array, start, end) {
    
        var inOrderSortingArray = [];    
        if(start < end) { 
            let {pIndex, partOfInOrderSortingArray}  = Partition(array, start, end);
            inOrderSortingArray = [...inOrderSortingArray, ...partOfInOrderSortingArray];
            inOrderSortingArray = [...inOrderSortingArray, ...QuickSort(array, start, pIndex - 1)];
            inOrderSortingArray = [...inOrderSortingArray, ...QuickSort(array, pIndex + 1, end)];
            inOrderSortingArray.push(CreateNode(end, pIndex, null, false, false, true));
        }
        if(start == end) {
            inOrderSortingArray.push(CreateNode(null, null, null, false, false, false, start ));
        }
        return inOrderSortingArray; 
    }


function Partition(array, start, end) {
    let partOfInOrderSortingArray = [];
    let pivot = array[end];
    let pIndex = start;
    let isPartitionDone = false;
    for(let i = start; i < end; i++ ) {
        let isLessThanPivot = false;
        if(array[i].value <= pivot.value ) {
            let temp = array[pIndex];
            array[pIndex] = array[i]; 
            array[i] = temp;
            pIndex += 1;
            isLessThanPivot = true; 
        }
        partOfInOrderSortingArray.push(CreateNode(end, pIndex, i, isLessThanPivot, isPartitionDone));
    }
    let temporary = array[pIndex];
    array[pIndex] = pivot;
    array[end] = temporary;
    isPartitionDone = true;
    partOfInOrderSortingArray.push(CreateNode(end, pIndex, null, false, isPartitionDone));
    return {pIndex, partOfInOrderSortingArray};
}

function CreateNode(pivotIndex = null, pIndex = null, comparingIndex = null, isLessThanPivot = false, isPartitionDone = false, isRightSideSorted = false, oneNodeArrayIndex = null) {
    return {
        pivotIndex,
        pIndex,
        comparingIndex,
        isLessThanPivot,
        isPartitionDone,
        isRightSideSorted,
        oneNodeArrayIndex
    }
}

export default QuickSort;