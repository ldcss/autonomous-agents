import { Grid } from "../models/grid";
import { PriorityQueue } from "./priorityqueue";
import { getKey, getNeighbors, heuristic, setTo2DArray } from "./utils";

export function greedy(grid: Grid, start: Array<number>, goal: Array<number>) {
  // let rows = GRID_WIDTH;
  // let cols = GRID_HEIGHT;
  let pq = new PriorityQueue((a, b) => a.cost - b.cost);
  pq.enqueue({ path: [start], cost: heuristic(start, goal) }); // Use the heuristic function to estimate the cost to the goal
  let visited = new Set([getKey(start[0], start[1])]);

  while (!pq.isEmpty()) {
    let item = pq.dequeue();
    let path = item?.path
    if (path == undefined){
      console.log("rolou")
      break;
    }
    //let cost = item?.cost
    let [row, col] = path[path.length - 1];
    row = Math.floor(row);
    col = Math.floor(col);

    if (row === goal[0] && col === goal[1]) {
      return { path, visited: setTo2DArray(visited) };
    }

    for (let neighbor of getNeighbors(row, col, grid.gridMatrix)) {
      let neighborKey = getKey(neighbor[0], neighbor[1]);
      let newCost = heuristic(neighbor, goal); // Use the heuristic function to estimate the cost to the goal

      if (!visited.has(neighborKey)) {
        visited.add(neighborKey);
        pq.enqueue({ path: [...path, neighbor], cost: newCost });
      }
    }
  }

  return { path: [[]], visited: setTo2DArray(visited) }//
}
