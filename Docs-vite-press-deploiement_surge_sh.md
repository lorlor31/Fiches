# NOTES SUR VITEPRESS

## Commandes  
- Builder
npm run docs:build
- Prévisualiser
npm run docs:preview          
- Déployer
npx surge .vitepress/dist
- Domain : https://lorlor-fiches.surge.sh/
- Au cas où les commandes disent qu'il y a pas VitePress, l'installer :
npm install vitepress --save-dev

## Trucs sur la structure de VitePress
- Pour customiser la nav bar : 
dans .vitepress/config.mts
- Pour rajouter du css custom :
créer un dossier theme et dedans :

1. un fichier index.mts : 
```
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default DefaultTheme
```
2. un fichier custom.css (ou autre nom, c'est pas une convention)
3. Sinon on peut aussi surcharger les variables CSS :

```
/* .vitepress/theme/custom.css */
/* https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/vars.css */
:root {
    --vp-c-brand-1: rgb(179, 0, 255); 
    --vp-c-brand-2: #2ffe01;
  }
```

