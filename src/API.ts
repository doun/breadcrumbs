import type { MultiGraph } from "graphology";
import type { App } from "obsidian";
import { ARROW_DIRECTIONS, DIRECTIONS } from "./constants";
import type { BCAPII, Directions } from "./interfaces";
import type BCPlugin from "./main";
import { getMatrixNeighbours } from "./Views/MatrixView";
import {
  buildObsGraph,
  dfsAllPaths,
  getSubForFields,
  getSubInDirs,
} from "./Utils/graphUtils";

export class BCAPI implements BCAPII {
  app: App;
  plugin: BCPlugin;
  mainG: MultiGraph;
  closedG: MultiGraph;

  public constructor(app: App, plugin: BCPlugin) {
    this.app = app;
    this.plugin = plugin;
    this.mainG = this.plugin.mainG;
    this.closedG = this.plugin.closedG;
  }

  public DIRECTIONS = DIRECTIONS;
  public ARROW_DIRECTIONS = ARROW_DIRECTIONS;

  public buildObsGraph = () => buildObsGraph(this.app);

  public getSubInDirs = (dirs: Directions[], g = this.mainG) =>
    getSubInDirs(g, ...dirs);

  public getSubForFields = (fields: string[], g = this.mainG) =>
    getSubForFields(g, fields);

  public dfsAllPaths = (
    fromNode = this.app.workspace.getActiveFile()?.basename,
    g = this.mainG
  ) => dfsAllPaths(g, fromNode);

  public getMatrixNeighbours = (
    fromNode = this.app.workspace.getActiveFile()?.basename
  ) => getMatrixNeighbours(this.plugin, fromNode);
}