import { Observable } from 'rxjs/Observable'

import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core'
import { AbstractGlobalsComponent } from '../abstract/abstract.component'
import { GlobalsConfig, GlobalsMapping } from '../../interfaces/globals-config'
import { ViewState } from '../../enums/view-state.enum'
import { GlobalsKeyType } from '../../types/globals-key'


@Component({
  moduleId: module.id,
  selector: 'kio-globals',
  templateUrl: './content.component.html'
})
export class GlobalsComponent extends AbstractGlobalsComponent<GlobalsKeyType> implements OnChanges {
  
  public viewState:Observable<ViewState>

  protected updateKey ( key:GlobalsKeyType) {
    
    this.viewState = this.globalsService.observeViewStateFor(this.globalsKey)
    super.updateKey ( key )
    
  }

}
