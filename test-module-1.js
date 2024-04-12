// class Calculator {
//     add(a, b) {
//         return a + b;
//     }

//     multiply(a, b) {
//         return a * b;
//     }

//     divide(a, b) {
//         return a / d;
//     }
// }

// module.exports = Calculator;

// better way
module.exports = class {
    add(a, b) {
        return a + b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        return a / b;
    }
}