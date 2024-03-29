import { bindThis } from "./bindThis";
import { Component } from "./Component";
import { State } from "./State";
import { AddedProject, Draggable } from "./Types";

export class Project
  extends Component<HTMLLIElement, HTMLUListElement>
  implements AddedProject, Draggable
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
    this.configure();
  }
  @bindThis
  dragstarthandler(event: DragEvent): void {
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", this.id);
    }
  }
  @bindThis
  dragEndhandler(_: DragEvent): void {
    console.log("item was moved");
  }

  configure(): void {
    this.element.addEventListener("dragstart", this.dragstarthandler);
    this.element.addEventListener("dragend", this.dragEndhandler);
  }
  renderComponent(): void {
    const closing = document.createElement("span");
    closing.classList.add("close");
    closing.innerText = "X";
    if (this.status == "active") {
      this.element.append(closing);
    }

    const projectTitle = this.element.querySelector("h2");
    if (projectTitle) {
      projectTitle.innerText = this.title;
      this.element.append(projectTitle);
    }
    const projectDescription = this.element.querySelector("p");
    if (projectDescription) {
      projectDescription.innerText = this.description;
      this.element.append(projectDescription);
    }
    const projectPersons = this.element.querySelector("h3");
    if (projectPersons) {
      projectPersons.innerText = `${this.people}`; //`${this.people}`;
      this.element.append(projectPersons);
    }

    this.element.id = this.id;
    const close = this.element.querySelector(".close");

    if (close) {
      close.addEventListener("click", () =>
        State.getInstance().removeProject(this.title)
      );
    }
    this.target.appendChild(this.element);
  }
}
