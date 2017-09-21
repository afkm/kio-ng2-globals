var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component } from '@angular/core';
import { AbstractGlobalsComponent } from '../abstract/abstract.component';
var GlobalsComponent = (function (_super) {
    __extends(GlobalsComponent, _super);
    function GlobalsComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GlobalsComponent;
}(AbstractGlobalsComponent));
export { GlobalsComponent };
GlobalsComponent.decorators = [
    { type: Component, args: [{
                selector: 'kio-globals',
                templateUrl: './content.component.html'
            },] },
];
/** @nocollapse */
GlobalsComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=content.component.js.map