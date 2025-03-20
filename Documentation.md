# Technikaz Documentation

## Project Overview
Technikaz is a modern tech news and product comparison platform built with React, TypeScript, and Supabase. The platform focuses on delivering high-quality content across multiple categories including tech news, gaming updates, entertainment, stocks, and detailed gadget comparisons.

## Tech Stack

### Frontend
- **Framework**: React 18.3 with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form + Zod validation
- **Rich Text Editing**: CKEditor 5
- **Analytics**: Google Analytics
- **Charts**: Recharts

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Real-time**: Supabase Realtime

## Core Features

### 1. Content Management
- Multi-category blog system
- Draft & publish workflow
- SEO metadata management
- Rich text editing with image support
- Featured and popular article management
- View and share tracking

### 2. Product Catalog
- Mobile phones and laptops database
- Detailed specifications
- Expert reviews system
- User ratings and reviews
- Price comparison
- Product image gallery
- Affiliate link management

### 3. Admin Dashboard
- Blog analytics
- Content management
- Product management
- Newsletter subscriber management
- Maintenance mode control
- Activity logging

## Database Schema

### Key Tables

#### 1. blogs
```sql
- id: uuid (PK)
- title: text
- content: text
- category: text
- subcategories: text[]
- author: text
- image_url: text
- slug: text (unique)
- featured: boolean
- featured_in_category: boolean
- popular: boolean
- meta_title: text
- meta_description: text
- meta_keywords: text
- view_count: integer
- share_count: integer
- average_rating: numeric
```

#### 2. mobile_products
```sql
- id: uuid (PK)
- name: text
- brand: text
- price: numeric
- display_specs: text
- processor: text
- ram: text
- storage: text
- battery: text
- camera: text
- os: text
- color: text
- image_url: text
- gallery_images: text[]
```

#### 3. laptops
```sql
- id: uuid (PK)
- name: text
- brand: text
- price: numeric
- display_specs: text
- processor: text
- ram: text
- storage: text
- battery: text
- graphics: text
- os: text
- color: text
- image_url: text
- gallery_images: text[]
```

## Key Components

### Navigation System
- Responsive header with mobile menu
- Category-based navigation
- Search functionality
- Social media links

### Blog Components
- Article cards
- Featured article grid
- Category filters
- Popular/Recent tabs
- Share functionality
- Rating system

### Product Components
- Product comparison tool
- Specification tables
- Image galleries
- Rating and review system
- Price tracking
- Affiliate link integration

## Security Features

### Row Level Security (RLS)
- Public read access for published content
- Authenticated access for admin functions
- Rate limiting for ratings and reviews
- Draft content protection

### Authentication
- Email-based authentication
- Role-based access control
- Session management
- Secure token handling

## Performance Optimizations

### Database
- Proper indexing on frequently queried columns
- Efficient joins and query optimization
- Caching strategies
- Connection pooling

### Frontend
- Image optimization
- Lazy loading
- Code splitting
- Caching strategies
- Performance monitoring

## Deployment

### Requirements
- Node.js 18+
- npm or yarn
- Supabase project
- Environment variables configuration

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GA_TRACKING_ID=your_ga_tracking_id
VITE_AMAZON_PARTNER_TAG=your_amazon_tag
```

### Build Process
```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## API Integration

### Supabase Client
- Custom error handling
- Automatic reconnection
- Type-safe queries
- Real-time subscriptions

### Analytics Integration
- Page view tracking
- Event tracking
- User engagement metrics
- Custom dimensions

## Maintenance Mode

The platform includes a maintenance mode feature that can be toggled by administrators:
- Global maintenance flag
- Customizable maintenance message
- Admin bypass capability
- Graceful user redirection

## Content Guidelines

### Blog Posts
- SEO-optimized titles and descriptions
- Proper categorization
- Image requirements
- Content formatting standards

### Product Listings
- Accurate specifications
- High-quality images
- Price accuracy
- Review guidelines

## Future Roadmap

### Planned Features
1. Real-time price tracking
2. User accounts and preferences
3. Advanced product comparison
4. Newsletter system
5. Mobile app development

### Technical Improvements
1. PWA support
2. Advanced caching
3. Image optimization
4. Performance monitoring
5. API rate limiting

## Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make changes
4. Submit pull request
5. Code review
6. Merge

### Code Style
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Component organization
- File naming conventions

## Support

### Common Issues
- Database connection
- Image upload
- Authentication
- Build process
- Performance optimization

### Troubleshooting
- Error logging
- Debug mode
- Common solutions
- Support channels

## License
All rights reserved. Unauthorized copying or distribution of this project is strictly prohibited.