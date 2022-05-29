import { init } from "@/application/init";
import { clone } from "@/infrastructure/git";
import { question } from "@/infrastructure/interaction/question";

export default init(clone, question);
