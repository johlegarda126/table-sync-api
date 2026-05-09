# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-05-08

### Added
- **Restaurant Management API**: CRUD endpoints to manage restaurants with name, address, opening and closing hours
- **Restaurant validation**: required fields and consistent schedule validation (`openingHours` before `closingHours`)
- **Table creation validation**: tables can only be created with an existing `restaurantId`
- **New restaurant e2e tests** covering creation, listing, retrieval, update, and invalid inputs

### Changed
- Updated table acceptance tests to create tables using a valid restaurant record
- Added restaurant route integration with table creation flow

### Technical Details
- Express.js API with MongoDB persistence via Mongoose
- Restaurant and table domain modules separated by routes, controllers, services, models and types
- Playwright end-to-end tests for API validation

## [1.1.0] - 2026-05-07

### Added
- **Table Management API**: Complete REST API for managing restaurant tables with full CRUD operations
  - Create tables with validation for capacity (1-11), status, and table type
  - Query tables with filtering by restaurantId, tableType, and availability status
  - Update table status with enforced state transitions
  - Reserve tables with automatic status change from disponible to reservada
  - Occupy tables with automatic status change from reservada to ocupada
  - Cancel reservations and return tables to disponible status
  
- **Validation Rules**
  - Capacity must be between 1 and 11
  - Valid statuses: disponible, reservada, ocupada
  - Valid table types: interior, exterior, privada, familiar
  - All required fields must be present when creating tables
  - Enforced state transitions prevent invalid operations

- **Query Filtering**
  - Filter tables by restaurantId to isolate data per restaurant
  - Filter by table type to find specific table configurations
  - Filter by status to check availability or reservation status

- **Comprehensive e2e Test Suite**
  - 13 tests covering all acceptance criteria
  - Tests for valid and invalid inputs
  - Tests for state transitions and business logic
  - Tests for data isolation and filtering

### Technical Details
- Built with Express.js and TypeScript
- Playwright e2e testing framework
- Full type safety with TypeScript interfaces
- RESTful API design following HTTP status codes (201 for creation, 400 for validation errors, 404 for not found, 409 for conflicts)

### Initial Release
- Project scaffold with TypeScript and Express configuration
- Basic API status endpoint
- Development and test infrastructure setup
