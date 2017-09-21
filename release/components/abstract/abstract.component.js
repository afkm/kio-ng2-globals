import { Inject, Input } from '@angular/core';
import { GlobalsService } from '../../services/globals.service';
var AbstractGlobalsComponent = (function () {
    function AbstractGlobalsComponent(globalsService) {
        this.globalsService = globalsService;
    }
    AbstractGlobalsComponent.prototype.ngOnChanges = function (changes) {
        if ('globalsKey' in changes) {
            var keyChange = changes['globalsKey'];
            if (keyChange.currentValue) {
                this.updateKey(keyChange.currentValue);
            }
        }
    };
    AbstractGlobalsComponent.prototype.applyModel = function (publicationModel) {
        this.publicationModel = publicationModel;
    };
    AbstractGlobalsComponent.prototype.updateKey = function (key) {
        var _this = this;
        this.globalsService.resolveGlobalsWithKey(key).subscribe(function (publicationModel) {
            _this.applyModel(publicationModel);
        });
    };
    return AbstractGlobalsComponent;
}());
export { AbstractGlobalsComponent };
/** @nocollapse */
AbstractGlobalsComponent.ctorParameters = function () { return [
    { type: GlobalsService, decorators: [{ type: Inject, args: [GlobalsService,] },] },
]; };
AbstractGlobalsComponent.propDecorators = {
    'globalsKey': [{ type: Input },],
};
//# sourceMappingURL=abstract.component.js.map