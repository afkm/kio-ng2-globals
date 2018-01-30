import { Inject, OnDestroy, Input, SimpleChanges, SimpleChange } from '@angular/core'
import { GlobalsService } from '../../services/globals.service'
import { GlobalsConfig, GlobalsMapping } from '../../interfaces/globals-config'
import { GlobalsKeyType } from '../../types/globals-key'

import { KioPublicationModel } from 'kio-ng2-data'
import { LocaleService } from 'kio-ng2-i18n'


export class AbstractGlobalsComponent<T extends GlobalsKeyType> implements OnDestroy {


  @Input() globalsKey:T

  public publicationModel:KioPublicationModel
  
  constructor(
    @Inject(GlobalsService) protected globalsService:GlobalsService,
    @Inject(LocaleService) protected localeService:LocaleService
  ){}

  ngOnChanges(changes:SimpleChanges){
    if ( 'globalsKey' in changes ) {
      const keyChange:SimpleChange = changes['globalsKey']
      if ( keyChange.currentValue ) {
        this.updateKey ( keyChange.currentValue )
      }
    }
  }

  protected applyModel ( publicationModel:KioPublicationModel ) {
    this.publicationModel = publicationModel
  }

  private _key:T

  protected updateKey ( key:T ) {
    this.globalsService.resolveGlobalsWithKey(key).subscribe ( (publicationModel:KioPublicationModel) => {
      this.applyModel ( publicationModel )
    } )
  }

  private _localeSubscription=this.localeService.changes.subscribe ( (locale:string) => {
    this.updateKey ( this.globalsKey )
  } )

  ngOnDestroy () {
    this._localeSubscription.unsubscribe()
  }
}
