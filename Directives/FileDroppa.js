import { Component, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FilesStore } from "../Services/FileStore.service";
import { FileUpload } from "../Services/FileUpload.service";
var FileDroppa = (function () {
    function FileDroppa(filesStore, fileUploadService) {
        var _this = this;
        this.filesStore = filesStore;
        this.fileUploadService = fileUploadService;
        this.showFilesList = true;
        this.autoUpload = false;
        this.beforeRequest = null;
        this.beforeFileUpload = null;
        this.beforeAddFile = null;
        this.dropZoneTemplate = "\n      <div class=\"file_dropZone_internal\">\n          Drop Files Here\n      </div>\n    ";
        this.filesUpdated = new EventEmitter(true);
        this.fileUploaded = new EventEmitter(true);
        this.uploadButtonTemplate = "\n      <div class=\"file-droppa-btn orange\">\n        <span>Upload All Files</span>\n       </div>\n    ";
        this.removeButtonTemplate = "\n      <div class=\"file-droppa-btn red\">\n        <span>Remove All Files</span>\n       </div>\n    ";
        this.multiple = true;
        filesStore.filesUpdated.subscribe(function () {
            _this.filesUpdated.emit(filesStore.files);
        });
        fileUploadService.fileUploadedEvent.subscribe(function (_a) {
            var success = _a[0], response = _a[1], iFile = _a[2];
            if (success) {
                _this.filesStore.removeFiles(iFile);
            }
            else {
                iFile.loadingSuccessful = false;
                iFile.responseText = false;
            }
            _this.fileUploaded.emit([success, response, iFile.file]);
        });
        filesStore.startAutoUploading = this.startAutoUploading.bind(this);
    }
    Object.defineProperty(FileDroppa.prototype, "url", {
        set: function (tmpUrl) {
            this.fileUploadService.url = tmpUrl;
        },
        enumerable: true,
        configurable: true
    });
    FileDroppa.prototype.startAutoUploading = function (iFile) {
        this.autoUpload && this.fileUploadService.uploadFile(iFile);
    };
    /**
     * We got to pass Input parameters to Service instances
     */
    FileDroppa.prototype.ngOnInit = function () {
        this.filesStore.beforeAddFile = (typeof this.beforeAddFile === "function") ? this.beforeAddFile : function (file) { return true; };
        this.fileUploadService.beforeRequest = this.beforeRequest;
        this.fileUploadService.beforeFileUpload = (typeof this.beforeFileUpload === "function") ? this.beforeFileUpload : function (formData) { return true; };
    };
    FileDroppa.prototype.removeAllFiles = function () {
        this.filesStore.clearStore();
    };
    FileDroppa.prototype.uploadAllFiles = function () {
        this.fileUploadService.uploadFiles(this.filesStore.iFiles);
    };
    return FileDroppa;
}());
export { FileDroppa };
FileDroppa.decorators = [
    { type: Component, args: [{
                selector: 'fileDroppa',
                providers: [FilesStore, FileUpload],
                encapsulation: ViewEncapsulation.None,
                styles: ["\n        .file-droppa-container {\n            width: 400px;\n        }\n        .file-droppa-btns {\n         display: flex;\n          align-items: center;\n          justify-content: center;\n\n        }\n        .file-droppa-btn {\n              margin: 15px;\n              padding: 0;\n\n              overflow: hidden;\n\n              border-width: 0;\n              outline: none;\n              border-radius: 2px;\n              box-shadow: 0 1px 4px rgba(0, 0, 0, .6);\n\n              background-color: #2ecc71;\n              color: #ecf0f1;\n\n              transition: background-color .3s;\n              width: 140px;\n              text-align: center;\n              font-size: 12px;\n\n        }\n\n        .file-droppa-btn:hover{\n          background-color: #27ae60;\n        }\n\n        .file-droppa-btn span {\n          display: block;\n          padding: 12px 24px;\n        }\n\n        .file-droppa-btn.orange {\n          background-color: #e67e22;\n        }\n\n        .file-droppa-btn.orange:hover {\n          background-color: #d35400;\n        }\n\n        .file-droppa-btn.red {\n          background-color: #e74c3c;\n        }\n\n        .file-droppa-btn.red:hover{\n          background-color: #c0392b;\n        }\n        "
                ],
                template: "\n        <div class=\"file-droppa-container\">\n            <fileDropZone [multiple]=\"multiple\">\n                <div [innerHTML]=\"dropZoneTemplate\"></div>\n            </fileDropZone>\n            <br/>\n            <ng-content></ng-content>\n            <fileList *ngIf=\"showFilesList\"></fileList>\n            <div class=\"file-droppa-btns\" *ngIf=\"filesStore.iFiles.length\">\n              <div #uploadButtonArea (click)=\"uploadAllFiles($event)\">\n                <ng-content select=\"[upload-button]\"></ng-content>\n              </div>\n              <div *ngIf=\"uploadButtonArea.children.length === 0\" (click)=\"uploadAllFiles($event)\"\n                   [innerHTML]=\"uploadButtonTemplate\"></div>\n              <div #removeButtonArea (click)=\"removeAllFiles($event)\">\n                <ng-content select=\"[remove-button]\"></ng-content>\n              </div>\n              <div *ngIf=\"removeButtonArea.children.length === 0\" (click)=\"removeAllFiles($event)\"\n                   [innerHTML]=\"removeButtonTemplate\"></div>\n            </div>\n        </div>\n    "
            },] },
];
/** @nocollapse */
FileDroppa.ctorParameters = function () { return [
    { type: FilesStore, },
    { type: FileUpload, },
]; };
FileDroppa.propDecorators = {
    'showFilesList': [{ type: Input },],
    'autoUpload': [{ type: Input },],
    'beforeRequest': [{ type: Input },],
    'url': [{ type: Input },],
    'beforeFileUpload': [{ type: Input },],
    'beforeAddFile': [{ type: Input },],
    'dropZoneTemplate': [{ type: Input },],
    'filesUpdated': [{ type: Output },],
    'fileUploaded': [{ type: Output },],
    'uploadButtonTemplate': [{ type: Input },],
    'removeButtonTemplate': [{ type: Input },],
    'multiple': [{ type: Input },],
};
//# sourceMappingURL=FileDroppa.js.map