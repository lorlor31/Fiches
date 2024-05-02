# MISE EN PROD SYMFO WEB ENCORE

## Ca va être comme pour un projet symfo.

1. On clone le repo, on configure le .env

2. Import /export de la BDD

- Ne pas oublier d'exporter la bdd localement :

`mysqldump -u username -p database_name > database_dump.sql`

- Puis l''importer sur le serveur : 

`mysql -u username -p database_name < database_dump.sql

3. On crée la BDD et on exécute les migrations 
- `php bin/console do:da:cr`
- `php bin/console do:mi:mi`

4. On installe les dépendances PHP
composer install

## Côté JS :

1. Installer node

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`

- Si ça trouve pas la commande nvm, rajouter ça dans le .bashrc :

` export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" `

- et relancer le shell :

`source ~/.bashrc`

- vérifier que nvm est installé :

`nvm -v`

- Installer la version qu'on veut de node , par exemple :
`nvm install latest`
`nvm install 20`

2/ Installer les librairies js en faisant `npm install ` dans le répertoire du projet symfony

3/ Compiler les assets :
`npm run build`


