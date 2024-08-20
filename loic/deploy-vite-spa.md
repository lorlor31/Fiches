# Déployer une SPA Vite

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

Avoir un serveur, c'est bien 👍, mais avoir un serveur capable de servir notre application, c'est mieux 💯

<details>
<summary>SPOILER: C'est quoi, une app Vite ?</summary>
En fin de compte, une SPA avec Vite, ce n'est qu'un ensemble de fichiers HTML, JavaScript, CSS et éventuellement des images. C'est-à-dire : un site statique !

Et pour servir un site statique, on n'a besoin que d'un serveur HTTP, comme Apache (c'est un des plus utilisés).

Mais la particularité de React / Svelte, c'est que le code doit être transpilé, c'est-à-dire traduit, pour être utilisé par un navigateur. Les fichiers JSX et Svelte sont transpilés en JavaScript, SCSS et PostCSS transpilent vers CSS, etc. Et cette transpilation se fait au moyen de transpileurs souvent codés en JavaScript, nécessitant NodeJS pour pouvoir être exécutés dans un terminal.

Tu vas donc avoir besoin de Node et d'un gestionnaire de dépendances pour générer les fichiers statiques de ton projet, c'est ce qu'on appelle la phase de "build" (🇬🇧 _build_ = 🇫🇷 _construire_). Pour être cohérent avec la spé React, tu vas utiliser Yarn, mais tu pourrais très bien utiliser NPM par exemple, comme ce sera le cas si tu as suivi la spé i++.
</details>

### Installation de Node

> ℹ️ Tu vas installer Node sur ta VM Server Kourou avec [Node Version Manager](https://github.com/nvm-sh/nvm), un outil qui permet d'installer et d'utiliser rapidement n'importe quelle version de Node. Ainsi, tu t'assures que tu exécuteras la version stable la plus récente de Node.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
```

<details>
<summary>SPOILER: Détail des commandes</summary>

D'abord, on télécharge le script d'installation de NVM et on l'exécute avec l'interprète Bash (même programme qui interprète les commandes que tu entres dans ton terminal 😉). Ce script va télécharger NVM, l'installer dans le répertoire personnel de l'utilisateur actuel et ajouter l'alias de commande `nvm` pour ce même utilisateur.
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

On dit à l'interpréteur Bash du terminal de recharger le fichier `.bashrc` de l'utilisateur, car celui-ci contient notamment l'alias de commande `nvm` qu'on va devoir utiliser ensuite. Sans ce rechargement, il faudrait se déconnecter et se reconnecter à la VM pour avoir accès à la commande `nvm`.
```bash
source ~/.bashrc
```

On utilise NVM pour installer la dernière version stable de Node et l'utiliser. Une fois cette commande exécutée, tu peux vérifier la version de Node utilisée avec la commande `node --version`.
```bts
nvm install --lts
```
</details>

### Installation de Yarn (si tu utilises Yarn)

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install -y --no-install-recommends yarn
```

<details>
<summary>SPOILER: Détail des commandes</summary>

Comme on veut installer Yarn depuis le dépôt (= catalogue de logiciels) officiel de Yarn, on doit ajouter les clés de sécurité et l'URL de ce dépôt aux registres de catalogues et de clés du système d'exploitation de la VM. Concrètement, ceci permettra d'utiliser le gestionnaire de programmes de la VM pour installer Yarn. La première commande gère la clé de sécurité, la seconde ajoute le dépôt officiel de Yarn aux dépôts reconnus par la VM.
```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

Avant toute installation d'un nouveau programme, on met à jour les informations des logiciels disponibles via le gestionnaire de logiciels `apt`.
```bash
sudo apt update
```

On installe Yarn. Comme on a mis à jour la liste des logiciels disponibles après avoir ajouté le dépôt officiel, `apt` ira télécharger et installer Yarn depuis ce dernier. Ici, l'option `-y` évite d'avoir à confirmer manuellement l'installation et l'option `--noèinstall-recommends` fait en sorte que Node ne sera pas installé avec Yarn (c'est ce qu'on veut parce qu'on a déjà installé Node avec NVM).
```bash
sudo apt install -y --no-install-recommends yarn
```
</details>

### Installation d'Apache

```bash
sudo apt install -y apache2
```

<details>
<summary>SPOILER: Détail de la commande</summary>

On installe le serveur HTTP Apache avec le gestionnaire de logiciels de la VM `apt`. Si tu avais déjà fait cette opération en saison 8, ne t'en fais pas, cette commande ne fera rien, ou elle fera juste une mise à jour d'Apache si une version plus récente est disponible.
</details>

## Étape 2 : Récupérer le projet

### Préparation du repo

**Depuis ta VM locale (Téléporteur / VM cloud)** crée le fichier `public/.htaccess` dans ton projet et copie ce contenu à l'intérieur :

```
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^.*$ index.html [QSA,L]
```

Commit et push 📨 ce fichier, il est indispensable pour la suite !

<details>
<summary>SPOILER: SPA, routing et réécriture d'URL</summary>

Dans une SPA avec, la navigation est la plupart du temps interceptée et gérée par un routeur (`react-router` dans le cas de React, ou le routeur propre au framework dans le cas de Svelte). Ça signifie que lorsqu'un utilisateur change de page dans ton application, le changement d'URL est contrôlé par ce routeur, qui empêche le chargement d'une nouvelle page et remplace juste le contenu de la page actuelle.

Mais que se passe-t-il si on essaie d'accéder directement à une autre URL que celle de la page d'accueil de ton application ? Avec le serveur de développement de Vite, tout se passe bien, l'application est bien initialisée et ce sont directement les composants de la page correspondant à l'URL qui sont chargés. Cependant, ce ne sera pas le cas avec un serveur HTTP classique une fois qu'on aura transformé ton application en site statique. En effet, le serveur ne saura pas qu'il servira une SPA avec un routeur qui agit côté client (et, entre nous, le serveur, il s'en fiche 🤷) ; on doit donc lui dire de toujours servir au client le fichier qui permet d'initialiser la SPA et son routeur quand on lui demande une URL qui ne correspond à aucun fichier existant.

Dans le résultat du build, ce fichier, ce sera le fichier `index.html`. La configuration Apache ci-dessus indiquent, dans l'ordre :
- d'activer le moteur de réécriture d'URL
- que si l'URL de la requête HTTP ne correspond à aucun fichier existant…
- …alors il faut servir le contenu du fichier `index.html` (l'option `QSA` permet de préserver les paramètres d'URL, et l'option `L` indique au moteur d'URL d'arrêter de chercher d'autres règles de réécriture après celle-ci)

En résumé, ce fichier `.htaccess` permet de faire en sorte que peu importe l'URL par laquelle on accèdera à ton application, c'est bien la SPA et le routeur côté client qui gèreront l'affichage de la page, ou l'erreur si jamais la page n'existe pas.
</details>

> ⚠️ Il est fortement conseillé de mettre tout le code à déployer sur la branche principale (`main` ou `master`) à ce stade, car c'est elle qu'on va utiliser pour le déploiement. En général, on fait ça avec une pull request.

### Clonage du repo

**De retour sur la VM Server Kourou**, on récupère le code de l'application (⚠️ **_pense à remplacer `<URL>` par l'URL de clonage de ton repo !!!_**) :

```bash
sudo chmod -R o+w /var/www
cd /var/www
git clone <URL> app.site
```

<details>
<summary>SPOILER: Détail des commandes</summary>

Par défaut, seul le superutilisateur `root` a le droit d'écriture dans le répertoire `/var/www`. Or, tu es connecté à ta VM en tant que l'utilisateur `student` (tu pensais pas qu'on allait te donner tous les droits, hein ?😏), on modifie donc les droits d'écriture pour que les "autres" utilisateurs comme `student` puissent modifier le contenu du répertoire.
```bash
sudo chmod -R o+w /var/www
```

Là, rien qu'on ne connaît pas, on se place juste dans le répertoire `/var/www`. Pourquoi ce répertoire ? Parce que, par convention, c'est le répertoire dans lequel on met les fichiers des sites qui peuvent être servis par un serveur web. On pourrait utiliser un autre répertoire, mais Apache a déjà configuré ses droits sur ce répertoire quand il a été installé.
```bash
cd /var/www
```

Là encore, la commande doit t'être assez familière. La nouveauté ici, c'est qu'on utilise le deuxième paramètre de la commande `git clone` qui permet de spécifier le nom du répertoire dans lequel Git va cloner le repo. Tu peux utiliser celui qui te convient le mieux mais tu devras alors adapter les commandes et la configuration du virtual host dans ce qui suit. **_Pense bien à remplacer `<URL>` par l'URL que tu utilises pour cloner ton repo._**
```bash
git clone <URL> app.site
```
</details>

> ⚠️ Si Git n'a pas accès au repo GitHub, assure-toi d'avoir généré une clé SSH sur la VM Server Kourou et de l'avoir enregistrée dans ton compte GitHub : https://kourou.oclock.io/ressources/fiche-recap/git-et-github/#cr%c3%a9er-une-cl%c3%a9-ssh-pour-github

### Build du projet pour la production

```bash
cd app.site
```

Si tu utilises **NPM** :
```bash
npm install
npm run build
```

Si tu utilises **Yarn** :
```bash
yarn install
yarn build
```

<details>
<summary>SPOILER: Détail des commandes</summary>

Encore une fois, rien de très sorcier, on se place juste dans le répertoire dans lequel tu as cloné ton repo. Après cette commande, tu peux utiliser `git checkout` pour te mettre sur la branche ou le tag que tu souhaites déployer, si ce n'est pas la branche principale.
```bash
cd app.site
```

On installe les dépendances du projet.
```bash
npm install install
```
```bash
yarn install
```
_NOTE :_ `yarn` fonctionne aussi à la place de `yarn install`

Enfin, on lance le build du projet. Cette commande va transpiler tout ton code et ses dépendances en un ensemble de fichiers statiques dans le répertoire `dist/` à la racine de ton repo. Si tu regardes à l'intérieur de ce répertoire, tu t'apercevras que le fichier `.htaccess` y a également été copié (l'original est toujours dans `public/`). Tu n'as pas besoin de commit le contenu de `dist/`.
```bash
npm run build
```
```bash
yarn build
```
</details>

## Étape 3 : Configurer le _virtual host_

### Pointage du virtual host par défaut sur le répertoire du projet

```bash
sudo sed -i 's#\/var\/www\/html#/var/www/app.site/dist\n\n\t<Directory /var/www/app.site/dist>\n\t\tAllowOverride all\n\t</Directory>#g' /etc/apache2/sites-available/000-default.conf
```

<details>
<summary>SPOILER: Détail de la commande</summary>

J'avoue, cette commande est carrément barbare 🧌 et, entre nous, franchement pas jolie 🫠

Il faut savoir que le serveur Apache peut gérer plusieurs sites à la fois sur une même machine. Pour ce faire, il utilise ce qu'on appelle des "virtual hosts", c'est-à-dire qu'il configure la manière dont il doit servir les fichiers des différents répertoires des sites concernés de manière atomique et isolée.

À l'installation, Apache n'a qu'un virtual host configuré, qui est sont virtual host par défaut. Le fichier de configuration de ce virtual host est, pour la version Debian/Ubuntu d'Apache, `/etc/apache2/sites-available/000-default.conf`. Si tu regardes le contenu de ce fichier avant d'exécuter la commande donnée, tu remarqueras la ligne suivante :

```
DocumentRoot /var/www/html
```

Cette ligne indique que pour ce virtual host, Apache doit servir les fichiers qui se trouvent dans le répertoire `/var/www/html`. Dans ton cas, nous voulons servir les fichiers depuis le répertoire `dist/` créé précédemment par le build de ton application. La commande modifie donc cette ligne en :

```
DocumentRoot /var/www/app.site/dist
```

Mais ce n'est pas tout ! Tu te souviens du fichier `.htaccess` ?

Il s'agit d'un fichier de configuration Apache qui permet de surcharger certaines parties de la configuration du serveur ou du virtual host. Par défaut, ce fichier n'est pas pris en compte par Apache. La commande ajoute donc sa prise en charge en ajoutant aussi dans la configuration du virtual host ces lignes :

```
<Directory /var/www/app.site/dist>
    AllowOverride all
</Directory>
```

Elles spécifient que dans le répertoire `/var/www/app.site/dist` et ses sous-répertoires, Apache doit tenir compte de toutes les directives de configuration qui se trouvent dans des fichiers `.htaccess`. Sans ça, notre `.htaccess` ne servirait à rien.

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

## Étape 4 : Contempler son &oelig;uvre 🤩

Tu dois normalement pouvoir te rendre sur `http://<pseudo>-server.eddi.cloud` et voir ta SPA en production.

Alors, heureux·se ?

## Étape 5 : Mettre à jour l'application en production

Pour mettre à jour la version de ton application en production, connecte-toi à ta VM Server Cloud, puis :

```bash
cd /var/www/app.site
git pull
```

Et enfin, si tu utilises **NPM** :
```
npm install
npm run build
```

Ou, si tu utilises **Yarn** :
```
yarn install
yarn build
```

<details>
<summary>SPOILER: Détail des commandes</summary>

Place-toi dans le répertoire dans lequel tu as cloné ton repo.
```bash
cd /var/www/app.site
```

Mets à jour ton repo en récupérant les dernières modifications depuis GitHub avec un pull. Tu peux en profiter pour te placer sur une autre branche ou un autre tag avec `git checkout` si c'est ce que tu veux déployer.
```bash
git pull
```

Relance une installation des dépendances du projet pour t'assurer d'être bien à jour pour le build. C'est surtout valable dans le cas où une nouvelle lib a été ajoutée au projet ou si une dépendance a été elle-même mise à jour dans le projet.
```bash
npm install
```
```bash
yarn install
```

Lance un build de ton application pour regénérer le répertoire `dist/` (qui ne doit toujours pas être commit).
```bash
npm run build
```
```bash
yarn build
```
</details>
