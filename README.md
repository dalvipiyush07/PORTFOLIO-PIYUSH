# Piyush Dalvi - Portfolio Website

Premium dark-themed personal portfolio website for DevOps Engineer & Site Reliability Engineer.

## 🚀 Live Demo
Visit: [https://dalvipiyush07.github.io](https://dalvipiyush07.github.io)

## 🛠️ Technologies Used
- HTML5
- CSS3 (Glassmorphism Design)
- JavaScript (Vanilla)
- GitHub Pages (Hosting)

## 📦 Deployment Instructions

### Deploy to GitHub Pages:

1. **Create GitHub Repository**
   - Go to: https://github.com/new
   - Repository name: `dalvipiyush07.github.io`
   - Make it Public
   - Click "Create repository"

2. **Push Code to GitHub**
   ```bash
   # Open Command Prompt/Terminal in portfolio folder
   cd C:\Users\Piyush\OneDrive\Desktop\portfolio
   
   # Initialize Git
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial portfolio deployment"
   
   # Add remote
   git remote add origin https://github.com/dalvipiyush07/dalvipiyush07.github.io.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Click "Pages" in left sidebar
   - Source: Deploy from "main" branch
   - Folder: / (root)
   - Click Save

4. **Wait 2-3 minutes**
   - Your site will be live at: `https://dalvipiyush07.github.io`

## 📧 Contact Form Setup

To enable contact form:
1. Go to: https://formspree.io
2. Sign up (free)
3. Create new form with email: piyushdalvi65@gmail.com
4. Copy Form ID
5. Replace `YOUR_FORM_ID` in index.html line 152:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

## 📁 Project Structure
```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # Styling
├── script.js           # JavaScript functionality
├── img/                # Images folder
│   ├── PD.png         # Profile picture
│   └── [blog images]  # Blog thumbnails
└── README.md          # This file
```

## ✨ Features
- Dark/Light theme toggle
- Responsive design
- Mobile menu
- Project filtering
- Blog section
- Contact form
- Smooth animations
- Glassmorphism UI

## 📝 License
© 2024 Piyush Dalvi. All rights reserved.
