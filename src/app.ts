// import Joi from "joi";
import { UserInput } from "./UserInput";
import { ProjectList } from "./ProjectList";
import Joi from "joi";

export const schema = Joi.object({
  title: Joi.string().required().trim().min(3),
  description: Joi.string().max(256).optional().allow(""),
  people: Joi.number().max(50).required().min(1),
});

new UserInput();
new ProjectList("active");
new ProjectList("finished");
new ProjectList("pending");
