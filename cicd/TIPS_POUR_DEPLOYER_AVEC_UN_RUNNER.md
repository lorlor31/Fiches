# DEPLOIEMENT AVEC UN RUNNER : Précautions - Troubleshooting 

En cas d'erreurs, quelques pistes à vérifier : 

## Dans Gitlab : 
- Création des variables :
    - Bien respecter le nom des variables lorsqu'on les déclare dans Gitlab et notamment la **présence d'espaces à la fin** des "value".
    - **Décocher la case "Protect variable"** pour permettre à toutes les branches d'y accéder.
- Création du runner :
    - Bien **décocher la case activant les runners partagés**.

## En cas de problèmes avec les liens / URL :

- Bien déclarer l'**APP_URL** si nécessaire dans le .env.
- Mettre un fichier **.htaccess dans le dossier public/** pour activer la réécriture des URL. 

Exemple du contenu du .htaccess : 

```
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^(.*)$ index.php [QSA,L]
</IfModule>

```

## En cas de problème avec la modification de la base de données

- **Avant de déployer**, il faut avoir créé la base de données avec les identifiant et mot de passe fournis dans le .env .
- Ensuite, en cas de problème, bien **vérifier les variables Gitlab** DATABASE_USER, DATABASE_PWD et DATABASE_URL ( pas d'espaces inutiles et case "Protect variable" décochée ).
- En général, on va appliquer les migrations sur les branches **dev** et **staging*** et le faire manuellement sur la branche **prod** .
On peut avoir un aperçu des requêtes sql correspondant avec :
`php bin/console doctrine:migrations:migrate --dry-run`
- Si on veut exporter une BDD dans le runner : 
`mysqldump -u ${DATABASE_USER} -p${DATABASE_PWD} ${DATABASE_NAME} > database_dump.sql`
- Pour importer une BDD :
`mysql -u ${DATABASE_USER} -p${DATABASE_PWD} ${DATABASE_NAME} < database_dump.sql`
Il faut bien avoir les droits de process pour faire ces  deux dernières manipulations. Pour attribuer les droits de process à un utilisateur :
```
GRANT PROCESS ON *.* TO 'DATABASE_USER'@'localhost';
FLUSH PRIVILEGES;
```
NB : ne pas mettre le nom des variables entre guillements dans le script.
- Pour appliquer les fixtures sur le serveur :
`php bin/console doctrine:fixtures:load`

## Tips pour Symfony 

- Pour faire disparaître la Debug Bar, mettre ces lignes dans le fichier /config/packages/dev/web_profiler.yaml :
```
web_profiler:
    toolbar: '%kernel.debug%'
    intercept_redirects: false
```

- Si PhpStan décèle des erreurs liées au cache, on peut exclure le dossier du cache :
```
parameters:
    excludePaths:
        - var/cache/
```

## Tips pour NPM / Yarn 

- On peut **choisir la version de npm** en le précisant après la commande nvm install :
`- nvm install 20.15.1`
- La commande `npm audit fix` permet de déceler et remplacer les packages présentant des vulnérabilités.