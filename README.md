# FreelanceHub - Project Guide

## Project Overview
- **Project Name**: FreelanceHub
- **Type**: Freelance Marketplace Web Application
- **Stack**: React 18 + JavaScript (JSX) + Vite 7 + Tailwind CSS 3 + Framer Motion + react-hot-toast
- **Entry Point**: `src/main.jsx` renders `App` with React Router
- **Build**: `npm run build` produces optimized assets in `dist/`
- **Routing**: Client-side routing via React Router v6 with protected routes (PrivateRoute wrapper)

## Architecture Overview

### High-Level Structure
```
src/
├── pages/              # Page components (Home, AllJobs, Login, Register, AddJob, UpdateJob, JobDetails, MyAcceptedTasks, NotFound)
├── components/         # Reusable components (Navbar, Footer, Banner, JobCard, CategoriesGrid, AuthProvider, PrivateRoute)
├── hooks/              # Custom React hooks (useAuth for authentication context)
├── store/              # Zustand store for accepted tasks state (localStorage-backed)
├── data/               # Mock data (mockJobs array and jobCategories)
├── App.jsx             # Main app with routing configuration
└── index.css           # Global Tailwind CSS styles
```

### Key Components

**Authentication System:**
- `AuthProvider.jsx` - Context provider managing user authentication (localStorage-backed mock auth)
- `useAuth()` hook - Custom hook for accessing auth context throughout app
- `PrivateRoute.jsx` - Route wrapper protecting authenticated-only pages
- User object: { uid, email, displayName, photoURL }

**Layout Components:**
- `Navbar.jsx` - Navigation with auth-aware rendering (login/register for guests, logout for authenticated users)
- `Footer.jsx` - Footer with links and copyright
- `Banner.jsx` - Hero section with Framer Motion animations

**Feature Components:**
- `JobCard.jsx` - Reusable job preview card component
- `CategoriesGrid.jsx` - Grid display of job categories with icons and descriptions

**Pages:**
- `Home.jsx` - Landing page with hero, latest 6 jobs grid, categories, and about section
- `AllJobs.jsx` - Job listing with sorting by date (newest/oldest first)
- `JobDetails.jsx` - Full job details with accept button (for non-owners) or edit/delete (for owners)
- `Login.jsx` - Login form with email/password
- `Register.jsx` - Registration form with name, email, photo URL, password validation
- `AddJob.jsx` - Form to post new job (title, category, summary, cover image URL)
- `UpdateJob.jsx` - Form to edit existing job (pre-filled with current data)
- `MyAcceptedTasks.jsx` - Grid of accepted jobs with DONE and CANCEL buttons
- `NotFound.jsx` - 404 error page

### Data Layer

**Mock Data Structure:**
```javascript
Job {
  _id: string (unique ID)
  title: string
  postedBy: string (job poster's name)
  category: string (Web Development, Digital Marketing, Graphics Design, etc.)
  summary: string (job description)
  coverImage: string (image URL)
  userEmail: string (poster's email)
  postedDate: string (format: YYYY-MM-DD)
  postedTime: string (format: HH:MM AM/PM)
}

JobCategory {
  name: string
  icon: string (emoji)
  description: string
}
```

**State Management:**
- `AuthProvider` (Context) - User authentication state, stored in localStorage as "authUser"
- `useJobStore` (Zustand) - Accepted tasks state, persisted in localStorage as "acceptedTasks"

### Key Features Implemented

**1. Authentication (Mock)**
- Login/Register with client-side validation
- Password requirements: min 6 chars, 1 uppercase, 1 lowercase letter
- User data persisted to localStorage
- Logout with toast notification

**2. Job Management (CRUD)**
- **Create**: Add new jobs via `/addJob` (private route)
- **Read**: View all jobs on `/allJobs` or single job on `/allJobs/:id` (single job detail is private)
- **Update**: Edit own jobs via `/updateJob/:id` (private, owner-only)
- **Delete**: Delete own jobs from job details page
- Sort jobs by date (newest first or oldest first)

**3. User Features**
- Accept jobs from job details page
- Track accepted jobs in "My Accepted Tasks" page
- Mark tasks as DONE (removes from list)
- Cancel tasks (removes from list)
- Prevent accepting own jobs
- Prevent duplicate accepts

**4. Protected Routes**
- `/addJob` - Private
- `/allJobs/:id` - Private (view full details)
- `/updateJob/:id` - Private (owner-only)
- `/my-accepted-tasks` - Private
- Public routes: `/`, `/login`, `/register`, `/allJobs`

**5. UI/UX Features**
- Loading spinners during operations
- Toast notifications for all actions (success/error)
- Responsive design (mobile-first)
- Framer Motion animations for page transitions
- Clean, modern design with Tailwind CSS
- Conditional rendering based on auth state

## Development Workflow

**Commands:**
```bash
npm install              # Install dependencies
npm run build           # Production build (MANDATORY after code changes)
npm run dev            # Local dev server (for development only)
npm run preview        # Preview production build locally
```

**Build Process:**
- Vite transpiles JSX to JavaScript
- Tailwind CSS classes are purged and minified
- Assets are optimized and placed in `dist/` folder
- Entry point: `dist/index.html`

## Code Standards

