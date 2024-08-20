INSTALLER UN PROJET PHP VANILLA 

Exemple de oshoes 
COMMANDES A LANCER POUR INSTALLER LES DEPENDANCES
composer dump-autoload  
composer require altorouter/altorouter
composer require symfony/var-dumper

si bug avec la version php, verifier celle utilisée avec apache dans le fichier php.ini dans var/www/html

idées de debug aussi
vider le cache : composer clear-cache
composer dump-autoload  

Configurer le config.ini en copiant le config.ini.dist
Récupérer la bdd



