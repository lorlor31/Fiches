# Et demain on fait quoi ?

_L'apothéose !_

😯 Après-demain alors, parlons du futur

---

## Passé, présent, avenir

- Avec le socle on a posé des bases, de bonnes bases même !<!-- .element: class="fragment" -->
- Avec la spé on a repoussé ce savoir-faire encore plus loin<!-- .element: class="fragment" -->
- En apothéose on concrétise tout ça en travaillant au sein d'une équipe  <!-- .element: class="fragment" -->  
_Au fait une journée dédiée à ce sujet arrive_<!-- .element: class="fragment" -->
- Puis viennent le TP et surtout la recherche d'emploi  <!-- .element: class="fragment" -->  
_Au fait une journée dediée à ce sujet arrive aussi_  
<!-- .element: class="fragment" -->
- En poste, arriveront les évolutions et toujours plus de découvertes !<!-- .element: class="fragment" -->

_Parlons technos ! 🎉_<!-- .element: class="fragment" -->



## Junior4Life

- Le métier de dev, c'est aussi savoir apprendre<!-- .element: class="fragment" -->
- Sur un projet il est quasi systématique d'aborder au moins une petite nouveauté<!-- .element: class="fragment" -->
- Relax, on reste méthodique 🧘‍♂️<!-- .element: class="fragment" -->
- Et de projet en projet on apprend beaucoup !<!-- .element: class="fragment" -->


_"Et ça c'est beau"_ JCVD

<!-- .element: class="fragment" -->



## Quoi par exemple ?
Une liste non-exhaustive de choses liées de près ou de loin à l'univers React

- SSR
- PWA
- TypeScript
- Electron
- React Native
- ¯\\\_(ツ)\_/¯

---

## SSR

**Problème** : Notre HTML est construit à l'exécution de nos scripts React côté client  
Pour la requête HTTP initiale le HTML retourné est vide  
Cela peut être problématique notamment pour le SEO

**Solution** : Faire du SSR
_Server Side Rendering_ : le rendu initial se fait côté serveur



### Un outil pour le faire

**[Next.js](https://nextjs.org/)**

- Au lieu d'un point d'entrée unique -> 1 par route
- Puis on modularise et on s'organise comme on sait le faire
- En plus il permet de faire de la SSG : _static site generation_ 

Les plus :
- ⬆️ et rapide à [prendre en main](https://nextjs.org/docs)

Les moins :
- Qui dit framework, dit pas forcément mes outils préférés _(ex : routeur)_


---

## PWA

Progressive Web App  
_Notre application web se déguise en application native_

Des avantages :
- Limite les coûts (1 seul code pour tous les systèmes d'exploitation)
- \+ de fonctionnalités (mode hors ligne, gestion des pertes de connexion, raccourci, ...)
- \+ de performances (gestion d'un cache et [service workers](https://developer.mozilla.org/fr/docs/Web/API/Service_Worker_API/Using_Service_Workers))
- Configuration simple via le [fichier manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)


---

## [TypeScript](https://www.typescriptlang.org/docs/home.html)

- **Concept** : On écrit du javascript typé qui sera transpilé en javascript
- **Avantages** : 
  - il est _optionnel_, 
  - il rend le code _scalable_ et _maintenable_, 
  - il enrichit la syntaxe JS [notamment pour la POO](https://www.typescriptlang.org/docs/handbook/classes.html), 
  - combiné à l'auto-complétion il nous fait gagner beaucoup de temps 💥, 
  - ...  



### Exemple

```ts
interface user {
    firstname: string;
    lastname: string;
}
function say(what: string, who: user): string {
    // l'autocomplétion des propriétés de who va être top
    return `${what} ${who.firstname} ${who.lastname}`;
}
const firstUser = { 
    firstName: 'JC', 
    lastName: 'VD', 
};
say('Coucou', firstUser);
// Je vais tout de suite savoir que la suite pose problème
say(['Ah', 'Oh'], { login: 'Tata' });
```

---

## [Electron](https://www.electronjs.org/)

- **Concept** : pouvoir embarquer nos applications HTML/CSS/JS (et donc React) dans un logiciel pour Windows, Mac ou Linux 💥
- [Prise en main](https://www.electronjs.org/docs/tutorial/first-app) rapide
- Il repose sur Node et Chromium
- -> Process de dev habituel, on ajoute nos modules npm, on s'organise \o/
- _Exemples / possiblités_ : Slack, Discord, VSC, ...

---

## [React Native](https://reactnative.dev/)

- Des concepts bien connus :
  - Composants
  - Props
  - State
  - JSX
  - ...
- Un support différent ~web~ -> Application mobile native
- Des composants de base différents ~`<div /> <img /> <input />`~ -> `<View /> <Image /> <TextInput />`
- Pas de css, du css in js _???_<!-- .element: class="fragment" -->

---

## CSS in JS

**Concept :**
- On décrit nos styles à l'aide de JS
- On exploite la syntaxe JS (variables, fonctions ...)
- On injecte ensuite les styles

**Avantages :**
- Permet la dynamisation de nos styles !
- Permet la modularisation de nos styles !

**Quelques outils au choix :** 
- [Emotion](https://emotion.sh/docs/introduction), [Glamor](https://github.com/threepointone/glamor), [Styled-components](https://styled-components.com/), ...



### [Styled-components](https://styled-components.com/) - exemple

```jsx
import styled from 'styled-components'; 
// on prépare un composant enrichi de styles
// gabarits étiquetés : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Litt%C3%A9raux_gabarits#Gabarits_%C3%A9tiquet%C3%A9s
const ButtonStyled = styled.button`
    padding: 1rem;
    color: white;
    background-color: ${props => props.favoriteColor};
`;
// on l'utilise dans un composant React
const Button = ({ favoriteColor }) => (
    <ButtonStyled favoriteColor={favoriteColor}>
      Valider
    </ButtonStyled>
);
```



Donnera dans le navigateur
```html
<head>
    <style>
        /* une classe aléatoire unique sera générée automatiquement */
        .gGHTh {
            padding: 2rem;
            color: white;
            /* si cette info change, le style sera recalculé ! */
            background-color: #f0f;
        }
    </style>
</head>
<body>
    <button class="gGHTh">Valider</button>
</body>

```

---

## Bilan

- Des tas de portes ouvertes avec l'univers React, JS et du dev en général
<!-- .element: class="fragment" -->
- Un grand savoir-faire déjà accumulé
<!-- .element: class="fragment" -->

<!-- .element: class="fragment small" -->
