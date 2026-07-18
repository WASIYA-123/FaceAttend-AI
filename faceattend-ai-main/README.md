# FaceAttend AI 🎯
### AI-Powered Facial Recognition Attendance System
**Project | Computer Science**

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env

# 3. Start development server
npm run dev

# Open http://localhost:3000
```

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Face Detection | YOLOv8 |
| Face Recognition | FaceNet / DeepFace |
| AI Server | FastAPI (Python) |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| Frontend | React.js + Tailwind CSS |
| Animations | Framer Motion |
| Auth | JWT |
| Mobile | React Native |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI primitives
│   ├── shared/          # Icons, Logo, AIScannerCard
│   ├── landing/         # Landing page sections
│   ├── auth/            # Login, Register, RoleSelector
│   └── dashboard/
│       ├── admin/       # Admin dashboard pages
│       ├── teacher/     # Teacher dashboard pages
│       └── student/     # Student dashboard pages
├── pages/               # Route-level page components
├── hooks/               # Custom React hooks
├── utils/               # API helpers, formatters
├── constants/           # Colors, routes, nav links
└── styles/              # Global CSS
```

---

## 👥 Roles

| Role | Access | Route |
|------|--------|-------|
| Admin | Full system control | `/admin` |
| Teacher | Session management | `/teacher` |
| Student | View attendance | `/student` |

---

## 🔑 Default Test Credentials

```
Admin:   admin@uni.edu   / admin123
Teacher: teacher@uni.edu / teacher123
Student: student@uni.edu / student123
```

---

## 📦 Build for Production

```bash
npm run build
npm run preview
```

---

## 🌐 Deployment

### Vercel
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

---

## 🎓 Project Details

- **Student:** Wasiya
- **Department:** Computer Science
- **Year:** 2025
- **Supervisor:** Dr. S.M. Khalid Jamal
