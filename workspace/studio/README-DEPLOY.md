# How to Deploy Your App to Firebase (Termux Guide)

Follow these steps exactly to get your permanent URL for your app. This guide is tailored for your **health-plants-** repository.

### **Part 1: Upload Your Code to GitHub**

This part happens in the **Firebase Studio Terminal** (in your web browser).

1.  **Clean up old attempts (optional, but good practice):**
    ```bash
    rm -rf .git
    ```

2.  **Tell Git who you are:**
    ```bash
    git config --global user.name "Bilal Gull"
    git config --global user.email "bilalgull192211@gmail.com"
    ```

3.  **Initialize a new repository:**
    ```bash
    git init --initial-branch=main
    ```

4.  **Add all your project files:**
    ```bash
    git add .
    ```

5.  **Save the files (commit):**
    ```bash
    git commit -m "Final version for deployment"
    ```

6.  **Link to your new GitHub repository:**
    ```bash
    git remote add origin https://github.com/bilalgull192211/health-plants-.git
    ```

7.  **Upload to GitHub:**
    ```bash
    git push -u origin main
    ```
    (If this fails with an authentication error, you may need to use `git push --force -u origin main`)

### **Part 2: Deploy Your App from Termux**

Now, switch to the **Termux app** on your phone.

1.  **Go to your home folder and delete old project folders to prevent errors:**
    ```bash
    cd ~
    rm -rf health-plants-
    rm -rf Kashmiri-plants
    ```

2.  **Download the fresh, correct code from GitHub:**
    ```bash
    git clone https://github.com/bilalgull192211/health-plants-.git
    ```

3.  **Go inside the new project folder (VERY IMPORTANT):**
    ```bash
    cd health-plants-
    ```

4.  **Install tools (if you haven't already):**
    ```bash
    pkg install nodejs-lts
    npm install -g firebase-tools
    ```

5.  **Install the app's dependencies:**
    ```bash
    npm install
    ```

6.  **Log in to Firebase (The Correct Way for Termux):**
    ```bash
    firebase login --no-localhost
    ```
    *   Termux will give you a very long URL. **Copy this entire URL.**
    *   Open your phone's web browser (like Chrome).
    *   **Paste the URL** into the address bar and go.
    *   Sign in to your Google account.
    *   After you sign in, Google will show you a **verification code**. **Copy this code.**
    *   Go back to Termux and **paste the code** into the terminal. Press Enter.

7.  **Deploy your app:**
    ```bash
    firebase deploy
    ```

After the `deploy` command finishes, it will show you your new permanent **Hosting URL**. It will look something like `https://verdantvision-c0qig.web.app`. That's the URL you will use for Bubblewrap!
