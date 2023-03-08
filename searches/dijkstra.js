class Dijkstra {
  constructor (map, start, goal) {
    let queue = new Heap();
    queue.enqueue({ x: start[0], y: start[1], w: 0 });
    this.grid = map.gridMatrix;
    this.vis = createGrid(0);
    this.dist = createGrid(-1);
    this.vis[start[0]][start[1]] = 1;
    this.dist[start[0]][start[1]] = 0;
    this.ways = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
    this.path = [];
  }

  setPath() {
    while (!queue.isEmpty()) {
      let pos = queue.dequeue();
  
      let foundDestiny = false;
  
      for (let i = 0; i < ways.length; i++) {
        const x = pos.x + ways[i][0];
        const y = pos.y + ways[i][1];
  
        if (
          validPosition(x, y, this.grid)
        ) {
          //checar se precisa visitar
          if(!this.vis[x][y]) {
            this.path.push({x, y});
          } {
            this.vis[x][y] = 1;
          this.dist[x][y] = this.dist[pos.x][pos.y] + this.grid[x][y].weight;
          queue.enqueue({ x, y, w: this.grid[x][y].weight });
          if (x === goal[0] && y === goal[1]) {
            foundDestiny = true;
            break;
          }
          }
        }
      }
      if (foundDestiny) break;
    }
    //calcular o caminho pae
    if (this.dist[goal[0]][goal[1]] == -1) return;
  
    let goalPos = { x: goal[0], y: goal[1] };
  
    while (goalPos.x != start[0] && goalPos.y != start[1]) {
      this.path.push(goalPos);
      for (let i = 0; i < this.ways.length; i++) {
        const x = goalPos.x + ways[i][0];
        const y = goalPos.y + ways[i][1];
  
        if (validPosition(x, y, this.grid)) {
          if (this.dist[x][y] == this.dist[pos.x][pos.y] - this.grid[pos.x][pos.y].weight) {
            goalPos = { x, y };
            break;
          }
        }
      }
    }
    this.path.push(goalPos);
    this.path = this.path.reverse();
    return {path: this.path, visited: this.path};
  }

  createGrid(value) {
    let newGrid = new Array(this.width);
    for (let i = 0; i < this.width; i++) {
      newGrid[i] = new Array(this.height);
      for (let j = 0; j < this.height; j++) {
        newGrid[i][j] = value;
      }
    }
  
    return newGrid;
  }
  
  validPosition(x, y, grid) {
    return (
      x >= 0 &&
      x < GRID_WIDTH * GRID_SIZE &&
      y >= 0 &&
      GRID_HEIGHT * GRID_SIZE &&
      grid[x][y].title !== "parede"
    );
  }
  
  haveToVisit(x, y, dist) {
    return !wasVisited(x, y) || hasBiggerDistance(x, y, dist);
  }
  
  wasVisited(x, y, vis) {
    if (!vis[x][y]) {
      path.push({ x, y });
    }
    return vis[x][y];
  }
  
  hasBiggerDistance(x, y, dist) {
    return dist[x][y] == -1 || dist[x][y] > dist;
  }
}