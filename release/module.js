import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KioCtnModule } from 'kio-ng2-ctn';
import { KioNg2i18nModule } from 'kio-ng2-i18n';
import { KioNg2ComponentRoutingModule } from 'kio-ng2-component-routing';
import { GLOBALS_CONFIG } from './injection/GlobalsConfig.token';
import { GlobalsService } from './services/globals.service';
import { GlobalsComponent } from './components/content/content.component';
var KioNg2GlobalsModule = (function () {
    function KioNg2GlobalsModule() {
    }
    KioNg2GlobalsModule.forRoot = function (config) {
        return {
            ngModule: KioNg2GlobalsModule,
            providers: [
                {
                    provide: GLOBALS_CONFIG,
                    useValue: config
                },
                GlobalsService
            ]
        };
    };
    return KioNg2GlobalsModule;
}());
export { KioNg2GlobalsModule };
KioNg2GlobalsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    KioNg2i18nModule,
                    KioNg2ComponentRoutingModule,
                    KioCtnModule
                ],
                declarations: [
                    GlobalsComponent
                ],
                entryComponents: [GlobalsComponent],
                providers: [
                    {
                        provide: GLOBALS_CONFIG,
                        useValue: {
                            mapping: {}
                        }
                    },
                    GlobalsService
                ],
                exports: [
                    GlobalsComponent,
                    CommonModule,
                    KioCtnModule
                ]
            },] },
];
/** @nocollapse */
KioNg2GlobalsModule.ctorParameters = function () { return []; };
//# sourceMappingURL=module.js.map