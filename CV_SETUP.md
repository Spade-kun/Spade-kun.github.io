# 📄 Adding Your CV/Resume

## Quick Setup

### Step 1: Prepare Your CV

**Save your CV as PDF:**
- Best format: PDF (most compatible)
- Recommended name: `cv.pdf` or `resume.pdf`
- Keep file size under 2MB

### Step 2: Add CV to Project

Copy your CV to the assets folder:

```bash
cd /home/spade/Public/Repository/Spade-kun.github.io/assets/

# Copy your CV here
cp /path/to/your/cv.pdf ./cv.pdf

# Or if you have it named differently
cp /path/to/Noel_Resume.pdf ./cv.pdf
```

### Step 3: Verify

Check that your CV is in place:

```bash
ls -lh /home/spade/Public/Repository/Spade-kun.github.io/assets/cv.pdf
```

## 🎯 Where the Buttons Appear

### 1. **Hero Section** (Top of page)
- Button: "Download CV" alongside "Get In Touch" and "View Projects"
- Very visible to first-time visitors

### 2. **About Section** (After your intro)
- Two buttons:
  - **"Download My CV"** - Downloads the PDF
  - **"View CV"** - Opens CV in new tab to preview

## ✨ Features

✅ **Download button** - Automatic download with custom filename  
✅ **View button** - Opens CV in browser for preview  
✅ **Professional icons** - Bootstrap Icons  
✅ **Responsive design** - Looks great on mobile  
✅ **Hover effects** - Animated interactions  
✅ **Accessibility** - Proper ARIA labels  

## 🎨 Button Styling

The buttons have:
- Primary button (blue gradient) for download
- Outline button for view/preview
- Icons for better UX
- Smooth hover animations
- Mobile-responsive layout

## 🔧 Customization

### If your CV has a different name:

Update in `index.html` (3 places):

**Find:**
```html
href="assets/cv.pdf"
```

**Replace with:**
```html
href="assets/your-filename.pdf"
```

### If you want to change the download filename:

**Find:**
```html
download="Noel_Raterta_CV.pdf"
```

**Replace with:**
```html
download="Your_Name_Resume.pdf"
```

### Remove the view button (keep only download):

In `index.html`, delete this section:
```html
<a href="assets/cv.pdf" class="btn btn-outline" target="_blank">
    <i class="bi bi-eye"></i>
    View CV
</a>
```

## 📱 How It Looks

### Desktop - Hero Section:
```
[ Get In Touch ] [ Download CV ] [ View Projects ]
```

### Desktop - About Section:
```
Your intro text here...

[ Download My CV ] [ View CV ]

[Stats: 27+ Repos | 241 Contributions | Since 2023]
```

### Mobile (Stacked):
```
┌─────────────────┐
│ Get In Touch    │
├─────────────────┤
│ Download CV     │
├─────────────────┤
│ View Projects   │
└─────────────────┘
```

## 🚀 Deploy

After adding your CV:

```bash
cd /home/spade/Public/Repository/Spade-kun.github.io

# Check what changed
git status

# Add CV and updated files
git add assets/cv.pdf index.html css/styles.css

# Commit
git commit -m "📄 Add CV download and view buttons"

# Push to GitHub
git push origin main
```

**Wait 2-3 minutes**, then test at: https://spade-kun.github.io/

## ✅ Testing Checklist

- [ ] CV file exists in `assets/cv.pdf`
- [ ] File size is reasonable (<2MB)
- [ ] PDF opens correctly when clicked
- [ ] Download works (check Downloads folder)
- [ ] Buttons visible on homepage
- [ ] Buttons work on mobile
- [ ] CV displays your latest information

## 🐛 Troubleshooting

### Button shows but CV doesn't download
**Solution:** Make sure `cv.pdf` exists in the assets folder
```bash
ls -la assets/cv.pdf
```

### 404 Error when clicking button
**Solution:** Check the file path in HTML matches your actual filename

### CV is too large (slow loading)
**Solution:** Compress your PDF
- Use: https://www.ilovepdf.com/compress_pdf
- Or: https://smallpdf.com/compress-pdf

### Want to update your CV later
Just replace the file:
```bash
cp /path/to/new-cv.pdf /home/spade/Public/Repository/Spade-kun.github.io/assets/cv.pdf
git add assets/cv.pdf
git commit -m "📄 Update CV"
git push origin main
```

## 💡 Pro Tips

1. **Update regularly** - Keep your CV current with latest projects
2. **Professional filename** - Use descriptive names like "Noel_Raterta_Developer_CV.pdf"
3. **Optimize file size** - Compress to load faster
4. **Test downloads** - Make sure it works before sharing
5. **Track clicks** - Consider adding analytics to see who downloads

## 📊 Expected Results

When visitors click:
- **Download CV**: File saves as "Noel_Raterta_CV.pdf" to their Downloads
- **View CV**: Opens PDF in new browser tab for preview

Both buttons work on all devices and browsers!

---

**Your CV buttons are ready! Just add your PDF to the assets folder! 📄✨**

Current setup expects: `assets/cv.pdf`
