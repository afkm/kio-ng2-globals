import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Injectable, Inject } from '@angular/core';
import { BackendService } from 'kio-ng2-ctn';
import { KioPublicationModel } from 'kio-ng2-data';
import { GLOBALS_CONFIG } from '../injection/GlobalsConfig.token';
var DELAY_OFFSET = 3000;
var DELAY_STEP = 500;
var GlobalsService = (function () {
    function GlobalsService(config, backendService) {
        this.config = config;
        this.backendService = backendService;
        this._resolveDelay = DELAY_OFFSET;
        this._globalsData = new Map();
    }
    GlobalsService.prototype.resolveGlobalsCuidWithKey = function (key) {
        return Observable.of(this.config.mapping[key]);
    };
    GlobalsService.prototype.resolveGlobalsWithKey = function (key) {
        var _this = this;
        this._resolveDelay += DELAY_STEP;
        var source = this.resolveGlobalsCuidWithKey(key);
        if (key !== 'intro') {
            source = source.delay(this._resolveDelay);
        }
        return source.concatMap(function (cuid) {
            if (!cuid) {
                return Observable.throw(new Error("No cuid set for globals key \"" + key + "\"."));
            }
            return _this.backendService.load({
                cuid: cuid,
                cmd: 'get',
                role: 'pub'
            });
        }).map(function (response) {
            var model = new KioPublicationModel(response.data);
            return model;
        });
    };
    return GlobalsService;
}());
export { GlobalsService };
GlobalsService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GlobalsService.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [GLOBALS_CONFIG,] },] },
    { type: BackendService, },
]; };
//# sourceMappingURL=globals.service.js.map