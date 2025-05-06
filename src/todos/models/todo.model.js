
export class Todo {

    id;
    description;
    done;
    
    constructor(description) {
        this.id = 1;
        this.description = description;
        this.done = false;    
    }
}