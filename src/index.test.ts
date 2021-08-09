import { shouldExclude } from './index';

import { readJsonSync } from 'fs-extra';
jest.mock('fs-extra');
const readJsonSyncMock = readJsonSync as jest.MockedFunction<typeof readJsonSync>;

describe('ResolverTest', () => {
    it('should not exclude filePaths if config is empty', () => {
        readJsonSyncMock.mockReturnValueOnce(null);

        const result = shouldExclude('my/Path', 'root');
        expect(result).toBeFalsy();
    });

    it('should exclude filePaths if config', () => {
        readJsonSyncMock.mockReturnValue({
            externalsExcluder: ['/my/*', '/some/*'],
        });

        const result = shouldExclude('/my/Path.exe', 'root');
        expect(result).toBeTruthy();
        const result2 = shouldExclude('your/Path', 'root');
        expect(result2).toBeFalsy();
    });
});
