import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/mergeMap'

import { Injectable, Inject } from '@angular/core'
import { KioNode } from 'kio-ng2-data'
import { GlobalsKeyType } from '../types/globals-key'

import { GLOBALS_CONFIG } from '../injection/globals-config.token'
import { GlobalsConfig, GlobalsMapping } from '../interfaces/globals-config'

export const DELAY_STEP:number = 500

@Injectable()
export class GlobalsUnveilingResolver <T extends KioNode> {

  constructor ( 
    @Inject(GLOBALS_CONFIG) protected config:GlobalsConfig<GlobalsMapping>
   ) {

  }

  protected allKeys=Object.keys(this.config.mapping)

  resolve ( key:GlobalsKeyType, source:Observable<T> ):Observable<T> {
    if ( key === 'intro' ) {
      return source
    }

    const index = this.allKeys.indexOf(key)
    const delay:number = ((index+1) * DELAY_STEP) + this.config.initialDelay
    return delay > 0 ? source.delay(delay) : source
  }

}
