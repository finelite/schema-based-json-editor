"use strict";
var core_1 = require("@angular/core");
var EditorComponent = (function () {
    function EditorComponent() {
        this.updateValue = new core_1.EventEmitter();
        this.onDelete = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input()
    ], EditorComponent.prototype, "schema", void 0);
    __decorate([
        core_1.Input()
    ], EditorComponent.prototype, "initialValue", void 0);
    __decorate([
        core_1.Input()
    ], EditorComponent.prototype, "title", void 0);
    __decorate([
        core_1.Output()
    ], EditorComponent.prototype, "updateValue", void 0);
    __decorate([
        core_1.Input()
    ], EditorComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Input()
    ], EditorComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input()
    ], EditorComponent.prototype, "locale", void 0);
    __decorate([
        core_1.Input()
    ], EditorComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input()
    ], EditorComponent.prototype, "required", void 0);
    EditorComponent = __decorate([
        core_1.Component({
            selector: "editor",
            template: "\n    <object-editor *ngIf=\"schema.type === 'object'\"\n        [schema]=\"schema\"\n        [initialValue]=\"initialValue\"\n        [title]=\"title\">\n    </object-editor>\n    <array-editor *ngIf=\"schema.type === 'array'\"\n        [schema]=\"schema\"\n        [initialValue]=\"initialValue\"\n        [title]=\"title\">\n    </array-editor>\n    <number-editor *ngIf=\"schema.type === 'number' || schema.type === 'integer'\"\n        [schema]=\"schema\"\n        [initialValue]=\"initialValue\"\n        [title]=\"title\">\n    </number-editor>\n    <boolean-editor *ngIf=\"schema.type === 'boolean'\"\n        [schema]=\"schema\"\n        [initialValue]=\"initialValue\"\n        [title]=\"title\">\n    </boolean-editor>\n    <null-editor *ngIf=\"schema.type === 'null'\"\n        [schema]=\"schema\"\n        [initialValue]=\"initialValue\"\n        [title]=\"title\">\n    </null-editor>\n    <string-editor *ngIf=\"schema.type === 'string'\"\n        [schema]=\"schema\"\n        [initialValue]=\"initialValue\"\n        [title]=\"title\">\n    </string-editor>\n    ",
        })
    ], EditorComponent);
    return EditorComponent;
}());
exports.EditorComponent = EditorComponent;
//# sourceMappingURL=editor.component.js.map