import { GlobalsKeyType } from '../types/globals-key'

export type GlobalsMapping = {
  [K in GlobalsKeyType]: string
}

export interface GlobalsConfig <T extends GlobalsMapping> {
  
  /**
   * mapping global keys to cuids for publications to load
   */
  mapping: T

  
  /**
   * delay in milliseconds to wait before loading content publications
   */
  initialDelay ?: number


  

}