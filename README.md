# Full-Stack CRUD Application

A full stack application to demo development practices with Next.js, NestJS, Prisma, and TypeScript.

## Project Overview

This project showcases a web development stack with two separate applications:

- **Client**: Next.js frontend with Tailwind CSS and ShadCN UI
- **Server**: NestJS backend with Prisma ORM and SQLite database

## Technology Stack

### Frontend
- **Next.js 15**
- **TypeScript**
- **Tailwind CSS** 
- **ShadCN UI**
- **Cypress** (Integration testing)

### Backend
- **NestJS**
- **Prisma**
- **TypeScript**
- **SQLite**
- **Jest**

## Features Implemented

### Complete CRUD
- Create, Read, Update, Delete posts
- Real time UI updates

### UI/UX
- Responsive design (mobile-first approach)
- Loading states and error handling
- Form validation with helpful error messages
- Delete confirmation dialogs
- Color coded status indicators

### Validation
- End-to-end TypeScript implementation
- Frontend and backend validation layers
- Custom DTOs with class-validator
- API client with full type safety

### Testing (TDD approach)
- Unit tests for service layer
- end to end tests with Cypress

## Development patterns & conventions I strive for

- **Separation of concerns**: Clear frontend/backend separation
- **Modular architecture**: Feature-based folder structure
- **Type-safe API**: Shared types and validation
- **Clean abstractions**: Reusable components and services
- **TypeScript everywhere**: Full type safety
- **Consistent naming**: camelCase for variables, PascalCase for components
- **Error handling**: Comprehensive error states
- **Validation**: Multiple validation layers (UI, API, Database)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd nestjs_crud
```

2. **Setup Backend**
```bash
cd server
npm install
npx prisma migrate dev
npm run start:dev
```

3. **Setup Frontend**
```bash
cd client
npm install
npm run dev
```

4. **Access Applications**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## API Endpoints

- `GET /posts` - Get all posts
- `GET /posts/:id` - Get single post
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

## Testing

### Backend Tests
```bash
cd server
npm test
```

### Frontend E2E Tests
```bash
cd client
npm run cypress:open
```

## Potential next steps

- Authentication & authorization
- Pagination
- Migrate to PostgreSQL
- Docker containerization
- CI/CD pipeline setup
- Performance optimizations
