let M = [[ 0, 3, 2 ], 
[ 3, 3, 0 ], 
[ 1, 3, 0 ]]; 
let visited = []
for(let i = 0;i<M.length;i++) {
let arr = [];
  for(let j = 0; j < M.length ; j++) {
     arr.push(false);
  }
  visited.push(arr);
}

// 0 3 2
// 3 3 0
// 1 3 0
for(let i = 0;i<M.length;i++) {
      for(let j = 0; j < M.length ; j++) {
         if(M[i][j] == 1 && visited[i][j] == false) {
            if(isPath(i, j)) {
                console.log("Path Found!!!")
                break;
            }
         }
      }
    }

    function isNotSafe(i,j, n) {
        return i <0 || j < 0 || i >= n || j >=n
    }

    function isPath(i,j) { // i = 2 , j = 0 (2,1)  (1,1)
        if(visited[i][j] == true) {
            return false;
        }
        if(isNotSafe(i,j,M.length)) {
            return false;
        }
        visited[i][j] = true;
        if(M[i][j] == 0) {
            return false;
        }
        if(M[i][j] == 2) {
            return true;
        }
        
        let left = isPath(i, j-1); // 2, 0
        if(left) {
            return true;
        }
        let right = isPath(i, j+1); // 2, 2
        if(right) {
            return true;
        }
        let up = isPath(i-1, j); // 1,1
        if(up) {
            return true;
        }
        let down = isPath(i+1, j);
        if(down) {
            return true;
        }
        return false;
    }