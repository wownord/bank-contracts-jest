# Bank Contracts System (Homework 8)

TypeScript class hierarchy for bank contracts + Jest unit tests.

- `BaseContract` — `contractId`, `clientName`, `isActive`, `activate()`, `deactivate()`
- `DepositContract` — `amount`, `interestRate` (%), `calculateInterest()` = amount * interestRate / 100
- `LoanContract` — `loanAmount`, `monthlyPayment`, `loanTermMonths`, `calculateTotalPayment()` = monthlyPayment * loanTermMonths
- `InsuranceContract` — `insuranceType`, `premium` (yearly), `termYears`, `calculateTotalPremium()` = premium * termYears

Tests use three approaches: simple (new instance in each test), `beforeEach`/`afterEach`, and `test.each` parameterization.

## Project Structure

```
src/
└── contracts/
    ├── base-contract.ts
    ├── deposit-contract.ts
    ├── loan-contract.ts
    └── insurance-contract.ts

test/
└── contracts/
    ├── base-contract.test.ts
    ├── deposit-contract.test.ts
    ├── loan-contract.test.ts
    └── insurance-contract.test.ts

```

## Setup

```bash
npm install
```

## Commands

- `npm test` — run tests
- `npm run test:coverage` — run tests with coverage report
- `npm run format` — format code (no semicolons)

## Coverage

Run `npm run test:coverage` to see the coverage report. HTML report is generated in `coverage/lcov-report/index.html`.
