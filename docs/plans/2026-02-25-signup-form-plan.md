# Signup Form Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the CTA section with a signup form and move app store badges to the footer.

**Architecture:** Single-file changes to `index.astro` — replace CTA HTML, add form styles, add form JS. No new files or dependencies needed.

**Tech Stack:** Astro, vanilla CSS, vanilla JS

---

### Task 1: Remove app store badges from the hero section

**Files:**
- Modify: `src/pages/index.astro:20-44`

**Step 1: Remove the hero-badges div**

Delete lines 20-44 (the entire `<div class="hero-badges">` block inside the hero section). Keep the hero-title and hero-sub elements. The hero-content div should end after the `<p class="hero-sub">` tag.

Before:
```html
<p class="hero-sub">Manage your grounds. Log your trophies. Tell the story.</p>
<div class="hero-badges">
  ...all badge SVGs...
</div>
```

After:
```html
<p class="hero-sub">Manage your grounds. Log your trophies. Tell the story.</p>
```

**Step 2: Remove hero-sub bottom margin**

In the CSS, the `.hero-sub` has `margin-bottom: 44px` (that was spacing to the badges). Change it to `margin-bottom: 0` since there's nothing below it now.

**Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "Remove app store badges from hero section"
```

---

### Task 2: Replace CTA section with signup form

**Files:**
- Modify: `src/pages/index.astro:223-255`

**Step 1: Replace the CTA section HTML**

Replace the entire `<!-- CTA -->` section (lines 223-255) with this signup form:

```html
<!-- Signup -->
<section class="cta" id="signup">
  <div class="cta-glow"></div>
  <div class="section-inner section-narrow reveal">
    <h2 class="cta-title"><span class="gradient-text">Be the first to know.</span></h2>
    <p class="cta-body">Sign up for updates and get early access when TrophyLog launches.</p>

    <form class="signup-form" id="signup-form" novalidate>
      <div class="form-field">
        <input type="text" name="name" placeholder="Your name" autocomplete="name" required />
        <span class="field-error"></span>
      </div>
      <div class="form-field">
        <input type="email" name="email" placeholder="your@email.com" autocomplete="email" required />
        <span class="field-error"></span>
      </div>
      <label class="form-checkbox">
        <input type="checkbox" name="betaTester" />
        <span class="checkbox-mark"></span>
        <span class="checkbox-label">I'd like to help beta test TrophyLog</span>
      </label>
      <button type="submit" class="form-submit">Sign up</button>
      <p class="form-error" id="form-error"></p>
    </form>

    <div class="signup-success" id="signup-success" hidden>
      <h3 class="success-title"><span class="gradient-text">You're on the list!</span></h3>
      <p class="success-body">We'll be in touch soon.</p>
    </div>
  </div>
</section>
```

**Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "Replace CTA section with signup form HTML"
```

---

### Task 3: Add signup form styles

**Files:**
- Modify: `src/pages/index.astro` (CSS section, after the existing CTA styles around line 882)

**Step 1: Add form CSS**

Add the following styles after the existing `.cta-body` rule (keep the existing `.cta`, `.cta-glow`, `.cta-title`, `.cta-body` styles since the section still uses them):

```css
/* Signup Form */
.signup-form {
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-field input {
  width: 100%;
  padding: 14px 18px;
  background: var(--surface);
  border: 1px solid var(--surface-highlight);
  border-radius: 10px;
  color: var(--text);
  font-family: var(--font-body);
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-field input::placeholder {
  color: var(--text-tertiary);
}

.form-field input:focus {
  border-color: var(--gold);
  box-shadow: 0 0 0 3px var(--gold-muted);
}

.form-field input.invalid {
  border-color: #B45A5A;
}

.field-error {
  font-size: 13px;
  color: #D4806A;
  margin-top: 6px;
  min-height: 0;
}

.form-checkbox {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px 0;
  user-select: none;
}

.form-checkbox input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox-mark {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  border-radius: 6px;
  border: 1px solid var(--surface-highlight);
  background: var(--surface);
  transition: background 0.2s ease, border-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-mark::after {
  content: '';
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: var(--gold);
  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.form-checkbox input:checked + .checkbox-mark {
  border-color: var(--gold);
}

.form-checkbox input:checked + .checkbox-mark::after {
  opacity: 1;
  transform: scale(1);
}

.checkbox-label {
  font-size: 15px;
  color: var(--text-secondary);
}

.form-submit {
  width: 100%;
  padding: 16px;
  margin-top: 8px;
  background: var(--gold);
  color: var(--bg);
  border: none;
  border-radius: 10px;
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.form-submit:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.form-submit:active {
  transform: translateY(0);
}

.form-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.form-error {
  font-size: 14px;
  color: #D4806A;
  text-align: center;
  min-height: 0;
}

.signup-success {
  text-align: center;
}

.success-title {
  font-family: var(--font-display);
  font-size: clamp(34px, 5.5vw, 52px);
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.success-body {
  font-size: 18px;
  color: var(--text-secondary);
}
```

