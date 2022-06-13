import { init } from "@/application/init";
import { clone } from "@/infrastructure/git";
import { question } from "@/infrastructure/user/question";

export default init(clone, question);
