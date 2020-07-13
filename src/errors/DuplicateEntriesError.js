export class DuplicateEntriesError extends Error {
    constructor(message) {
        super(message); 
        this.name = "DuplicateEntriesError";
        this.message = "You cant insert a duplicate resource";
        this.code =  409;
      }
}
