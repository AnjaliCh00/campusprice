# 🎓 Campus Price - Campus Pricing Platform

A modern Next.js application for campus pricing and course management, built with TypeScript, Prisma, and MySQL.

## 🚀 Recent Updates

### ✅ Database Integration
- **Prisma ORM**: Added Prisma with MySQL database support
- **Database Schema**: Created User and Contact models for campus pricing platform
- **Environment Configuration**: Set up DATABASE_URL in Prisma schema

### 🔐 Authentication System
- **JWT Implementation**: Created minimal, secure JWT utility for user authentication
- **Login Enhancement**: Updated login API to generate and set JWT tokens
- **Cookie Security**: Implemented secure HTTP-only cookies with proper security settings
- **Token Management**: 7-day token expiration with automatic cookie handling
- **Middleware Protection**: Added Next.js middleware for route protection and automatic redirects
- **Profile API**: Created protected profile endpoint with JWT token verification

### 🛠️ Technical Improvements
- **Dependencies Added**: jose, bcryptjs, mysql2, @prisma/client, prisma
- **TypeScript Optimization**: Improved type safety and error handling
- **Code Organization**: Streamlined JWT utility with minimal, focused functionality
- **Security Enhancements**: Added proper cookie security and JWT validation

## 🏗️ Project Structure

```
campusprice/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── login/        # Authentication endpoints
│   │   │   ├── signup/
│   │   │   └── profile/      # Protected profile API
│   │   ├── dashboard/        # User dashboard
│   │   ├── login/           # Login page
│   │   └── signup/          # Registration page
│   ├── components/          # Reusable UI components
│   ├── utils/
│   │   └── jwt.ts          # JWT authentication utility
│   ├── middleware.ts        # Route protection middleware
│   └── generated/
│       └── prisma/         # Generated Prisma client
├── .env                    # Environment variables
└── package.json           # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MySQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd campusprice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/campusprice"
   JWT_SECRET="your-super-secret-jwt-key"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🗄️ Database Commands

- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema to database
- `npx prisma studio` - Open Prisma Studio

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Contact Model
```prisma
model Contact {
  id        Int      @id @default(autoincrement())
  name      String
  phone     String
  dob       DateTime
  college   String
  course    String
  skills    String
  message   String
  createdAt DateTime @default(now())
  updatedAT DateTime @updatedAt
}
```

## 🔐 Authentication

The application uses JWT-based authentication with secure HTTP-only cookies and middleware protection:

- **Token Creation**: `createToken(user)` - Creates JWT for authenticated user
- **Token Verification**: `verifyToken(token)` - Verifies and returns user data
- **Cookie Security**: HTTP-only, secure cookies with 7-day expiration
- **Middleware Protection**: Automatic route protection and redirects
- **Protected Routes**: Dashboard requires authentication, login/signup redirect if already authenticated
- **Profile API**: Protected endpoint that returns user data from JWT token

## 🛡️ Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Security**: HS256 algorithm with secure secret
- **Cookie Security**: HTTP-only, secure, same-site protection
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: Prisma ORM prevents SQL injection

## 🚀 Deployment

### Environment Variables
Make sure to set these environment variables in production:

```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
NODE_ENV="production"
```

### Database Setup
1. Create production MySQL database
2. Update DATABASE_URL in environment variables
3. Run `npx prisma generate && npx prisma db push` to initialize schema

## 📝 API Endpoints

- `POST /api/login` - User authentication (returns JWT token)
- `POST /api/signup` - User registration  
- `GET /api/profile` - Get user profile (protected, requires JWT token)
- `POST /api/price` - Price-related operations

## 🎯 Features

- ✅ User authentication and registration
- ✅ Secure JWT token management
- ✅ Route protection with middleware
- ✅ Automatic redirects based on auth status
- ✅ Protected profile API endpoint
- ✅ Responsive dashboard
- ✅ Course pricing system
- ✅ Contact form with validation
- ✅ Database integration with Prisma
- ✅ TypeScript for type safety
- ✅ Modern UI with Tailwind CSS

## 🔄 Recent Changes

### v1.1.0 - Authentication & Database Update
- Added Prisma ORM with MySQL support
- Implemented JWT authentication system
- Created secure cookie management
- Added Next.js middleware for route protection
- Created protected profile API endpoint
- Added automatic redirects for auth state
- Added essential dependencies (jose, bcryptjs, mysql2)
- Optimized JWT utility for minimal footprint
- Enhanced security with proper validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository or contact the development team.
