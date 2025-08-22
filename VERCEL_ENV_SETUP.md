# Vercel Environment Variables Setup

For your HealPulse AI Health Assistant to work with Supabase PostgreSQL in production, you need to set these environment variables in your Vercel dashboard:

## Required Environment Variables

### 1. Database Configuration
```
DATABASE_URL=postgresql://postgres:12345678@db.hcofssccfggmzbvmpmor.supabase.co:5432/postgres?sslmode=require
```

### 2. JWT Secret (keep the same for consistency)
```
JWT_SECRET=a8b7c9d4e5f6a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6
```

### 3. Builder.io (if needed)
```
VITE_PUBLIC_BUILDER_KEY=__BUILDER_PUBLIC_KEY__
```

### 4. Other Variables (optional)
```
PING_MESSAGE=ping pong
```

## How to Set These in Vercel:

1. Go to your Vercel dashboard
2. Select your project: `builder-nova-studio`
3. Go to Settings → Environment Variables
4. Add each variable above with their values
5. Make sure to set them for "Production", "Preview", and "Development" environments

## Database Setup in Supabase:

Once the environment variables are set, Vercel will automatically run the following during deployment:
- `prisma generate` - Generates the Prisma client
- `prisma db push` - Creates/updates the database schema in your Supabase instance

Your User table will be created automatically with the following structure:
- id (auto-increment primary key)
- email (unique)
- password (hashed)
- firstName, lastName (optional)
- dateOfBirth (optional)
- createdAt, updatedAt (timestamps)

## Testing the Connection:

After setting up the environment variables in Vercel, your authentication system will:
1. Connect to your Supabase PostgreSQL database
2. Create user accounts in the `User` table
3. Handle login/logout with JWT tokens
4. Store all user data securely in Supabase

## Local Development:

For local development, the app will continue using the local PostgreSQL instance in Clacky, so you can develop and test locally before deploying to production.