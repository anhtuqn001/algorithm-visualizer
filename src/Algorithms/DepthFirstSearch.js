function DepthFirstSearch(grid, startNode, endNode) {
    var stack = [];
    var inOrderVisitedArray = [];
    startNode.distance = 0;
    startNode.isVisited = true;
    stack.push(startNode);
    while(!!stack.length)
    {  
        let lastNodeInStack = stack[stack.length - 1];
        let neighbor = GetUnvisitedNeighbor(lastNodeInStack, grid);
        while( neighbor === null ) {
            lastNodeInStack = stack.pop();
            if(lastNodeInStack == null) break;
            neighbor = GetUnvisitedNeighbor(lastNodeInStack, grid);
        }
        if(lastNodeInStack == null) break;
        UpdateNeighBorNodes(lastNodeInStack, neighbor);
        stack.push(neighbor);
        inOrderVisitedArray.push(neighbor);
        if (neighbor === endNode) return inOrderVisitedArray;
    }
    
    return inOrderVisitedArray;
}

function UpdateNeighBorNodes(node, neighbor) 
    {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
        neighbor.isVisited = true;
    }

function GetUnvisitedNeighbor(node, grid) {
    var {row, col} = node;
    if(row > 0 && !grid[row - 1][col].isVisited && !grid[row - 1][col].isWall) return grid[row - 1][col];
    if(col < grid[0].length - 1 && !grid[row][col+1].isVisited && !grid[row][col+1].isWall) return grid[row][col+1]; 
    if(row < grid.length - 1 && !grid[row + 1][col].isVisited && !grid[row + 1][col].isWall) return grid[row + 1][col];
    if(col > 0 && !grid[row][col-1].isVisited && !grid[row][col-1].isWall) return grid[row][col-1];
    return null;
}


export default DepthFirstSearch;