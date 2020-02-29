function BreathFirstSearch(grid, startNode, endNode) {
    var queue = [];
    var inOrderVisitedArray = [];
    startNode.distance = 0;
    startNode.isVisited = true;
    queue.push(startNode);
    while(!!queue.length)
    {
        let neighbors = GetUnvisitedNeighbors(queue[0], grid);
        UpdateNeighBorNodes(queue[0], neighbors);
        queue = [...queue, ...neighbors];
        let nodeToTraverse = queue.shift();
        inOrderVisitedArray.push(nodeToTraverse);
        if (nodeToTraverse === endNode) return inOrderVisitedArray;
    }
    return inOrderVisitedArray;
}

function UpdateNeighBorNodes(node, neighbors) {
    for(const neighbor of neighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
        neighbor.isVisited = true;
    }
}

function GetUnvisitedNeighbors(node, grid) {
    var neighbors = [];
    var {row, col} = node;
    if(row > 0 && grid[row - 1][col]) neighbors.push(grid[row - 1][col]);
    if(row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if(col > 0) neighbors.push(grid[row][col-1]);
    if(col < grid[0].length - 1) neighbors.push(grid[row][col+1]);
    return neighbors.filter(node => node.isVisited == false && node.isWall == false);;
}


export default BreathFirstSearch;