function Merge(arr, left, right , mid, inOrderSortingArray) {
    var leftArr = [];
    var rightArr = [];
    var n1 = Math.floor(mid - left + 1);
    var n2 = Math.round(right - mid);
    for(let i = 0; i < n1; i++) {
        leftArr[i] = arr[left + i];
    }
    for(let j = 0; j < n2; j++) {
        rightArr[j] = arr[mid + 1 + j];
    }
    var i = 0;
    var j = 0;
    var k = left;
    while(i<n1 && j<n2) {
        if(leftArr[i].value < rightArr[j].value){  
            arr[k] = leftArr[i];
            inOrderSortingArray.push(CreateNode(k, left + i, mid + 1 + j, false, 0));
            i++;
        }
        else {
            arr[k] = rightArr[j];
            inOrderSortingArray.push(CreateNode(k, left + i, mid + 1 + j, true, 0));
            inOrderSortingArray.push(CreateNode(k, left + i, mid + 1 + j, true, 1));
            inOrderSortingArray.push(CreateNode(k, left + i, mid + 1 + j, true, 2));
            inOrderSortingArray.push(CreateNode(k, left + i, mid + 1 + j, true, 3));
            j++;
        }
        k++;
    }
    while(i<n1) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }
    while(j<n2) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}

function MergeSort(arr, left, right) {
    var inOrderSortingArray = [];
    if(left < right) {
        var mid = left + Math.floor((right-left)/ 2);
        inOrderSortingArray = [...MergeSort(arr, left, mid)];
        inOrderSortingArray = [...inOrderSortingArray, ...MergeSort(arr, mid + 1, right)];
        Merge(arr, left, right, mid, inOrderSortingArray);
    }
    return inOrderSortingArray;
}

function CreateNode(kIndex, leftArrayIndex, rightArrayIndex, isRightIndexSmaller, swapProcessIndex) {
    return {
        kIndex,
        leftArrayIndex,
        rightArrayIndex,
        isRightIndexSmaller,
        swapProcessIndex,
    }
}

export default MergeSort;