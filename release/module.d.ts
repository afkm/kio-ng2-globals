import { ModuleWithProviders } from '@angular/core';
import { GlobalsConfig, GlobalsMapping } from './interfaces/GlobalsConfig';
export declare class KioNg2GlobalsModule {
    static forRoot<T extends GlobalsMapping>(config: GlobalsConfig<T>): ModuleWithProviders;
}
