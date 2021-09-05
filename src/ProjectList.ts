// import { Store } from "./Store";
// import { IuserInput } from "./UserInput";
// import { Project } from "./Project";

import { Project } from "./Project";
import { State } from "./State";

export class ProjectList {
  private Template: HTMLTemplateElement;
  private root: HTMLDivElement;
  private static element: HTMLElement;
  private type: "active" | "finished" | "pending";
  assignedProjects: Project[];

  constructor(type: "active" | "finished" | "pending") {
    this.type = type;
    this.assignedProjects = [];
    this.Template = <HTMLTemplateElement>(
      document.getElementById("project-list")?.cloneNode(true)
    );
    ProjectList.element = <HTMLElement>(
      this.Template.content.querySelector("section")
    );
    this.root = <HTMLDivElement>document.getElementById("app");
    ProjectList.element.id = `${this.type}-projects`;
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
      this.renderProjects();
    });
    this.attatch();
    this.render();
  }

  private attatch() {
    this.root.append(ProjectList.element);
  }

  private render(): void {
    if (ProjectList.element) {
      const projUl = ProjectList.element.querySelector("ul");
      const projHeader = ProjectList.element.querySelector("h2");
      if (projUl) {
        projUl.id = `${this.type}-project-list`;
      } else {
        console.error("error");
      }
      if (projHeader) {
        projHeader.textContent = `${this.type} Projects`.toUpperCase();
      }
    }
  }

  renderProjects() {
    const ul: HTMLUListElement = <HTMLUListElement>(
      document.getElementById(`${this.type}-project-list`)
    );
    ul.innerHTML = "";
    this.assignedProjects.map((prj) => {
      const li = document.createElement("li");
      li.innerHTML = `<h3>Project Title: ${prj.title} <span class='close'>X</span></h3> `;
      ul.append(li);
    });
    ul.append();
  }
  // static attachProject(): void {
  //   const target: HTMLUListElement = <HTMLUListElement>(
  //     document.getElementById("active-project-list")
  //   );
  //   target.innerHTML = "";
  //   Store.getInstacne().projects.map((proj: IuserInput) => {
  //     const component = new Project(proj).getProj();
  //     target.appendChild(component); //new Project(proj).getProj());
  //   });
  // }
  // static detachProject(title: string): void {
  //   Store.getInstacne().removeProject(title);
  // }
}
