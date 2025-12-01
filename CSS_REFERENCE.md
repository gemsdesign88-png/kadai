# KadaiPOS CSS Classes - Quick Reference

## 🎨 Background Classes

### `.blob-background`
Creates a container for floating organic blobs
```tsx
<div className="blob-background -z-10">
  <div className="blob" style={{...}} />
</div>
```

### `.mesh-gradient`
Soft radial gradients with warm colors
```tsx
<section className="mesh-gradient">
```

### `.organic-grid`
Dotted pattern background
```tsx
<div className="organic-grid absolute inset-0" />
```

### `.dot-pattern`
Similar to organic-grid but different opacity
```tsx
<div className="dot-pattern -z-10" />
```

---

## 🎴 Card Classes

### `.card-3d`
Signature 3D card with hover effects and gradient border
```tsx
<div className="card-3d bg-white p-8">
  {/* content */}
</div>
```

**Features:**
- Rounded corners (20px)
- Lift animation on hover
- Gradient border appears on hover
- Shadow transformation

---

## 🎭 Button Classes

### `.btn-playful`
Button with ripple effect
```tsx
<Button className="btn-playful bg-coral">
```

**Features:**
- Ripple animation on hover
- Scale effect on click
- Smooth transitions

---

## 🏷️ Badge/Sticker Classes

### `.sticker`
Bold borders with offset shadows
```tsx
<div className="sticker px-5 py-2.5 rounded-xl">
  {/* content */}
</div>
```

**Features:**
- 3px solid border
- Offset double shadow
- Hover: shadow increases, element moves
- Perfect for badges, tags, pills

---

## ✨ Animation Classes

### `.float-element`
Gentle floating animation (6s loop)
```tsx
<div className="float-element">
```

### `.bounce-hover`
Scale and rotate on hover with wiggle
```tsx
<div className="bounce-hover">
```

---

## 📝 Typography Classes

### `.text-playful`
Gradient text with coral colors
```tsx
<h1 className="text-playful">
```

**Result:** Coral to coral-vibrant to peach gradient

### `.text-outline`
Outlined text with transparent fill
```tsx
<span className="text-outline" style={{
  WebkitTextStroke: '2px var(--color-coral)',
  WebkitTextFillColor: 'transparent'
}}>
```

### `.wave-underline`
Wavy SVG underline
```tsx
<span className="wave-underline">
  Important Text
</span>
```

---

## 🎨 CSS Variables

### Colors
```css
var(--color-coral)          /* #FF5A5F */
var(--color-coral-hover)    /* #E8484D */
var(--color-coral-light)    /* #FFE8E9 */
var(--color-peach)          /* #FFB4A2 */
var(--color-mint)           /* #B4E7CE */
var(--color-sky)            /* #A8D8EA */
var(--color-lavender)       /* #D4B5F6 */
var(--color-sunshine)       /* #FFD93D */
var(--color-ink)            /* #1A1A2E */
var(--color-slate)          /* #425466 */
var(--color-cream)          /* #FFFEF9 */
```

### Shadows
```css
var(--shadow-float)   /* 8px/16px with coral tint */
var(--shadow-lift)    /* 12px/24px with coral tint */
var(--shadow-hover)   /* 20px/40px with coral tint */
var(--shadow-soft)    /* 4px/12px subtle */
```

### Border Radius
```css
var(--radius-bubble)  /* 24px */
var(--radius-card)    /* 20px */
var(--radius-button)  /* 16px */
var(--radius-pill)    /* 9999px */
```

---

## 🎯 Common Patterns

### Hero Badge
```tsx
<motion.div className="sticker px-5 py-2.5 text-sm font-bold rounded-xl float-element">
  <Sparkles className="h-4 w-4 text-coral" />
  <span className="text-ink">Badge Text</span>
</motion.div>
```

