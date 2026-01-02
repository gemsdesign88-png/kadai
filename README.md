# KadaiPOS Marketing Website

A modern, bilingual marketing website for KadaiPOS - a comprehensive point of sale system for restaurants, cafes, and retail stores in Indonesia.

## 🚀 Features

- ✅ **Bilingual Support** (English/Indonesian)
- ✅ **Modern UI/UX** with Tailwind CSS & Framer Motion
- ✅ **Complete Authentication System** with Supabase
- ✅ **13 Feature Detail Pages** with UI mockups
- ✅ **Responsive Design** for all devices
- ✅ **Coming Soon Pages** for Demo & Contact
- ✅ **Protected Routes** with middleware

## 🔐 Authentication

The website includes a full authentication system powered by Supabase:

- **Login/Signup Pages** (`/login`)
- **Password Reset** flow
- **Email Verification** (optional)
- **Protected Dashboard** (`/dashboard`)
- **Session Management** with middleware

For detailed authentication documentation, see [LOGIN_IMPLEMENTATION.md](./LOGIN_IMPLEMENTATION.md)

## 🏗️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **3D**: Three.js + React Three Fiber
- **Authentication**: Supabase
- **Database**: Supabase PostgreSQL

## 🎯 Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account (for authentication)

### Installation

1. Clone the repository:
```bash
cd /Users/gemmyadyendra/Documents/kadaipos.id
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy .env.local or create it with:
NEXT_PUBLIC_SUPABASE_URL=https://bigjlzrnlzcfxwlkstpp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
src/
├── app/
│   ├── about/              # About page with project values
│   ├── auth/               # Auth callback & error pages
│   ├── contact/            # Contact coming soon page
│   ├── dashboard/          # Protected dashboard (requires login)
│   ├── demo/               # Demo coming soon page
│   ├── features/           # Features listing + 13 detail pages
│   ├── login/              # Login/Signup/Forgot Password
│   └── pricing/            # Pricing plans
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Homepage sections, features
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── i18n/               # Internationalization (EN/ID)
│   └── supabase/           # Supabase client & middleware
└── middleware.ts           # Route protection middleware
```

## 🌐 Pages

### Public Pages
- `/` - Homepage with hero, features, CTA
- `/features` - 13 POS features overview
- `/features/[feature]` - Individual feature detail pages with UI mockups
- `/pricing` - Pricing plans (Starter, Professional, Enterprise)
- `/about` - Project story, values, creator
- `/contact` - Contact coming soon (WhatsApp collection)
- `/demo` - Demo coming soon (WhatsApp collection)
- `/login` - Authentication page (login/signup/forgot password)

### Protected Pages
- `/dashboard` - User dashboard (requires authentication)

## 🔧 Development

### Key Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

### Testing Login

1. Go to `/login`
2. Click "Daftar sekarang" to sign up
3. Fill in the form and submit
4. Verify email (if enabled in Supabase)
5. Login and access `/dashboard`

## 🎨 Design System

- **Primary Color**: #FF5A5F (Kadai Red)
- **Secondary Color**: #8B5CF6 (Purple)
- **Typography**: System fonts with Geist fallback
- **Spacing**: Tailwind CSS spacing scale
- **Radius**: Rounded corners (xl, 2xl, 3xl)
- **Shadows**: Subtle elevation with colored shadows

## 📱 Features

### Implemented
- ✅ Bilingual (EN/ID) with context-based switching
- ✅ Full authentication system (Supabase)
- ✅ Protected routes with middleware
- ✅ 13 detailed feature pages with UI mockups
- ✅ Responsive mobile-first design
- ✅ Coming soon pages with WhatsApp lead capture
- ✅ Active navigation state indication
- ✅ Email validation with real-time feedback
- ✅ Password reset flow

### Coming Soon
- ⏳ Actual demo implementation
- ⏳ Contact form backend
- ⏳ Restaurant/business management
- ⏳ User profile editing
- ⏳ Multi-restaurant support
- ⏳ Admin panel

## 🔐 Security

- Session-based authentication with Supabase
- PKCE flow for OAuth
- Cookie-based session storage
- Server-side session validation
- Protected routes via middleware
- Email verification (optional)

## 📚 Documentation

- [LOGIN_IMPLEMENTATION.md](./LOGIN_IMPLEMENTATION.md) - Detailed authentication guide
- [.github/copilot-instructions.md](./.github/copilot-instructions.md) - Project guidelines

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project to Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
```

Update Supabase Auth Settings:
- Site URL: `https://your-domain.com`
- Redirect URLs: `https://your-domain.com/auth/callback`

## 🤝 Contributing

This is a commercial project for KadaiPOS. For questions or contributions, contact the development team.

## 📄 License

Proprietary - All rights reserved by KadaiPOS

## 💬 Support

- Email: hello@kadaipos.id
- WhatsApp: +62 813-3976-5775
- Website: [kadaipos.id](https://kadaipos.id)

---

Built with ❤️ in Indonesia 🇮🇩
