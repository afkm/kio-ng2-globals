import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import { Injectable, Inject } from '@angular/core'
import { BackendService } from 'kio-ng2-ctn'
import { KioPublicationModel, KioPublicationQuery } from 'kio-ng2-data'
import { GlobalsConfig, GlobalsMapping } from '../interfaces/GlobalsConfig'
import { GLOBALS_CONFIG } from '../injection/GlobalsConfig.token'

const DELAY_OFFSET = 3000
const DELAY_STEP = 500

@Injectable()
export class GlobalsService {

  constructor(
      @Inject(GLOBALS_CONFIG) protected config:GlobalsConfig<GlobalsMapping>,
      protected backendService:BackendService
    ){}

  public resolveGlobalsCuidWithKey ( key:string ):Observable<string> {
    return Observable.of(this.config.mapping[key])
  }

  private _resolveDelay:number=DELAY_OFFSET

  public resolveGlobalsWithKey ( key:string ):Observable<KioPublicationModel> {
    this._resolveDelay += DELAY_STEP

    let source = this.resolveGlobalsCuidWithKey(key)
    if ( key !== 'intro' ) {
      source = source.delay ( this._resolveDelay )
    }
    return source.concatMap ( cuid => {
      if ( !cuid ) {
        return Observable.throw ( new Error(`No cuid set for globals key "${key}".`) )
      }
      return this.backendService.load({
        cuid, 
        cmd: 'get',
        role: 'pub'
      })
    } ).map ( response => {
      const model = new KioPublicationModel(response.data)
      return model
    } )    
  }

  private _globalsData:Map<string,KioPublicationModel>=new Map()

}