import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { FileParser } from "../Services/FileParser.service";
import { FilesStore } from "../Services/FileStore.service";
var FileDropZone = (function () {
    function FileDropZone(filesStore, el, fileParser) {
        this.filesStore = filesStore;
        this.el = el;
        this.fileParser = fileParser;
        this.hiddenFileInput = null;
        this.promise = null;
        this.createHiddenInput();
    }
    Object.defineProperty(FileDropZone.prototype, "multiple", {
        set: function (value) {
            var attributeName = 'multiple';
            if (value) {
                this.hiddenFileInput.setAttribute(attributeName, attributeName);
            }
            else {
                this.hiddenFileInput.removeAttribute(attributeName);
            }
        },
        enumerable: true,
        configurable: true
    });
    /*
     * Host Event Listeners
     * */
    FileDropZone.prototype.onClick = function (e) {
        this.hiddenFileInput && this.hiddenFileInput.click();
    };
    FileDropZone.prototype.drop = function (e) {
        var _this = this;
        e.preventDefault();
        if (!e.dataTransfer || !e.dataTransfer.files.length) {
            return;
        }
        this.promise = this.fileParser.processInputFromDrop(e)
            .then(function (files) {
            _this.updateFilesStore(files.slice());
        });
        this.updateStyles();
    };
    FileDropZone.prototype.dragenter = function (e) {
        e.preventDefault();
    };
    FileDropZone.prototype.dragover = function (e) {
        e.preventDefault();
        this.updateStyles(true);
    };
    FileDropZone.prototype.dragleave = function (e) {
        e.preventDefault();
        this.updateStyles();
    };
    /*
     * Public methods
     * */
    FileDropZone.prototype.OnDestroy = function () {
        this.hiddenFileInput && document.body.removeChild(this.hiddenFileInput);
        this.hiddenFileInput = null;
    };
    FileDropZone.prototype.updateStyles = function (dragOver) {
        if (dragOver === void 0) { dragOver = false; }
        //this.el.nativeElement.classList[(dragOver) ? 'add' : 'remove'](this._overCls);
    };
    FileDropZone.prototype.updateFilesStore = function (files) {
        this.filesStore.addFiles(files);
    };
    FileDropZone.prototype.createHiddenInput = function () {
        var _this = this;
        this.hiddenFileInput && document.body.removeChild(this.hiddenFileInput);
        this.hiddenFileInput = document.createElement("input");
        this.hiddenFileInput.setAttribute("type", "file");
        this.hiddenFileInput.setAttribute("multiple", "multiple");
        this.hiddenFileInput.style.visibility = "hidden";
        this.hiddenFileInput.style.position = "absolute";
        this.hiddenFileInput.style.top = "0";
        this.hiddenFileInput.style.left = "0";
        this.hiddenFileInput.style.height = "0";
        this.hiddenFileInput.style.width = "0";
        this.hiddenFileInput.className = "_hiddenInputClassName";
        document.body.appendChild(this.hiddenFileInput);
        this.hiddenFileInput.addEventListener("change", function (e) {
            var files = [];
            for (var i = 0, l = e.target.files.length; i < l; i++) {
                files.push(e.target.files[i]);
            }
            _this.hiddenFileInput.value = "";
            _this.updateFilesStore(files);
        });
    };
    return FileDropZone;
}());
export { FileDropZone };
FileDropZone.decorators = [
    { type: Component, args: [{
                selector: 'fileDropZone, [fileDropZone]',
                providers: [FileParser],
                styles: ["\n        .file_dropZone_internal {\n            border: 3px dashed #DDD;\n            border-radius:10px;\n            padding:10px;\n            width:400px;\n            height:200px;\n            color:#CCC;\n            text-align:center;\n            display:table-cell;\n            vertical-align:middle;\n            cursor:pointer;\n        }\n    "],
                template: "\n        <ng-content></ng-content>\n    ",
                host: {
                    '(drop)': 'drop($event)',
                    '(dragenter)': 'dragenter($event)',
                    '(dragover)': 'dragover($event)',
                    '(dragleave)': 'dragleave($event)',
                    '(click)': 'onClick($event)'
                },
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
FileDropZone.ctorParameters = function () { return [
    { type: FilesStore, },
    { type: ElementRef, },
    { type: FileParser, },
]; };
FileDropZone.propDecorators = {
    'multiple': [{ type: Input },],
};
//# sourceMappingURL=FileDropZone.js.map