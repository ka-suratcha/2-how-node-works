// EventEmitter cam emit named event then subscribe to these event (listen) and react accordingly
// can pass arg to eventlistener by as an additional in emiiter
// multiple listener for the same event -> will run sync

// EventEmiiter kind of standard name
const EventEmitter = require("events");

// best practice is create a new class then inherit from the node EventEmitter
// parent is sales, superclass is EventEmitter
class Sales extends EventEmitter {
    constructor() {
        super(); // get access to all the methods of the parent class (EvnetEmitter)
    }
}

// create instance
const myEmitter = new Sales();

// create listener (ovserve the emitter) wait for emit the newSale event
myEmitter.on("newSale", () => {
    console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
    console.log("Costumer name: Jonas");
});

myEmitter.on("newSale", (stock) => {
    console.log(`There r now ${stock} items left in stock`);
});

// emit the events
myEmitter.emit("newSale", 9);
