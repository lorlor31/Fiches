# Récap

Faisons un petit point.

---

## Programmation fonctionnelle
<!-- .slide: data-background="#e98c36" -->



### [`.forEach()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/forEach)

Exécute une fonction pour chaque élément du tableau.
<!-- .element: class="fragment" -->

```js
const numbers = [1, 2, 3, 4, 5, 6];

// Affiche chaque nombre
numbers.forEach(function(number) {
  console.log('Le nombre est : ' + number);
});
```
<!-- .element: class="fragment" -->



### [`.map()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/map)

Renvoie un nouveau tableau modifié / transposé.
<!-- .element: class="fragment" -->

```js
const numbers = [1, 2, 3, 4, 5, 6];

// [1, 4, 9, 16, 25, 36]
const squares = numbers.map(function(number) {
  return number * number;
});
```
<!-- .element: class="fragment" -->



### [`.filter()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/filter)

Renvoie un nouveau tableau avec les éléments correspondants.
<!-- .element: class="fragment" -->

```js
const numbers = [1, 2, 3, 4, 5, 6];

// [2, 4, 6]
const evenNumbers = numbers.filter(function(number) {
  return number % 2 === 0;
});
```
<!-- .element: class="fragment" -->



### [`.find()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/find)

Renvoie le premier élément qui respecte la condition.
<!-- .element: class="fragment" -->

```js
const numbers = [1, 2, 3, 4, 5, 6];

// 3
const numberSupTwo = numbers.find(function(number) {
  return number > 2;
});
```
<!-- .element: class="fragment" -->



### Je savais déjà faire...

Tout ça, on pouvait le faire avec un `for`
		
- For, c'est plus rapide ! <!-- .element: class="fragment" -->
- For, c'est plus compatible ! <!-- .element: class="fragment" -->

Mais... <!-- .element: class="fragment" -->
		
- C'est moins lisible <!-- .element: class="fragment" -->
- C'est moins modulaire <!-- .element: class="fragment" -->



## Autre rappel : callback

Une approche généraliste

```js
function handleFormSubmit(event) {
  event.preventDefault();
  // ...
}

form.addEventListener('submit', handleFormSubmit);
```

---

## Programmation déclarative
<!-- .slide: data-background="#e98c36" -->



### Paradigme déclaratif

On veut limiter/cacher le code _plomberie_.

On automatise tout ce qui peut l'être (merci les fonctions & callbacks).

On se concentre sur le résultat, on laisse la machine travailler / optimiser.



### Applications réactives & déclaratives

- On s'appuie sur des données (état / state) <!-- .element: class="fragment" -->
- Une logique de rendu initial propre… <!-- .element: class="fragment" -->
- On écoute les événements / interactions… <!-- .element: class="fragment" -->
- Dès qu'une donnée change, on redessine toute l'application ! <!-- .element: class="fragment" -->



### Quid des performances ?

- C'est pas important… <!-- .element: class="fragment" -->
- Bon, si, un peu… Mais on va déléguer… <!-- .element: class="fragment" -->
- React et son virtual DOM ! <!-- .element: class="fragment" -->

---

## JavaScript - ECMAScript
<!-- .slide: data-background="#e98c36" -->



### ES2015+ ou ES6+

ECMAScript à partir de 2015 / de la version 6

> On a vu quelques nouveautés de syntaxe 

_Attention à la compatibilité de certaines syntaxes_ <!-- .element: class="fragment" -->

A moins de transpiler le code avec babel <!-- .element: class="fragment small" -->

Ce qu'on va faire aujourd'hui :) <!-- .element: class="fragment small" -->




### Exemples

<ul>
  <li><code>let</code> : portée se limitant au bloc</li>
  <li class="fragment"><code>const</code> : référence constante limitée au bloc</li>
  <li class="fragment"><code>() => {}</code> : fonctions flechées</li>
  <li class="fragment"><code>`Hello ${name}`</code> : littéraux de gabarits</li>
  <li class="fragment"><code>(...args) => {}</code> : paramètre du reste</li>
  <li class="fragment"><code>{ data }</code> = <code>{ data: data }</code> : propriété raccourcie</li>
</ul>



### Destructuring 1/3

L'affectation par décomposition d'un tableau.

