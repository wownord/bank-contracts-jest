import { BaseContract } from '../../src/contracts/base-contract'
import { DepositContract } from '../../src/contracts/deposit-contract'

describe('DepositContract', () => {
  // 3.1 Simple approach: create new instances manually in each test
  describe('simple approach', () => {
    test('should store all fields correctly', () => {
      const deposit = new DepositContract({
        contractId: 'D-1',
        clientName: 'Alice',
        isActive: true,
        amount: 10000,
        interestRate: 5,
      })

      expect(deposit.contractId).toBe('D-1')
      expect(deposit.clientName).toBe('Alice')
      expect(deposit.isActive).toBe(true)
      expect(deposit.amount).toBe(10000)
      expect(deposit.interestRate).toBe(5)
    })

    test('should be an instance of BaseContract', () => {
      const deposit = new DepositContract({
        contractId: 'D-2',
        clientName: 'Bob',
        isActive: false,
        amount: 500,
        interestRate: 2,
      })

      expect(deposit).toBeInstanceOf(BaseContract)
    })

    test('activate() and deactivate() should be inherited from BaseContract', () => {
      const deposit = new DepositContract({
        contractId: 'D-3',
        clientName: 'Carol',
        isActive: false,
        amount: 1000,
        interestRate: 3,
      })

      deposit.activate()
      expect(deposit.isActive).toBe(true)

      deposit.deactivate()
      expect(deposit.isActive).toBe(false)
    })

    test('calculateInterest() should return correct interest', () => {
      const deposit = new DepositContract({
        contractId: 'D-4',
        clientName: 'Dave',
        isActive: true,
        amount: 10000,
        interestRate: 5,
      })

      expect(deposit.calculateInterest()).toBe(500)
    })
  })

  // 3.2 Using beforeEach / afterEach
  describe('with beforeEach / afterEach', () => {
    let deposit: DepositContract

    beforeEach(() => {
      deposit = new DepositContract({
        contractId: 'D-10',
        clientName: 'Alice',
        isActive: false,
        amount: 20000,
        interestRate: 4,
      })
      deposit.activate()
    })

    afterEach(() => {
      deposit.deactivate()
      console.log(
        `Deposit contract ${deposit.contractId} has been deactivated after test.`,
      )
    })

    test('should be active after activate() in beforeEach', () => {
      expect(deposit.isActive).toBe(true)
    })

    test('should be inactive after deactivate()', () => {
      deposit.deactivate()
      expect(deposit.isActive).toBe(false)
    })

    test('calculateInterest() should return 800 for 20000 at 4%', () => {
      expect(deposit.calculateInterest()).toBe(800)
    })

    test('calculateInterest() should reflect changed amount', () => {
      deposit.amount = 5000
      expect(deposit.calculateInterest()).toBe(200)
    })
  })

  // Parameterized tests for calculateInterest()
  describe('calculateInterest() - parameterized', () => {
    test.each([
      [10000, 5, 500],
      [1000, 10, 100],
      [2500, 3, 75],
      [1000, 0, 0],
      [0, 5, 0],
    ])(
      'amount %i at %i%% should give interest %i',
      (amount, interestRate, expected) => {
        const deposit = new DepositContract({
          contractId: 'D-P',
          clientName: 'Param',
          isActive: true,
          amount,
          interestRate,
        })

        expect(deposit.calculateInterest()).toBe(expected)
      },
    )

    test('should handle fractional rates', () => {
      const deposit = new DepositContract({
        contractId: 'D-F',
        clientName: 'Frac',
        isActive: true,
        amount: 1000,
        interestRate: 2.5,
      })

      expect(deposit.calculateInterest()).toBeCloseTo(25)
    })
  })
})
