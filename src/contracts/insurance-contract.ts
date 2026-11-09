import { BaseContract, BaseContractData } from './base-contract'

export interface InsuranceContractData extends BaseContractData {
  insuranceType: string // e.g. "health", "property"
  premium: number // yearly premium
  termYears: number
}

// Insurance: adds insurance type, yearly premium and term
export class InsuranceContract extends BaseContract {
  insuranceType: string
  premium: number
  termYears: number

  constructor(data: InsuranceContractData) {
    super(data)
    this.insuranceType = data.insuranceType
    this.premium = data.premium
    this.termYears = data.termYears
  }

  // Total premium for the whole term: yearly premium * number of years
  calculateTotalPremium(): number {
    return this.premium * this.termYears
  }
}
