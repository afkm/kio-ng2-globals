import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import { Injectable, EventEmitter, Inject } from '@angular/core'
import { BackendService } from 'kio-ng2-ctn'
import { KioPublicationModel, KioPublicationQuery } from 'kio-ng2-data'
import { GlobalsConfig, GlobalsMapping } from '../interfaces/globals-config'
import { ViewStateChange } from '../interfaces/view-state-change'
import { GLOBALS_CONFIG } from '../injection/globals-config.token'

import { ViewState } from '../enums/view-state.enum'


const DELAY_OFFSET = 3000
const DELAY_STEP = 500

@Injectable()
export class GlobalsService {

  constructor(
      @Inject(GLOBALS_CONFIG) protected config:GlobalsConfig<GlobalsMapping>,
      protected backendService:BackendService
    ){
    if ( 'number' === typeof config.initialDelay ) {
      this._resolveDelay = config.initialDelay
    } else {
      this._resolveDelay = DELAY_OFFSET
    }
  }

  private _resolveDelay:number

  private _viewStateEmitter:EventEmitter<ViewStateChange>=new EventEmitter()

  /**
   * @brief      returns an observable of the publication's cuid to be loaded for $key
   *
   * @param      key   The key identifier of the globals section
   *
   * @return     observable of cuid
   */
  public resolveGlobalsCuidWithKey ( key:string ):Observable<string> {
    return Observable.of(this.config.mapping[key])
  }


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
        headers: true,
        cmd: 'get',
        role: 'pub'
      })
    } ).map ( response => {
      const model = new KioPublicationModel(response.data)
      return model
    } )    
  }


  public hide ( ...keys:string[] ):void {
  
    if ( keys.length === 0 ) {
      return this.hide ( ...Object.keys(this.config.mapping) )
    } else {
      keys.forEach ( key => this.updateGlobalsViewState ( key, ViewState.hidden ) )
    }

  }


  public show ( ...keys:string[] ):void {
  
    if ( keys.length === 0 ) {
      return this.hide ( ...Object.keys(this.config.mapping) )
    } else {
      keys.forEach ( key => this.updateGlobalsViewState ( key, ViewState.visible ) )
    }

  }

  public updateGlobalsViewState ( key:string, viewState:ViewState ) {

    this._viewStateEmitter.emit ( {
      state: viewState,
      key
    } )

  }

  public observeViewStateFor ( key:string ):Observable<ViewState> {

    return this._viewStateEmitter.filter ( change => change.key === key ).map ( change => change.state )

  }

}