import { ViewState } from '../enums/view-state.enum'

export interface ViewStateChange {

  /** next state */
  state : ViewState

  /** globals key */
  key : string

}