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

function shouldExclude(filePath: FilePath, projectRoot: FilePath, logger: PluginLogger): boolean {
    const configs = readJsonSync(join(projectRoot, 'package.json'))?.externalsExcluder;
    logger.verbose({
        message: `Config: ${configs}`,
    });

    if (!configs) {
        return false;
    }

    for (const config of configs) {
        const matching = match([filePath], config);

        if (matching.length > 0) {
            return true;
        }
    }

    return false;
}

export default new Resolver({
    async resolve({ filePath, logger, options }: ResolverParams): Promise<ResolveResult> {
        if (shouldExclude(filePath, options.projectRoot, logger)) {
            logger.verbose({
                message: `✅ Excluding for ${filePath}`,
            });
            return {
                filePath,
                isExcluded: true,
            };
        }
        logger.verbose({
            message: `❌ Not excluding for ${filePath}`,
        });

        return null;
    },
});

export { shouldExclude };
