import { BaseContract } from '../../src/contracts/base-contract'
import { InsuranceContract } from '../../src/contracts/insurance-contract'

describe('InsuranceContract', () => {
  // 3.1 Simple approach: create new instances manually in each test
  describe('simple approach', () => {
    test('should store all fields correctly', () => {
      const insurance = new InsuranceContract({
        contractId: 'I-1',
        clientName: 'Carol',
        isActive: true,
        insuranceType: 'health',
        premium: 600,
        termYears: 5,
      })

      expect(insurance.contractId).toBe('I-1')
      expect(insurance.clientName).toBe('Carol')
      expect(insurance.isActive).toBe(true)
      expect(insurance.insuranceType).toBe('health')
      expect(insurance.premium).toBe(600)
      expect(insurance.termYears).toBe(5)
    })

    test('should be an instance of BaseContract', () => {
      const insurance = new InsuranceContract({
        contractId: 'I-2',
        clientName: 'Dave',
        isActive: false,
        insuranceType: 'property',
        premium: 300,
        termYears: 1,
      })

      expect(insurance).toBeInstanceOf(BaseContract)
    })

    test('activate() and deactivate() should be inherited from BaseContract', () => {
      const insurance = new InsuranceContract({
        contractId: 'I-3',
        clientName: 'Eve',
        isActive: false,
        insuranceType: 'health',
        premium: 100,
        termYears: 2,
      })

      insurance.activate()
      expect(insurance.isActive).toBe(true)

      insurance.deactivate()
      expect(insurance.isActive).toBe(false)
    })

    test('calculateTotalPremium() should return correct total', () => {
      const insurance = new InsuranceContract({
        contractId: 'I-4',
        clientName: 'Frank',
        isActive: true,
        insuranceType: 'property',
        premium: 600,
        termYears: 5,
      })

      expect(insurance.calculateTotalPremium()).toBe(3000)
    })
  })

  // 3.2 Using beforeEach / afterEach
  describe('with beforeEach / afterEach', () => {
    let insurance: InsuranceContract

    beforeEach(() => {
      insurance = new InsuranceContract({
        contractId: 'I-10',
        clientName: 'Carol',
        isActive: false,
        insuranceType: 'property',
        premium: 450,
        termYears: 10,
      })
      insurance.activate()
    })

    afterEach(() => {
      insurance.deactivate()
      console.log(
        `Insurance contract ${insurance.contractId} has been deactivated after test.`,
      )
    })

    test('should be active after activate() in beforeEach', () => {
      expect(insurance.isActive).toBe(true)
    })

    test('should be inactive after deactivate()', () => {
      insurance.deactivate()
      expect(insurance.isActive).toBe(false)
    })

    test('should store insurance type', () => {
      expect(insurance.insuranceType).toBe('property')
    })

    test('calculateTotalPremium() should return 4500 for 450 x 10 years', () => {
      expect(insurance.calculateTotalPremium()).toBe(4500)
    })
  })

  // Parameterized tests for calculateTotalPremium()
  describe('calculateTotalPremium() - parameterized', () => {
    test.each([
      ['health', 600, 5, 3000],
      ['property', 1200, 3, 3600],
      ['health', 99.5, 2, 199],
      ['property', 500, 0, 0],
      ['health', 0, 10, 0],
    ])(
      '%s insurance with premium %d for %i years should total %d',
      (insuranceType, premium, termYears, expected) => {
        const insurance = new InsuranceContract({
          contractId: 'I-P',
          clientName: 'Param',
          isActive: true,
          insuranceType,
          premium,
          termYears,
        })

        expect(insurance.calculateTotalPremium()).toBe(expected)
      },
    )
  })
})
