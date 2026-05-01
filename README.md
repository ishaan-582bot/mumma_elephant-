# 🐘 MummaElephant

> **Safe, Smart, Supportive — built for mums, by people who care.**

MummaElephant is a full-stack web application designed to be a safe, supportive digital companion for mothers. It brings together child growth tracking, secure document storage, community connection, and personal wellbeing tools — all in one beautifully crafted, privacy-first platform.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **👤 User Profile & Verification** | Rich profile with motherhood stage tracking, verification status, and profile completion scoring. |
| **👶 My Children** | Track each child's growth (weight & height charts), vaccinations, milestones, and photo timeline. Supports pregnancy tracking with due dates. |
| **📝 My Posts** | Share moments with privacy controls — choose between public or private visibility for each post. |
| **💡 My Tips** | Share and discover parenting tips tagged by category (Nutrition, Sleep, Mental Health, Breastfeeding, Postpartum) with upvote/downvote and view tracking. |
| **🏠 Safe Vault** | PIN-protected secure storage for sensitive documents — maternity records, birth certificates, vaccination cards, and more. Supports offline access flags. |
| **🔒 Privacy & Safety** | Granular privacy controls with activity logs, privacy presets, and field-level visibility settings. |
| **🤝 Community** | Connect with other mums, earn community badges, exchange gratitude messages, and build your trusted circle. |
| **🧘 Wellbeing** | Mood tracking with emoji-based entries, self-care goal checklists, and personal notes. |
| **🗺️ Journey** | Visual timeline of your motherhood journey — milestones, posts, and system events all in one place. |
| **💌 Legacy Letters** | Write time-locked letters to your children, unlockable on a future date you choose. |
| **📸 Historical Memories** | Preserve and reflect on past memories with photos and captions. |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | [Next.js](https://nextjs.org/) 16 (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) v4 |
| **Font** | [Nunito](https://fonts.google.com/specimen/Nunito) (Google Fonts via `next/font`) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) |
| **ORM** | [Prisma](https://www.prisma.io/) 7 |
| **Auth** | JWT (`jose`) + `bcryptjs` password hashing + HTTP-only cookies |
| **Validation** | [Zod](https://zod.dev/) |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Rate Limiting** | `next-rate-limit` |

---

## 📁 Project Structure

```
mumma_elephant-
├── prisma/
│   ├── schema.prisma      # Full Prisma schema (20+ models)
│   └── seed.ts            # Database seed script with demo data
├── src/
│   ├── app/
│   │   ├── api/           # REST API routes (Next.js Route Handlers)
│   │   │   ├── auth/      # Login, Register, Logout, Me
│   │   │   ├── avatar/    # Avatar upload endpoint
│   │   │   ├── children/  # CRUD + growth, milestones, timeline, vaccinations
│   │   │   ├── community/ # Badges, connections, community feed
│   │   │   ├── journey/   # Journey timeline events
│   │   │   ├── posts/     # Post CRUD with privacy
│   │   │   ├── privacy/   # Privacy logs & settings
│   │   │   ├── tips/      # Tip CRUD with voting
│   │   │   ├── user-profile/ # Profile CRUD
│   │   │   ├── vault/     # Document vault + PIN verification
│   │   │   └── wellbeing/ # Mood & self-care tracking
│   │   ├── profile/
│   │   │   └── page.tsx   # Main profile dashboard
│   │   ├── globals.css    # Global styles + Tailwind directives
│   │   ├── layout.tsx     # Root layout with Nunito font
│   │   └── page.tsx       # Landing / redirect page
│   ├── components/
│   │   ├── profile/
│   │   │   └── ProfileShell.tsx    # Profile page shell
│   │   ├── tabs/
│   │   │   ├── Community.tsx       # Community tab
│   │   │   ├── Journey.tsx         # Journey timeline tab
│   │   │   ├── MyChildren.tsx      # Child tracking tab
│   │   │   ├── MyPosts.tsx         # Posts tab
│   │   │   ├── MyTips.tsx          # Tips tab
│   │   │   ├── PersonalInfo.tsx    # Personal info editor
│   │   │   ├── PrivacySafety.tsx   # Privacy settings tab
│   │   │   ├── SafeVault.tsx       # Document vault tab
│   │   │   └── Wellbeing.tsx       # Wellbeing tab
│   │   └── ui/
│   │       ├── Accordion.tsx       # Collapsible sections
│   │       ├── BackToTop.tsx       # Scroll-to-top button
│   │       ├── Badge.tsx           # Status badges
│   │       ├── BottomSheet.tsx     # Mobile bottom sheet
│   │       ├── Button.tsx          # Reusable button
│   │       ├── Card.tsx            # Card component
│   │       ├── ConfettiEffect.tsx  # Celebration animation
│   │       ├── EmptyState.tsx      # Empty state illustration
│   │       ├── GrowthChart.tsx     # Weight/height charts
│   │       ├── HoldToDeleteButton.tsx # Long-press delete
│   │       ├── PinPad.tsx           # PIN entry pad
│   │       ├── SectionHero.tsx      # Section header
│   │       ├── Skeleton.tsx        # Loading skeletons
│   │       ├── Toast.tsx           # Toast notifications
│   │       └── Toggle.tsx          # Toggle switch
│   └── lib/
│       ├── api-utils.ts   # API helper utilities
│       ├── auth.ts        # JWT auth, password hashing, cookies
│       ├── data.ts        # TypeScript interfaces + mock data
│       ├── db.ts          # Prisma client singleton
│       ├── shared-types.ts # Shared type definitions
│       ├── typography.ts  # Typography utilities
│       └── utils.ts       # General utilities
├── public/                # Static assets
├── next.config.ts         # Next.js configuration
├── prisma.config.ts       # Prisma configuration
├── postcss.config.mjs     # PostCSS config (Tailwind v4)
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (recommended: 20+)
- [PostgreSQL](https://www.postgresql.org/) 14+ database
- npm (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ishaan-582bot/mumma_elephant-.git
   cd mumma_elephant-
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root:

   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
   JWT_SECRET="your-super-secret-jwt-key-change-in-production"
   ```

   > ⚠️ **Important:** Change `JWT_SECRET` to a strong, random string for production.

4. **Generate the Prisma client**

   ```bash
   npm run db:generate
   ```

5. **Run database migrations**

   ```bash
   npm run db:migrate
   ```

6. **Seed the database (optional — creates demo data)**

   ```bash
   npm run db:seed
   ```

   This creates a demo user (`sarah.t@gmail.com` / `password123`) with full profile, children, posts, tips, and more.

7. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧑‍💻 Usage

### Authentication
- Register a new account or log in with existing credentials.
- JWT tokens are stored in HTTP-only cookies for 7 days.

### Profile Dashboard
- Navigate through tabs to manage different aspects of your motherhood journey.
- Profile completion is calculated automatically based on filled fields.

### Child Tracking
- Add children with birth details, track weight/height over time with charts.
- Log vaccinations and mark milestones as achieved.
- Maintain a photo timeline with notes.

### Safe Vault
- Upload sensitive documents (PDFs, images) categorized by type.
- Set a PIN for vault access.
- Mark documents for offline availability.

### Community
- Send connection requests to other mums.
- Earn badges for community contributions.
- Receive gratitude messages from connections.

### Wellbeing
- Log daily moods with emoji selections and optional notes.
- Set and track self-care goals.

---

## ⚙️ Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `JWT_SECRET` | ✅ | Secret key for JWT signing |
| `NODE_ENV` | ❌ | Set to `production` in production (enables secure cookies) |

### Database Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Generate client | `npm run db:generate` | Generate Prisma client from schema |
| Run migrations | `npm run db:migrate` | Apply pending migrations |
| Push schema | `npm run db:push` | Push schema changes (dev only) |
| Seed data | `npm run db:seed` | Populate database with demo data |
| Studio | `npm run db:studio` | Open Prisma Studio GUI |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create a branch** for your feature or fix:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes** and ensure the code passes linting:
   ```bash
   npm run lint
   ```
4. **Commit** your changes with a clear message
5. **Push** to your fork and open a **Pull Request**

Please keep commits focused, write clear PR descriptions, and be respectful in discussions.

---

## 📄 License

This project does not currently include a license file. If you're the repository owner, consider adding an open-source license (e.g., MIT, Apache-2.0) to clarify usage rights.

---

<p align="center">
  Built with 💜 for mums everywhere.
</p>
