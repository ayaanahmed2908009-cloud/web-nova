# NovaWeb Solutions - Web Development Agency

## Overview

NovaWeb Solutions is a modern web development agency platform built with a full-stack architecture and maze-like navigation structure. The application combines a React frontend with Express.js backend, PostgreSQL database, and includes user authentication, quote management system, and an interactive portfolio showcase. The website now features dedicated pages for different services and sections, creating an immersive journey for users to explore different aspects of the business.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion for smooth interactions and transitions
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing with maze-like page structure
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Comprehensive shadcn/ui component library with Radix UI primitives
- **Navigation**: Custom navigation component with mobile responsive design

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

### Modern Design
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

## Page Structure

### Maze-like Navigation
- **Home (/)**: Main landing page with hero section and overview
- **Get Website (/get-website)**: Dedicated page for website services with pricing tiers and customization options
- **Services (/services)**: Comprehensive services page with detailed offerings and features
- **About (/about)**: Company story, team, values, and mission
- **Portfolio (/portfolio)**: Project showcase with interactive elements
- **Dashboard (/dashboard)**: User dashboard for quote management and project tracking

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
- June 23, 2025. Updated pricing range to 500 SAR - 5,000 SAR for Saudi market
- June 24, 2025. Fixed Spline design cutoff issue by removing bottom clipping, ensuring full design visibility
- January 19, 2025. Implemented comprehensive SEO optimization including dynamic meta tags, Open Graph, Twitter Cards, structured data (Schema.org), sitemap.xml, robots.txt, FAQ section with structured data, services structured data, testimonials review markup, and page-specific SEO for all routes
- January 27, 2025. Transformed website into maze-like structure with dedicated pages: /get-website, /services, /about, creating immersive navigation experience with personalized content and options for each service area
- February 7, 2025. Added comprehensive footer across all pages with contact information and navigation links
- February 7, 2025. Updated contact phone number to 0537330022 as requested by user
- February 7, 2025. Added app development services with dedicated /get-app page featuring private (employee/company) and public applications with pricing and development process
- February 7, 2025. Added "Get Your App" section to home page showcasing mobile app options with technologies and call-to-action
- February 7, 2025. Added consultation services across all service pages and navigation, with paid consultation options starting at 200 SAR
- February 7, 2025. Created comprehensive project form (/project-form) with 4-step process: Personal Info → Project Type → Budget/Timeline → Additional Details. All "Start Project" buttons now redirect to this form for customer requirements gathering
- February 7, 2025. Added comprehensive website maintenance subscription page (/maintenance-subscription) with 5 pricing tiers from 100-1,200 SAR/month: Starter (personal), Growth (blogs), Pro (startups), Premium (growing business), Elite (e-commerce). Includes features, response times, support levels, and FAQ section
- August 9, 2025. Enhanced portfolio navigation with comprehensive back arrow system: Added fixed header with back navigation to Portfolio page, floating back-to-home button within portfolio experience, and ensured all "See Our Work" and "View Portfolio" buttons across all pages (Services, GetWebsite, About, GetApp, MaintenanceSubscription) have proper back navigation arrows in headers for seamless user experience
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
Design preference: Keep the cryptic loading screen - it's the best feature of the website.
```