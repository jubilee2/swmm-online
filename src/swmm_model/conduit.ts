import {Point, Node, Conduit} from "./types";

function createConduit(
  name: string,
  inletNode: Node,
  outletNode: Node,
  vertices: Point[],
  length: number,
  roughness: number
): Conduit {
  return {
    name,
    inletNode,
    outletNode,
    vertices,
    length,
    roughness
  };
}

export default createConduit;
