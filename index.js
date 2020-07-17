import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FileDroppa as FileDroppaComponent } from "./Directives/FileDroppa";
import { File } from "./Directives/File";
import { FileDropZone } from "./Directives/FileDropZone";
import { FileList } from "./Directives/FileList";
import { GetSizePipe } from "./Pipes/GetSize.pipe";
var FileDroppa = (function () {
    function FileDroppa() {
    }
    return FileDroppa;
}());
export { FileDroppa };
FileDroppa.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                ],
                declarations: [
                    GetSizePipe,
                    FileDroppaComponent,
                    File,
                    FileDropZone,
                    FileList
                ],
                exports: [
                    FileDroppaComponent,
                    File,
                    FileDropZone,
                    FileList
                ],
            },] },
];
/** @nocollapse */
FileDroppa.ctorParameters = function () { return []; };
//# sourceMappingURL=index.js.map