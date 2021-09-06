export interface AddedProject {
  title: string;
  description: string;
  people: number | undefined;
  status: "active" | "finished" | "pending";
  id: string;
}
export interface IuserInput {
  title: string;
  description: string;
  people: number | undefined;
}

export interface Draggable {
  dragstarthandler(event: DragEvent): void;
  dragEndhandler(event: DragEvent): void;
}

export interface Dragtarget {
  dragoverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeavehandler(event: DragEvent): void;
}
