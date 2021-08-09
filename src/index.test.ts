import { shouldExclude } from './index';
import { PluginLogger } from '@parcel/types';

import { readJsonSync } from 'fs-extra';
jest.mock('fs-extra');
const readJsonSyncMock = readJsonSync as jest.MockedFunction<typeof readJsonSync>;

const loggerMock: PluginLogger = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    verbose(diagnostic: any) {
        console.log(diagnostic);
    },
    log: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
};

describe('ResolverTest', () => {
    it('should not exclude filePaths if config is empty', () => {
        readJsonSyncMock.mockReturnValueOnce(null);

        const result = shouldExclude('my/Path', 'root', loggerMock);
        expect(result).toBeFalsy();
    });

    it('should exclude filePaths if config', () => {
        readJsonSyncMock.mockReturnValue({
            externalsExcluder: ['/my/*', '/some/*'],
        });

        const result = shouldExclude('/my/Path.exe', 'root', loggerMock);
        expect(result).toBeTruthy();
        const result2 = shouldExclude('your/Path', 'root', loggerMock);
        expect(result2).toBeFalsy();
    });
});
