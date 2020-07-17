import { Injectable, EventEmitter, NgZone } from "@angular/core";
var FileUpload = (function () {
    function FileUpload() {
        this.zone = new NgZone({ enableLongStackTrace: false });
        this.url = null;
        this.beforeRequest = null;
        this.beforeFileUpload = null;
        this.fileUploadedEvent = new EventEmitter(true);
    }
    FileUpload.prototype.uploadFiles = function (iFiles) {
        var _this = this;
        return Promise.all(iFiles.reduce(function (res, iFile) {
            return res.push(_this.uploadFile(iFile)), res;
        }, []));
    };
    FileUpload.prototype.uploadFile = function (iFile) {
        var _this = this;
        if (!this.url) {
            throw "url to upload needs to be provided";
        }
        if (iFile.loading) {
            throw "Already under loading";
        }
        var that = this, formData = new FormData();
        var xhr = new XMLHttpRequest();
        xhr.upload.onprogress = function (event) {
            var progress = (event.loaded * 100) / event.total | 0;
            _this.zone.run(function () {
                iFile.percentage = progress;
            });
        };
        var pr = new Promise(function (resolve, reject) {
            xhr.onload = xhr.onerror = function (e) {
                var _this = this;
                that.zone.run(function () {
                    if (_this["status"] == 200) {
                        iFile.loading = false;
                        iFile.loadingSuccessful = true;
                        resolve(true);
                    }
                    else {
                        iFile.loading = false;
                        iFile.loadingSuccessful = false;
                        reject(false);
                    }
                });
            };
        }).then(function (success) {
            _this.fileUploadedEvent.emit([success, xhr.response, iFile]);
        }, function (reason) {
            _this.fileUploadedEvent.emit([reason, xhr.response, iFile]);
        });
        iFile.loading = true;
        xhr.open("POST", this.url, true);
        //Hook before request to provide user ability to add headers or something else in XHR
        typeof this.beforeRequest === "function" && this.beforeRequest(xhr);
        formData.append("" + iFile.File.name, iFile.File);
        if (typeof this.beforeFileUpload === "function") {
            Promise.resolve(this.beforeFileUpload(formData)).then(function (formData) {
                formData && xhr.send(formData);
                formData || console.warn("beforeFileUpload didn't return formData for " + iFile.File.name + " and upload was aborted");
            });
        }
        else {
            xhr.send(formData);
        }
        return pr;
    };
    return FileUpload;
}());
export { FileUpload };
FileUpload.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FileUpload.ctorParameters = function () { return []; };
//# sourceMappingURL=FileUpload.service.js.map