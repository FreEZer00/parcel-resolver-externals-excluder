"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldExclude = void 0;
const plugin_1 = require("@parcel/plugin");
const minimatch_1 = require("minimatch");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
function shouldExclude(filePath, projectRoot) {
    const configs = fs_extra_1.readJsonSync(path_1.join(projectRoot, 'package.json'))?.externalsExcluder;
    if (!configs) {
        return false;
    }
    for (const config of configs) {
        const matching = minimatch_1.match([filePath], config);
        if (matching.length > 0) {
            return true;
        }
    }
    return false;
}
exports.shouldExclude = shouldExclude;
exports.default = new plugin_1.Resolver({
    async resolve({ filePath, logger, options }) {
        if (shouldExclude(filePath, options.projectRoot)) {
            logger.verbose({
                message: `✅ Excluding for ${filePath}`,
            });
            return {
                filePath,
                isExcluded: true,
            };
        }
        return null;
    },
});
