import { AddedProject, IuserInput } from "./Types";
import { v4 } from "uuid";
import { Project } from "./Project";

export class State {
  private _projects: Project[] = [];
  public get projects(): Project[] {
    return this._projects;
  }
  public set projects(value: Project[]) {
    this._projects = value;
  }
  private static instance: State;

  static getInstance(): State {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new State();
      return this.instance;
    }
  }
  private listeners: any[] = [];

  addListener(listener: (arg: Project[]) => void): void {
    this.listeners.push(listener);
  }
  addProject(proj: IuserInput): void {
    const project: AddedProject = {
      ...proj,
      id: `${v4()}`,
      status: "active",
    };
    // const addedProject = new Project(project);
    this.projects.push(<Project>project);
    for (const listener of this.listeners) {
      listener(this.projects.slice());
    }
  }

  moveProject(ProjID: string, status: "active" | "finished" | "pending"): void {
    const found = this.projects.find((prj) => prj.id === ProjID);
    if (found) {
      found.status = status;
    }
    for (const listener of this.listeners) {
      listener(this.projects.slice());
    }
  }
}
