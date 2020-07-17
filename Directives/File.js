import { Component, Input, Output, EventEmitter } from '@angular/core';
var File = (function () {
    function File() {
        this.ext = '';
        this.previewSrc = '';
        this.fileName = '';
        //TODO: workaround - depends on strict values;
        this.previewHeight = 75;
        this.removeFile = new EventEmitter(true);
    }
    //ngHooks
    File.prototype.ngAfterContentInit = function () {
        this.file && this.getFileType();
    };
    File.prototype.removeFileListener = function (e) {
        e.preventDefault();
        this.removeFile && this.removeFile.emit(true);
    };
    File.prototype.getFileType = function () {
        var _this = this;
        var imageType = /^image\//, reader;
        if (!imageType.test(this.file.type)) {
            var ext = this.file.name.split('.').pop();
            this.fileName = this.file.name;
            this.ext = ext.length > 3
                ? 'file'
                : "." + ext;
            return;
        }
        reader = new FileReader();
        reader.addEventListener("load", function () {
            var img = new Image, result = reader.result;
            img.onload = function () {
                var ratio = img.height / img.width, scaledHeight = ratio * _this.previewHeight;
                _this.previewSrc = result;
                _this.previewHeight = (scaledHeight < _this.previewHeight)
                    ? _this.previewHeight
                    : scaledHeight;
            };
            img.src = result;
        }, false);
        if (this.file) {
            reader.readAsDataURL(this.file);
        }
    };
    return File;
}());
export { File };
File.decorators = [
    { type: Component, args: [{
                selector: 'fileItem',
                styles: ["\n        .file-container {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            width: 75px;\n            margin: 20px 10px 0 0;\n            transition: opacity 0.5s, margin 0.5s linear;\n            flex-direction: column;\n            position:relative;\n        }\n\n        .file-container.uploaded {\n            opacity: 0;\n            margin: 0;\n            height: 0;\n            overflow: hidden;\n        }\n\n        .flex-block {\n            width: 90%;\n            text-align: center;\n            font-size: 0.8em;\n            margin: 2px 0;\n        }\n\n        .file-remove {\n            cursor: pointer;\n            position: absolute;\n            left: 87%;\n            top: 8px;\n        }\n        .file-upload-error {\n            position: absolute;\n            top: 8px;\n            left:-8px;\n        }\n        .file-name {\n            text-overflow: ellipsis;\n            overflow: hidden;\n        }\n\n        .file-preview {\n            background: #ccc;\n            border-radius: 2px;\n            width: inherit;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            flex-direction: column;\n            background-size: cover;\n            color: #fff;\n        }\n\n         .file-preview-ext {\n            text-transform: uppercase;\n        }\n\n        .file-progress {\n            width: 80%;\n            display: block;\n        }\n\n\n        button {\n            margin: 0;\n        }\n\nspan {\n    position:relative;\n    z-index:1;\n    overflow:hidden;\n    list-style:none;\n    padding:0;\n    margin:0 0 0.25em;\n}\n\nspan a:link {\n    display:block;\n    border:0;\n    padding-left:28px;\n    color:#c55500;\n}\n\nspan a:hover,\nspan a:focus {\n    color:#730800;\n    background:transparent;\n}\n\nspan:before,\nspan:after,\nspan a:before,\nspan a:after {\n    content:\"\";\n    position:absolute;\n    top:50%;\n    left:0;\n}\n\nspan a:before,\nspan a:after {\n    margin:-8px 0 0;\n    background:#c55500;\n}\n\nspan a:hover:before,\nspan a:focus:before {\n    background:#730800;\n}\n\n\n.remove a:before {\n    width:16px;\n    height:16px;\n    /* css3 */\n    -webkit-border-radius:16px;\n    -moz-border-radius:16px;\n    border-radius:16px;\n}\n\n.remove a:after {\n    left:3px;\n    width:10px;\n    height:2px;\n    margin-top:-1px;\n    background:#fff;\n}\n.warning:before {\n    content:\"!\";\n    z-index:2;\n    left:8px;\n    margin-top:-8px;\n    font-size:14px;\n    font-weight:bold;\n    color:#000;\n}\n\n.warning:after {\n    z-index:1;\n    border-width:0 11px 18px;\n    border-style:solid;\n    border-color:#F8D201 transparent;\n    margin-top:-10px;\n    background:transparent;\n}\n\n.file-upload-error .tooltiptext {\n    visibility: hidden;\n    white-space:nowrap;\n    background-color: black;\n    color: #fff;\n    text-align: center;\n    padding: 5px;\n    border-radius: 6px;\n\n    /* Position the tooltip text - see examples below! */\n    position: absolute;\n    z-index: 1;\n}\n\n.file-upload-error:hover .tooltiptext {\n    visibility: visible;\n}\n\n    "],
                template: "\n        <div *ngIf=\"file\" class=\"file-container\">\n            <div class=\"flex-block file-preview\" [ngStyle]=\"{'background-image': 'url(' + previewSrc + ')', 'height': previewHeight + 'px'}\">\n                <div *ngIf=\"ext\" class=\"flex-block file-preview-ext \">{{ext}}</div>\n                <div *ngIf=\"!previewSrc\" class=\"flex-block file-name\">{{fileName}}</div>\n                <progress [value]=\"percentage\" max=\"100\" class=\"file-progress\"></progress>\n            </div>\n            <div class=\"file-remove\">\n                <span class=\"remove\"><a href=\"#\" (click)=\"removeFileListener($event)\"></a></span>\n            </div>\n            <div *ngIf=\"!loadingSuccessful\" class=\"file-upload-error\">\n                <span class=\"warning\"></span>\n                <span *ngIf=\"responseMessage\" class=\"tooltiptext\">{{responseMessage}}</span>\n            </div>\n            <div class=\"flex-block\">{{file.size | getSize }}</div>\n        </div>\n    "
            },] },
];
/** @nocollapse */
File.ctorParameters = function () { return []; };
File.propDecorators = {
    'file': [{ type: Input },],
    'index': [{ type: Input },],
    'percentage': [{ type: Input },],
    'loadingSuccessful': [{ type: Input },],
    'responseMessage': [{ type: Input },],
    'removeFile': [{ type: Output },],
};
//# sourceMappingURL=File.js.map