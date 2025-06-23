# NovaWeb Solutions - Web Development Agency

## Overview

NovaWeb Solutions is a modern web development agency platform built with a full-stack architecture. The application combines a React frontend with Express.js backend, PostgreSQL database, and includes user authentication, quote management system, and an interactive portfolio showcase.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion for smooth interactions and transitions
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Comprehensive shadcn/ui component library with Radix UI primitives

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: Session-based authentication with bcrypt for password hashing
- **Email Service**: SendGrid integration for quote notifications
- **Development**: Hot reload with Vite in development mode

### Database Schema
- **Users Table**: Authentication and user management (id, username, password, email, name, createdAt)
- **Quotes Table**: Quote request management with status tracking (pending, reviewed, approved, completed)
- **Relationships**: Foreign key relationship between users and their quotes

## Key Components

### Authentication System
- User registration and login with session management
- Password hashing using bcryptjs
- Protected routes for authenticated users
- Session persistence with express-session

### Quote Management System
- Multi-step quote form with validation
- Real-time quote status tracking
- Admin quote review workflow
- Email notifications via SendGrid

### Interactive Portfolio
- Immersive portfolio showcase with 3D elements
- Cryptic text animations and transitions
- Embedded Spline 3D models via iframe
- Smooth scrolling and animated counters

### Modern UI/UX
- Custom cursor implementation
- Magnetic button interactions
- Smooth page transitions
- Responsive design with mobile optimization
- Cryptic loading screen with cyberpunk aesthetic
- Matrix-style grid animations and glitch effects
- Rotating mysterious messages during loading states

## Data Flow

1. **User Registration/Login**: Forms submit to `/api/auth/register` or `/api/auth/login`
2. **Quote Creation**: Authenticated users submit quotes via `/api/quotes`
3. **Quote Management**: Users can view, update, and delete their quotes
4. **Email Notifications**: SendGrid sends notifications when quotes are submitted
5. **Real-time Updates**: TanStack Query manages cache invalidation and updates

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection with Neon serverless
- **@sendgrid/mail**: Email service integration
- **@splinetool/react-spline**: 3D model integration
- **@radix-ui/***: Accessible UI component primitives
- **framer-motion**: Animation library

### Development Tools
- **Vite**: Build tool and development server
- **Drizzle Kit**: Database migrations and schema management
- **ESBuild**: Production bundling for server code
- **TSX**: TypeScript execution for development

## Deployment Strategy

### Build Process
- Frontend: Vite builds React app to `dist/public`
- Backend: ESBuild bundles server code to `dist/index.js`
- Database: Drizzle manages schema migrations

### Environment Configuration
- **Development**: Uses Vite dev server with Express API
- **Production**: Serves static files from Express with bundled backend
- **Database**: Requires `DATABASE_URL` environment variable
- **Email**: Requires `SENDGRID_API_KEY` for email functionality

### Deployment Target
- **Platform**: Google Cloud Run (configured in .replit)
- **Port**: Application runs on port 5000
- **Static Assets**: Served from `dist/public` directory

## Changelog
```
Changelog:
- June 17, 2025. Initial setup
- June 17, 2025. Removed cryptic text animations throughout application for better usability
- June 17, 2025. Applied CSS clipping to hide Spline watermarks without blocking content
- June 17, 2025. Created admin account "web" with proper authentication
- June 18, 2025. Created comprehensive admin system with "novaweb" account
- June 18, 2025. Fixed logout functionality with proper cache clearing and page refresh
- June 18, 2025. Made all quotes persistent across redeployments with PostgreSQL
- June 18, 2025. Added RSOOM section to portfolio with black screen transition and yellow text with white underline
- June 19, 2025. Implemented Stripe payment integration for approved quotes with secure checkout flow
- June 23, 2025. Added cryptic loading screen with cyberpunk aesthetic, matrix-style animations, and rotating mysterious messages
- June 23, 2025. Fixed admin dashboard authentication with PostgreSQL session storage
- June 23, 2025. Redesigned loading screen to be clean and minimal - white background, black text, mid-left positioning, smooth fade transition
- June 23, 2025. Enhanced loading screen with bigger, faster cryptic animation (40fps), smooth line shrinking transition, and Canela font for elegant brand reveal
- June 23, 2025. Refined loading screen - locomotive.ca style with Canela font throughout, gray tagline, upward movement transition, and improved text spacing
- June 23, 2025. Enhanced loading screen with classy design improvements - subtle gradient background, geometric accents, enhanced typography depth, and sophisticated visual effects
- June 23, 2025. Refined cryptic animation for sleeker appearance - elegant character sets, progressive shortening, gradient text effects, breathing animation, and minimal floating elements
- June 23, 2025. Updated pricing range to 1,875 SAR - 18,750 SAR (equivalent to $500-$5000) for Saudi market
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```