### Feature Card
```tsx
<div className="card-3d bg-white p-8">
  <div 
    className="inline-flex items-center justify-center w-16 h-16 rounded-[20px] bounce-hover"
    style={{
      backgroundColor: '#FFB4A2',
      border: '3px solid #FF5A5F',
      boxShadow: '4px 4px 0 #FF5A5F'
    }}
  >
    <Icon className="h-8 w-8 text-coral" />
  </div>
  <h3 className="text-2xl font-black mb-4">
    <span className="wave-underline">Title</span>
  </h3>
  <p>Description</p>
</div>
```

### Playful Button
```tsx
<Button className="btn-playful bg-coral hover:bg-coral-hover rounded-button shadow-float hover:shadow-lift font-bold">
  <Icon className="mr-2" />
  Button Text
  <ArrowRight className="ml-2" />
</Button>
```

### Trust Badge Pill
```tsx
<motion.div 
  whileHover={{ scale: 1.1, rotate: 5 }}
  className="flex items-center gap-2 bg-white px-5 py-3 rounded-pill shadow-soft border-2 border-coral-light"
>
  <Star className="h-5 w-5 text-sunshine fill-sunshine" />
  <span className="font-bold text-ink">Badge Text</span>
</motion.div>
```

### Floating Blob
```tsx
<motion.div
  animate={{ 
    y: [0, -20, 0],
    rotate: [0, 5, 0]
  }}
  transition={{ 
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  className="absolute -top-8 -right-8 w-24 h-24 bg-sunshine rounded-bubble opacity-80"
/>
```

---

## 🎨 Tailwind Utility Combinations

### Sticker Border with Shadow
```tsx
className="border-3 border-coral shadow-[4px_4px_0_#FF5A5F]"
```

### Rounded with Specific Radius
```tsx
className="rounded-[16px]"  // buttons
className="rounded-[20px]"  // cards
className="rounded-[24px]"  // bubbles
className="rounded-[9999px]" // pills
```

### Hover Transform
```tsx
className="hover:translate-x-[-2px] hover:translate-y-[-2px]"
```

### Border Thickness
```tsx
className="border-3"  // 3px solid
className="border-4"  // 4px solid
```

---

## 🎬 Framer Motion Patterns

### Spring Bounce Entry
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
  animate={{ opacity: 1, scale: 1, rotate: 0 }}
  transition={{ 
    type: "spring" as const,
    bounce: 0.5,
    duration: 0.6
  }}
>
```

### Hover Scale & Rotate
```tsx
<motion.div
  whileHover={{ 
    y: -12, 
    rotate: 2,
    transition: { type: "spring", bounce: 0.6 }
  }}
>
```

### Infinite Floating
```tsx
<motion.div
  animate={{ 
    y: [0, -20, 0],
    rotate: [0, 5, 0]
  }}
  transition={{ 
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }}
>
```

---

## 📱 Responsive Patterns

### Blob Sizes
```tsx
// Desktop
width: '500px', height: '500px'

// Mobile (use smaller)
width: '250px', height: '250px'
```

### Typography Scale
```tsx
className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
```

### Grid Layouts
```tsx
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
```

---

## 🎨 Color Combinations

### Primary CTA
```css
bg: #FF5A5F (coral)
hover: #E8484D (coral-hover)
shadow: rgba(255, 90, 95, 0.3)
```

### Secondary Elements
```css
bg: white
border: #1A1A2E (ink)
shadow: 4px 4px 0 #FF5A5F
```

### Icon Containers
```tsx
peach bg + coral border
mint bg + teal border
sky bg + blue border
lavender bg + purple border
sunshine bg + yellow border
```

---

## ⚡ Performance Tips

1. **Limit animated blobs** - Max 3 per section
2. **Use CSS variables** - Easier to maintain consistency
3. **Combine transforms** - Single transform property
4. **Reduce motion on mobile** - Consider `prefers-reduced-motion`

---

**Quick reference for building with KadaiPOS design system!** 🎨