**Step 2: Remove the `.hero-badges` and `.store-badge` styles from the main CSS**

Remove these rules since badges are no longer in the hero/CTA sections (they'll get new footer-specific styles):
- `.hero-badges` (lines ~408-413)
- `.store-badge` (lines ~415-417)
- `.store-badge svg` (lines ~419-422)
- `.store-badge:hover` (lines ~424-427)

Keep the `.store-badge svg` height override in the mobile breakpoint — actually, remove all store-badge responsive rules too since we'll restyle them in the footer.

**Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "Add signup form styles"
```

---

### Task 4: Add signup form JavaScript

**Files:**
- Modify: `src/pages/index.astro` (script section at bottom, after existing IntersectionObserver code)

**Step 1: Add form submission JS**

Add the following after the existing `<script>` block's IntersectionObserver code (inside the same script tag):

```javascript
// Signup form
const SIGNUP_ENDPOINT = '/api/signup'; // Change this to your backend URL

const form = document.getElementById('signup-form');
const formError = document.getElementById('form-error');
const successEl = document.getElementById('signup-success');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formError.textContent = '';

  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const betaTesterInput = form.querySelector('input[name="betaTester"]');

  // Clear previous errors
  form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
  form.querySelectorAll('.field-error').forEach(el => el.textContent = '');

  let valid = true;

  if (!nameInput.value.trim()) {
    nameInput.classList.add('invalid');
    nameInput.nextElementSibling.textContent = 'Please enter your name';
    valid = false;
  }

  if (!emailInput.value.trim()) {
    emailInput.classList.add('invalid');
    emailInput.nextElementSibling.textContent = 'Please enter your email';
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
    emailInput.classList.add('invalid');
    emailInput.nextElementSibling.textContent = 'Please enter a valid email';
    valid = false;
  }

  if (!valid) return;

  const submitBtn = form.querySelector('.form-submit');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Signing up...';

  try {
    const res = await fetch(SIGNUP_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        betaTester: betaTesterInput.checked,
      }),
    });

    if (!res.ok) throw new Error('Request failed');

    form.style.opacity = '0';
    form.style.transform = 'translateY(-10px)';
    form.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

    setTimeout(() => {
      form.hidden = true;
      successEl.hidden = false;
      successEl.style.opacity = '0';
      successEl.style.transform = 'translateY(10px)';
      requestAnimationFrame(() => {
        successEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        successEl.style.opacity = '1';
        successEl.style.transform = 'translateY(0)';
      });
    }, 400);
  } catch {
    formError.textContent = 'Something went wrong. Please try again.';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Sign up';
  }
});
```

**Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "Add signup form submission logic"
```

---

### Task 5: Move app store badges to the footer

**Files:**
- Modify: `src/pages/index.astro:258-265` (footer HTML)
- Modify: `src/pages/index.astro` (CSS — footer section)

**Step 1: Update footer HTML**

Replace the footer section with:

