# Finança App Constitution

## Core Principles

### I. Component-Driven UI
Every UI feature must be built using modular, reusable components. Use Material UI (MUI), PrimeReact, and Tailwind CSS for styling, ensuring a consistent and responsive user experience across the application.

### II. Type-Safe Data Validation
Use Zod for schema validation and React Hook Form for form management. All user inputs and API responses must be validated against predefined schemas to ensure data integrity and prevent runtime errors.

### III. Robust Routing & Security
Routing must be handled using React Router DOM, with clear separation between public and protected routes. Security measures, such as password validation and protected access, are mandatory for user-sensitive data.

### IV. Standardized API Communication
All external communications must use Axios. Error handling and state management for API calls should be consistent, providing clear feedback to the user via toast notifications or error boundaries.

### V. Code Quality & Consistency
Adhere to the project's ESLint configuration and maintain a clean, readable codebase. Follow the existing folder structure (pages, components, routes, etc.) and naming conventions (camelCase for files, PascalCase for components).

## Additional Constraints

### Technology Stack
- **Frontend**: React 19, Vite, Tailwind CSS 4.
- **UI Libraries**: MUI 7, PrimeReact 10, Radix UI.
- **Form Management**: React Hook Form, Zod.
- **Networking**: Axios.
- **Routing**: React Router DOM 7.

## Development Workflow

### Feature Implementation
1. Define the specification (`/speckit.specify`).
2. Create an implementation plan (`/speckit.plan`).
3. Generate and execute tasks (`/speckit.tasks`, `/speckit.implement`).
4. Ensure all new components are tested or manually verified for UI consistency.

## Governance
The Constitution serves as the primary guideline for the AI agent and the development team. All modifications to the architecture or core principles must be reflected here.

**Version**: 1.0.0 | **Ratified**: 2026-04-08 | **Last Amended**: 2026-04-08
