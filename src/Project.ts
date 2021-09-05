import { AddedProject, IuserInput } from "./Types";

export class Project implements AddedProject {
  title: string;
  description: string;
  people: number | undefined;
  status: "active" | "finished" | "pending";
  id: string;
  Template: HTMLTemplateElement;
  element: HTMLLIElement;
  constructor(project: AddedProject) {
    this.title = project.title;
    this.description = project.description;
    this.people = project.people;
    this.status = project.status;
    this.id = project.id;

    this.Template = <HTMLTemplateElement>(
      document.getElementById("single-project")?.cloneNode(true)
    );
    this.element = <HTMLLIElement>this.Template.content.querySelector("li");
    this.element.innerHTML = `${project.title} <span class ="close">x</span>`;
    this.element.id = project.title;
  }
  // @bindThis
  // deleteProject(): void {
  //   // return this.element.id;
  //   Store.getInstacne().removeProject(this.element.id);
  //   ProjectList.attachProject();
  // }

  getProj(): HTMLLIElement {
    this.element
      .querySelector(".close")
      ?.addEventListener("click", () => console.log("should close"));
    return this.element;
  }
}
