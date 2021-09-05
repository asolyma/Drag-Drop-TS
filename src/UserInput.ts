import { bindThis } from "./bindThis";
import { schema } from "./app";
import { IuserInput } from "./Types";
import { State } from "./State";
// import { ProjectList } from "./ProjectList";

export class UserInput {
  private Template: HTMLTemplateElement;
  private root: HTMLDivElement;
  private form: HTMLFormElement;
  private readonly userinput: IuserInput = {
    title: "",
    description: "",
    people: undefined,
  };

  constructor() {
    this.Template = <HTMLTemplateElement>(
      document.getElementById("project-input")
    );
    const Fragment = <DocumentFragment>this.Template.content.cloneNode(true);
    this.form = <HTMLFormElement>Fragment.querySelector("form");
    this.root = <HTMLDivElement>document.getElementById("app");
    this.render();
    this.register();
  }
  render(): void {
    //reset the div and insert the form
    if (this.form) {
      this.root.innerHTML = "";
      this.root.appendChild(this.form);
      //set the id for stylnig
      this.form.id = "user-input";
    }
  }
  @bindThis
  private async handleSubmit(e: Event) {
    e.preventDefault();
    this.userinput.title = (<HTMLInputElement>document.getElementById("title"))
      .value as string;
    this.userinput.description = (<HTMLInputElement>(
      document.getElementById("description")
    )).value;
    this.userinput.people = +(<HTMLInputElement>(
      document.getElementById("people")
    )).value;
    const result:
      | IuserInput
      | { ErrorMessage: string; label: string | undefined } =
      await this.validate();
    if ("title" in result) {
      State.getInstance().addProject(result);
      console.log(State.getInstance().projects);
      // ProjectList.attachProject();
    } else {
      console.error(result.ErrorMessage);
    }
    this.clean();
  }

  async validate(): Promise<
    IuserInput | { ErrorMessage: string; label: string | undefined }
  > {
    try {
      const res = await schema.validate(this.userinput);
      if (res.error) {
        // let label = res.error.details[0].context?.label;
        const ErrorMessage: string = res.error.details[0].message;
        const label: string | undefined = res.error.details[0].context?.label;
        const errObj = { ErrorMessage, label };
        return errObj;
      } else {
        return res.value;
      }
    } catch (e) {
      return e.message;
    }
  }
  // use an arrow function , bind this keyword , or create a binding decorator
  register(): void {
    this.form.addEventListener("submit", this.handleSubmit);
  }
  clean(): void {
    (<HTMLInputElement>document.getElementById("title")).value = "";
    (<HTMLInputElement>document.getElementById("description")).value = "";
    (<HTMLInputElement>document.getElementById("people")).value = "";
  }
}
