## Installer

### Création du projet et installation d'apache

composer create-project symfony/skeleton 
composer require symfony/apache-pack
dépalcer kes fichiers de skeleton vers la racine
sudo chmod -R 777 var

### Installation des composants essentiels

composer require twig/twig
composer require --dev symfony/debug-bundle
composer require symfony/profiler-pack
composer require http-foundation	
composer require --dev symfony/maker-bundle
composer require symfony/orm-pack 
composer require symfony/security-bundle

**Pour le faire en  deux lignes, à tester :** 
composer require twig/twig symfony/profiler-pack http-foundation symfony/orm-pack symfony/security-bundle
composer require --dev symfony/debug-bundle --dev symfony/maker-bundle

### Installation des composants fréquents

composer require symfony/http-client
composer require --dev orm-fixtures
composer require fakerphp/faker
composer require symfony/form
composer require easycorp/easyadmin-bundle
composer require symfony/mailer
composer require symfony/mailjet-mailer
composer require lexik/jwt-authentication-bundle
composer require nelmio/cors-bundle
composer require knplabs/knp-snappy-bundle

cf composer require webapp noter ce que ça comprend

## configurer le .env.local 

Dans la ligne :
`DATABASE_URL="mysql://app:!ChangeMe!@127.0.0.1:3306/app?serverVersion=10.11.2-MariaDB&charset=utf8mb4"`
- Remplacer `app:!ChangeMe!` par `votre_utilisateur:votre_MDP` 
- Remplacer `app?` par `votre_BDD?` 
- Vérifier sa version de mysql en tapant la commande `mysql --version` dans le terminal
- Modifier éventuellement dans `10.11.2` par les bons chiffres.

NB : 
- si le projet utilise un autre SGBDR, il faudra sélectionner la variable DATABASE_URL correspondant.
- configurer les autres variables d'environnement si existantes.
- enlever le # qui commente la variable hein.



## pour essayer tailwind

composer require symfony/asset-mapper symfony/asset symfony/twig-pack
ou
composer require symfony/webpack-encore-bundle

For the prod environment, before deploy, you should run:
php bin/console asset-map:compile


## Lancer serveur

php -S 0.0.0.0:8000 -t public

======================================================================================

## Commandes extra utiles

bin/console make:controller nomDuController	
bin/console debug:autowiring --all
bin/console cache:clear
bin/console debug:router


**trucs que j'oublie
recuperer l'user ds controller avec le service security
        $user=$this->security->getUser();
recuperer l'user ds tpl avec app.get.user

=========================================================================================
## Créer les routes
On crée le controller avec le maker si on veut et les routes dedans
On crée le tpl

==============================================================
## Créer la db avec doctrine

- bin/console doctrine:database:create
============================================================================

## Installation d'un projet récupéré via un dépôt cloné :

1. **Cloner** le repo

2. Installer **composer** et ses dépendances

`composer install`

3. Configurer le **.env** ( copier le fichier en .env.local et remplacer dans DATABASE_URL par ses identifiants BDD)

4. Créer la **BDD**, appliquer les migrations et exécuter les fixtures s'il y en a : 

```
- bin/console doctrine:database:create
- bin/console doctrine:migrations:migrate
- bin/console doctrine:fixtures:load
```


