import { BaseContract } from '../../src/contracts/base-contract'

describe('BaseContract', () => {
  // 3.1 Simple approach: create new instances manually in each test
  describe('simple approach', () => {
    test('should store all fields correctly', () => {
      const contract = new BaseContract({
        contractId: 'C-1',
        clientName: 'Alice',
        isActive: false,
      })

      expect(contract.contractId).toBe('C-1')
      expect(contract.clientName).toBe('Alice')
      expect(contract.isActive).toBe(false)
    })

    test('activate() should set isActive to true', () => {
      const contract = new BaseContract({
        contractId: 'C-2',
        clientName: 'Bob',
        isActive: false,
      })

      contract.activate()

      expect(contract.isActive).toBe(true)
    })

    test('deactivate() should set isActive to false', () => {
      const contract = new BaseContract({
        contractId: 'C-3',
        clientName: 'Carol',
        isActive: true,
      })

      contract.deactivate()

      expect(contract.isActive).toBe(false)
    })

    test('activate() on an already active contract keeps it active', () => {
      const contract = new BaseContract({
        contractId: 'C-4',
        clientName: 'Dave',
        isActive: true,
      })

      contract.activate()

      expect(contract.isActive).toBe(true)
    })

    test('deactivate() on an already inactive contract keeps it inactive', () => {
      const contract = new BaseContract({
        contractId: 'C-5',
        clientName: 'Eve',
        isActive: false,
      })

      contract.deactivate()

      expect(contract.isActive).toBe(false)
    })
  })

  // 3.2 Using beforeEach / afterEach
  describe('with beforeEach / afterEach', () => {
    let contract: BaseContract

    beforeEach(() => {
      // Create a fresh contract before each test
      contract = new BaseContract({
        contractId: 'C-1',
        clientName: 'Alice',
        isActive: false,
      })

      // Activate it before each test
      contract.activate()
    })

    afterEach(() => {
      // Deactivate the contract after each test and log the action
      contract.deactivate()
      console.log(
        `Contract ${contract.contractId} has been deactivated after test.`,
      )
    })

    test('should activate the contract correctly', () => {
      expect(contract.isActive).toBe(true)
    })

    test('should deactivate the contract when deactivate() is called', () => {
      contract.deactivate()
      expect(contract.isActive).toBe(false)
    })

    test('should keep contractId and clientName after activation', () => {
      expect(contract.contractId).toBe('C-1')
      expect(contract.clientName).toBe('Alice')
    })
  })
})
