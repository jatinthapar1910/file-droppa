import { Component } from '@angular/core';
import { FilesStore } from "../Services/FileStore.service";
var FileList = (function () {
    function FileList(filesStore) {
        this.filesStore = filesStore;
    }
    FileList.prototype.removeFile = function (iFile) {
        this.filesStore.removeFiles(iFile);
    };
    return FileList;
}());
export { FileList };
FileList.decorators = [
    { type: Component, args: [{
                selector: 'fileList, [fileList]',
                styles: ["\n        .file-list {\n            width: 430px;\n            margin-bottom: 5px;\n            display: flex;\n            flex-flow: wrap;\n            justify-content: flex-start;\n         }\n    "],
                template: "\n        <div class=\"file-list\">\n            <fileItem *ngFor=\"let file of filesStore.iFiles\"\n                [file]=\"file.File\"\n                [percentage]=\"file.percentage\"\n                [loadingSuccessful]=\"file.loadingSuccessful\"\n                [responseMessage]=\"file.responseMessage\"\n                (removeFile)=\"removeFile(file)\">\n            </fileItem>\n        </div>\n    "
            },] },
];
/** @nocollapse */
FileList.ctorParameters = function () { return [
    { type: FilesStore, },
]; };
//# sourceMappingURL=FileList.js.map