```html
<footer class="footer">
  <div class="section-inner">
    <div class="footer-inner">
      <span class="footer-brand">TrophyLog</span>
      <span class="footer-copy">&copy; {new Date().getFullYear()}</span>
    </div>
    <div class="footer-badges">
      <span class="footer-badges-label">Coming soon to</span>
      <div class="footer-badges-row">
        <a href="#" class="store-badge" aria-label="Download on the App Store">
          <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="119" height="39" rx="5.5" fill="rgba(17,25,22,0.6)" stroke="rgba(107,123,110,0.4)"/>
            <g transform="translate(9, 11.5) scale(0.93)">
              <path d="M14.94 8.87c-.12-2.2 1.8-3.28 1.88-3.33a4.07 4.07 0 0 0-3.2-1.73c-1.34-.14-2.66.8-3.35.8-.7 0-1.76-.79-2.9-.76a4.28 4.28 0 0 0-3.6 2.2c-1.56 2.7-.4 6.65.1 8.83.73 1.06 1.58 2.24 2.7 2.2 1.1-.05 1.5-.7 2.83-.7 1.32 0 1.69.7 2.83.68 1.17-.02 1.9-1.06 2.6-2.13a9.1 9.1 0 0 0 1.18-2.42s-2.26-.87-2.28-3.44zm-2.15-6.32c.6-.75.9-1.76.86-2.55a3.72 3.72 0 0 0-2.4 1.25 3.48 3.48 0 0 0-.86 2.5c.9.07 1.82-.42 2.4-1.2z" fill="#D8DDD9"/>
            </g>
            <text x="30" y="15" fill="#8B9B8E" font-family="Inter, sans-serif" font-size="7" font-weight="500">Download on the</text>
            <text x="30" y="28" fill="#D8DDD9" font-family="Inter, sans-serif" font-size="14" font-weight="600">App Store</text>
          </svg>
        </a>
        <a href="#" class="store-badge" aria-label="Get it on Google Play">
          <svg viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="134" height="39" rx="5.5" fill="rgba(17,25,22,0.6)" stroke="rgba(107,123,110,0.4)"/>
            <g transform="translate(10, 8) scale(0.96)">
              <path d="M0 1.2C0 0.8 0.2 0.4 0.5 0.2L13.2 12.5 0.5 24.8C0.2 24.6 0 24.2 0 23.8V1.2Z" fill="#34A853"/>
              <path d="M17.3 8.6L3.6 0.7C2.6 0.1 1.4-0.2 0.5 0.2L13.2 12.5 17.3 8.6Z" fill="#4285F4"/>
              <path d="M0.5 24.8L13.2 12.5 17.3 16.4 3.6 24.3C2.6 24.9 1.4 25.2 0.5 24.8Z" fill="#EA4335"/>
              <path d="M21.2 12.5L17.3 8.6 13.2 12.5 17.3 16.4 21.2 12.5C22 11.9 22 13.1 21.2 12.5Z" fill="#FBBC04"/>
            </g>
            <text x="36" y="15" fill="#8B9B8E" font-family="Inter, sans-serif" font-size="7" font-weight="500">GET IT ON</text>
            <text x="36" y="28" fill="#D8DDD9" font-family="Inter, sans-serif" font-size="14" font-weight="600">Google Play</text>
          </svg>
        </a>
      </div>
    </div>
  </div>
</footer>
```

**Step 2: Add footer badge styles**

Add these to the footer CSS section:

```css
.footer-badges {
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid rgba(201, 160, 78, 0.06);
  text-align: center;
}

.footer-badges-label {
  display: block;
  font-size: 13px;
  color: var(--text-tertiary);
  margin-bottom: 16px;
  letter-spacing: 0.04em;
}

.footer-badges-row {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.store-badge {
  transition: transform 0.2s ease, opacity 0.2s ease;
  opacity: 0.5;
}

.store-badge:hover {
  transform: translateY(-1px);
  opacity: 0.7;
}

.store-badge svg {
  height: 36px;
  width: auto;
}
```

**Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "Move app store badges to footer with 'Coming soon' label"
```

---

### Task 6: Verify everything works

**Step 1: Run the dev server**

```bash
npm run dev
```

**Step 2: Verify in browser**

Check at `http://localhost:4321`:
- Hero section: no badges, just title + subtitle + phone
- Signup form: visible in CTA section with name, email, beta checkbox, submit button
- Form validation: try submitting empty, check error messages appear
- Footer: badges appear below copyright with "Coming soon to" label, muted opacity
- Responsive: check at 900px, 640px, 380px breakpoints

**Step 3: Run production build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 4: Commit any fixes needed, then final commit**

```bash
git add src/pages/index.astro
git commit -m "Finalize signup form feature"
```
