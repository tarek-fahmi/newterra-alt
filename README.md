# Business Information Systems Middleware Login

## Technical Overview

This application serves as the authentication portal for a middleware business information systems wrapper. It provides a secure login interface that integrates with various business tools and APIs.

### Tech Stack

- **Frontend**: React 18 with TypeScript, built using Vite
- **Backend**: Supabase (PostgreSQL + RESTful APIs)
- **Authentication**: Supabase Auth
- **Containerization**: Docker with multi-stage builds
- **Deployment**: Nginx for serving static assets
- **Routing**: React Router v6
- **State Management**: React Context API + Hooks

### Integration Points

This application acts as the gateway to our middleware system that integrates with:
- Xero (accounting)
- SharePoint (document management)
- Monday.com (project management)

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── auth/       # Authentication-related components
│   ├── layout/     # Layout components
│   └── ui/         # Generic UI components
├── contexts/       # React contexts
│   └── SupabaseContext.tsx  # Auth context
├── hooks/          # Custom React hooks
│   ├── useAuth.ts  # Authentication hooks
│   └── useSupabase.ts  # Supabase data hooks
├── lib/            # Utilities and configuration
│   └── supabaseClient.ts  # Supabase client configuration
├── pages/          # Page components
│   ├── Auth/       # Authentication pages
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── ResetPassword.tsx
│   ├── Dashboard/  # Dashboard pages
│   └── Home.tsx    # Landing page
├── types/          # TypeScript type definitions
├── App.tsx         # Main application component
├── App.css         # Core styles
├── main.tsx        # Application entry point
└── router.tsx      # Router configuration
```

## Architecture

### Authentication Flow

1. Users arrive at the login portal
2. Authentication is handled by Supabase Auth
3. After successful authentication:
   - JWT tokens are stored securely
   - User session is maintained in the SupabaseContext
   - User is redirected to the appropriate dashboard

### Data Flow

1. Frontend components make requests through custom hooks
2. Hooks interact with the Supabase client
3. Supabase client handles API communication and caching
4. Responses are transformed and returned to components

### Security Considerations

- Row Level Security (RLS) policies control data access in Supabase
- JWT tokens are used for session management
- Environment variables are used for sensitive configuration
- Authentication state is managed through secure context providers

## Development Environment Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Docker and Docker Compose
- Supabase account

### Installation Steps

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env.local` with Supabase credentials
4. Start the development server: `npm run dev`

### Local Supabase Development URLs

When running Supabase locally via `npx supabase start`, the following services will be available:

- **API URL**: `http://127.0.0.1:54321`
- **GraphQL URL**: `http://127.0.0.1:54321/graphql/v1`
- **Database URL**: `postgresql://postgres:postgres@127.0.0.1:54322/postgres`
- **Supabase Studio URL**: `http://127.0.0.1:54323`
- **Inbucket (Email Testing) URL**: `http://127.0.0.1:54324`

**Note**: Sensitive information like JWT secret, anon key, and service_role key are not included here for security reasons. These are displayed in your terminal when you run `npx supabase start` and should be configured in your `.env.local` or equivalent environment configuration as needed.

### Docker Setup

For containerized development:

```