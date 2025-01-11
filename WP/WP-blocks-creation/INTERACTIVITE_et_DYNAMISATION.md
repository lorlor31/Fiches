# INTERACTIVTE DU BLOC (JS) et DYNAMISATION (PHP)

## INTERACTIVITE Ajouter des eventListeners et des callbacks dans edit.js et viewScript

    - Pour rendre le bloc interactif, on va rajouter du JS dans la fonction edit dans edit.js pour l'interaction côté éditeur (cf exemple du bloc **slogan**)
    - Pour l'interaction côté frontend, il faut :
1. définir un script dans block.json à la clé "viewScript"
2. Y mettre les fonctions
3. Attention à bien attribuer les classes nécessaires avec ``useBlockProps.save()`pour écraser la classe par défaut

```js
<div  {...useBlockProps.save({// permet de rajouter la class custom 
                className: 'hover-text-block',
            })}>

```

## DYNAMISATION 
    Pour avoir des données dynamiques :
1. Déclarer dans block.json le fichier php pour le rendu `"render": "file:./render.php"`
2. Dans edit.js on ne verra pas l'id, on peut afficher une info
3. Dans save.js, on ne fera rien non plus comme le rendu sera géré par PHP

```js
import { useBlockProps } from '@wordpress/block-editor';

const Save = () => {
    return null; // Rendu côté serveur uniquement.
};

export default Save;

```
4. Dans le fichier render.php, on va créer la fct qui va générer le bloc et l'utiliser pour le rendu avec 
```php 
register_block_type(__DIR__, array(
    'render_callback' => 'render_product_id_block',
));

```
> J'ai pas réussi avec la manière ci-dessus : écrire le PHP directement sans callback cf exemple du bloc slogan ou copyright

## Comment utiliser un bloc custom dans PHP


> Préalable : bien déclarer les styles et assets du bloc ds `register_block_type()` ds le fichier du plugin avec `wp_enqueue_script` et `wp_enqueue_style` pour ne charger les assets que d le bloc est utilisé (+performant)
> 

Il y a plusieurs manières via un shortcode, via do_blocks, en utilisant la rendercallback du bloc...

