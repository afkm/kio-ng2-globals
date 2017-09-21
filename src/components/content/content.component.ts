import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core'
import { AbstractGlobalsComponent } from '../abstract/abstract.component'
import { GlobalsConfig, GlobalsMapping } from '../../interfaces/GlobalsConfig'

@Component({
  selector: 'kio-globals',
  templateUrl: './content.component.html'
})
export class GlobalsComponent extends AbstractGlobalsComponent<GlobalsMapping> implements OnChanges {
  
  
}
