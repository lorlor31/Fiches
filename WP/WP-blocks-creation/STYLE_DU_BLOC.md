# STYLE DU BLOC

## Deux fichiers de style :

|Fichier |Pour gérer l'apparence | Importé dans|Deviendra |
|---|:-:|:-:| :-:|
|**editor.css** |côté éditeur | edit.js|build/index.css|
|**style.css** | côté front et éditeur|index.js |build/style-index.css|

On fera donc le style du bloc dans style.css et les ajustements éventuels pour Gutenberg dans editor.css

## Appliquer un style :

1/ définir la classe de l'élément dans les attributs si l'élément est éditable

```
"attributes": {
		"title": {
			"type": "string",
			"source": "html",
			"selector": ".title"
		}
	},
```

2/ et aussi dans l'élément renvoyé dans edit() et save(), `className="title"` par exemple.

3/ On écrit notre style dans style.css. 

4/ On aura besoin de surcharger les styles dans editor.css pour les voir correctement car Gutenberg a déjà des styles appliqués.
On commence par surcharger .editor-styles-wrapper 
Puis le reste.
Ca peut être chronophage quand le thème a déjà des styles prédéfinis qu'il faudra surcharger dans le code du bloc.
Il y a tout un travail de comparaison entre le rendu dans l'éditeur et celui de la page.
