import { bindThis } from "./bindThis";
import { ProjectList } from "./ProjectList";
import { Store } from "./Store";
import { IuserInput } from "./UserInput";

export class Project {
  private Template: HTMLTemplateElement;
  private element: HTMLElement;
  private Fragment: DocumentFragment;

  constructor(project: IuserInput) {
    this.Template = <HTMLTemplateElement>(
      document.getElementById("single-project")
    );
    this.Fragment = <DocumentFragment>this.Template.content.cloneNode(true);
    this.element = <HTMLElement>this.Fragment.querySelector("li");
    this.element.innerHTML = `${project.title} <span class ="close">x</span>`;
    this.element.id = project.title;
  }
  @bindThis
  deleteProject(): void {
    // return this.element.id;
    Store.getInstacne().removeProject(this.element.id);
    ProjectList.attachProject();
  }

  getProj(): DocumentFragment {
    this.Fragment.querySelector(".close")?.addEventListener(
      "click",
      this.deleteProject
    );
    return this.Fragment;
  }
}
