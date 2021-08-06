"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_1 = require("@parcel/plugin");
const minimatch_1 = require("minimatch");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
function shouldSkip(filePath, projectRoot) {
    const configs = fs_extra_1.readJsonSync(path_1.join(projectRoot, 'package.json')).externalsExcluder;
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
    async resolve({ filePath, logger, options }) {
        if (shouldSkip(filePath, options.projectRoot)) {
            logger.verbose({
                message: `✅ Skipping for ${filePath}`,
            });
            return null;
        }
        else {
            logger.verbose({
                message: `❌ Not skipping for ${filePath}`,
            });
        }
        return {
            filePath,
        };
    },
});
