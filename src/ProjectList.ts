import { bindThis } from "./bindThis";
import { Component } from "./Component";
import { Project } from "./Project";
import { State } from "./State";
import { Dragtarget } from "./Types";

export class ProjectList
  extends Component<HTMLElement, HTMLDivElement>
  implements Dragtarget
{
  private type: "active" | "finished" | "pending";
  assignedProjects: Project[];

  constructor(type: "active" | "finished" | "pending") {
    super("project-list", "section", "app");

    this.type = type;
    this.assignedProjects = [];
    this.element.id = `${this.type}-projects`;

    this.element.addEventListener("dragover", this.dragoverHandler);
    this.element.addEventListener("dragleave", this.dragLeavehandler);
    this.element.addEventListener("drop", this.dropHandler);

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
  @bindThis
  dragoverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      this.element.classList.add("droppable");
    } else {
      throw new Error("no data on data transfer object ");
    }
  }
  @bindThis
  dropHandler(event: DragEvent): void {
    if (event.dataTransfer) {
      const id = event.dataTransfer.getData("text/plain");
      State.getInstance().moveProject(id, this.type);
      this.element.classList.remove("droppable");
    } else {
      throw new Error("no data on the data transfer Object");
    }
  }
  @bindThis
  dragLeavehandler(): void {
    this.element.classList.remove("droppable");
  }

  renderComponent(): void {
    const projUl = this.element.querySelector("ul");
    if (projUl) {
      projUl.innerHTML = "";
    }
    this.assignedProjects.map((prj) => {
      new Project(prj);
    });
  }
}
