import { v4 as uuid } from "uuid";

export class Todo {

    id;
    description;
    done;
    
    constructor(description) {
        this.id = uuid();
        this.description = description;
        this.done = false;    
    }
}