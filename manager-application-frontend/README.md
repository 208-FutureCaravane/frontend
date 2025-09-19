# Manager Application Frontend

A comprehensive management dashboard for restaurant managers to oversee operations, analyze performance, manage staff, and make data-driven decisions.

## 📊 Overview

The Manager Application provides a powerful interface for restaurant managers to:
- Monitor real-time restaurant analytics and KPIs
- Manage employees, schedules, and performance
- Oversee menu items, pricing, and inventory
- Handle reservations and customer management
- Track financial metrics and generate reports
- Receive and manage operational notifications

## 🚀 Features

### Analytics Dashboard
- **Real-time Metrics**: Monitor revenue, orders, customer satisfaction
- **Performance Charts**: Visual data representation with interactive charts
- **Trend Analysis**: Track performance over time with historical data
- **Custom Reports**: Generate detailed reports for various time periods
- **KPI Monitoring**: Key performance indicators at a glance

### Staff Management
- **Employee Directory**: Manage staff information and roles
- **Performance Tracking**: Monitor individual and team performance
- **Schedule Management**: Create and manage work schedules
- **Task Assignment**: Assign and track operational tasks
- **Communication**: Internal messaging and announcement system

### Operations Management
- **Menu Management**: Add, edit, and organize menu items
- **Inventory Control**: Track stock levels and manage suppliers
- **Reservation System**: Handle bookings and table management
- **Order Oversight**: Monitor kitchen and service operations
- **Quality Control**: Track customer feedback and service quality

### Financial Management
- **Revenue Tracking**: Real-time financial performance monitoring
- **Cost Analysis**: Track expenses and profit margins
- **Budget Management**: Set and monitor budgets across departments
- **Financial Reports**: Generate comprehensive financial statements

## 🛠 Tech Stack

- **Framework**: Next.js 14.2.16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives (latest versions)
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Forms**: React Hook Form with validation
- **State Management**: React Context API
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js 18.0 or higher
- pnpm 8.0 or higher
- Modern web browser
- Manager/Admin access credentials

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd manager-application-frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

5. **Login**
   Use manager credentials to access the dashboard

## 📁 Project Structure

```
manager-application-frontend/
├── app/                     # Next.js app directory
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Dashboard home page
│   └── loading.tsx        # Loading component
├── components/             # Reusable React components
│   ├── ui/                # Base UI components
│   ├── analytics-dashboard.tsx # Main analytics dashboard
│   ├── dashboard-layout.tsx    # Layout wrapper
│   ├── employee-management.tsx # Staff management
│   ├── menu-management.tsx     # Menu operations
│   ├── reservation-management.tsx # Booking system
│   ├── stock-management.tsx    # Inventory control
│   ├── notifications-page.tsx # Notification center
│   └── orders-notifications.tsx # Order alerts
├── hooks/                  # Custom React hooks
│   ├── use-mobile.ts      # Mobile detection
│   └── use-toast.ts       # Toast notifications
└── lib/                   # Utility libraries
    └── utils.ts           # Helper functions
```

## 🎮 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with:

```env
# API Endpoints
NEXT_PUBLIC_API_URL=your_api_url_here
NEXT_PUBLIC_ANALYTICS_API=your_analytics_api_url

# Authentication
NEXT_PUBLIC_AUTH_URL=your_auth_service_url

# Analytics and Monitoring
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# Database
DATABASE_URL=your_database_url

# External Services
NEXT_PUBLIC_PAYMENT_SERVICE_URL=your_payment_api
NEXT_PUBLIC_NOTIFICATION_SERVICE=your_notification_service
```

## 📱 Dashboard Features

### Main Dashboard
- **Overview Cards**: Quick stats on revenue, orders, customers
- **Performance Charts**: Revenue trends, order volumes, peak hours
- **Real-time Alerts**: Critical notifications and urgent tasks
- **Quick Actions**: Common management tasks

### Analytics Section
- **Financial Analytics**: Revenue, costs, profit margins
- **Operational Analytics**: Order times, staff efficiency, customer satisfaction
- **Inventory Analytics**: Stock levels, waste tracking, supplier performance
- **Customer Analytics**: Demographics, preferences, loyalty metrics

### Management Tools
- **Staff Scheduling**: Create schedules, manage time-off requests
- **Menu Editor**: Update items, prices, descriptions, images
- **Inventory Manager**: Track stock, set reorder points, manage suppliers
- **Customer Relations**: Handle feedback, loyalty programs, reservations

## 🔍 API Integration

The application integrates with various backend services:

### Core APIs
- `GET /api/analytics/*` - Analytics data endpoints
- `GET/POST/PUT /api/employees/*` - Staff management
- `GET/POST/PUT /api/menu/*` - Menu management
- `GET/POST/PUT /api/inventory/*` - Stock management
- `GET/POST /api/reservations/*` - Booking system

### Real-time Features
- WebSocket connections for live updates
- Server-sent events for notifications
- Real-time dashboard metrics

## 📊 Analytics & Reporting

### Available Reports
- **Daily Reports**: Sales, orders, staff performance
- **Weekly Summaries**: Trends, comparisons, highlights
- **Monthly Analysis**: Comprehensive business metrics
- **Custom Reports**: Configurable date ranges and metrics

### Key Metrics
- Revenue and profit margins
- Order volumes and average order value
- Customer satisfaction scores
- Staff efficiency ratings
- Inventory turnover rates

## 🔐 Security & Access Control

- **Role-based Access**: Different permissions for managers, supervisors
- **Secure Authentication**: Token-based authentication system
- **Data Protection**: Encrypted sensitive information
- **Audit Logs**: Track all management actions

## 📱 Mobile Responsiveness

The dashboard is fully responsive and optimized for:
- Desktop computers (primary interface)
- Tablets (mobile management)
- Smartphones (emergency access)

## 🎨 Theming & Customization

### Theme Support
- Light and dark mode toggle
- Custom color schemes
- Brand customization options

### Customizable Dashboards
- Drag-and-drop widget arrangement
- Configurable chart types
- Custom KPI selections

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
vercel --prod
```

### Docker Deployment
```bash
# Build and run with Docker
docker build -t manager-app .
docker run -p 3000:3000 manager-app
```

### Manual Deployment
```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 🧪 Testing

Run the test suite:
```bash
# Unit tests
pnpm test

# Integration tests
pnpm test:integration

# E2E tests
pnpm test:e2e
```

## 📈 Performance Optimization

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js automatic image optimization
- **Caching**: Strategic caching for dashboard data
- **Lazy Loading**: Components loaded on demand

## 🔧 Maintenance

### Regular Tasks
- Monitor dashboard performance
- Update analytics configurations
- Review user feedback
- Update staff permissions

### Data Management
- Regular database backups
- Analytics data archiving
- Performance monitoring
- Security audits

## 🆘 Troubleshooting

### Common Issues
1. **Slow Dashboard Loading**: Check API response times
2. **Chart Display Issues**: Verify data format and chart config
3. **Authentication Problems**: Check token validity and permissions
4. **Real-time Updates**: Verify WebSocket connections

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 🆘 Support

For support and questions:
- Check the user manual
- Contact IT support
- Review system documentation
- Submit support tickets through the internal portal

---

Built for efficient restaurant management 📈