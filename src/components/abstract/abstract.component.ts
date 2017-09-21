import { Inject, Input, SimpleChanges, SimpleChange } from '@angular/core'
import { GlobalsService } from '../../services/globals.service'
import { GlobalsConfig, GlobalsMapping } from '../../interfaces/GlobalsConfig'
import { KioPublicationModel } from 'kio-ng2-data'

export class AbstractGlobalsComponent<T extends GlobalsMapping> {


  @Input() globalsKey:keyof T

  public publicationModel:KioPublicationModel
  
  constructor(
    @Inject(GlobalsService) protected globalsService:GlobalsService
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

}
