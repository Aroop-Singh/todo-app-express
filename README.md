# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




###################################################################################################
##########################################--Setup--################################################
  ## run this in folder to have react setup

1. npm create vite@latest
2. Project name: whatever u want 
3. Package name: practice or package or anything
4. Select framework : React
5. Select variant : JavaScript

◇  Select a variant:
│  JavaScript
│
◇  Scaffolding project in /Users/aroop/Cohort 3.0 stuffs/Web dev/learning WebDev/9-React_Basics/9.3-React_offline/Practice...
│
└  Done. Now run:

  cd Practice
  npm install
  npm run dev

######################################################

# run this to get router lib|

npm install react-router-dom

######################################################

# Github setup i guess
1. mkdir - create new folder in cd path 
2. cd - select terminal location 
3. initialize react steps above 

4. Initialize Git

Inside VS Code terminal:

git init
git add .
git commit -m "Initial commit: React portfolio setup"

5. Link local repo to GitHub
git remote add origin https://github.com/YOUR_USERNAME/portfolio-site.git
git branch -M main
git push -u origin main

Now your React app is live on GitHub 🚀
https://github.com/Aroop-Singh/aroopsingh.com

6. Ongoing workflow

When you make changes:

git add .
git commit -m "Meaningful commit message"
git push
