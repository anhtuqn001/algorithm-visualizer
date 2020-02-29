function Dijktra(grid, startNode, endNode) {
    var unvisitedArray = GetNodesInGrid(grid);
    var inOderVisitedArray = [];
    startNode.distance = 0;
    while(!!unvisitedArray.length) {
        SortUnvisitedArray(unvisitedArray);
        let closestNode = unvisitedArray.shift();
        if(closestNode.distance === Infinity) return inOderVisitedArray;
        if(closestNode.isWall) continue;
        closestNode.isVisited = true;
        inOderVisitedArray.push(closestNode);
        if (closestNode === endNode) return inOderVisitedArray;
        UpdateNeighBorNodes(closestNode, grid);
    }
}

function GetNodesInGrid(grid) {
    var newGridArray = [];
    for(let i=0; i < grid.length; i++) {
        for(let j=0; j < grid[0].length; j++) {
            newGridArray.push(grid[i][j]);
        }
    }
    return newGridArray;
}

function SortUnvisitedArray(unvisitedArray) {
    unvisitedArray.sort((a,b) => a.distance - b.distance);
    return;
}

function UpdateNeighBorNodes(node, grid) {
    var neighbors = GetUnvisitedNeighbors(node, grid);
    for(const neighbor of neighbors) {
        if(neighbor.isWeight){
            neighbor.distance = node.distance + 10;    
        } 
        else {
        neighbor.distance = node.distance + 1;
        }
        neighbor.previousNode = node;
    }
}

function GetUnvisitedNeighbors(node, grid) {
    var neighbors = [];
    var {row, col} = node;
    if(row > 0) neighbors.push(grid[row - 1][col]);
    if(row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if(col > 0) neighbors.push(grid[row][col-1]);
    if(col < grid[0].length - 1) neighbors.push(grid[row][col+1]);
    return neighbors.filter(node => node.isVisited == false);
}


export default Dijktra;