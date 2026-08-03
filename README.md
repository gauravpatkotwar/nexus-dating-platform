# NEXUS - Modern Anonymous Adult Dating Platform (18+)

> **"Meet People Before You Meet Their Face."**
> Anonymous connections. Mutual identity reveals. Real chemistry.

NEXUS is a modern, premium, privacy-first adult dating platform (strictly 18+) where personality, chemistry, and lifestyle come before physical appearance. Designed like **Discord + Bumble + Reddit + Steam**, every user begins with a fully customizable vector avatar across various aesthetic themes (Cyberpunk, Anime, Pixel Art, Fantasy, Minimal, Cute, Modern). Real profile photos, Instagram handles, and voice intros remain 100% hidden until both parties mutually agree to press **Reveal Identity**.

---

## 🌟 Key Differentiators & Product Features

- 🔒 **Privacy-First Architecture**: Real photos, Instagram, and voice bios are sealed behind client-side 256-bit blur until dual mutual consent is granted.
- ⚡ **Multi-Theme Vector Avatar Customizer**: SVG vector avatar engine supporting Cyberpunk, Anime, Pixel Art, Fantasy, Minimalist, Cute, and Modern themes with custom hair, eyes, skin, accessories, outfits, and glowing frames.
- 🧊 **Icebreaker Unlock System**: No generic greetings. Chat unlocks only after both users answer a fun chemistry icebreaker question.
- 💬 **Discord/Telegram-Style Messenger**: Real-time typing indicators, read receipts, voice message player, GIF picker, disappearing message timers, and embedded Mutual Identity Reveal widget.
- 🌐 **Communities & Events**: Public topic hubs (*Gamers*, *Nightlife*, *Travelers*, *Tech*) with post feeds, comments, and host-verified local meetups.
- 👑 **Virtual Coins & VIP Subscription**: Coin store for profile boosts, special icebreaker messages, custom avatar frames, and VIP incognito mode.
- 🛡️ **Admin & Moderation Panel**: Real-time metrics dashboard, moderation queue for user reports, 18+ selfie/ID verification checks, and revenue analytics.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 App Router, React 19, TypeScript, TailwindCSS, Framer Motion, Lucide Icons.
- **Backend Architecture**: NestJS, Node.js, REST Controllers, Socket.IO Realtime Gateway, Swagger OpenAPI.
- **Database & ORM**: PostgreSQL, Prisma ORM.
- **DevOps**: Docker, Docker Compose, GitHub Actions CI/CD pipeline.

---

## 📁 Repository Structure

```
Nexus/
├── frontend/                     # Next.js 15 App Router Application
│   ├── app/                      # App Routes (Landing, Auth, Main App, Admin)
│   ├── components/               # UI, Avatar Builder, Discover, Messaging, Communities
│   └── lib/                      # Compatibility Algorithm & Mock Engine
├── backend/                      # NestJS Production Backend
│   ├── src/                      # Auth, Users, Discover, Messages Gateway, Mutual Reveal, Admin
│   └── prisma/                   # Complete PostgreSQL ORM Schema
├── docker-compose.yml            # Docker Orchestration for Postgres, Redis & Microservices
├── DEPLOYMENT.md                 # Production Setup Guide
└── .github/workflows/ci-cd.yml   # GitHub Actions Pipeline
```
