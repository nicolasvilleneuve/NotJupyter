"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const serve = (port, filename, dir) => {
    console.log(`serving traffic on port ${port}`);
    console.log(`saving to ${filename}`);
    console.log(`putting in the directory of ${dir}`);
};
exports.serve = serve;
