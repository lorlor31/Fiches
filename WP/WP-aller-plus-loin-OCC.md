# RESUME DU COURS "CREER SON SITE" OCC

## INTRO - BASICS
- WordPress (CMS) vs WordPress.com (hébergement)
- Deux outils : interface admin et éditeur de blocs Gutenberg
- Deux types de contenus : pages et articles
- Types secondaires : média, commentaires, catégories, étiquettes, menus, autres types customs
- Personnaliser :
    - Thèmes =designs
    - Customizer = personnalisation des éléments du thème
- Extensions == plugins dispos sur WordPress.org
- Hébergement : distant ou local (MAMP, logiciel Local)
- Dossiers : wp-admin, wp-includes et wp-content

## DASHBOARD
- Articles
- Médias toutes les images etc
- Pages : accueil, contact etc...
- Commentaires
- Apparence : thèmes, menus
- Extension : fctnalités qu'in installe, sans coder
- Comptes des admins du site ou créateurs
- Outils : import /export
- Réglages

## GUTENBERG
- Cliquer sur + pour rajouter un bloc et voir ce qu'on a
- Glisser /Déposer les blocs de la gauche vers l'article
- Ajouter une **catégorie** ou des étiquettes =**tags**
- Publier

## Menu
- Dans apparence -> Menu : glisser déposer les pages à faire apparaitre ds le menu

## CUSTOMIZER
- Apparence -> Personnaliser
- Logo Favicon



# RESUME DU COURS "ALLER PLUS LOIN AVEC WP" OCC

## Installer 
- Installer la LAMP, créer une BDD MySQL et installer WP https://fr.wordpress.org/
```
Titre du site wp
id : lorlor31
MDP *Gkj8JB9FJ@^eJ(MF)
```
## Thème - Généralités

- Choisir un thème : Apparence ->Thème -> Activer
- On peut personnaliser logo, couleurs, nom du site, menus, pages principales
- Structure d'un thème

En gras les obligatoires

En italique les fichiers pour les articles/archives ?

| Nom du fichier |Rôle| 
|--|--| 
|**index.php**|tpl principal| 
|**style.css**|style|
|**functions.php**|fctnalités du thème|
|header.php| élements html head|
|footer.php|footer|
|sidebar.php|--|
|front-page.php|--|
|home.php|--|
|singular.php|--|
|*single.php*|un article|
|*single-{post-type}.php*|un article d'un type précis|
|*archive.php*|--|
|*archive-{post-type}.php*|--|
|page.php|--|
|page-{slug}.php|--|
|*category.php*|--|
|author.php|--|
|date.php|--|
|*search.php*|--|
|attachment.php|--|
|image.php|--|
|404.php||--|
|comments.php|--|
|*taxonomy.php*|--|

## Créer un thème enfant
- On utilise Gutenberg et les blocs pour créer un tpl
- On peut y rajouter des extensions WP avec des blocs complémentaires.
- On crée un dossier MonTheme ds le dossier themes et on copie style.css (template ctient le text domain du thème parent), functions.php et index.php, screenshot.png (cf exp)
- A mettre dans style.css : 

```

/*
Theme Name: CookInFamily
Theme URI: https://www.cookinfamily.fr
Author: OpenClassrooms
Author URI: https://openclassrooms.com
Template:     twentyfifteen
Description: Thème pour le cours "Perfectionnez-vous sur WordPress"
Version: 1.0
Tags: openclassrooms, cookinfamily, cours
Text Domain: cookinfamily
*/
```

Theme Name : le nom du thème ;

Theme URI : l’URL du site utilisant le thème ;

Author : le développeur ou l’agence ayant développé le thème ;

Author URI : l’URL de l’auteur du thème ;

Description : une brève description du thème ;

Version : la version du thème ;

Tags : des mots clés pour affiner la recherche sur la page des thèmes ;

Text Domain : identifiant définissant le groupe de traduction de votre thème.

Template: thème parent



- On rajoute dans functions.php

```
 // Chargement du style.css du thème parent Twenty Twenty
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
    // Chargement du css/theme.css pour nos personnalisations
    wp_enqueue_style('theme-style', get_stylesheet_directory_uri() . '/css/theme.css', array(), filemtime(get_stylesheet_directory() . '/css/theme.css'));
```
- On peut personnaliser directement sur l'interface graphique de WP.

