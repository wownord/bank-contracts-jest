export interface BaseContractData {
  contractId: string
  clientName: string
  isActive: boolean
}

// Base class with common fields and logic for all contracts
export class BaseContract {
  contractId: string
  clientName: string
  isActive: boolean

  constructor(data: BaseContractData) {
    this.contractId = data.contractId
    this.clientName = data.clientName
    this.isActive = data.isActive
  }

  activate(): void {
    this.isActive = true
  }

  deactivate(): void {
    this.isActive = false
  }
}
