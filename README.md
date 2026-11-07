# ☁️ Cloud Task Manager

A cloud-based task management application that allows users to securely create, manage, and track their personal tasks from anywhere.

🔗 **Live Application:** [Cloud Task Manager](https://markben244.github.io/Cloud-Task-Manager/)

## 📌 About the Project

Cloud Task Manager is a web application developed to demonstrate the use of cloud-based backend services, database management, authentication, security policies, and static website hosting.

Users can register, log in, and manage their tasks. Each user's tasks are stored in a cloud database and protected through Row Level Security (RLS), ensuring that users can only access their own data.

## ✨ Features

- 🔐 User registration and authentication
- ➕ Create new tasks
- ✏️ Edit existing tasks
- 🗑️ Delete tasks
- ✅ Mark tasks as completed or pending
- 🔎 Filter tasks by All, Pending, and Completed
- 📊 Dashboard showing task statistics
- ☁️ Cloud database storage
- 🔒 User-specific data protection using Row Level Security
- 🌍 Public deployment through GitHub Pages

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Application functionality |
| Supabase Auth | User authentication |
| Supabase PostgreSQL | Cloud database |
| Row Level Security | Database access control |
| Git & GitHub | Version control and source code hosting |
| GitHub Pages | Static website hosting |

## 🏗️ Architecture

The application uses a serverless-style architecture with managed backend services.

1. **Frontend:** HTML, CSS, and JavaScript provide the user interface.
2. **Authentication:** Supabase Auth handles user registration and login.
3. **Database:** Supabase PostgreSQL stores user tasks.
4. **Security:** Row Level Security restricts access to each user's records.
5. **Hosting:** GitHub Pages serves the frontend application.

## 📁 Project Structure

```text
cloud-task-manager/
│
├── index.html
├── README.md
├── .gitignore
│
├── css/
│   └── style.css
│
└── js/
    ├── app.js
    └── supabase-config.js
```

## ⚙️ Running the Project Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/MarkBen244/Cloud-Task-Manager.git
   ```

2. Open the project folder:

   ```bash
   cd Cloud-Task-Manager
   ```

3. Configure Supabase in `js/supabase-config.js` using your own Supabase project URL and publishable key.

4. Open `index.html` using a local development server, such as the VS Code Live Server extension.

5. Register an account and start managing tasks.

## 🔒 Security

- Supabase Authentication manages user identity.
- Row Level Security policies protect task records.
- The frontend uses the Supabase publishable key.
- Secret and service-role keys must never be exposed in frontend code or committed to GitHub.

## 🚀 Deployment

The application is deployed using GitHub Pages and connected to a Supabase backend.

**Live URL:** https://markben244.github.io/Cloud-Task-Manager/

## 👨‍💻 Author

**Mark Bernard**

- GitHub: [MarkBen244](https://github.com/MarkBen244)

