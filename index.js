import { create2dArray } from "./datastructures/utilies.js";
let grid = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
];

let row = grid.length;
let col = grid[0].length;

let visited = create2dArray(row, col, false);

function getNeighbours(r,c) {
    
    let neighbours = [];
    let delta = [-1,1];

    // for rows
    for(const del of delta) {
        neighbours.push({r: r+del, c});
        neighbours.push({r, c: c+ del})
    }
    return neighbours;
}

function dfs(r,c) {
    if(r < 0 || c < 0 || r >= row || c>= col) {
        return ;
    }
    console.log("visiting r: "+ r+ " c: "+c);
    visited[r][c] = true;

    let neightbours = getNeighbours(r,c);

    for(const neigh of neightbours) {
        if(!visited[neigh.r][neigh.c]) {
            dfs(neigh.r, neigh.c);
        }
        
    }
}

dfs(0,0);

