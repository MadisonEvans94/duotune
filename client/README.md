### After you've cloned this ...

#### Remove the existing Git history and initialize a new Git repository

**in terminal**
rm -rf .git
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/your-username/my-new-project.git
git push -u origin main
