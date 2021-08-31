import { IuserInput } from "./UserInput";
import { v4 as uuidv4 } from "uuid";
export class Store {
  private _projects: IuserInput[] = [];

  public get projects(): IuserInput[] {
    return this._projects;
  }

  public set projects(value: IuserInput[]) {
    this._projects = value;
  }

  private static instance: Store;

  addProject(project: IuserInput): void {
    const addedProject = {
      id: uuidv4(),
      ...project,
    };
    this.projects.push(addedProject);
  }
  removeProject(title: string): void {
    const filtered: IuserInput[] = this._projects.filter((e) => {
      return e.title !== title;
    });
    this.projects = filtered;
  }

  //private constructor() {}
  //implement a singlton constructor
  static getInstacne(): Store {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new Store();
      return this.instance;
    }
  }
}
