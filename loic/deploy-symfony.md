# Déployer une application Symfony

> ℹ️ Tout au long de ce tutoriel, tu rencontreras des sections "SPOILER" que tu pourras déplier pour obtenir des explications sur ce que tu fais et pourquoi tu le fais.

## Étape 0 : La VM Server Kourou

<details>
<summary>SPOILER: C'est quoi la VM Server Kourou ?</summary>

Si tu dormais pendant la saison 8 du socle (ou si tu as beaucoup dormi depuis), voici un bref rappel de ce qu'est la VM Server Kourou :

> O'clock met à ta disposition un serveur virtuel dans le ☁️ cloud ☁️ pour t'aider à t'entraîner au déploiement de tes projets web et à l'administration système. Ce serveur virtuel t'est fourni avec un nom de domaine.
</details>

😉 Rends-toi sur la page d'administration de ta VM Server Kourou, tu en auras besoin pour la suite de ce tutoriel : [https://kourou.oclock.io/ressources/vm-cloud/](https://kourou.oclock.io/ressources/vm-cloud/)

> ℹ️ Certaines commandes de ce tutoriel te demanderont le mot de passe administrateur de ta VM Server Kourou, tu trouveras celui-ci sur la page d'administration.

### Initialiser la VM

<details>
<summary>SPOILER: Premiers pas</summary>

Si tu n'as jamais utilisé la VM Server Kourou ou si tu l'as supprimée, clique sur le bouton "Créer la VM".

Pour repartir d'une VM vierge, clique sur le bouton "Réinstaller la VM".

