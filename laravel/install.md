## INSTALLATION - MISE EN MARCHE

Les commandes ci-dessous correspondent au cas où on récupère un projet.
- On installe composer : `composer install`
- Le fichier .env.example doit être copié en .env avec nos valeurs. NB : APP_DEBUG à true en environnement de developpement.
- Génération de la clé Laravel : `php artisan key:generate
- Jouer les migrations : `php artisan migrate`
- Créer les liens symboliques : `php artisan storage:link`
- Quelques tips en vrac récupérés du readme du projet :

```
**Create a command :**
php artisan make:command SendCompletionReminderEmails

**Use a command :**
php artisan signature_value

**Create a mail :**
php artisan make:mail CandidateReminderEmail

**Crontab parameters :**
Edit the file : app/Console/Kernel.php

**Launch all schedule commands in Kernel.php :**
php artisan schedule:run

**List existing schedule commands :**
php artisan schedule:list

**Tips :**
- If the debug toolbar doesn't appear in local, try this command : 
php artisan vendor:publish --provider="Barryvdh\Debugbar\ServiceProvider"

- If the error "php extension fileinfo is missing from your system" appears when you run "composer install", you can run "php --ini" inside terminal to see which files are used by PHP in CLI mode, you need to edit your php.ini and remove ";" before ;extension=fileinfo

- For truncate data it would be necessary to deactivate foreign key checks in mysql client and then reactivate 
SET foreign_key_checks = 0
SET foreign_key_checks = 1

```