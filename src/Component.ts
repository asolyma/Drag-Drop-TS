export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  private Template: HTMLTemplateElement;
  protected element: T;
  protected target: U;

  constructor(TemplateId: string, elementID: string, targetId: string) {
    this.Template = <HTMLTemplateElement>(
      document.getElementById(TemplateId)?.cloneNode(true)
    );
    this.element = <T>this.Template.content.querySelector(elementID);
    this.target = <U>document.getElementById(targetId);
    this.attatch();
  }

  protected attatch(): void {
    this.target.append(this.element);
  }
  abstract renderComponent(): void;
}
