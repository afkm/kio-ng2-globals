export interface GlobalsMapping {
  [key: string]: string
}

export interface GlobalsConfig <T extends GlobalsMapping> {
  mapping: T
}