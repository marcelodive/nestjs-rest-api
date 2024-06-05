# NestJS REST API Testing

## Table of Contents

- [Quick Start](#quick-start)
- [Running Tests](#running-tests)
- [Areas for Improvement](#areas-for-improvement)

## Quick Start

Ensure you have Node.js and npm installed. Clone the repo, install dependencies, rename the .env.example file to .env and start the app:

```bash
git clone https://github.com/marcelodive/nestjs-rest-api.git
cd nestjs-rest-api
npm install
npm run start
```

Access the app at `http://localhost:3000`. You can use Swagger at `http://localhost:3000/api`.

## Running Tests

Execute tests with:

```bash
npm run test
```

## Areas for Improvement

- **Unit Tests:** Add comprehensive unit tests across all components.
- **E2E Tests:** Implement end-to-end tests for full application flow.
- **Auth Guard Enhancement:** In `auth.guard.ts`, improve the assignment of `request['user']` by utilizing the User entity instead of just the payload.
- **Configurations:** Use Nest `ConfigurationService` rather than `process.env` to retrieve configuration variables.
- **Swagger:** Improve Api tags, descriptions, models, etc.

Enhancing these aspects will improve the application's reliability, security, and usability.