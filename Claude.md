# Project: Next.js Application

## Core Principles
**IMPORTANT**: Whenever you write code, it MUST follow SOLID design principles. Never write code that violate these principles. If you do, you will be asked to refactor it.

## Development Workflow
1. Before making any changes, create and checkout a feature branch named `feature-[brief-description]`
2. Write comprehensive tests for all new functionality
3. Compile code and run all tests before committing
4. Write detailed commit messages explaining the changes and rationale
5. Commit all changes to the feature branch

## Architecture Overview
- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS 4
- **State Management**: React hooks with custom hooks for data management
- **Storage**: LocalStorage for client-side persistence
- **Styling**: Tailwind CSS with utility classes
- **Build Tool**: Turbopack for fast development builds

## Code Standards
- Use TypeScript for all new code with strict type checking
- Follow the existing component structure in `/src/components`
- All interactive components must use `'use client'` directive for App Router
- CSS classes should use Tailwind utilities; custom CSS only when necessary
- Implement responsive design patterns for mobile compatibility

## Quality Gates
- All code must compile without TypeScript warnings: `npx tsc --noEmit`
- ESLint must pass without errors: `npm run lint`
- All new components must be properly typed with interfaces
- Code must build successfully: `npm run build`

## Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx tsc --noEmit     # TypeScript type checking
```

## File Organization
- **Components**: `/src/components/[ComponentName].tsx`
- **Pages**: `/src/app/[route].tsx` (App Router structure)
- **Utilities**: `/src/lib/[utility].ts`
- **Types**: `/src/types/[domain].ts`
- **Hooks**: `/src/hooks/[hookName].ts`