- La fonction wp_enqueue_style accepte plusieurs arguments :

    - $handle (string) (Requis) : Un identifiant unique pour la feuille de style. Cet identifiant est utilisé pour référencer cette feuille de style dans le reste de votre code.

    - $src (string) (Requis) : L'URL vers le fichier CSS. Vous pouvez utiliser des fonctions comme get_stylesheet_uri(), get_template_directory_uri(), ou plugins_url() pour générer cette URL.

    - $deps (array) (Optionnel) : Un tableau des identifiants des autres styles dont ce style dépend. Par exemple, si votre style dépend de Bootstrap, vous pouvez ajouter l'identifiant de Bootstrap ici.

    - $ver (string|bool|null) (Optionnel) : Le numéro de version de votre feuille de style. Ceci est utile pour la mise en cache. Si vous ne spécifiez pas de version, WordPress utilisera la version actuelle de WordPress. Si vous passez false, aucune version ne sera ajoutée.

    - $media (string) (Optionnel) : Le type de média pour lequel ce style a été conçu. Les valeurs courantes incluent 'all', 'screen', 'print', etc. Par défaut, il est réglé sur 'all'.

- On peut rajouter un screenshot.png ds le dossier
- On peut rajouter un dossier css/ et fichier theme.css pour personnalisation

## Les hooks de WP
- Pour s'accrocher à un moment du cycle de l'affichage de la page
- Dans functions.php
- 2 types : 
    - hooks **filter** : changer valeur grâce à une fct
    - hooks **action** : exécuter un script

### Hooks filter 
- Exps de hooks filter : the_title, the_content, the_excerp
- Conditions courantes : 
    - is_single() est une page de détail d'un article
    - in_category('x')
    - in_the_loop()
    - is_archive() est une page d'archive
- On utilise la fct add_filter('nom_du_hook','fct à exécuter')
- get_the_permalink() => pour récupérer le lien du détail de l'article ds un href par exp
- Attention, il n'y a pas forcémt besoin de hooks, cf interface de WP-> Réglages

### Hooks action 
- Exps de hooks action : loop_end, wp_header (ds le \<head\>), wp_footer(qd le DOM est chargé) 
- echo do_shortcode()
- On utilise la fct add_action('nom_du_hook','act à exécuter')
- Ds les fct on pt utiliser do_action(mon_action)
- On pt copier des tpl ds tpl-parts et les rajouter grâce aux hooks action.
- On pt utiliser les variables déclarées à l'extèr avec global.

A creuser c'est quoi add_shortcode() -> shortcode => syntaxe moins utilisée avec des [] , exp : [video] , remplacé par les blocs gutenberg


## Créer une extension /plugin
- On crée un dossier monPlugin/ ds wp-content/plugins
- Dedans un fichier monplugin.php
- On peut mettre du JS, du CSS...
- En-tête = métadonnées du 

```
<?php
/**
* Plugin Name: Administration
* Plugin URI:  https://www.cookinfamily.fr
* Description: Ajoutez une page d'administration pour modifier la couleur de fond de votre site WordPress.
* Version:     1.0.0
* Author:      OpenClassrooms
* Author URI:  https://openclassrooms.com
* Text Domain: administration
*/

```
- L'activer ds le dashboard
- Créer une page d'administration => config du plugin ds le dashboard

```
function administration_add_admin_page() {
 add_submenu_page(
    'options-general.php',
    'Mes options',
    'Mes réglages',
    'manage_options',
    'administration',
    'administration_page'
 );
}

function administration_page() {
 }

add_action('admin_menu', 'administration_add_admin_page');
```



## Activer le mode debug
- Dans wp-config.php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);



## vsftpd 
sudo apt update && sudo apt upgrade -y
sudo apt install vsftpd -y
sudo cp /etc/vsftpd.conf /etc/vsftpd.conf.bak
sudo nano /etc/vsftpd.conf

- Modifiez les lignes suivantes (décommentez en supprimant le # et modifiez les valeurs si nécessaire) :
```
anonymous_enable=NO
local_enable=YES
write_enable=YES
local_umask=022
dirmessage_enable=YES
use_localtime=YES
xferlog_enable=YES
connect_from_port_20=YES
chroot_local_user=YES
```
- Ajouter
```
allow_writeable_chroot=YES
user_sub_token=$USER
local_root=/home/$USER/ftp
pasv_min_port=10000
pasv_max_port=10100

sudo adduser ftpuser

sudo mkdir -p /home/ftpuser/ftp
sudo chown nobody:nogroup /home/ftpuser/ftp
sudo chmod a-w /home/ftpuser/ftp

sudo mkdir -p /home/ftpuser/ftp/upload
sudo chown ftpuser:ftpuser /home/ftpuser/ftp/upload

sudo systemctl restart vsftpd
```
## DEPLOIEMENT
Je galère avec le ftp.
Je suis donc passée par git clone et j'ai copié mes fichiers à la mano.
Il faut reconfigurer le fichier wp-config et les URL
ca marche toujours pas