# NewTerra Business Information Systems Middleware

## Project Overview

NewTerra is an authentication and integration portal that serves as the gateway to a middleware business information systems wrapper. It provides a secure, unified login interface that connects with various business tools and APIs using Supabase authentication.

This application serves as the centralized authentication system for accessing multiple business tools through a single credential set, simplifying user management and providing a consistent experience across the integrated business ecosystem.

## Key Features

- **Secure Authentication**: Email/password and OAuth (Google, Facebook, Apple) authentication using Supabase
- **Password Management**: Password strength validation, forgot password functionality
- **Accessibility-First Design**: ARIA attributes, keyboard navigation, screen reader support
- **Enhanced User Experience**: Visual feedback, loading states, error handling
- **Session Management**: Automatic session maintenance and secure token storage
- **Protected Routes**: Route guarding for authenticated content

## Architecture

### System Architecture

```
┌─────────────────┐     ┌───────────────┐     ┌─────────────────────┐
│                 │     │               │     │                     │
│  React Frontend ├────►│ Supabase Auth ├────►│ Business Integration │
│                 │     │               │     │     Middleware      │
└─────────────────┘     └───────────────┘     └─────────────────────┘
                                                         │
                                              ┌──────────┼──────────┐
                                              ▼          ▼          ▼
                                        ┌─────────┐ ┌─────────┐ ┌─────────┐
                                        │  Xero   │ │SharePoint│ │Monday.com│
                                        └─────────┘ └─────────┘ └─────────┘
```

### Authentication Flow

1. Users arrive at the login portal
2. Authentication is handled by Supabase Auth:
   - Email/password authentication with visual feedback
   - OAuth providers (Google, Facebook, Apple)
   - Password reset functionality
3. After successful authentication:
   - JWT tokens are stored securely in browser storage
   - User session is maintained in the SupabaseContext
   - A corresponding user profile is created/updated in the profiles table
   - User is redirected to the appropriate dashboard based on their permissions

### Data Flow

1. React components use the Supabase context via the `useSupabase` hook
2. Authentication operations are handled through context methods (`signIn`, `signUp`, `signOut`)
3. Protected routes verify authentication status before rendering content
4. Profile data is secured using Row Level Security (RLS) policies in Supabase
5. API requests to integrated services are authorized using the authenticated session

## Technology Stack

- **Frontend**:
  - React 18.2.x with TypeScript 5.2.x
  - Vite 5.1.x (build tool)
  - React Router 6.22.x (routing)
  - React Context API (state management)

- **Backend & Auth**:
  - Supabase (Backend as a Service)
  - PostgreSQL 15.x (database)
  - Supabase Auth (authentication service)
  - Row Level Security (data protection)

- **CI/CD & Deployment**:
  - Docker with multi-stage builds
  - Nginx (for serving static assets)
  - Environment-based configuration

- **Development Tools**:
  - ESLint (linting)
  - TypeScript (type checking)
  - NPM/PNPM (package management)

## Project Structure

```
src/
├── assets/               # Static assets like images, icons
│
├── components/           # Reusable UI components
│   ├── auth/             # Authentication-related components
│   │   ├── LoginForm.tsx        # Email/password login form
│   │   ├── SignUpForm.tsx       # Registration form with password strength
│   │   ├── ForgotPasswordForm.tsx # Password reset form
│   │   └── ProtectedRoute.tsx   # Route guard for authenticated routes
│   │
│   ├── ui/               # UI components
│   │   └── LoadingSpinner.tsx   # Reusable loading indicator
│   │
│   └── layout/           # Layout components
│
├── contexts/             # React contexts
│   └── supabaseContext.tsx  # Provides auth state and methods throughout the app
│
├── hooks/                # Custom React hooks
│   └── useAuth.ts        # Authentication hooks (if any additional beyond context)
│
├── lib/                  # Utilities and configuration
│   └── supabaseClient.ts # Supabase client configuration
│
├── pages/                # Page components
│   ├── Auth/             # Authentication pages
│   │   ├── AuthPage.tsx      # Contains login/signup forms
│   │   └── ForgotPassword.tsx # Password reset page
│   │
│   └── Home.tsx          # Main authenticated home page
│
├── services/             # API and service integrations
│
├── types/                # TypeScript type definitions
│   └── index.ts          # Shared types for the application
│
├── App.tsx               # Main application component
├── App.css               # Core styles
├── main.tsx              # Application entry point
└── router.tsx            # Router configuration
```

## Component Interactions

### Authentication Components

- **supabaseContext.tsx**: Core context that provides:
  - Current user state (`user`)
  - Session information (`session`)
  - Loading state (`loading`)
  - Error state (`error`)
  - Authentication methods (`signIn`, `signUp`, `signOut`, `signInWithOAuth`, `resetPasswordForEmail`)
  - Error handling (`setError`)

- **LoginForm.tsx**: 
  - Uses `useSupabase` hook to access auth methods from the context
  - Handles email/password login via `signIn` from context
  - Manages OAuth authentication through `signInWithOAuth` method from context
  - Displays errors from context
  - Shows loading states during authentication
  - Navigates to protected routes on success
  - Provides accessibility features (ARIA attributes, keyboard navigation)

- **SignUpForm.tsx**:
  - Uses `useSupabase` hook for registration (via context)
  - Implements password strength validation with visual feedback
  - Handles email/password signup via `signUp` from context
  - Manages OAuth authentication through `signInWithOAuth` method from context
  - Shows confirmation messages or errors
  - Includes accessible form controls

