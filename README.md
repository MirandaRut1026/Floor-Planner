# Floor Planner — How to put this on your iPad

This is a complete walkthrough from "I just downloaded a folder" to "the app is on my home screen." No coding knowledge required.

You'll need a computer (laptop or desktop) for the setup. Once it's deployed, you'll only ever need your iPad.

---

## What you have

A folder called `floorplanner-app` with all the code for your floor planner. To get it onto your iPad as a real app, you need to:

1. Sign up for two free services (GitHub and Vercel)
2. Upload this folder to GitHub
3. Connect Vercel to GitHub — it builds and hosts the app for you
4. Open the URL on your iPad and tap "Add to Home Screen"

Total time: about 15–20 minutes. All free.

---

## Step 1 — Make a GitHub account (if you don't have one)

GitHub is where the code will live. Free.

1. Go to **github.com**
2. Click "Sign up" → use your email, pick a username, make a password
3. Verify your email when they send the link

---

## Step 2 — Upload this folder to GitHub

1. Once logged in, look in the top-right corner. Click the **`+`** icon → **"New repository"**
2. Name it something like `floorplanner` (lowercase, no spaces)
3. Leave it as **Public** (Vercel's free tier requires this for some accounts)
4. **Don't** check any of the "Add a README" boxes — leave it empty
5. Click the green **"Create repository"** button

You'll land on a page with a bunch of code instructions. Ignore those — scroll up and look for a link that says **"uploading an existing file"** (it's a small blue link near the top of the page).

6. Click that link. You'll see a big drop zone that says "Drag files here..."
7. Open the `floorplanner-app` folder on your computer
8. Select **all the contents** of the folder (everything inside it — the `src` folder, `public` folder, `package.json`, `index.html`, `vite.config.js`, etc.) and drag them into the drop zone
   - On Mac: `Cmd+A` inside the folder, then drag
   - On Windows: `Ctrl+A` inside the folder, then drag
   - **Important:** drag the *contents*, not the folder itself
9. Wait for all files to upload (a green checkmark appears next to each)
10. Scroll down. There's a "Commit changes" section. Click the green **"Commit changes"** button.

Your code is now on GitHub. ✓

---

## Step 3 — Sign up for Vercel

Vercel will turn your code into a live website automatically.

1. Go to **vercel.com**
2. Click **"Sign Up"**
3. Pick **"Continue with GitHub"** — this links the two accounts so they can talk to each other
4. Authorize Vercel when GitHub asks
5. They'll ask a couple of setup questions ("What's your name", pick the Hobby/Free plan) — answer them
6. You'll land on a Vercel dashboard

---

## Step 4 — Deploy your app

1. On the Vercel dashboard, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories. Find `floorplanner` and click **"Import"**
3. Vercel will auto-detect that it's a Vite project — you should see "Framework Preset: Vite" already filled in
4. **Don't change any settings.** Just click the big **"Deploy"** button.
5. Wait. It takes about 1–2 minutes. You'll see logs scrolling. When it's done you'll see confetti and a preview screenshot.
6. Click **"Continue to Dashboard"** or the screenshot. Your app has a URL like `floorplanner-abc123.vercel.app`.
7. **Copy that URL.** That's your app.

---

## Step 5 — Install on your iPad

1. On your iPad, open **Safari** (must be Safari — Chrome on iOS doesn't support installing PWAs)
2. Paste the Vercel URL into the address bar and load it
3. The floor planner opens — looks like a normal website
4. Tap the **Share button** (square with an arrow pointing up, in the toolbar)
5. Scroll down in the share sheet → tap **"Add to Home Screen"**
6. Confirm the name and tap **"Add"**

That's it. There's now a Floor Planner icon on your home screen. Tap it and the app opens fullscreen with no browser bars — feels like a real app. Works offline. Plans you save stay on your iPad.

---

## Updating the app later

If you (or I) change the code:

1. On GitHub, navigate into your repo and replace files with updated versions (or use the "Add file → Upload files" button again)
2. Commit the changes
3. Vercel automatically detects the update and redeploys within a minute
4. Next time you open the app on your iPad, it'll pull the new version automatically

You don't need to reinstall it from your home screen. Just open it.

---

## Things to know

- **Plans are stored on the device.** Plans you save on your iPad stay on your iPad. They won't sync to your phone or laptop. (If that becomes important later, we can add cloud sync.)
- **Background plan images are big.** If you upload a high-res floor plan photo to a saved plan, the browser may run out of room (limit is around 5 MB per origin in Safari). The app already handles this — it'll save without the image and show a toast saying so.
- **Offline works after the first load.** The first time you open the app on your iPad with internet, it caches itself. After that you can open it on a plane, in a basement, anywhere.
- **Cost is zero** for any normal personal use. Vercel's free tier is generous and you'd never come close to hitting limits with a personal floor planner.

---

## Troubleshooting

**"The build failed on Vercel"** — Check that you uploaded the *contents* of the folder, not the folder itself. The `package.json` file should be at the top level of your GitHub repo, not nested inside another folder.

**"Add to Home Screen is missing"** — Make sure you're using Safari, not Chrome. Chrome on iOS can't install PWAs.

**"It looks weird on my iPad"** — Force-quit the app and reopen. iOS sometimes caches an old version of the loading screen.

**Anything else** — paste me the error message and I'll help.
