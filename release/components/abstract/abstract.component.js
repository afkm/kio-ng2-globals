import { Inject, Input } from '@angular/core';
import { GlobalsService } from '../../services/globals.service';
import { LocaleService } from 'kio-ng2-i18n';
var AbstractGlobalsComponent = (function () {
    function AbstractGlobalsComponent(globalsService, localeService) {
        var _this = this;
        this.globalsService = globalsService;
        this.localeService = localeService;
        this._localeSubscription = this.localeService.changes.subscribe(function (locale) {
            _this.updateKey(_this.globalsKey);
        });
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
    AbstractGlobalsComponent.prototype.ngOnDestroy = function () {
        this._localeSubscription.unsubscribe();
    };
    return AbstractGlobalsComponent;
}());
export { AbstractGlobalsComponent };
/** @nocollapse */
AbstractGlobalsComponent.ctorParameters = function () { return [
    { type: GlobalsService, decorators: [{ type: Inject, args: [GlobalsService,] },] },
    { type: LocaleService, decorators: [{ type: Inject, args: [LocaleService,] },] },
]; };
AbstractGlobalsComponent.propDecorators = {
    'globalsKey': [{ type: Input },],
};
//# sourceMappingURL=abstract.component.js.map