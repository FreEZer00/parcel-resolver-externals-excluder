import { Resolver } from '@parcel/plugin';
import { Dependency, FilePath, PluginLogger, PluginOptions, ResolveResult } from '@parcel/types';
import { match } from 'minimatch';
import { readJsonSync } from 'fs-extra';
import { join } from 'path';

type ResolverParams = {
    dependency: Dependency;
    options: PluginOptions;
    logger: PluginLogger;
    filePath: FilePath;
    pipeline: string | null | undefined;
};

function shouldExclude(filePath: FilePath, projectRoot: FilePath) {
    const configs = readJsonSync(join(projectRoot, 'package.json'))?.externalsExcluder;
    console.log(configs);

    if (!configs) {
        return;
    }

    for (const config in configs) {
        if (match([filePath], config)) {
            return true;
        }
    }

    return false;
}

export default new Resolver({
    async resolve({ filePath, logger, options }: ResolverParams): Promise<ResolveResult> {
        if (shouldExclude(filePath, options.projectRoot)) {
            logger.verbose({
                message: `✅ Skipping for ${filePath}`,
            });
            return {
                filePath,
                isExcluded: true,
            };
        } else {
            logger.verbose({
                message: `❌ Not skipping for ${filePath}`,
            });
        }

        return null;
    },
});
