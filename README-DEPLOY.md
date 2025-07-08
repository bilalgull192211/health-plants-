# How to Deploy Your App to Firebase (Termux Guide)

Follow these steps exactly to get your permanent URL for your app.

### Step 1: Install Tools in Termux

If you haven't already, install the necessary programs.

```bash
pkg update && pkg upgrade
pkg install git nodejs-lts
npm install -g firebase-tools
```

### Step 2: Get Your Code from GitHub

Go to your home directory, remove any old versions, and download a fresh copy from your new repository.

```bash
cd ~
rm -rf health-plants-
git clone https://github.com/bilalgull192211/health-plants-.git
```

### Step 3: Go Inside Your Project Folder

```bash
cd health-plants-
```

### Step 4: Install App Dependencies

This installs React, Next.js, and other libraries your app needs.

```bash
npm install
```

### Step 5: Set Your Firebase Project ID

This is a very important manual step.

1.  Install the `nano` text editor:
    ```bash
    pkg install nano
    ```
2.  Open the configuration file with `nano`:
    ```bash
    nano .firebaserc
    ```
3.  You will see `"<YOUR_FIREBASE_PROJECT_ID>"`. Use the arrow keys to move the cursor, delete that placeholder text, and type your real Firebase Project ID.
4.  To **Save and Exit**:
    *   Press `Ctrl` + `X`
    *   Press `Y` (for Yes)
    *   Press `Enter`

### Step 6: Log In and Deploy (The Correct Way for Termux)

You are at the final step! The normal `firebase login` command does not work well in Termux. You must use this special command instead.

1.  **Log in to Firebase with the `--no-localhost` flag:**
    ```bash
    firebase login --no-localhost
    ```
    *   Termux will give you a very long URL. **Copy this entire URL.**
    *   Open your phone's web browser (like Chrome).
    *   **Paste the URL** into the address bar and go.
    *   Sign in to your Google account that you use for Firebase.
    *   After you sign in, Google will show you a **verification code**. **Copy this code.**
    *   Go back to Termux and **paste the code** into the terminal. Press Enter.

    You should now see a "Success! Logged in as..." message.

2.  **Deploy your app:**
    Now that you are logged in, run the deploy command.
    ```bash
    firebase deploy
    ```

After the `deploy` command finishes, it will show you your new permanent **Hosting URL**. It will look something like `https://your-project-id.web.app`. That's the URL you need!
