// Single thread
// Initialize program
//          ↓
// execute "top-level" code
//          ↓
// require modules
//          ↓
// register event callbacks
//          ↓
// start event loop

// Event loop
// expired time callback                                                    ━┓
//          ↓                                                                ┃yes
// I/O polling and callbacks        next tick is part of microtask quere     ┃                                  no
//          ↓                       which get executed after each phase      ┣━ any pending timer or I/O task ━━━━━━━ exit program
// setimmediate callback                                                     ┃
//          ↓                                                                ┃
// close callback                                                           ━┛

const fs = require("fs");

// ---- no paricular order cuz not i a I/O cycle, not running inside eventloop -> not running inside of any callback func
setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finsihed"));

// y setImmediate appear before setTimeout?
// eventloop wait for for stuff to happen in polling phase -> phase where I/O callback are handled, so when this queue of callbacks is empty
// like in Ex. dont have I/O callback only have timer -> event loop will wait in this phase until there is an expired timer
// but if scheduled a callback using setImmediate then that callback will be executed right away after polling phase or even before expired timer
fs.readFile("test-file.txt", () => {
    console.log("------- event-loop ---------\n");
    console.log("I/O finished (2nd)");
    console.log("----------------------------");

    setTimeout(() => console.log("Timer 2 finished"), 0); // same with setImmediate
    setTimeout(() => console.log("Timer 3 finished"), 3000);
    setImmediate(() => console.log("Immediate 2 finsihed"));
    process.nextTick(() => console.log("Process.nextTick"));
});

console.log("Hello from the top-level code (1st)");