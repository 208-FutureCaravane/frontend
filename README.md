# Restaurant Management System - Frontend Applications

A comprehensive restaurant management system built with Next.js, featuring
multiple specialized frontend applications for different user roles and use
cases. This system provides a complete solution for managing restaurant
operations from kitchen to customer service.

## 🏗️ Architecture Overview

This repository contains five specialized frontend applications:

```
📁 frontend/
├── 👨‍🍳 chef-application-frontend/          # Kitchen staff interface
├── 👔 manager-application-frontend/        # Restaurant management dashboard
├── 🌐 online-client-application-frontend/  # Online ordering platform
├── 🏪 onsite-client-application-frontend/  # In-restaurant ordering kiosks
└── 👨‍💼 waiter-application-frontend/        # Waiter/service staff interface
```

## 🎯 Applications

### 👨‍🍳 Chef Application Frontend

**Port: 3001** | [Documentation](./chef-application-frontend/README.md)

Kitchen management interface designed for chefs and kitchen staff.

**Key Features:**

- Real-time order management and tracking
- Voice control for hands-free operation
- Stock management and inventory alerts
- Order timeline and progress tracking
- Kitchen performance analytics

### 👔 Manager Application Frontend

**Port: 3002** | [Documentation](./manager-application-frontend/README.md)

Comprehensive management dashboard for restaurant owners and managers.

**Key Features:**

- Employee management and scheduling
- Menu management and pricing
- Analytics and reporting
- Reservation management
- Multi-location support

### 🌐 Online Client Application Frontend

**Port: 3003** | [Documentation](./online-client-application-frontend/README.md)

Customer-facing online ordering platform for delivery and pickup orders.

**Key Features:**

- Menu browsing and ordering
- User accounts and order history
- Payment integration
- Real-time order tracking
- Loyalty programs

### 🏪 Onsite Client Application Frontend

**Port: 3004** | [Documentation](./onsite-client-application-frontend/README.md)

Self-service kiosk interface for in-restaurant ordering.

**Key Features:**

- Touch-friendly interface
- Quick ordering workflow
- Multiple payment options
- Accessibility features
- Multi-language support

### 👨‍💼 Waiter Application Frontend

**Port: 3005** | [Documentation](./waiter-application-frontend/README.md)

Mobile-optimized interface for waiters and service staff.

**Key Features:**

- Table management
- Order taking and modification
- Customer requests handling
- Payment processing
- Staff communication

## 🛠 Tech Stack

All applications share a common technology foundation:

- **Framework**: Next.js 14.2.16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4.1.9
- **UI Components**: Radix UI with shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts
- **Package Manager**: pnpm
- **Deployment**: Docker containerization

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- pnpm 8.0 or higher
- Docker (optional, for containerized deployment)

### Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies for all applications**

   ```bash
   # Install dependencies for all apps
   for dir in */; do
     if [ -f "$dir/package.json" ]; then
       echo "Installing dependencies for $dir..."
       (cd "$dir" && pnpm install)
     fi
   done
   ```

3. **Start all applications in development mode**

   ```bash
   # Start all applications concurrently
   pnpm run dev:all
   ```

   Or start individual applications:

   ```bash
   # Chef application (port 3001)
   cd chef-application-frontend && pnpm dev --port 3001

   # Manager application (port 3002)
   cd manager-application-frontend && pnpm dev --port 3002

   # Online client application (port 3003)
   cd online-client-application-frontend && pnpm dev --port 3003

   # Onsite client application (port 3004)
   cd onsite-client-application-frontend && pnpm dev --port 3004

   # Waiter application (port 3005)
   cd waiter-application-frontend && pnpm dev --port 3005
   ```

### Production Deployment

Each application includes a production-ready Dockerfile for containerized
deployment.

1. **Build individual application**

   ```bash
   cd chef-application-frontend
   docker build -t restaurant-chef-app .
   docker run -p 3001:3000 restaurant-chef-app
   ```

2. **Use Docker Compose (recommended)**
   ```bash
   # Create docker-compose.yml in root directory
   docker-compose up -d
   ```

## 📋 Available Scripts

Each application supports these npm/pnpm scripts:

- `dev` - Start development server
- `build` - Create production build
- `start` - Start production server
- `lint` - Run ESLint

## 🔧 Configuration

### Environment Variables

Each application may require specific environment variables. Create `.env.local`
files in each application directory:

```env
# Common variables for all applications
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_VERSION=0.1.0
NEXT_PUBLIC_ENVIRONMENT=development

# Application-specific variables
NEXT_PUBLIC_APP_NAME=chef-application
NEXT_PUBLIC_DEFAULT_LANGUAGE=en
```

### Port Configuration

Default port assignments:

- Chef Application: `3001`
- Manager Application: `3002`
- Online Client: `3003`
- Onsite Client: `3004`
- Waiter Application: `3005`

## 🐳 Docker Configuration

Each application includes:

- **Dockerfile**: Multi-stage build for optimized production images
- **.dockerignore**: Optimized for faster builds
- **Standalone output**: Next.js standalone mode for minimal container size

### Docker Build Features

- Multi-stage build for smaller production images
- Non-root user for security
- Health checks for container monitoring
- Optimized layer caching
- pnpm for faster dependency resolution

## 📊 Monitoring and Analytics

All applications include:

- **Vercel Analytics**: Built-in performance monitoring
- **Error Tracking**: Development and production error handling
- **Performance Metrics**: Core web vitals tracking
- **Health Checks**: Docker health check endpoints

## 🧪 Testing

Each application includes testing setup:

```bash
# Run tests for all applications
for dir in */; do
  if [ -f "$dir/package.json" ]; then
    echo "Testing $dir..."
    (cd "$dir" && pnpm test)
  fi
done
```

## 🔐 Security Features

- **CSP Headers**: Content Security Policy implementation
- **Input Validation**: Zod schema validation for all forms
- **XSS Protection**: Built-in Next.js security features
- **Non-root Docker**: Containers run as non-root user
- **Environment Isolation**: Separate configuration per environment

## 📱 Browser Support

- Chrome 80+
- Firefox 76+
- Safari 13+
- Edge 80+

**Note**: Some features (voice control, advanced PWA features) may require
modern browser APIs.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make changes in the appropriate application directory
4. Ensure all applications build successfully
5. Submit a pull request

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Implement proper error handling
- Add appropriate testing
- Update documentation as needed

## 📞 Support

For technical support or questions:

- Create an issue in the repository
- Contact the development team
- Check individual application README files for specific guidance

## 📄 License

This project is proprietary software. All rights reserved.

---

**Built with ❤️ for the restaurant industry**
