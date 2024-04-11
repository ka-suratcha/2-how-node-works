// EventEmitter cam emit named event then subscribe to these event (listen) and react accordingly
// can pass arg to eventlistener by as an additional in emiiter
// multiple listener for the same event -> will run sync

// EventEmiiter kind of standard name
const EventEmitter = require("events");

// create instance
const myEmitter = new EventEmitter();

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