**Component Writing:**
- Use regular function declarations (not arrow functions as default exports)
- Example: `function MyComponent() { return ... } export default MyComponent;`
- Event handlers can use arrow functions
- Use JSX without TypeScript type annotations

**Styling:**
- Only Tailwind CSS classes (no custom CSS in components)
- Color scheme: Blue (#2563eb) primary with gray neutrals
- Responsive breakpoints: sm (640px), md (768px), lg (1024px)
- Spacing: 8-point scale (p-1, p-2, p-4, p-8, etc.)

**State Management:**
- useState for component local state
- useAuth() hook for authentication
- useJobStore() for accepted tasks
- localStorage for persistence (handled by providers)

**Naming Conventions:**
- Components: PascalCase (JobCard, AllJobs)
- Functions: camelCase (handleSubmit, formatDate)
- Constants: UPPER_SNAKE_CASE (API_URL)
- Files: Match component names or use lowercase (index.jsx, mockJobs.jsx)

## Important Implementation Details

**Auth Flow:**
- Mock auth uses localStorage key "authUser"
- AuthProvider loads user on mount from localStorage
- useAuth() hook throws error if used outside AuthProvider
- Login/Register validate on client-side
- No real Firebase integration yet

**Job Actions:**
- Accept job stores in Zustand store (localStorage: "acceptedTasks")
- Prevents accepting own jobs (userEmail comparison)
- Prevents duplicate accepts (task existence check)
- DONE/CANCEL buttons remove from both UI and store

**Form Handling:**
- Controlled components with state
- Validation before submission
- Toast notifications for feedback
- Loading states during "API calls" (simulated with setTimeout)

**Animations:**
- Framer Motion for page transitions
- Container variants for staggered children
- Scroll-triggered animations on sections
- Hover effects on interactive elements

## Project Status

### ✅ Completed
- Home page with hero, jobs grid, categories, about section
- Navbar with auth-aware rendering
- All Jobs page with sorting by date
- Job Details page with Accept action (private)
- Login/Register pages with validation
- Add Job page with form (private)
- Update Job page with pre-filled form (private, owner-only)
- My Accepted Tasks page with DONE/CANCEL buttons
- Toast notifications throughout
- Private route protection
- Mock authentication system
- Loading spinners
- 404 error page
- Fully responsive design
- Framer Motion animations

### ⏭️ For Future Backend Integration
1. Replace mock auth with Firebase authentication
2. Connect to MongoDB API for job storage
3. Implement real backend CRUD operations
4. Add image upload to imgbb or Firebase Storage
5. Create "My Posted Jobs" page (jobs created by logged-in user)
6. Add dark/light theme toggle
7. Implement advanced filtering
8. Deploy client to Netlify/Vercel

## Database Schema (MongoDB - When Implemented)

```javascript
// Jobs Collection
{
  _id: ObjectId,
  title: String,
  postedBy: String,
  category: String,
  summary: String,
  coverImage: String (imgbb URL),
  userEmail: String,
  postedDate: Date,
  createdAt: Date,
  updatedAt: Date
}

// Users Collection (if needed)
{
  _id: ObjectId,
  uid: String,
  email: String,
  displayName: String,
  photoURL: String,
  createdAt: Date
}

// AcceptedTasks Collection
{
  _id: ObjectId,
  jobId: String,
  userId: String,
  userEmail: String,
  acceptedAt: Date
}
```

## Common Development Tasks

**Add a new page:**
1. Create file in `src/pages/NewPage.jsx`
2. Import Navbar and Footer
3. Add to App.jsx routes (wrap with PrivateRoute if needed)
4. Add link in Navbar if public navigation needed

**Add navigation link:**
- Edit Navbar.jsx navLinks array
- Add conditional rendering if auth-dependent

**Modify job actions:**
- Edit relevant page component (AllJobs.jsx, JobDetails.jsx)
- Use toast notifications for feedback
- Update Zustand store for state changes

**Update form validation:**
- Edit form page (Register.jsx, AddJob.jsx, etc.)
- Update error messages in toast.error()
- Validate before submission

**Create new component:**
1. Create in `src/components/ComponentName.jsx`
2. Use regular function declaration
3. Export as default
4. Use only in pages or other components

## Performance Notes

- Build output: ~111KB gzipped JS + 4.65KB gzipped CSS
- Mock data: 6 jobs loaded in memory
- No backend calls (all operations instant)
- localStorage operations for persistence
- Framer Motion animations are GPU-accelerated

## Testing Notes

**Manual Testing Checklist:**
- [ ] Register new user with valid/invalid passwords
- [ ] Login/logout functionality
- [ ] Post new job on /addJob
- [ ] View jobs on /allJobs with sorting
- [ ] Accept job from /allJobs/:id
- [ ] View accepted tasks on /my-accepted-tasks
- [ ] Mark task as DONE/CANCEL
- [ ] Edit own job
- [ ] Prevent accepting own job
- [ ] Prevent duplicate accepts
- [ ] Protected route redirects to login
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Toast notifications appear

## Next Steps for Backend

When ready to integrate real backend:
1. Create Node.js + Express server
2. Set up MongoDB database
3. Implement JWT authentication
4. Create REST API endpoints
5. Replace mock data calls with API requests
6. Add error handling for network failures
7. Implement image upload service
8. Add backend validation

---

**Last Updated:** 2025-11-11
**Status:** MVP Complete - Ready for Backend Integration
