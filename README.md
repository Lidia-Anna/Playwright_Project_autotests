# Playwright Project Autotests

This project contains a basic automated test suite using [Playwright](https://playwright.dev/) to validate functionality on the [Practice Software Testing](https://practicesoftwaretesting.com/) demo site.

## Test Case Summary

The test located in `tests/test-1.spec.ts` performs the following checks after login:

1. Navigates to the login page (`/auth/login`).
2. Fills in valid credentials:
   - **Email**: `customer@practicesoftwaretesting.com`
   - **Password**: `welcome01`
3. Clicks the login button.
4. Verifies:
   - Current URL is `https://practicesoftwaretesting.com/account`
   - Page title contains `"My account"`
   - Navigation bar displays `"Jane Doe"`

## Configuration

The Playwright config (`playwright.config.ts`) is set up with:

- `baseURL`: `https://practicesoftwaretesting.com`
- HTML reporter
- Test ID selector: `data-test`
- Retries enabled only in CI environments
- Tracing enabled on first retry

## Installation

Before running the tests, install dependencies:

```bash
npm install

Running the Tests

Use the following command to execute the tests:

npm test

This will run all tests in the ./tests folder using Playwright.
Viewing Reports

After a test run, open the HTML report with:

npx playwright show-report

 Tech Stack

    Playwright Test

    TypeScript

    Node.js