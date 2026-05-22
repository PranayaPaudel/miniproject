# Project Marketplace - Mini Project

A full-stack marketplace application where users can upload, browse, and purchase software projects. Features role-based access, admin approval system, and GitHub integration.

## 🎯 Features

- **User Roles**: Viewer, Creator, Admin
- **Authentication**: JWT-based login/register
- **Project Uploads**: GitHub repository integration with folder structure display
- **Upvoting System**: Users can upvote projects
- **Admin Approval**: Admin approves creator requests
- **Creator Dashboard**: Manage uploaded projects
- **Admin Dashboard**: Manage users and creator requests
- **Responsive Design**: Clean, modern UI

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite + React Router + Vanilla CSS
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Authentication**: JWT

## 📋 Prerequisites

- Node.js (v16+)
- PostgreSQL (local or remote)
- npm or yarn

## 🚀 Quick Start

### 1. Database Setup

```bash
# Create PostgreSQL database
createdb project_marketplace

# If you need to drop the database first:
dropdb project_marketplace
createdb project_marketplace
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in the `backend` folder:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=project_marketplace
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key_here_change_this
GITHUB_TOKEN=your_github_token_here (optional)
PORT=5000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

Start the backend server:

```bash
npm run dev
```

Server runs on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd client
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## 📚 User Roles

### Viewer (Default)
- Register/Login
- Browse projects
- View project details and folder structure
- Upvote projects
- Request creator access

### Creator (Approved)
- All viewer permissions
- Upload GitHub projects
- Edit/delete own projects
- Manage project pricing and details

### Admin (Predefined)
- Login: `admin` / `admin123`
- Approve/reject creator requests
- View all users and projects
- Manage platform

## 🔑 Demo Credentials

**Admin Login:**
- Username: `admin`
- Password: `admin123`

**Or register a new account:**
- Create account as viewer
- Request creator access (admin must approve)
- Once approved, upload projects

## 📁 Project Structure

```
project-marketplace/
├── backend/
│   ├── controllers/       # Business logic
│   ├── models/           # Database queries
│   ├── routes/           # API endpoints
│   ├── middleware/       # Auth & role middleware
│   ├── config/           # Admin credentials
│   ├── db/              # Database connection & init
│   ├── package.json
│   ├── server.js        # Main server file
│   └── .env             # Environment variables
│
└── client/
    ├── src/
    │   ├── components/   # Reusable components
    │   ├── pages/       # Page components
    │   ├── services/    # API service
    │   ├── styles/      # CSS files
    │   ├── App.jsx      # Main app component
    │   ├── main.jsx     # Entry point
    │   └── index.css    # Global styles
    ├── package.json
    └── index.html
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project details
- `POST /api/projects` - Upload project (creator only)
- `POST /api/projects/:id/upvote` - Upvote project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Creator Requests
- `POST /api/creator/submit-request` - Submit creator request
- `GET /api/creator/my-request` - Get user's request status
- `GET /api/creator/requests/pending` - Get pending requests (admin)
- `POST /api/creator/requests/:id/approve` - Approve request (admin)
- `POST /api/creator/requests/:id/reject` - Reject request (admin)

## 🎨 Key Pages

1. **Home** - Browse all projects
2. **Login/Register** - User authentication
3. **Project Details** - View project info and folder structure
4. **Upload** - Upload GitHub project (creators only)
5. **Creator Dashboard** - Manage projects
6. **Admin Dashboard** - Manage requests and users
7. **Request Creator** - Request creator access

## 💡 Features Explained

### GitHub Integration
- Extracts folder structure from GitHub repositories
- Displays project files in a tree view
- Requires valid GitHub repository URL

### Upvoting System
- Visitors can upvote projects
- Upvotes stored in database
- Real-time update on UI

### Role-Based Access
- Middleware checks user roles
- Admin routes protected
- Creator-only features restricted

### Admin Approval Workflow
1. User requests creator access
2. Admin reviews request in dashboard
3. Admin approves/rejects
4. User notified of status
5. Approved users become creators

## 🔧 Development Notes

- **No Redux**: Uses simple React hooks and localStorage
- **Beginner-friendly**: Clean, readable code
- **CORS**: Backend allows localhost:5173
- **JWT**: Token stored in localStorage
- **Error handling**: Basic try-catch with user feedback

## 📝 Sample Data

Create sample projects:
1. Login as creator
2. Click "Upload Project"
3. Enter GitHub repo URL (example: `github.com/facebook/react`)
4. Fill in details and submit

Admin will approve creator requests in admin dashboard.

## 🐛 Troubleshooting

### Database connection error
- Check PostgreSQL is running
- Verify credentials in `.env`
- Ensure database exists

### CORS error
- Check backend server is running on port 5000
- Verify CORS is enabled in `server.js`

### GitHub API rate limit
- Add GitHub token in `.env` for higher limits
- Get token from GitHub Settings → Developer Settings → Personal Access Tokens

### Frontend doesn't load
- Check Vite dev server is running
- Clear browser cache
- Check console for errors

## 📦 Deployment

For production:

1. Build frontend: `npm run build` in client folder
2. Set proper environment variables
3. Use production PostgreSQL database
4. Add authentication tokens securely
5. Deploy backend and frontend separately

## 📄 License

This project is a mini-project for learning purposes.

## 🤝 Contributing

Feel free to modify and improve this project as a learning exercise!

---

**Happy coding! 🚀**
