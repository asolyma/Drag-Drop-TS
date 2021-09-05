import { bindThis } from "./bindThis";
import { schema } from "./app";
import { IuserInput } from "./Types";
import { State } from "./State";
import { Component } from "./Component";

export class UserInput extends Component<HTMLFormElement, HTMLDivElement> {
  private readonly userinput: IuserInput = {
    title: "",
    description: "",
    people: undefined,
  };

  constructor() {
    super("project-input", "form", "app");
    this.renderComponent();
    this.register();
  }
  renderComponent(): void {
    if (this.element) {
      this.target.innerHTML = "";
      this.target.appendChild(this.element);
      this.element.id = "user-input";
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
    } else {
      throw new Error(result.ErrorMessage);
    }
    this.clean();
  }

  async validate(): Promise<
    IuserInput | { ErrorMessage: string; label: string | undefined }
  > {
    try {
      const res = await schema.validate(this.userinput);
      if (res.error) {
        const ErrorMessage: string = res.error.details[0].message;
        const label: string | undefined = res.error.details[0].context?.label;
        const errObj = { ErrorMessage, label };
        return errObj;
      } else {
        return res.value;
      }
    } catch (e: any) {
      return e.message;
    }
  }
  register(): void {
    this.element.addEventListener("submit", this.handleSubmit);
  }
  clean(): void {
    (<HTMLInputElement>document.getElementById("title")).value = "";
    (<HTMLInputElement>document.getElementById("description")).value = "";
    (<HTMLInputElement>document.getElementById("people")).value = "";
  }
}
