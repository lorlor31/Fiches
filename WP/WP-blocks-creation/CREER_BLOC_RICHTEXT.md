# CREER UN BLOC RICHTEXT

On aura un champ texte éditable avec sa toolbar avec la possibilité de configurer bold, italic, etc dans ` Allowed format`.

## Docs officielles : 
- https://developer.wordpress.org/block-editor/reference-guides/richtext/
- https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/rich-text/README.md


## Dans block.json :

On déclare `content` dans les attributs du bloc

```
"attributes": {
		"content": {
			"type": "string",
			"source": "html",
			"selector": "p" // on donne la provenance de notre texte , ça pourrait être aussi un sélecteur CSS  par exemple selector: '.content'

		}
	},

```

## Dans edit.js

- On importe bien les composants nécessaires : 

```
import { useBlockProps, RichText } from '@wordpress/block-editor';

```

- Dans la fonction edit() : 

```
const Edit = ( props ) => {
	const {
		attributes: { content }, // équivaut à props.attributes.content = content ;
		setAttributes, // et props.setAttributes = setAttributes() ;
	} = props; 

	const blockProps = useBlockProps(); // Propriétés du bloc

	const onChangeContent = ( newContent ) => {
		setAttributes( { content: newContent } ); // les composants gut récupèrent directement la bonne 'value'
	}; 
	return (
		<RichText
			{ ...blockProps }
			tagName="p" // élément HTML du rendu
			onChange={ onChangeContent }
			value={ content }
		/>
	);
};
export default Edit;
```

## Dans save.js
- On importe bien les deux comosants précédents.
- On fait comme pour edit() dans save() :

```
export default function save(props) {
    const {
		attributes: { content },
	} = props; // on attribue la valeur de content à props.content
    return <RichText.Content { ...useBlockProps.save() } // on sauve
    tagName="p" 
    value={content} 
    />;
}

```

## Bloc multiligne

Pour être multiligne, il faut changer le `tagName` du <RichText/> et rajouter l'attribut `multiline`en précisant quel élément va être créé à chaque retour à la ligne.
NB : le faire dans le edit() et dans le save() aussi !

```
<RichText
    tagName="div" // Le bloc sera une <div>
    multiline="p" // Qui contiendra des <p>
...
Ou 

<RichText
    tagName="ul" // Là une liste
    multiline="li" // Et ses éléments

etc...
```


## Configuration de la Toolbar

- Pour un <RichText/> il vaut mieux gérer les options de style via la Toolbar que par les supports.
- Par défaut l'attribut `allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }` affiche ces 3 options dans la Toolbar.
- Pour customiser la Toolbar, on peut importer <BlockControls/> et l'utiliser dans un fragment.
Il faudra gérer les changements en rajoutant des attributs.
cf exemple https://capitainewp.io/formations/wordpress-creer-blocs-gutenberg/ajouter-reglages-toolbar/ pour approfondir
