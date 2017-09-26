import { Inject, OnDestroy, Input, SimpleChanges, SimpleChange } from '@angular/core'
import { GlobalsService } from '../../services/globals.service'
import { GlobalsConfig, GlobalsMapping } from '../../interfaces/GlobalsConfig'
import { KioPublicationModel } from 'kio-ng2-data'
import { LocaleService } from 'kio-ng2-i18n'


export class AbstractGlobalsComponent<T extends GlobalsMapping> implements OnDestroy {


  @Input() globalsKey:keyof T

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

  private _key:keyof T

  protected updateKey ( key:keyof T ) {
    this.globalsService.resolveGlobalsWithKey(key).subscribe ( publicationModel => {
      this.applyModel ( publicationModel )
    } )
  }

  private _localeSubscription=this.localeService.changes.subscribe ( locale => {
    this.updateKey ( this.globalsKey )
  } )

  ngOnDestroy () {
    this._localeSubscription.unsubscribe()
  }
}
