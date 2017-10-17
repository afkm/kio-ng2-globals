import { GlobalsConfig } from '../interfaces/globals-config'
import { InjectionToken } from '@angular/core'

export let GLOBALS_CONFIG:InjectionToken<GlobalsConfig<any>> = new InjectionToken<GlobalsConfig<any>>('globals_config')
