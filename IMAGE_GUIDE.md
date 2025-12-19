# 📸 Adding Your Profile Image

## Quick Guide

### Step 1: Prepare Your Image

**Recommended specs:**
- **Format:** JPG or PNG
- **Size:** 500x500px to 1000x1000px (square)
- **File size:** Under 500KB for fast loading
- **Quality:** High resolution, professional photo

**Tips for best results:**
- Use a clean background or transparent background
- Good lighting
- Professional appearance
- Centered composition
- Smile! 😊

### Step 2: Add Your Image

#### Option A: Simple (Rename your image)
```bash
# Navigate to the assets folder
cd /home/spade/Public/Repository/Spade-kun.github.io/assets/

# Rename your image to profile.jpg
# (or profile.png if PNG format)
```

#### Option B: Keep your image name
If your image is already in assets with a different name (e.g., `Picture.png`), update `index.html`:

**Find this line (around line 149):**
```html
<img src="assets/profile.jpg" alt="Noel C. Raterta Jr. - Full Stack Developer" class="profile-image" />
```

**Change to:**
```html
<img src="assets/Picture.png" alt="Noel C. Raterta Jr. - Full Stack Developer" class="profile-image" />
```

### Step 3: Optimize Your Image (Optional)

For best performance, compress your image:

#### Online Tools:
- **TinyPNG:** https://tinypng.com/ (best for PNG)
- **Squoosh:** https://squoosh.app/ (Google's tool)
- **CompressJPEG:** https://compressjpeg.com/

#### Command Line:
```bash
# Install ImageMagick (if not installed)
sudo apt install imagemagick

# Resize and optimize
convert your-image.jpg -resize 800x800^ -gravity center -extent 800x800 -quality 85 assets/profile.jpg
```

### Step 4: Check if image exists

```bash
# List images in assets folder
ls -lh /home/spade/Public/Repository/Spade-kun.github.io/assets/

# If you see Picture.png, use that!
# If not, add your image there
```

### Current Setup

Your HTML currently looks for:
```
assets/profile.jpg
```

**If your image is named differently:**
1. Either rename your image to `profile.jpg`
2. Or update the `src` in `index.html` to match your filename

## 🎨 Image Features

Your profile image has:
- ✅ **Rounded corners** for modern look
- ✅ **Hover effect** - scales slightly on hover
- ✅ **Border decoration** - animated border accent
- ✅ **Responsive** - adjusts size on mobile
- ✅ **Optimized loading** - with lazy loading
- ✅ **Accessibility** - proper alt text

## 📱 How It Looks

### Desktop (2-column layout):
```
┌─────────────────────────────────────┐
│        About Me Section             │
├──────────────┬──────────────────────┤
│              │  Hello! I'm Noel...  │
│   [IMAGE]    │                      │
│              │  I'm a BS IT...      │
│   Your       │                      │
│   Photo      │  Currently working...│
│   Here       │                      │
│              │  [Stats: 27+ repos]  │
└──────────────┴──────────────────────┘
```

### Mobile (stacked):
```
┌─────────────┐
│  About Me   │
├─────────────┤
│             │
│  [IMAGE]    │
│   Smaller   │
│             │
├─────────────┤
│ Hello! I'm  │
│ Noel...     │
│             │
│ I'm a BS IT │
│ student...  │
│             │
│ [Stats]     │
└─────────────┘
```

## 🔧 Troubleshooting

### Image not showing?

**Check 1: File exists**
```bash
ls -la /home/spade/Public/Repository/Spade-kun.github.io/assets/
```

**Check 2: Correct path**
Make sure path in `index.html` matches your file:
- If image is `assets/Picture.png` → use `src="assets/Picture.png"`
- If image is `assets/profile.jpg` → use `src="assets/profile.jpg"`

**Check 3: File permissions**
```bash
chmod 644 /home/spade/Public/Repository/Spade-kun.github.io/assets/profile.jpg
```

### Image is distorted?

Your image might not be square. Use CSS to fix:
- The `object-fit: cover` property is already applied
- This ensures the image fills the space without distortion

### Image is too large (slow loading)?

Compress it:
```bash
# Using ImageMagick
convert assets/profile.jpg -quality 85 assets/profile.jpg

# Or use online tools mentioned above
```

## 🎯 Best Practices

1. **Use square images** (1:1 aspect ratio)
2. **Compress before uploading** (aim for <500KB)
3. **Use descriptive alt text** (already done!)
4. **Test on mobile** after adding
5. **Professional photo** - first impressions matter!

## 🚀 After Adding Image

Test it:
```bash
# Open in browser
cd /home/spade/Public/Repository/Spade-kun.github.io
python3 -m http.server 8000
# Visit: http://localhost:8000
```

Deploy it:
```bash
git add assets/profile.jpg index.html
git commit -m "✨ Add profile image to About section"
git push origin main
```

---

**Need help?** Check if these files exist:
- `index.html` ✅ (updated with image section)
- `css/styles.css` ✅ (has image styling)
- `assets/profile.jpg` ❓ (you need to add this!)

**Your image section is ready! Just add your photo to the assets folder! 🎉**
