# Digital Life Lessons 🌱

A full-stack web application where users can create, preserve, and share meaningful life lessons, personal growth stories, and wisdom collected from real-life experiences.

## Live Project

- **Live Site:** [LIVE_LINK](https://digital-life-lessons-phi.vercel.app/)
- **Server Repository:** [SERVER_GITHUB_LINK ](https://github.com/soheldev-codes/Digital-Life-Lessons-Server)

---

## Project Purpose

People learn valuable lessons throughout life but often forget them over time.
**Digital Life Lessons** helps users store those lessons permanently, reflect on personal growth, and inspire others by sharing wisdom publicly.

Users can:

- Create personal life lessons
- Share public lessons with others
- Save favorite lessons
- React and comment
- Upgrade to premium for exclusive content

---

## Key Features 🚀

### Authentication & Authorization

- Email/Password Authentication using Better Auth
- Google Login
- Protected Routes
- Role-based Access (User / Admin)
- Token Verification on protected APIs

### Lesson Management

- Create Life Lessons
- Update Existing Lessons
- Delete Lessons
- Public / Private Visibility
- Free / Premium Access Control

### Premium System

- Stripe Payment Integration
- One-time premium upgrade (৳1500)
- Premium users can:
  - Access premium lessons
  - Create premium content
  - Enjoy premium badge

### Public Lessons

- Browse public lessons
- Search lessons by title
- Filter by category
- Filter by emotional tone
- Pagination support
- Sort by newest / most saved

### Lesson Interaction

- Like / Unlike lessons
- Save to Favorites
- Comment system
- Report inappropriate lessons
- Related lesson recommendations

### Dashboard (User)

- Dashboard analytics
- Total created lessons
- Total saved lessons
- My lessons management
- Favorites management
- Profile management

### Dashboard (Admin)

- Platform analytics
- Manage all users
- Promote user to admin
- Manage all lessons
- Mark lesson as featured
- Mark lesson as reviewed
- Handle reported lessons

---

## Tech Stack 🛠️

### Frontend

- Next.js
- React.js
- Tailwind CSS
- DaisyUI
- React Icons
- TanStack Query
- Axios
- Framer Motion
- React Hot Toast
- Stripe
- Better Auth

### Backend

- Node.js
- Express.js
- MongoDB
- Stripe API
- CORS
- dotenv

---

## Main Pages 📄

### Public Pages

- Home
- Public Lessons
- Login
- Register
- 404 Page

### Private Pages

- Lesson Details
- Pricing / Upgrade
- Favorites
- Dashboard

### Dashboard Routes

#### User

- Dashboard Home
- Add Lesson
- My Lessons
- Update Lesson
- My Favorites
- Profile

#### Admin

- Admin Dashboard
- Manage Users
- Manage Lessons
- Reported Lessons
- Admin Profile

---

## Home Page Sections 🎨

- Hero Banner Slider
- Featured Lessons
- Why Learning From Life Matters
- Top Contributors
- Most Saved Lessons

---

---

## NPM Packages Used 📦

### Client Packages

```bash
npm install axios
npm install @tanstack/react-query
npm install react-icons
npm install react-hot-toast
npm install framer-motion
npm install @stripe/react-stripe-js
npm install @stripe/stripe-js
npm install better-auth
```

### Server Packages

```bash
npm install express
npm install cors
npm install dotenv
npm install mongodb
npm install stripe
```

---

## Future Improvements

- Dark / Light Theme
- Lesson PDF Export
- Social Sharing
- Activity Heatmap
- Reading Time Estimation

---

## Final Notes

Digital Life Lessons is designed to help people preserve meaningful experiences and learn from others’ wisdom.
This project demonstrates full-stack development skills including authentication, payment integration, CRUD operations, role-based access control, and scalable dashboard architecture.