- **ForgotPasswordForm.tsx**:
  - Uses `useSupabase` hook to handle password reset requests via context
  - Sends reset instructions via email using `resetPasswordForEmail` from context
  - Provides user feedback during the process
  - Includes accessible form elements

- **ProtectedRoute.tsx**:
  - Uses `useSupabase` to check authentication state
  - Provides informative loading states
  - Redirects unauthenticated users to login
  - Renders children only for authenticated users

### UI Components

- **LoadingSpinner.tsx**:
  - Reusable loading indicator with customizable size and color
  - Used throughout the application for consistent loading states
  - Accessible with proper ARIA attributes

### Routing

- **router.tsx**:
  - Defines application routes
  - Wraps components with `SupabaseProvider`
  - Sets up protected routes using `ProtectedRoute`
  - Handles navigation between auth and main app
  - Includes routes for forgot password functionality

### Main Application

- **App.tsx**:
  - Main authenticated application interface
  - Uses `useSupabase` to access user information
  - Handles sign out functionality with loading states
  - Displays user information and authentication status
  - Redirects to login if session is lost

## Accessibility Features

The application follows accessibility best practices:

- **Semantic HTML**: Proper use of heading levels and structural elements
- **ARIA Attributes**: Labels, roles, and states for interactive elements
- **Keyboard Navigation**: All functionality accessible via keyboard
- **Focus Management**: Proper focus handling for form elements
- **Screen Reader Support**: Alternative text and aria-live regions
- **Visual Indicators**: Clear visual feedback for states and actions
- **Error Handling**: Accessible error messages with proper roles

## User Experience Enhancements

Recent improvements to enhance user experience:

- **Visual Feedback**: Loading spinners and progress indicators
- **Form Validation**: Password strength meter and visual feedback
- **Error Handling**: Improved error messaging and display
- **Loading States**: Clear indication of background processes
- **Responsive Design**: Mobile-friendly interface components
- **Consistent UI**: Unified styling across the application

## Database Schema

### Tables

1. **auth.users** (Managed by Supabase)
   - Core user authentication data
   - Created automatically by Supabase Auth

2. **public.profiles**
   - Extends auth.users with application-specific data
   - Created automatically when a new user signs up
   - Protected by Row Level Security

```sql
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);
```

### Row Level Security

The profiles table is secured with the following policies:

- Users can only read their own profile data
- Users can only update their own profile data
- Automatic profile creation on user signup via database trigger

## Environment Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm
- Docker and Docker Compose (for containerized development)
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd newterra-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the project root with:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start Supabase locally (optional)**
   ```bash
   npx supabase start
   ```
   
   This will provide local Supabase services with the following URLs:
   - API: `http://127.0.0.1:54321`
   - Studio: `http://127.0.0.1:54323`

5. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

6. **Open the application**
   
   Navigate to `http://localhost:5173` in your browser

### Docker Development

1. **Build the Docker image**
   ```bash
   docker build -t newterra-app .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:80 -e VITE_SUPABASE_URL=your_url -e VITE_SUPABASE_ANON_KEY=your_key newterra-app
   ```

3. **Or use Docker Compose**
   ```bash
   docker-compose up
   ```

## Supabase Configuration

### Authentication Settings

To configure your Supabase project for this application:

1. Enable Email/Password authentication
2. Configure OAuth providers (Google, Facebook, Apple) if needed
3. Set up email templates for authentication flows
4. Configure password reset functionality
5. Ensure RLS policies are properly configured:

```sql
-- Allow public read access to profiles (if needed)
CREATE POLICY "Allow public read access" 
ON public.profiles FOR SELECT 
USING (true);

-- Allow users to update their own profiles
CREATE POLICY "Allow users to update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);
```

### Required Extensions

Ensure these PostgreSQL extensions are enabled in your Supabase project:
- `uuid-ossp` (for UUID generation)
- `pgcrypto` (for cryptographic functions)

## Troubleshooting

### Common Issues

1. **Authentication Issues**
   - Check browser console for CORS errors
   - Verify correct Supabase URL and anon key
   - Ensure you're not using local storage blockers
   - Check for password strength requirements if signup fails

2. **Database Access Problems**
   - Confirm RLS policies are configured correctly
   - Check for typos in table/column names
   - Ensure user has necessary permissions

3. **Build/Development Issues**
   - Clear npm/pnpm cache: `npm cache clean --force`
   - Check for Node.js version compatibility
   - Ensure all dependencies are installed

## Future Enhancements

Potential improvements for future versions:

1. **Profile Management**
   - Allow users to update their profile information
   - Add profile image upload functionality

2. **Advanced Authentication**
   - Implement two-factor authentication
   - Add social login providers

3. **User Administration**
   - Create an admin interface for user management
   - Implement role-based access control

4. **Integration Enhancements**
   - Deepen integration with external services
   - Add API keys management

## Contributing

1. Create a feature branch from `main`
2. Make your changes following project conventions
3. Write/update tests as necessary
4. Submit a pull request with a detailed description
5. Request code review

## Deployment

### Production Build

```bash
npm run build
# or
pnpm build
```

This creates optimized production assets in the `dist/` directory.

### Deployment Options

1. **Docker Deployment**
   - The included Dockerfile builds a production-ready image
   - Deploy to any container platform (AWS ECS, GCP Cloud Run, etc.)

2. **Static Hosting**
   - Deploy the `dist/` directory to any static hosting service
   - Ensure proper routing configuration for SPA

## Integration Points

This application serves as the authentication gateway to integrated services:

- **Xero**: Accounting system integration
- **SharePoint**: Document management integration
- **Monday.com**: Project management integration

Each integration relies on authenticated sessions established through this portal.

## License

[Your license information here]