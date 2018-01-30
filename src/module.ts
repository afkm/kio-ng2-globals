import { NgModule, ModuleWithProviders, Provider } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, ROUTES } from '@angular/router'
import { KioCtnModule } from 'kio-ng2-ctn'
import { KioNg2i18nModule } from 'kio-ng2-i18n'
import { KioNg2ComponentRoutingModule } from 'kio-ng2-component-routing'

import { GlobalsConfig, GlobalsMapping } from './interfaces/globals-config'
import { GLOBALS_CONFIG } from './injection/globals-config.token'
import { GlobalsService } from './services/globals.service'
import { GlobalsComponent } from './components/content/content.component'
import { GlobalsUnveilingResolver } from './resolvers/globals-unveiling-resolver'
export { GlobalsUnveilingResolver } from './resolvers/globals-unveiling-resolver'


export { GlobalsService } from './services/globals.service'

@NgModule({
  imports: [
    CommonModule,
    KioNg2i18nModule,
    KioNg2ComponentRoutingModule,
    KioCtnModule
  ],
  declarations: [
    GlobalsComponent
  ],
  entryComponents: [ GlobalsComponent ],
  providers: [
    {
      provide: GLOBALS_CONFIG,
      useValue: {
        mapping: {}
      }
    },
    GlobalsUnveilingResolver,    
    GlobalsService
  ],
  exports: [
    GlobalsComponent,
    CommonModule,
    KioCtnModule    
  ]
})
export class KioNg2GlobalsModule {
  public static forRoot<T extends GlobalsMapping> ( config:GlobalsConfig<T> ):ModuleWithProviders {
    return {
      ngModule: KioNg2GlobalsModule,
      providers: [
        {
          provide: GLOBALS_CONFIG,
          useValue: config
        },
        GlobalsService
      ]
    }
  }
}