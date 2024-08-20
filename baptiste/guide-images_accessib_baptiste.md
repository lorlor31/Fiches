# S08 - Guide sur l'a11y des images

## Les images

Nous avons depuis longtemps passé le temps où les pages web étaient constituées de textes et de liens.

L’information passe par l’image de façon assez essentielle.

Bienvenues dans le monde merveilleux de l’image !

## Rappels sur les différentes façons de gérer les images

- Liste des balises pouvant supporter une image
    - `<img>` : image ;
    - `<svg>` : Image vectorielle ;
    - `<area>` : Zone d’image réactive ;
    - `<input type=”image”>` : élément de formulaire ;
    - `<canvas>` : dessin importé dans une page ;
    - `<object type="image">` ;
    - `<embed>` : Image embarquée.
- Images gérées par feuille de style.
- Images par code ASCII.

## Les balises <img>

### Rappel sémantique

- Attribut `src`.
- Attribut `alt`.

```html
<img src="gateau.jpg" alt="">
```

### Boîte à outil (facultatif)

[La barre du développeur](https://chrome.google.com/webstore/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm?hl=fr) :

- Extension Chrome
- Permet entre autres de
  - désactiver les images
  - faire apparaître les alternatives textuelles des images

### L'attribut `alt` (obligatoire)

- L'attribut `alt` permet de définir une alternative textuelle à l'image.
- Texte affiché en cas de problème avec l'URL de l'image.
- Texte lu par les lecteur d'écran.
- Si l'attribut est absent, c'est le nom du fichier qui est lu par les lecteurs d'écrans.
- Conformité (W3C).

**Attention** : l'attribut `alt` peut tout à fait être vide mais doit être présent.

```html
<img src="gateau.jpg" alt="">
```

```html
<img src="gateau.jpg" alt="Un gâteau absolument délicieux.">
```

## Les images `<SVG>` inline

Une image vectorielle peut être positionnée de façon "inline" dans le code, c'est à dire  en dur.
Exemple

```html
<svg xmlns="<http://www.w3.org/2000/svg>" viewBox="0 0 24 24" width="24" height="24">
  <path fill="none" d="M0 0h24v24H0z"/>
   <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/>
</svg>
```

Comment gérer l'alternative textuelle?

### Role="img" (obligatoire)

La balise `<svg>` doit être interprétée par les lecteurs d'écran comme étant une image.
Pour cela, `role=img`

### Précaution d'usage : focusable = false (obligatoire pour éviter les bugs de navigation)

Pour éviter des problème de navigation clavier

Il existe plusieurs méthodes pour donner une alternative textuelle à une image en utilisant la balise `<svg>`

### Techniques de nommage des `<SVG>` inline

**SVG et aria-label**

Exemple d'une page météo affichant un soleil

```html
<svg role="img" aria-label="Soleil" focusable="false">
   [...]
 </svg>
```

## Images porteuses d’information vs les images de décorations

### Définition : Image porteuse d’information

- Elle apporte un élément pour la compréhension d’une information.
- Elle a un texte essentiel à la compréhension de l’information.

### Définition : Image décorative = n'apportant pas d'information.

Toute fois, certains éléments graphiques ne vont pas apporter d’information.

- Les éléments de type “puce”.
- Les éléments graphique qui ont un texte équivalent à coté d’eux.

→ Alternative textuelle vide

→ Les éléments de décoration peuvent être cachés aux lecteurs d’écrans

## Arbre de décision

### L’image contient du texte

- Et ce texte (ou information équivalente) est également présent en texte « pur » à proximité de celle-ci, alors **laisser son alternative textuelle vide**.
- Et ce texte est seulement un effet visuel (purement décoratif, exemple : graph sur un mur), alors **laisser son alternative textuelle vide**.
- Et ce texte (ou information équivalente) n’est pas présent à proximité de celle-ci, alors **renseigner son alternative textuelle** en reprenant l’information véhiculée par l’image et son texte.

### L’image ne contient pas de texte

#### L'image est porteuse d'information

- Et cette information est également présente en texte « pur » à proximité de celle-ci, alors **laisser son alternative textuelle vide**.
- Et l’information véhiculée peut être résumée en une courte phrase, alors renseigner son alternative textuelle en reprenant brièvement ces informations.
- Et cette image est porteuse de nombreuses informations (tel qu’un graphique complexe), alors renseigner son alternative textuelle en reprenant brièvement les informations véhiculée par celle-ci ainsi qu’une mention précisant où trouver sa description détaillée.

#### L'image n'est pas porteuse d'information

**L’image est purement décorative**

- Alors laisser son alternative textuelle vide.

**L’image n'est pas purement décorative**

- Alors... Là... on ne sait plus quoi faire... mais ce cas existe t-il vraiment?

### Le contenu de l’alternative textuelle

- Ce n’est pas la description de l’image
    - “Logo de l’agence…” décrit l’image → Ne pas utiliser “Logo”
    - “Image d’illustration du site Bidule” → Si c’est une illustration pas d’alternative textuelle
- Doit décrire la fonction d’une image
    - “Agence Bidule”
    - “Tableaux de Frieda Kalo…”

### Images légendées

- Pour associer des information légales de copyright.
- Dans une galerie d'images, donner des précisions visuelles sur les images.

#### Technique

- La balise `<figure>` englobe l’image ainsi que la légende, qui doit de son côté être balisée avec `<figcaption>`.
- La balise `<figure>` Posséde un attribut `aria-label` dont le contenu doit reprendre celui de la balise `<figcaption>`.
- Ajouter un attribut `role=figure` pour une bonne interprétation des lecteurs d'écrans.

Construction HTML de base :

```html
<figure role="figure" aria-label="Texte visible">
   <img src="…" alt="Texte alternatif" />
   <figcaption>
      Texte visible
   </figcaption>
</figure>
```


### Les descriptions longues ou les images complexes

Pour les images porteuses d'information, qui nécessite une [description détaillée](https://www.numerique.gouv.fr/publications/rgaa-accessibilite/methode-rgaa/glossaire/#description-detaillee-image), que faire?

→ Utiliser un lien ou bouton adjacent permettant d’accéder à la description détaillée.

```html
<img src="…" alt="" />
<button>Description détaillée</button>
<div>description détaillée, voir un tableau de données</div
```

## Les différentes méthodes d'affichage d’informations visuelles

### Des textes cachés visuellement, mais lisibles par les lecteurs d'écrans

Pour les éléments visuels qui apportent une information, mais qui n'ont pas d'équivalents textuels visibles à côté.

Un texte visible uniquement par les lecteurs d'écrans.

On utilise une classe particulière, qui rend le texte non visible : il est réduit à 1px sur 1px, placé en position absolue, caché au niveau stylistique.

```css
.sr-only {
	border: 0 !important;
	clip: rect(1px, 1px, 1px, 1px) !important;
	-webkit-clip-path: inset(50%) !important;
	clip-path: inset(50%) !important;
	height: 1px !important;
	overflow: hidden !important;
	padding: 0 !important;
	position: absolute !important;
	width: 1px !important;
	white-space: nowrap !important;
}
```

Plusieurs appellations possibles

- sr-only (boostrap)
- element-invisible (drupal)
- screen-reader-text (word-press)
- visually-hidden
- mask

et d'autres encore...

## Les images gérées par css

### Les svg gérés par feuille de style

- L'image vectorielle est appelée par la feuille de style.
- L'attribut `title` du svg peut être lue par les lecteurs d'écran, pouvant créer de l'incompréhension.
- Ces éléments sont à cacher avec `aria-hidden="true"`.
- Ajouter une alternative textuelle si besoin avec sr-only.

```html
<span class="ico-svg"></span>
<span class="sr-only">Accueil</span>
```

### Font-icon

- Des images générées par une police particulière.
- Font-awesome([https://fortawesome.com/](https://fortawesome.com/)), les font de bootstrap ([https://icons.getbootstrap.com/](https://icons.getbootstrap.com/)).
- Propriété "content" qui peut être lue par les lecteurs d'écrans.
- Ces éléments sont à cacher avec `aria-hidden="true"`.
- Ajouter une alternative textuelle si besoin avec `sr-only`.

```html
<span class="fa fa-instagram"></span>

<span class="fa-brands fa-instagram" aria-hidden="true">
	<span class="sr-only">Instagram</span>
</span>
```

## Les images ASCII

- Ces caractères seront difficilement lus / interprétés par les lecteurs d’écrans.
- Sur mobile, les librairies d’emojis ne sont pas toujours actualisées. Les images sont alors remplacées par des carrés barrés.

→ Cacher les codes ASCII aux lecteurs d’écrans

→ Ajouter un texte équivalent à l’information pour les lecteurs d’écrans si besoin

```html
<div>
  <p aria-hidden="true">
    &#x1F408;? &#x1F602;
  </p>
	<span role="img" class="sr-only">Un chat? j'en pleure de rire!</span>
</div>

<div>
  <p role="img" aria-label="Un chat? j'en pleure de rire!">
    &#x1F408;? &#x1F602;
  </p>
</div>
```

### Caractères spéciaux directement dans le code

```html
<span aria-hidden="true">
    <span>★</span>
    <span>★</span>
    <span>★</span>
    <span>★</span>
    <span>☆</span>
</span>
<span role="img" class="sr-only">Note : 4 sur 5</span>
```

# Gestion des images selon le media

## Balise `<picture>`

```html
<picture>
    <source srcset="/media/cc0-images/surfer-240-200.jpg"
            media="(min-width: 800px)">
    <img src="/media/cc0-images/painted-hand-298-332.jpg" alt="" />
</picture>
```

---

## Les émoticônes dans la communication

[https://blog.hello-bokeh.fr/2020/07/23/des-emoji-accessibles/](https://blog.hello-bokeh.fr/2020/07/23/des-emoji-accessibles/)

### ****Un emoji est plus long qu’il en a l’air****

C’est parfois la description qui sera restituée.

### ****Un emoji peut en cacher un autre****

Exemple : coeur rouge pour VoiceOver, amour pour NVDA.

### Visuellement, les emojis peuvent être proches

Chaque navigateur peut renvoyer des rendus visuels différents selon les emojis.

Comment **utiliser des emojis** :

- **Utiliser des emojis de temps en temps**.
- Placer l’émoji à la fin d’une phrase ou d’un message.
- Mettre les informations importantes avant l’émoji.
- Choisir un emoji pertinent (par son apparence mais aussi par sa description).
- S’assurer que le message a du sens même sans emoji.
