"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_1 = require("@parcel/plugin");
const minimatch_1 = require("minimatch");
function shouldSkip(filePath) {
    const pkg = this.getPackage();
    const configs = pkg?.externalsExcluder;
    if (!configs) {
        return;
    }
    for (const config in configs) {
        if (minimatch_1.match([filePath], config)) {
            return true;
        }
    }
    return false;
}
exports.default = new plugin_1.Resolver({
    async resolve({ filePath }) {
        if (shouldSkip(filePath)) {
            return null;
        }
        return {
            filePath,
        };
    },
});
