import { init } from "@/application/init";
import fetchMemos from "@/infrastructure/memo/fetchMemos";
import { question } from "@/infrastructure/interaction/question";

export default init(fetchMemos, question);