⚠️ Dans ces deux cas, tu devras créer une nouvelle clé SSH sur la VM Server Kourou pour pouvoir cloner et pull le projet depuis GitHub. Tu trouveras la procédure à suivre dans la [fiche récap dédiée à Git et GitHub](https://kourou.oclock.io/ressources/fiche-recap/git-et-github/#cr%c3%a9er-une-cl%c3%a9-ssh-pour-github).
</details>


Si ta VM est déjà prête, clique sur "Démarrer la VM".

### Se connecter à la VM

Une fois la VM Server démarrée, connecte-toi en SSH. Tu trouveras la commande à utiliser dans ton terminal sur la page d'administration de ta VM, elle devrait ressembler à ceci :

```bash
ssh student@pseudo-server.eddi.cloud
```

⚠️ Tout le temps de ta connexion à la VM, **_ne ferme surtout pas la page d'administration_** car c'est elle qui permet d'autoriser la connexion depuis ton IP !

## Étape 1 : Installer l'environnement de production

### Installation du SGBDR MariaDB (MySQL)

```bash
sudo apt update
sudo apt install -y mariadb-server mariadb-client
```

<details>
<summary>SPOILER: Détail des commandes</summary>

On commence par mettre à jour les catalogues des logiciels disponibles sur le serveur (la commande `sudo` permet d'excuter la commande avec les droits administrateur) :
```bash
sudo apt update
```

Puis on installe les packages (logiciels) nécessaires pour gérer des bases de données sur le serveur :
```bash
sudo apt install -y mariadb-server mariadb-client
```

Ici, on a choisi d'installer MariaDB qui est une version open source de MySQL. On a besoin du package `mariadb-server` pour avoir un serveur de bases de données, ainsi que des outils fournis par le package `mariadb-client` (notamment la commande `mysql`) pour interagir avec ces bases de données.

L'option `-y` permet de dire au logiciel `apt` qui sert à gérer les packages installés sur le système de ne pas demander confirmation pour installer les packages demandés.
</details>

### Installation du serveur HTTP Apache

```bash
sudo apt install -y apache2
```

<details>
<summary>SPOILER: Détail de la commande</summary>

Apache est le serveur HTTP que ton serveur va utiliser pour rendre ton application accessible au reste du monde. C'est lui qui permettra de dialoguer avec des navigateurs web et qui exécutera les fichiers PHP.

Cette commande est la même que pour l'installation du SGBDR, sauf qu'on installe seulement le package `apache2` cette fois.
</details>

### Installation de PHP 8

```bash
sudo apt install -y php8.1-common php8.1-cli php8.1-mysql php8.1-intl php8.1-xml php8.1-zip libapache2-mod-php8.1
```

<details>
<summary>SPOILER: Détail de la commande</summary>

Encore une fois, on installe des packages. Cette fois-ci, il s'agit de PHP en lui-même, c'est-à-dire l'interpréteur du code ainsi que certaines de ses extensions et modules :
- `php8.1-common` est l'interpréteur PHP (version 8.1) en soi, il permet d'exécuter du code PHP
- `php8.1-cli` fourni l'interface en ligne de commande de PHP, te permettant ainsi d'interagir avec l'interpréteur directement depuis le terminal
- `php8.1-mysql` est une extension de PHP qui fournit des drivers et des fonctions permettant au code d'interagir avec des bases de données MySQL
- `php8.1-xml` est une extension de PHP qui introduit des fonctionnalités de manipulation de données au format XML et ses dérivés (HTML, etc.), de telles structures sont utilisées par Symfony
- `php8.1-intl` est une extension de PHP dédiée à l'internationalisation et la gestion de traductions, elle est requise par Symfony
- `php8.1-zip` est une extension de PHP qui lui permet de manipuler des archives ZIP, elle est notamment utilisée par Composer pour optimiser le téléchargement des dépendances
- `libapache2-mod-php8.1` est un module pour Apache qui lui permet d'interagir avec l'interpréteur PHP, sans lui il serait impossible de passer les informations de la requête HTTP à PHP et de comprendre les réponses générées par ton code

</details>

### Installation de Composer

> ℹ️ Cette procédure est directement tirée et adaptée de la [documentation officielle de Composer](https://getcomposer.org/download/)

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
```

<details>
<summary>SPOILER: Détail des commandes</summary>

La première commande exécute du code PHP directement dans le terminal pour télécharger le script d'installation de Composer et l'enregistrer dans un fichier `composer-setup.php`.
```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
```

Ensuite, on utilise l'interpréteur PHP pour exécuter le script d'installation (qui n'est autre… qu'un simple script PHP !).
```bash
php composer-setup.php
```

Une fois Composer installé, on exécute du code PHP directement dans le terminal pour supprimer le script d'installation, car on n'en a plus besoin. Tu peux noter que la fonction `unlink()` en PHP sert à supprimer un fichier, elle est directement héritée du langage C.
```bash
php -r "unlink('composer-setup.php');"
```

Dernière étape dans l'installation de Composer : rendre la commande `composer` accessible depuis n'importe où sur ton serveur. En effet, le script d'installation se contente de faire des vérifications quant à ton installation de PHP, de télécharger une archive PHP (c'est-à-dire un très gros script PHP exécutable dont le code a été optimisé pour être interprété rapidement) dans un fichier `composer.phar`. Pour rendre ce fichier exécutable partout, il suffit de le déplacer dans le répertoire système `/usr/local/bin` et de lui donner le nom de la commande via lequel on souhaite l'exécuter, c'est-à-dire `composer` dans notre cas.
```bash
sudo mv composer.phar /usr/local/bin/composer
```

</details>

## Étape 2 : Récupérer le projet

### Préparation du repo

> ℹ️ Si le fichier `public/.htaccess` existe déjà dans ton projet, tu peux directement passer à l'étape suivante

**Depuis ta VM locale (Téléporteur / VM cloud)** exécute cette commande dans ton projet :

```bash
composer require symfony/apache-pack
```

Si ton terminal te demande de confirmer l'exécution d'une "recipe" Symfony pour le Symfony Apache Pack, accepte - ceci génèrera le fichier `public/.htaccess` dans ton projet.

Commit et push 📨 ce fichier, il est indispensable pour la suite !

### Clonage du repo

**De retour sur la VM Server Kourou**, on récupère le code de l'application **(⚠️ _pense à remplacer `<URL>` par l'URL de clonage de ton repo !!!_)** :

```bash
sudo chmod -R o+w /var/www
cd /var/www
git clone <URL> app.site
```

<details>
<summary>SPOILER: Détails de la commande</summary>

Le répertoire dans lequel tu vas cloner ton repo est un répertoire protégé en écriture, il faut donc te donner le droit d'y modifier des fichiers et des dossiers.

```bash
sudo chmod -R o+w /var/www
```
On peut décomposer cette commande ainsi :
- `sudo` - on exécute la commande qui suit avec les droits administrateur
- `chmod` - commande qui permet de modifier les droits d'une ressources (fichier ou répertoire)
- `-R` - on indique que la modification s'appliquera aussi aux fichiers et dossiers enfants, par _récursivité_
- `o+w` - il s'agit de la modification des droits
  - `o` - on modifie les droits des "autres utilisateurs", c'est-à-dire ceux qui ne sont pas propriétaires de la ressource
  - `+` - on indique qu'on ajoute les droits qui suivent
  - `w` - droit d'écriture (🇬🇧 _write_ = 🇫🇷 _écrire_)
- `/var/www` - on spécifie le chemin de la ressource dont on modifie les droits, ici c'est le répertoire `/var/www`

Cette commande-ci devrait t'être familière, on ne fait que se placer dans un répertoire précis :
```bash
cd /var/www
```

Enfin, on clone dans `/var/www` ton repo pour ramener ton code sur ton serveur. Le deuxième argument de `git clone` te déconcertera peut-être, mais il sert seulement à indiquer à Git le nom du répertoire dans lequel on souhaite cloner le repo. Ici, le répertoire qui sera cloné sera appelé `app.site`, tu peux lui donner n'importe quel nom mais il te faudra alors penser à mettre le bon chemin dans les parties concernées plus tard dans ce tutoriel.
```bash
git clone <URL> app.site
```
</details>

> ⚠️ Si Git n'a pas accès au repo GitHub, assure-toi d'avoir généré une clé SSH sur la VM Server Kourou et de l'avoir enregistrée dans ton compte GitHub : [https://kourou.oclock.io/ressources/fiche-recap/git-et-github/#cr%c3%a9er-une-cl%c3%a9-ssh-pour-github](https://kourou.oclock.io/ressources/fiche-recap/git-et-github/#cr%c3%a9er-une-cl%c3%a9-ssh-pour-github)

## Étape 3 : Préparer le projet pour la production

### Préparation de la base de données

Pour créer et configurer la base de données, tu vas utiliser MySQL en ligne de commande :

```bash
sudo mysql -u root
```

<details>
<summary>SPOILER: Détail de la commande</summary>

On utilise ici la commande `mysql` fournie par notre installation du package `mariadb-client` pour se connecter au serveur de bases de données. L'option `-u` permet d'indiquer le nom de l'utilisateur avec lequel on souhaite se connecter.

Comme notre installation de MariaDB/MySQL est "fraîche", le serveur de bases de données ne comporte qu'un seul utilisateur qui a tous les droits : `root`. Cependant, son utilisation est restreinte par défaut.

En effet, `root` ne peut se connecter que via le terminal et seulement si la commande `mysql` est utilisée avec les droits administrateur (via `sudo`). **Tu ne pourras donc pas utiliser l'utilisateur `root` pour te connecter à ta base de données avec ton code !!!**

</details>

Tu devrais maintenant te trouver dans un shell MySQL, c'est un peu comme le terminal de ton SGBDR à l'intérieur de ton terminal.

Crée d'abord la base de données **(⚠️ _remplace `<db>` par le nom de ta BDD !!!_)** :
```sql
CREATE DATABASE <db>;
```

Crée ensuite l'utilisateur qui permettra à ton code de se connecter à ta base de données **(⚠️ _remplace `<user>` par le nom de l'utilisateur et `<password>` par son mot de passe !!!_)** :
```sql
CREATE USER '<user>'@'localhost' IDENTIFIED BY '<password>';
```

Donne les droits à l'utilisateur sur la base de données **(⚠️ _remplace `<db>` par le nom de la BDD et `<user>` par le nom de l'utilisateur !!!_)** :
```sql
GRANT ALL PRIVILEGES ON <db>.* TO '<user>'@'localhost';
FLUSH PRIVILEGES;
```

Sors du shell MySQL :
```sql
EXIT;
```

### Préparation du `.env.local`

```bash
cd app.site
touch .env.local
echo 'APP_ENV=prod' >> .env.local
php -r 'echo "APP_SECRET=".bin2hex(random_bytes(16))."\n";' >> .env.local
```

⚠️ **_Pense à remplacer `<db>` par le nom de ta base de données, `<user>` par le nom de l'utilisateur que tu as créé plus haut et `<password>` par son mot de passe !!!_**
```bash
echo 'DATABASE_URL="mysql://<user>:<password>@localhost:3306/<db>?charset=utf8mb4"' >> .env.local
```

Si tu utilises LexikJWT :
```bash
php -r 'echo "JWT_PASSPHRASE=".bin2hex(random_bytes(16))."\n";' >> .env.local
```

<details>
<summary>SPOILER: Détail des commandes</summary>

On se place dans le répertoire du site :
```bash
cd /var/www/app.site
```

On crée le fichier `.env.local` :
```bash
touch .env.local
```

On y ajoute la variable d'environnement `APP_ENV` avec la valeur `prod` dans le fichier `.env.local`. C'est ce qui va permettre de passer Symfony en mode "production", désactivant ainsi la barre de débug et activant d'autres features d'optimisation comme la mise en cache des templates Twig pré-compilés.
```bash
echo 'APP_ENV=prod' >> .env.local
```

On génère une nouvelle chaîne aléatoire pour le chiffrement des cookies. Tu pourrais tout aussi bien utiliser la même chaîne que dans ton environnement de développement mais il est recommandé de faire en sorte que celle-ci soit propre à chaque environnement pour maximiser la sécurité du chiffrement.
```bash
php -r 'echo "APP_SECRET=".bin2hex(random_bytes(16))."\n";' >> .env.local
```

On insère les informations de connexion à la base de données sous la forme d'une URL tel que recommandé par la documentation de Symfony. Tu peux noter que dans un souci de simplification, la version du SGBDR a été omise ici (elle est facultative).
```bash
echo 'DATABASE_URL="mysql://<user>:<password>@localhost:3306/<db>?charset=utf8mb4"' >> .env.local
```

Dans la même veine que le `APP_SECRET`, tu peux générer une nouvelle passphrase pour les tokens JWT afin de maximiser l'efficacité de leur chiffrement à travers tes différents environnements.
```bash
php -r 'echo "JWT_PASSPHRASE=".bin2hex(random_bytes(16))."\n";' >> .env.local
```
</details>

### Installation du projet

```bash
composer install --no-dev
php bin/console doctrine:migrations:migrate
```

<details>
<summary>SPOILER: Détail des commandes</summary>

L'option `--no-dev` de `composer install` permet de ne pas installer les dépendances qui ne servent qu'au développement et au test de ton application Symfony (fixtures, framework de tests unitaires, etc.).
```bash
composer install --no-dev
```

Après l'installation, tu peux commencer à utiliser la CLI de ton projet Symfony. Commençons par exécuter les migrations de ton projet pour construire la structure de la base de données, car tu l'as en effet créée mais elle est toujours vide à ce stade.
```bash
php bin/console doctrine:migrations:migrate
```

</details>

Si tu utilises 🔑 LexikJWT :
```bash
php bin/console lexik:jwt:generate-keypair
```

## Étape 4 : Configurer le _virtual host_

### Pointage du virtual host par défaut sur le répertoire du projet

> ⚠️ Si ton projet se situe dans un sous-répertoire de ton repo, il te faut remplacer dans la commande suivante `app.site/public` par `app.site/<ton sous-répertoire>/public`. Par exemple, si tu as installé Symfony dans un répertoire `MonProjet` dans ton repo, tu dois remplacer ici `app.site/public` par `app.site/MonProjet/public` !

```bash
sudo sed -i 's#\/var\/www\/html#/var/www/app.site/public\n\n\t<Directory /var/www/app.site/public>\n\t\tAllowOverride all\n\t</Directory>#g' /etc/apache2/sites-available/000-default.conf
```

<details>
<summary>SPOILER: Détail de la commande</summary>

J'avoue, cette commande est carrément barbare 🧌 et, entre nous, franchement pas jolie 🫠

Il faut savoir que le serveur Apache peut gérer plusieurs sites à la fois sur une même machine. Pour ce faire, il utilise ce qu'on appelle des "virtual hosts", c'est-à-dire qu'il configure la manière dont il doit servir les fichiers des différents répertoires des sites concernés de manière atomique et isolée.

À l'installation, Apache n'a qu'un virtual host configuré, qui est son virtual host par défaut. Le fichier de configuration de ce virtual host est, pour la version Debian/Ubuntu d'Apache, `/etc/apache2/sites-available/000-default.conf`. Si tu regardes le contenu de ce fichier avant d'exécuter la commande donnée, tu remarqueras la ligne suivante :

```
DocumentRoot /var/www/html
```

Cette ligne indique que pour ce virtual host, Apache doit servir les fichiers qui se trouvent dans le répertoire `/var/www/html`. Dans ton cas, nous voulons servir les fichiers depuis le répertoire `public/` car c'est là que se trouve le fichier `index.php` qui est le front controller de Symfony ainsi que tous les fichiers statiques (CSS, JS, images…). La commande modifie donc cette ligne en :

```
DocumentRoot /var/www/app.site/public
```

Mais ce n'est pas tout ! Tu te souviens du fichier `.htaccess` ?

Il s'agit d'un fichier de configuration Apache qui permet de surcharger certaines parties de la configuration du serveur ou du virtual host. Par défaut, ce fichier n'est pas pris en compte par Apache. La commande ajoute donc sa prise en charge en ajoutant aussi dans la configuration du virtual host ces lignes :

```
<Directory /var/www/app.site/public>
    AllowOverride all
</Directory>
```

Elles spécifient que dans le répertoire `/var/www/app.site/public` et ses sous-répertoires, Apache doit tenir compte de toutes les directives de configuration qui se trouvent dans des fichiers `.htaccess`. Sans ça, notre `.htaccess` ne servirait à rien.

> ❓**Pourquoi utiliser un `.htaccess` au lieu de tout mettre dans la configuration du virtual host ?**
>
> Le souci avec la configuration du virtual host, c'est que pour des raisons de sécurité, les hébergeurs limitent souvent sa modification à quelques directives (le `DocumentRoot` la plupart du temps, et éventuellement quelques autres). En revanche, la plupart des directives de configuration courantes telles que la réécriture d'URL sont généralement autorisées et prises en compte via les fichiers `.htaccess`. En embarquant la configuration du traitement des URL, propre à l'application indépendamment du serveur sur lequel elle est déployée, plutôt que dans la configuration du virtual host, on s'assure de sa portabilité.
</details>

### Activation du module de réécriture d'URL

```bash
sudo a2enmod rewrite
```

<details>
<summary>SPOILER: Détail de la commande</summary>

Ici, on active le module de réécriture d'URL d'Apache. Celui-ci n'est généralement pas activé par défaut sur une installation vierge, il faut donc l'activer pour que nos règles de réécriture d'URL soient prises en compte.

Si tu as déjà activé ce module, cette commande ne fera rien et t'indiquera juste que le module est déjà activé. 🙂
</details>

### Redémarrer le serveur Apache

```bash
sudo systemctl restart apache2
```

<details>
<summary>SPOILER: Détail de la commande</summary>

Le serveur Apache ne charge ses fichiers de configuration qu'une seule fois, au démarrage. Comme tu viens de modifier un virtual host et d'activer un de ses modules, tu dois redémarrer Apache pour qu'il recharger sa configuration. Si tu n'as pas introduit d'erreur dans la configuration du virtual host, cette commande ne devrait produire aucun message.
</details>

## Étape 5 : Contempler son &oelig;uvre 🤩

Tu dois normalement pouvoir te rendre sur `http://<pseudo>-server.eddi.cloud` et voir ta SPA en production.

Alors, heureux·se ?

## Étape 6 : Mettre à jour l'application en production

Pour mettre à jour la version de ton application en production, connecte-toi à ta VM Server Cloud, puis :

```bash
cd /var/www/app.site
git pull
composer install --no-dev
php bin/console doctrine:migrations:migrate
```

> ⚠️ Même si aucune dépendance n'a bougé dans le projet (pas de nouveau bundle, pas de mise à jour) il est important de lancer un `composer install` à chaque déploiement car Symfony en profite pour exécuter des tâches bien utiles comme la vidange du cache de Twig qui permettent de finaliser la mise à jour.

## Étape 7 (bonus) : Installer Adminer pour administrer la BDD

```bash
sudo apt update
sudo apt install -y adminer
sudo a2enconf adminer
sudo systemctl restart apache2
```

Adminer est accessible sur `http://<pseudo>-server.eddi.cloud/adminer` et tu peux te connecter à ta base de données avec l'utilisateur créé plus haut dans ce tutoriel et son mot de passe ! 🎉

> ⚠️ Adminer "réserve" l'URL `/adminer` sur ton serveur, tu dois donc t'assurer de ne pas définir de route commençant par `/adminer` dans ton projet Symfony !

## Étape 8 (bonus) : Pré-remplir la BDD avec les fixtures

> ℹ️ Les fixtures sont en principe dédiées au développement et au test des applications. En production, on utilise directement de vraies données. En règle générale, si des données doivent pré-exister dans la base de données au premier déploiement d'une application, on préfère faire un export d'une base de données "propre" construite en vue de la mise en production, puis l'importer sur le serveur. Mais dans le cadre d'un projet d'apothéose, on comprend parfaitement que les fixtures puissent remplir aussi ce rôle.

```bash
cd /var/www/app.site
sed -i 's#APP_ENV=prod#APP_ENV=dev#' .env.local
composer install
php bin/console doctrine:migrations:migrate
php bin:console doctrine:fixtures:load
sed -i 's#APP_ENV=dev#APP_ENV=prod#' .env.local
composer install --no-dev
```
