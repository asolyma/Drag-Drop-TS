import { Component } from "./Component";
import { Project } from "./Project";
import { State } from "./State";

export class ProjectList extends Component<HTMLElement, HTMLDivElement> {
  private type: "active" | "finished" | "pending";
  assignedProjects: Project[];

  constructor(type: "active" | "finished" | "pending") {
    super("project-list", "section", "app");
    this.type = type;
    this.element.id = `${this.type}-projects`;
    this.assignedProjects = [];

    State.getInstance().addListener((projects) => {
      const relevantProject = projects.filter((proj) => {
        if (type == "active") {
          return proj.status == "active";
        } else if (type == "finished") {
          return proj.status == "finished";
        } else {
          return proj.status == "pending";
        }
      });
      this.assignedProjects = relevantProject;
      this.renderComponent();
    });
    if (this.element) {
      const projUl = this.element.querySelector("ul");
      const projHeader = this.element.querySelector("h2");
      if (projUl) {
        projUl.id = `${this.type}-project-list`;
      } else {
        throw new Error("error");
      }
      if (projHeader) {
        projHeader.textContent = `${this.type} Projects`.toUpperCase();
      }
    }
  }
  renderComponent(): void {
    this.assignedProjects.map((prj) => {
      new Project(prj);
    });
  }
}
