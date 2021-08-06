import { Resolver } from '@parcel/plugin';
import { Dependency, FilePath, PluginLogger, PluginOptions, ResolveResult } from '@parcel/types';
import { match } from 'minimatch';

type ResolverParams = {
    dependency: Dependency;
    options: PluginOptions;
    logger: PluginLogger;
    filePath: FilePath;
    pipeline: string | null | undefined;
};

function shouldSkip(filePath: FilePath) {
    const pkg = this.getPackage();
    const configs = pkg?.externalsExcluder;

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
    async resolve({ filePath }: ResolverParams): Promise<ResolveResult> {
        if (shouldSkip(filePath)) {
            return null;
        }

        return {
            filePath,
        };
    },
});
