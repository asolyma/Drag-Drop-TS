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
