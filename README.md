# Playwright Project Autotests

This project contains a basic automated test suite using [Playwright](https://playwright.dev/) to validate functionality on the [Practice Software Testing](https://practicesoftwaretesting.com/) demo site.

## Configuration

The Playwright config (`playwright.config.ts`) is set up with:

- `baseURL`: `https://practicesoftwaretesting.com`
- HTML reporter
- Test ID selector: `data-test`
- Retries enabled only in CI environments
- Tracing enabled on first retry

## Installation

Before running the tests, install dependencies:

install
    `npm install`

Run all Tests:
    `npm test`

View Reports:
    `npx playwright show-report`

Tech Stack:

- Playwright Test
- TypeScript
- Node.js