```js
const students = ['Hannah', 'Coraline', 'Fred'];

// Stockage de chaque valeur du tableau students
const first = students[0]; // 'Hannah'
const second = students[1]; // 'Coraline'
const last = students[2]; // 'Fred'

// Équivalent avec le destructuring
const [first, second, last] = students;

```



### Destructuring 2/3


L'affectation par décomposition d'un objet.

```js
const data = {
  firstname: 'Parker',
  lastname: 'Lewis',
};

// Stockage de chaque valeur de l'objet data
const firstname = data.firstname; // 'Parker'
const lastname = data.lastname; // 'Lewis'

// Équivalent avec le destructuring
const { firstname, lastname } = data;

```



### Destructuring 3/3

L'affectation par décomposition d'un objet dans les paramètres d'une fonction.

```js
// La fonction display va recevoir un seul paramètre : un objet
// on peut le décomposer directement
function display({ firstname, lastname }) {
  alert(`Bienvenue ${firstname} ${lastname} !`);
};

// Objet de données
const data = {
  firstname: 'Parker',
  lastname: 'Lewis',
};

// Exécution en passant data en argument
display(data);

```

---

## Les outils
<!-- .slide: data-background="#e98c36" -->



## Gestionnaire de paquets

Outil permettant de gérer (installation, mise à jour, changement de version, etc) les dépendances de nos projets.

Un incontournable dans l'écosystème JS !

Exemples :

- [npm](https://www.npmjs.com)
- [yarn](https://yarnpkg.com)




### Node Package Manager 1/3

Pour Node ? Oui, mais pas que !

`npm` s'appuie sur la plateforme https://www.npmjs.com/

- Multiples modules / packages pour le JavaScript en général.
- Pour le back et le front, par exemple `express` (back) et `react` (front)
- Même des outils annexes comme : `bulma`, `bootstrap`, etc...



### Node Package Manager 2/3

Commandes principales

<ul>
  <li class="fragment"><code>npm init</code> : crée un fichier <code>package.json</code></li>
  <li class="fragment"><code>npm install</code> : installe les packages présents dans <code>package.json</code></li>
  <li class="fragment"><code>npm install react</code> : installe le package nommé "react"</li>
  <li class="fragment"><code>npm uninstall react</code> : désinstalle le package nommé "react"</li>
  <li class="fragment"><code>npm install webpack --save-dev</code> : installe "webpack" et le rajoute aux dépendances de dev dans package.json</li>
</ul>



### Node Package Manager 3/3

`yarn` : une version améliorée de `npm`

Plus rapide, plus secure, plus joli.

<ul>
  <li class="fragment"><code>yarn init</code> = <code>npm init</code></li>
  <li class="fragment"><code>yarn</code> = <code>npm install</code></li>
  <li class="fragment"><code>yarn add react</code> = <code>npm install react</code></li>
  <li class="fragment"><code>yarn remove react</code> = <code>npm uninstall react</code></li>
  <li class="fragment"><code>yarn add webpack --dev</code> = <code>npm install webpack --save-dev</code></li>
</ul>




## Bundler

Outil qui rassemble tous les fichiers de notre code en un bundle. 

- Il modularise, transpile et compresse notre code 

- Il gère tous les assets (JS, styles, images)

Exemples :

- [Webpack](https://webpack.js.org)
- [Parcel](https://parceljs.org)
- [Rollup](https://rollupjs.org)
- [esbuild](https://esbuild.github.io)



## Transpiler

Outil qui transpile notre code moderne (syntaxes JS ES6, JSX) en code JS compatible avec tous les navigateurs.

Exemples :

- [Babel](https://babeljs.io/)
- [SWC](https://swc.rs/)




## Linter

Outil d'analyse de code qui permet de détecter les erreurs et les problèmes de syntaxe.

Exemples :

- [ESLint](https://eslint.org)
- [JSLint](https://www.jslint.com)



### Linter 1/2

Analyse le code, fournit des conseils et des bonnes pratiques, aide au formatage, ...

- Votre meilleur ami. <!-- .element: class="fragment" -->
- Vous pouvez comptez sur lui. <!-- .element: class="fragment" -->
- Parfois un peu agaçant car il a toujours raison :P <!-- .element: class="fragment" -->



### Linter 2/2

On va utiliser la configuration proposée par un acteur important de la communauté JS / React

**[Airbnb](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/rules/react.js)**

---

# Allons utiliser tout ça !
