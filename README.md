<<<<<<< HEAD


## 🌟 About the Chapter

The **Association for Computing Machinery (ACM)** is the world's largest educational and scientific computing society. At NMIMS Indore, our Student Chapter aims to create a thriving ecosystem where students explore cutting-edge technologies, compete nationally, publish research, and develop professional skills.

### Our Mission
To advance computing as a science and profession by providing students with unparalleled opportunities for technical growth, research exposure, and leadership development.

### Our Vision
To be recognized as a premier ACM chapter producing industry-ready technologists, award-winning researchers, and community leaders.

### Core Values
- **💡 Innovation:** Advancing the frontier of computing.
- **🤝 Collaboration:** Building through shared knowledge.
- **🏆 Excellence:** Upholding the highest standards in everything we do.
- **🚀 Leadership:** Developing future technology leaders.

---

## 🖥️ About the Platform

This repository contains the source code for our official digital platform. It is designed to be highly interactive, beautifully crafted, and performant.

### ✨ Key Features

- **Cinematic Experience:** Built with GSAP, Framer Motion, and Lenis for buttery-smooth scrolling, dynamic entry animations, and a premium feel.
- **Event Archive & Timeline:** A searchable database of past and upcoming events (hackathons, workshops, guest sessions) with filtering capabilities and detailed event pages.
- **Dynamic Gallery:** A masonry-style photo gallery with a full-screen lightbox viewer capturing our best moments.
- **Project Showcase:** Highlighting student-led technical projects (like Smart Campus IoT and ML Anomaly Detectors) with GitHub-inspired cards.
- **Achievement Dashboard:** Interactive counters showcasing chapter milestones, awards, and certifications.
- **Community Hub:** Detailed profiles for the Leadership Team, Core Committee, and Department Members, acknowledging everyone's contributions.
- **Recruitment Portal:** Seamless "Join ACM" application workflow.

---

## 🏗️ Architecture & Tech Stack

The project adopts a modern full-stack architecture, split into frontend and backend layers to ensure scalability.

```text
Acm/
├── frontend/          # Next.js App Router + Tailwind CSS client
├── backend/           # Node.js + Express.js REST API
└── database/          # PostgreSQL schema & seeds
```

### 🛠️ Technology Choices
| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | Next.js 15, React 19 | Server-side rendering, routing, and UI |
| **Styling** | Tailwind CSS v4 | Utility-first CSS for rapid styling |
| **Animations** | GSAP, Framer Motion, Lenis | Complex scroll animations and transitions |
| **Backend API** | Express.js, Node.js | Handling business logic and data aggregation |
| **Database** | PostgreSQL | Relational data storage |
| **Validation** | Zod | End-to-end type safety and payload validation |

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- PostgreSQL (for the database)

### Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nmims-acm/website.git
   cd website
   ```

2. **Frontend Setup:**
   Navigate to the frontend directory, install dependencies, and start the Next.js dev server.
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   > The frontend will be available at `http://localhost:3000`

3. **Backend Setup:**
   Navigate to the backend directory, install dependencies, and start the Express server.
   ```bash
   cd ../backend
   npm install
   npm run dev
   ```
   > The API will be available at `http://localhost:4000`

4. **Database Setup:**
   Execute the schema SQL script to set up your PostgreSQL database tables.
   ```bash
   psql -U postgres -d nmims_acm -f database/schema.sql
   ```

---

## 🎨 Design System

Our UI/UX focuses on a premium dark mode aesthetic with vibrant, tech-inspired accents.

- **Primary:** ACM Blue `#0055A4`
- **Background:** Deep Charcoal `#0F172A`
- **Accents:** Electric Blue, Cyan, Soft Purple
- **Typography:** Inter (Body copy) & Space Grotesk (Headings and Display)

---

## 🤝 Contributing

We welcome contributions from chapter members and the open-source community! 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

© NMIMS Indore ACM Student Chapter. All rights reserved. 
=======
# ACM
>>>>>>> a6d094590cf701e63112e3e9a5b71b938b728306
