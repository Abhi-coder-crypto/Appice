# A2S2PR - Customer Engagement Platform

## Overview

This is an AI-driven customer engagement and analytics platform designed to make sophisticated customer engagement tools accessible to small and medium-sized businesses. The platform provides push notifications, event tracking, customer analytics, campaign management, and audience segmentation capabilities. It follows a reference-based design approach inspired by modern SaaS platforms like Mixpanel, Amplitude, and CleverTap, but with a focus on simplicity and affordability for tier-2/3 Indian markets.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript using Vite as the build tool

**Routing**: wouter - A lightweight client-side router providing file-based routing without the overhead of React Router

**UI Component Library**: shadcn/ui (New York style variant) - A collection of accessible, customizable Radix UI primitives styled with Tailwind CSS. Components are copied directly into the project rather than installed as dependencies, allowing full customization.

**State Management**: 
- TanStack Query (React Query) v5 for server state management and data fetching
- Local React state (useState/useReducer) for UI state
- No global state management library - queries handle data sync

**Styling System**:
- Tailwind CSS with custom design tokens
- HSL-based color system with CSS variables for theme flexibility
- Custom spacing units (2, 4, 6, 8) for consistent layout
- Design guidelines enforce enterprise SaaS patterns with specific typography hierarchy and component standards

**Data Visualization**: Recharts library for analytics charts (line charts, bar charts, pie charts, area charts)

**Layout Structure**:
- Collapsible sidebar navigation (256px width on desktop)
- Main content area with max-width container (max-w-7xl)
- Responsive grid layouts for metric cards and charts
- Mobile-first responsive design with breakpoint-specific layouts

### Backend Architecture

**Runtime**: Node.js with Express.js framework

**Language**: TypeScript with ES modules

**API Design**: RESTful API with `/api` prefix for all application routes

**Development Server**: Vite development server with HMR (Hot Module Replacement) middleware integration for seamless full-stack development

**Session Management**: Placeholder storage interface with in-memory implementation (MemStorage class). The storage interface is designed to be swapped with a database-backed implementation.

**Build Process**: 
- Client builds via Vite to `dist/public`
- Server builds via esbuild with selective bundling (allowlist for cold-start optimization)
- Production serves static assets from Express

**Logging**: Custom request logging middleware tracking method, path, status code, duration, and JSON response payloads

### Data Layer

**Schema Definition**: Drizzle ORM with PostgreSQL dialect

**Database**: Configured for PostgreSQL (via @neondatabase/serverless driver for Neon database)

**Type Safety**: Drizzle-zod integration for runtime validation with Zod schemas generated from database schema

**Current Schema** (shared/schema.ts):
- Users table with username/password authentication
- TypeScript interfaces for:
  - Dashboard metrics (DashboardMetrics, CohortData, TopEvent, ActiveUserTrend, DAUTrend)
  - Customer data (Customer, CustomerInteraction)
  - Campaigns (Campaign, CampaignChannel types)
  - Segments (Segment)
  - Funnels (Funnel, FunnelStep)
  - Events (Event)
  - Journeys (JourneyEvent, ProfileAttribute)
  - Templates (Template)
  - Reports (ExportReport)
  - Display preferences (DisplayPreferenceItem)
  - App configurations (App, Platform)
- Dummy data module (client/src/lib/dummy-data.ts) provides comprehensive mock data for all features

## Implemented Features (Phase 1 - UI Complete)

### Pages Built
1. **Home** (/) - App selection with platform stats
2. **Dashboard** (/dashboard) - Metrics cards, charts, cohort analysis
3. **Customer 360** (/users/customer-360) - User profiles with behavioral data
4. **Audience Segments** (/users/segments) - Segment builder with conditions
5. **Campaigns** (/engagement/campaigns) - Campaign list and management
6. **Campaign Create** (/engagement/campaigns/create/:channel) - Multi-step campaign builder
7. **Templates** (/engagement/templates) - Template management
8. **Funnels** (/analytics/funnels) - Funnel visualization and analysis
9. **Events** (/analytics/events) - Event tracking and distribution
10. **App Acquisition** (/analytics/acquisition) - Acquisition trends and sources
11. **Exports** (/reports/exports) - Report download management
12. **Journeys** (/data/journeys) - Journey configuration
13. **Settings** (/settings/app-setting) - API keys, email, SMS, push settings
14. **User Management** (/settings/user-management) - Team member management
15. **Display Preference** (/settings/display-preference) - Navigation customization
16. **Setup New App** (/setup/new-app) - New app onboarding

### Components
- **AppSidebar** - Collapsible navigation with all sections
- **Header** - Page header with platform/date filters
- All shadcn/ui components utilized throughout

**Migration Strategy**: Drizzle Kit configured with migration output to `./migrations` directory

### Authentication & Authorization

**Strategy**: Placeholder user authentication system with basic username/password storage

**Current Implementation**: In-memory user storage with CRUD operations (getUser, getUserByUsername, createUser)

**Designed For**: Extension to session-based or JWT authentication patterns

### External Dependencies

**Database**: 
- PostgreSQL via Neon serverless driver (@neondatabase/serverless)
- Connection configured through DATABASE_URL environment variable

**UI Framework**:
- Radix UI primitives (accordion, dialog, dropdown, select, etc.)
- Tailwind CSS for utility-first styling
- class-variance-authority for component variant management

**Development Tools**:
- Replit-specific plugins (cartographer, dev banner, runtime error overlay) for development environment
- Google Fonts (Inter, DM Sans, Architects Daughter, Fira Code, Geist Mono)

**Form Handling**:
- React Hook Form with @hookform/resolvers for form validation
- Zod for schema validation

**Date Handling**: date-fns library for date formatting and manipulation

**Utilities**:
- clsx and tailwind-merge for className composition
- nanoid for unique ID generation
- cmdk for command palette functionality

**Chart Library**: Recharts for all data visualization needs

**Notable Architecture Decisions**:
1. **Monorepo Structure**: Client, server, and shared code in single repository with path aliases
2. **Type Sharing**: Shared schema types between frontend and backend via `@shared` alias
3. **Dummy Data Pattern**: Frontend development proceeds independently with mock data while backend is built out
4. **Storage Abstraction**: IStorage interface allows swapping between in-memory and database implementations without changing application code
5. **Vite Middleware Mode**: Development server runs Vite as Express middleware for unified dev experience
6. **Build-time Bundling**: Server dependencies selectively bundled to optimize cold start times in production