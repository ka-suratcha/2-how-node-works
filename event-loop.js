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

// all func from this will be offloaded auto matically by the event loop to the thread pool
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 3;

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
    setTimeout(() => console.log("Timer 3 finished"), 300);
    setImmediate(() => console.log("Immediate 2 finsihed"));
    process.nextTick(() => console.log("Process.nextTick"));

    // should tank approximatrly the same amount of time
    // default size of thread pool is 4 -> that y 4 pwd encryption take same time and happen all at the same time
    // after config thread pool size -> take longer to cal, cal one after other
    crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password encrypted");
    });
    crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password encrypted");
    });
    crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password encrypted");
    });
    crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password encrypted");
    });
});

console.log("Hello from the top-level code (1st)");
