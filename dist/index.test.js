"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const fs_extra_1 = require("fs-extra");
jest.mock('fs-extra');
const readJsonSyncMock = fs_extra_1.readJsonSync;
describe('ResolverTest', () => {
    it('should not exclude filePaths if config is empty', () => {
        readJsonSyncMock.mockReturnValueOnce(null);
        const result = index_1.shouldExclude('my/Path', 'root');
        expect(result).toBeFalsy();
    });
    it('should exclude filePaths if config', () => {
        readJsonSyncMock.mockReturnValue({
            externalsExcluder: ['/my/*', '/some/*'],
        });
        const result = index_1.shouldExclude('/my/Path.exe', 'root');
        expect(result).toBeTruthy();
        const result2 = index_1.shouldExclude('your/Path', 'root');
        expect(result2).toBeFalsy();
    });
});
