import { Dispatch } from "react"

export interface commodityType {
  [key: string]: string
}
export interface IInitData {
  types: commodityType
  commodities: Array<ICommodity>
  chooseCommodities: Array<ICommodity>
}
export interface IAction {
  type: string
  data?: any
}
export type IReducer = (state: IInitData, action: IAction) => IInitData
export interface IContextProps {
  state: IInitData
  dispatch: Dispatch<IAction>
}

export interface ICommodity {
  id: string
  type: string
  name: string
  price: number
  img?: string
}
