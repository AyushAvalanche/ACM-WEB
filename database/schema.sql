-- NMIMS Indore ACM Student Chapter - PostgreSQL Schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Users (synced with Clerk)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'member' CHECK (role IN ('admin', 'editor', 'member')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_clerk_id ON users(clerk_id);
CREATE INDEX idx_users_role ON users(role);

-- Team Members
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  bio TEXT,
  photo_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  department VARCHAR(50) NOT NULL CHECK (department IN (
    'faculty', 'leadership', 'technical', 'design', 'events', 'alumni'
  )),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_team_department ON team_members(department);
CREATE INDEX idx_team_active ON team_members(is_active);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  event_date DATE NOT NULL,
  end_date DATE,
  banner_url TEXT,
  location VARCHAR(500),
  participation_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_date ON events(event_date DESC);
CREATE INDEX idx_events_featured ON events(is_featured) WHERE is_featured = true;

-- Speakers
CREATE TABLE speakers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  designation VARCHAR(255),
  photo_url TEXT,
  bio TEXT,
  display_order INTEGER DEFAULT 0
);

CREATE INDEX idx_speakers_event ON speakers(event_id);

-- Event Schedule
CREATE TABLE event_schedule (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  time_slot VARCHAR(50) NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0
);

CREATE INDEX idx_schedule_event ON event_schedule(event_id);

-- Gallery
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500),
  image_url TEXT NOT NULL,
  alt_text VARCHAR(500),
  category VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL,
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  media_type VARCHAR(20) DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
  cloudinary_id TEXT,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_gallery_year ON gallery(year DESC);
CREATE INDEX idx_gallery_event ON gallery(event_id);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  banner_url TEXT,
  category VARCHAR(100) NOT NULL,
  tech_stack TEXT[] DEFAULT '{}',
  github_url TEXT,
  demo_url TEXT,
  documentation_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_category ON projects(category);

CREATE TABLE project_contributors (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  team_member_id UUID REFERENCES team_members(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, team_member_id)
);

-- Achievements
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL CHECK (category IN (
    'hackathon', 'publication', 'award', 'certification', 'milestone'
  )),
  achievement_date DATE NOT NULL,
  icon VARCHAR(50),
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_achievements_category ON achievements(category);
CREATE INDEX idx_achievements_date ON achievements(achievement_date DESC);

-- Blogs
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category VARCHAR(100),
  cover_image_url TEXT,
  author_id UUID REFERENCES users(id),
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_published ON blogs(is_published, published_at DESC);

-- Applications (Membership & Recruitment)
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(50) NOT NULL CHECK (type IN ('membership', 'volunteer', 'recruitment')),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  student_id VARCHAR(100),
  branch VARCHAR(100),
  year_of_study VARCHAR(50),
  motivation TEXT,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN (
    'pending', 'reviewing', 'accepted', 'rejected'
  )),
  reviewed_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_type ON applications(type);

-- Certificates
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  recipient_name VARCHAR(255) NOT NULL,
  recipient_email VARCHAR(255),
  certificate_url TEXT,
  issued_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_certificates_event ON certificates(event_id);

-- Resources (Event brochures, reports, etc.)
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  file_url TEXT NOT NULL,
  resource_type VARCHAR(50) CHECK (resource_type IN ('pdf', 'link', 'video', 'brochure', 'report')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_resources_event ON resources(event_id);

-- Archive Records
CREATE TABLE archive_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  record_type VARCHAR(100) NOT NULL,
  event_date DATE,
  contributors TEXT[],
  supporting_documents JSONB DEFAULT '[]',
  media_references JSONB DEFAULT '[]',
  verification_status VARCHAR(50) DEFAULT 'pending' CHECK (verification_status IN (
    'pending', 'verified', 'archived'
  )),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_archive_type ON archive_records(record_type);
CREATE INDEX idx_archive_status ON archive_records(verification_status);

-- Contact Messages
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recruitment Drives
CREATE TABLE recruitment_drives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  positions TEXT[] DEFAULT '{}',
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Live Announcements
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  content TEXT,
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  is_live BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_announcements_live ON announcements(is_live) WHERE is_live = true;
