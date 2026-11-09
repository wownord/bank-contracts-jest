import { BaseContract } from '../../src/contracts/base-contract'
import { LoanContract } from '../../src/contracts/loan-contract'

describe('LoanContract', () => {
  // 3.1 Simple approach: create new instances manually in each test
  describe('simple approach', () => {
    test('should store all fields correctly', () => {
      const loan = new LoanContract({
        contractId: 'L-1',
        clientName: 'Bob',
        isActive: true,
        loanAmount: 12000,
        monthlyPayment: 1100,
        loanTermMonths: 12,
      })

      expect(loan.contractId).toBe('L-1')
      expect(loan.clientName).toBe('Bob')
      expect(loan.isActive).toBe(true)
      expect(loan.loanAmount).toBe(12000)
      expect(loan.monthlyPayment).toBe(1100)
      expect(loan.loanTermMonths).toBe(12)
    })

    test('should be an instance of BaseContract', () => {
      const loan = new LoanContract({
        contractId: 'L-2',
        clientName: 'Carol',
        isActive: false,
        loanAmount: 5000,
        monthlyPayment: 450,
        loanTermMonths: 12,
      })

      expect(loan).toBeInstanceOf(BaseContract)
    })

    test('activate() and deactivate() should be inherited from BaseContract', () => {
      const loan = new LoanContract({
        contractId: 'L-3',
        clientName: 'Dave',
        isActive: false,
        loanAmount: 1000,
        monthlyPayment: 100,
        loanTermMonths: 10,
      })

      loan.activate()
      expect(loan.isActive).toBe(true)

      loan.deactivate()
      expect(loan.isActive).toBe(false)
    })

    test('calculateTotalPayment() should return correct total', () => {
      const loan = new LoanContract({
        contractId: 'L-4',
        clientName: 'Eve',
        isActive: true,
        loanAmount: 12000,
        monthlyPayment: 1100,
        loanTermMonths: 12,
      })

      expect(loan.calculateTotalPayment()).toBe(13200)
    })
  })

  // 3.2 Using beforeEach / afterEach
  describe('with beforeEach / afterEach', () => {
    let loan: LoanContract

    beforeEach(() => {
      loan = new LoanContract({
        contractId: 'L-10',
        clientName: 'Bob',
        isActive: false,
        loanAmount: 20000,
        monthlyPayment: 900,
        loanTermMonths: 24,
      })
      loan.activate()
    })

    afterEach(() => {
      loan.deactivate()
      console.log(
        `Loan contract ${loan.contractId} has been deactivated after test.`,
      )
    })

    test('should be active after activate() in beforeEach', () => {
      expect(loan.isActive).toBe(true)
    })

    test('should be inactive after deactivate()', () => {
      loan.deactivate()
      expect(loan.isActive).toBe(false)
    })

    test('calculateTotalPayment() should return 21600 for 900 x 24 months', () => {
      expect(loan.calculateTotalPayment()).toBe(21600)
    })

    test('total payment should be greater than or equal to loan amount', () => {
      expect(loan.calculateTotalPayment()).toBeGreaterThanOrEqual(
        loan.loanAmount,
      )
    })
  })

  // Parameterized tests for calculateTotalPayment()
  describe('calculateTotalPayment() - parameterized', () => {
    test.each([
      [1100, 12, 13200],
      [500, 36, 18000],
      [250.5, 2, 501],
      [1000, 0, 0],
      [0, 12, 0],
    ])(
      'monthly payment %d for %i months should total %d',
      (monthlyPayment, loanTermMonths, expected) => {
        const loan = new LoanContract({
          contractId: 'L-P',
          clientName: 'Param',
          isActive: true,
          loanAmount: 10000,
          monthlyPayment,
          loanTermMonths,
        })

        expect(loan.calculateTotalPayment()).toBe(expected)
      },
    )
  })
})
