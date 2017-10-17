export interface GlobalsMapping {
  [key: string]: string
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