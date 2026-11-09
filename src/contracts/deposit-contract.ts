import { BaseContract, BaseContractData } from './base-contract'

export interface DepositContractData extends BaseContractData {
  amount: number
  interestRate: number // annual interest rate in percent, e.g. 5 = 5%
}

// Deposit: adds amount and interest rate
export class DepositContract extends BaseContract {
  amount: number
  interestRate: number

  constructor(data: DepositContractData) {
    super(data)
    this.amount = data.amount
    this.interestRate = data.interestRate
  }

  // Simple annual interest: amount * rate / 100
  calculateInterest(): number {
    return (this.amount * this.interestRate) / 100
  }
}
