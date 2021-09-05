import { Component } from "./Component";
import { AddedProject } from "./Types";

export class Project
  extends Component<HTMLLIElement, HTMLUListElement>
  implements AddedProject
{
  title: string;
  description: string;
  people: number | undefined;
  status: "active" | "finished" | "pending";
  id: string;

  constructor(project: AddedProject) {
    super("single-project", "li", `${project.status}-project-list`);

    this.title = project.title;
    this.description = project.description;
    this.people = project.people;
    this.status = project.status;
    this.id = project.id;
    this.renderComponent();
  }
  renderComponent(): void {
    this.target.innerHTML = "";

    this.element.innerHTML = `${this.title} <span class ="close">x</span>`;
    this.element.id = this.title;
    const close = this.element.querySelector(".close");
    if (close) {
      close.addEventListener("click", () => console.log("should close"));
    }
    this.target.append(this.element);
  }
}
