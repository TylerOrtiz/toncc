import { Media } from "./media";

export interface Portfolio {
    id: string;
    title: string;
    content: string;
    media?: Media[];
}