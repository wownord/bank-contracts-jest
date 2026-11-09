import { BaseContract, BaseContractData } from './base-contract'

export interface LoanContractData extends BaseContractData {
  loanAmount: number
  monthlyPayment: number
  loanTermMonths: number
}

// Loan: adds loan amount, monthly payment and term
export class LoanContract extends BaseContract {
  loanAmount: number
  monthlyPayment: number
  loanTermMonths: number

  constructor(data: LoanContractData) {
    super(data)
    this.loanAmount = data.loanAmount
    this.monthlyPayment = data.monthlyPayment
    this.loanTermMonths = data.loanTermMonths
  }

  // Total paid over the whole term: monthly payment * number of months
  calculateTotalPayment(): number {
    return this.monthlyPayment * this.loanTermMonths
  }
}
