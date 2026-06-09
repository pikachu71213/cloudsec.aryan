# 🛡️ Aryan – AWS Cloud & Security Engineer Portfolio

A modern, premium, multi-page responsive portfolio website with cyberpunk/cybersecurity theme.

---

## 📁 Folder Structure

```
portfolio/
├── index.html              ← Home page (Hero, Certifications, Highlights)
├── about.html              ← About, Skills, Experience Timeline
├── projects.html           ← Project cards with 3D hover
├── certifications.html     ← Certification glass cards
├── contact.html            ← Contact form with EmailJS
├── css/
│   └── style.css           ← Full responsive stylesheet
├── js/
│   ├── main.js             ← Particles, scroll, typing, theme, tilt
│   └── contact.js          ← EmailJS integration + form validation
└── README.md
```

---

## ✨ Features

- ⚡ **Animated particle background** with connected nodes
- 🌗 **Dark/Light mode toggle** with localStorage persistence
- 📜 **Scroll progress bar** at top of page
- 🔤 **Typing effect** on homepage hero
- 🎴 **3D tilt hover cards** using CSS perspective
- 🎭 **Preloader animation** on every page
- 🔁 **Smooth page transitions** (fade in/out)
- 📱 **Fully responsive** – Mobile, Tablet, Desktop
- 🍔 **Hamburger mobile menu**
- 👁️ **Scroll reveal animations**
- 🛰️ **Orbiting hero visual**
- 📧 **EmailJS contact form** with validation + success popup

---

## 📧 EmailJS Setup (Contact Form)

The contact form sends emails to `cloudsec.aryan@gmail.com` via EmailJS.

### Steps:

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/) and create a free account
2. Click **"Add New Service"** → Choose Gmail → Connect your `cloudsec.aryan@gmail.com`
3. Copy the **Service ID** (e.g., `service_xxxxxxx`)
4. Go to **Email Templates** → Create New Template
   - Use these template variables:
     ```
     From: {{from_name}} <{{from_email}}>
     Subject: {{subject}}
     Body: {{message}}
     ```
5. Copy the **Template ID** (e.g., `template_xxxxxxx`)
6. Go to **Account → API Keys** → Copy your **Public Key**

7. Open `js/contact.js` and replace the placeholders:
```js
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY_HERE';   // ← Your Public Key
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID_HERE';   // ← Your Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID_HERE';  // ← Your Template ID
```

---

## 🚀 Deployment

### Option 1: AWS S3 Static Website Hosting
```bash
# Create S3 bucket and enable static website hosting
aws s3 mb s3://aryan-portfolio
aws s3 website s3://aryan-portfolio --index-document index.html
aws s3 sync . s3://aryan-portfolio --acl public-read
```

### Option 2: AWS EC2 with Nginx
```bash
# Upload files to EC2
scp -r portfolio/ ubuntu@your-ec2-ip:/var/www/html/

# Nginx config
sudo nano /etc/nginx/sites-available/portfolio
# Point root to /var/www/html/portfolio

# Enable SSL with Let's Encrypt
sudo certbot --nginx -d yourdomain.com
```

### Option 3: GitHub Pages (Free)
```bash
git init
git add .
git commit -m "Initial portfolio"
gh repo create aryan-portfolio --public
git push -u origin main
# Enable GitHub Pages in repo settings → Pages → main branch
```

### Option 4: Hostinger / Netlify / Vercel
- Simply drag & drop the portfolio folder to Netlify Drop
- Or connect GitHub repo to Vercel for auto-deployments

---

## 🎨 Customization

### Update Personal Info
- Edit name, title, email, LinkedIn in all HTML files
- Replace placeholder links with your actual GitHub/LinkedIn URLs
- Update project descriptions in `projects.html`
- Update experience dates in `about.html`

### Change Colors
Edit CSS variables in `css/style.css`:
```css
:root {
  --accent-cyan: #00f5ff;    /* Main neon color */
  --accent-blue: #0066ff;    /* Secondary accent */
  --accent-green: #00ff88;   /* Success / verified */
  --accent-purple: #7b2fff;  /* Cert skill tags */
}
```

---

## 🛡️ Security Checklist (For Your Hosting)
- [ ] Enable HTTPS (Let's Encrypt)
- [ ] Set security headers (X-Frame-Options, CSP, HSTS)
- [ ] Enable UFW firewall on EC2
- [ ] Configure Fail2Ban
- [ ] Restrict SSH to key-based auth only
- [ ] Enable CloudTrail logging on AWS

---

© 2025 Aryan | cloudsec.aryan@gmail.com
