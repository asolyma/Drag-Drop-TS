import { Store } from "./Store";
import { IuserInput } from "./UserInput";
import { Project } from "./Project";

export class ProjectList {
  private Template: HTMLTemplateElement;
  private root: HTMLDivElement;
  private static element: HTMLElement;
  private type: "active" | "finished" | "pending";
  // private projects:IuserInput

  constructor(type: "active" | "finished" | "pending") {
    this.type = type;
    this.Template = <HTMLTemplateElement>(
      document.getElementById("project-list")
    );
    const Fragment = <DocumentFragment>this.Template.content.cloneNode(true);
    ProjectList.element = <HTMLElement>Fragment.querySelector("section");
    this.root = <HTMLDivElement>document.getElementById("app");
    ProjectList.element.id = `${type}-projects`;
    this.render();
  }
  render(): void {
    if (ProjectList.element) {
      this.root.appendChild(ProjectList.element);
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
  static attachProject(): void {
    const target: HTMLUListElement = <HTMLUListElement>(
      document.getElementById("active-project-list")
    );
    target.innerHTML = "";
    Store.getInstacne().projects.map((proj: IuserInput) => {
      const component = new Project(proj).getProj();
      target.appendChild(component); //new Project(proj).getProj());
    });
  }
  static detachProject(title: string): void {
    Store.getInstacne().removeProject(title);
  }
}
