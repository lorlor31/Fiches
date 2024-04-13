

===================
# pour avoir les derniers composants installés
composer install 

## mise à jour de la BDD
bin/console doctrine:database:drop
bin/console doctrine:database:create
bin/console doctrine:migrations:migrate
bin/console doctrine:fixtures:load

==================================
Git diff pour voire les différences 
Sinon dans source control en haut à droite, le bouton qui ressemble à des branches git
pour comparer deux texts on selectionne els deux textes et clic droit compare differences
faire ctrl espace por forcer l'autocomplétion >'voir si ça complétet la méthode

git push --set-upstream origin branche" pou pusher ine branche
ctrl +R plusieurs fois pour chercher un mot ds le terminal
ctrl +P?? ds vscode
ctrl + J dans le terminal

pour recuperer du code comme fetch en JS : avec curl ou file_gets_contents en PHP 

in_array

bem notation

taper reference pour chercher de la doc

pour mettre bs dabs un projet rajouter les lignes ds le base
on rajoute un class=container sur le body 

=================================================
pour utiliser bootstrap avec twig dans twig.yaml
twig:
    file_name_pattern: '*.twig'
    form_themes: ['bootstrap_5_layout.html.twig']
on peut fair eavec tailwind etc'
====================================================================================
Si on fait cohabiter le front react et back symfo
 le front react va appeler le back fait en API
on nutilisera pas twig
==================================================================
**nvelle syntaxe d'injection 'ds constructeur**
public function __construct(
        private MailerInterface $mailer,
        private $ownerMail

    ) {
    }


=================================
array_rand

vscode redo ctrl shift z



============================Episode 20 MISE EN PROD===
Script d 'install de Ben
https://github.com/O-clock-Jelly/installation-serveur

LWS hebergeur de ben
**Serveur mututalisé** : on va avoir php souvent mais pour les gros projets ça va être pas adapté, pour une page simple ok
On va passer par le ftp, y a plus qu'à drag and drop'

**Serveur VPS** : on a sa propre vm dédiée sur laquelle on va pouvoir installer ce qu'on veut , en ligne de commande
**serveur dédié physique**
selon l'évolution du siteon pourra upgrader'
Ben conseille un VPS 


ON VA UTILISER le serveur VPS
**serveur VPS**
**bien vérifier qu'on est bien connecté à notre mahcine virtuelle et pas sur notre hôte**'
**on pt se connecter à ssh via vscode**


## INSTALL
adresse dispo : **http://laure-seng-server.eddi.cloud/**

1/ on copie la commande **ssh student@laure-seng-server.eddi.cloud**
qd on se conencte la première fois, on crée un tampon d'identification/empreinte digitale, la machine distante garde un einfo de nous,'
Si on a une erreur, c parce qu'on n'a pplus le tampon
On va virer cette empreinte avec la commande marquée ds le terminal **ssh-keygen -f "/home/student/.ssh/known_hosts" -R "laure-seng-server.eddi.cloud"**
puis on relance la commande de connexion ssh

2/ on pt **changer le port par défaut qui est le port 22 en ssh**, installer des bundles de protection, etc...
Ms le principal, c'est gérer l'installation. Normalement on aura un OS installé, on va installer LAMP, git etc..
Ben a fait un script pour faire ça. **installation-serveur**
Il faut créer la **clé ssh pour le git de la VM** => **ssh-keygen -t ed25519 -C "vm_serveur"**
On va recuperer la **clé publique** et on l'affiche avec cat **cat /home/student/.ssh/id_ed25519.pub**
On va sur **github et on la rajoute'ds settings** pour créer une nvelle clé.
on **clone le repo**,on fait entrée
sh installation-serveur/installation-serveur.sh

sh installation-serveur/installation-serveur.sh
on met le mdp, par dessus les nuages
puis on fait ok ok ok utilsier tab pour aller sur ok
user name et bbdd j'ai mis lorlor'

#NB on met la meme version de php en prod que en dev
PB D installde php qui est pas à la bonne version = Ben a mis à jour le script
sudo add-apt-repository ppa:ondrej/php # Press enter when prompted.
puis
sudo apt update
puis
sudo apt-get install -y php8.2
sudo apt-get install -y php8.2-common
sudo apt-get install -y php8.2-cli
sudo apt-get install -y php8.2-mysql
sudo apt-get install -y libapache2-mod-php8.2
sudo apt-get install -y php8.2-mbstring
sudo apt-get install -y php8.2-json
sudo apt-get install -y php8.2-xml
sudo apt-get install -y php8.2-xdebug
sudo service apache2 restart
=========================
moig l a php8.3.4
https://php.watch/articles/php-8.3-install-upgrade-on-debian-ubuntu

================
ETVOILA LA LE SERVEUR EST INSTALLE !!

====================
On va miantenant passer à l'install  de SYmfony
on va se baser sur l'oflix '
**IL FAUT CLONER DANS /var/www/html** comm eon est sur Apache
la racine du domaine est dans ce dossier
Le nom de domaine, on l'achète ou on pt l'avoir via l'hébergeur' on va faire le lien entre l'ip et l'hébergeur en vrai je crois'
**NE pas oublier de cliquer sur rendre la VM publiqued**
=====
Pb il faut installer composer etc 
====
#INSTALLER REMOTE SSH POUR AVOIR VSCODE SUR LE SERVEUR
On installe **remote ssh**, on a à gauche ""explorateur distant"" puis ds ssh on clique sur le + pour rajouter le lien de ladresse ssh ssh student@laure-seng-server.eddi.cloud
on sauve
On va aller sur l'explorateur distant et on peut s'y connecter ! on clique sur la petite fleche pour se connecter. on sera ds vscode ds notre serveur ! '


# Ds la doc de symfony, on a la partie Production
=> en production == le site en ligne
=> on va installer comoser mais sans les dependances de dev
**PBcomposer c'était pas installé**
`sudo apt install composer`
`composer install --no-dev`
=>verifier si c installé
=>si ca demde update, taper sudo apt install php8.2-xml puis composer install --no-dev
=> en fait on a eu des soucis dc on va installer une autre version de composer plus récente
sudo apt install php8.2-xml



sudo apt install php8.2-intl 

sudo apt remove composer

php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"

php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"


php composer-setup.php


php -r "unlink('composer-setup.php');"


sudo mv composer.phar /usr/bin/composer


**il y a e sais pas quoi=>se mettre en env de prod ds .env**
configurer .env avant l install

créer un .env.local avec la bdd avec la dbb url pseudo mdp nomdelaDb

nb les données sernsibles dvt etre ds le .env.local


ça va créer un fichier .env.php qui va mixer les fichiers .env et ca sera lza référence pour symfo
**composer dump-env prod**
rappel le .env.local est gitignorer pas le .env

##on va s'occuper de la bdd'
**creer la dbb**
php bin/console do:da:cr
()si pb pour creer la db , il manque ptet
sudo apt install php8.2-mysql)
NOTES MOI IL ME MNAQUAIT AUSSI PDO, sudo apt-get install php-pdo-mysql


=========
g eu des soucis ici, je n arrive pas à lancer les migrations
il dit que je n'ai pas les tables
j essaie de creer une bdd depuis la CLI

mysql -u VOTRE_UTILISATEUR -p 
USE votre_base_de_donnees;
source /chemin/vers/votre/script.sql;

et j'ai pu ainsi importe ma bdd depuis un fichier.sql


**lancer les migration**
php bin/console do:mi:mi

=============
install adminer
`sudo apt install adminer`
`sudo a2enconf adminer`
`sudo systemctl reload` apache2`

**erreurs**
on va voir ds error.log ds var/log/apache
redemarrer apache ctl
**sudo apachectl restart

**si ya pas le htaccess il faut installer apachepack composer**
composer require symfony/apache-pack
==>NB c etait oiur ca qu ej'avais que la home'
si ca buggue voir les log il manquait la clé api

**pour utiliser phpmyadmin** pas fait juste regardé
sudo apt install phpmyadmin
choisir apache2
ben utilise le site bcrypt pour chiffrer le mdp

**virtualhodtd**
cd /etc/apache2/   sites available/
pour sudo chown student sites-available/ se donner les droits d ecriuture
creeer oflix.conf
coller le texte
<VirtualHost *:80>
	ServerName laure-seng-server.eddi.cloud
	DocumentRoot /var/www/html/symfo-oflix-gregoclock/public/
	
	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined
	
	<Directory /var/www/html/symfo-oflix-gregoclock/>
		Options indexes
		AllowOverride all
		Allow from all
		Require all granted
	</Directory>	
	RewriteEngine on
</VirtualHost>



puis on fait et ça met le site ds dossier esites nabled 
sudo a2ensite oflix.conf
on redemarre
sudo service apache2 restart

le site est disponibel à l'adresse de server-name
SI TU AS DES PROBLEMES VOIR
/var/log/apache2/error.log
il me manquait php-xml
sudo apt-get update -y
sudo apt-get install -y php-xml





https=>letsencrypt=>certbot
 

INSTALL PHP MYADMIN


#============================Episode19====



**FRAMEWORK DE TEST PHP UNIT**gros framework
les tests vt perm de tester notre algo
avant de mettre en nprod, tout le jeu de tests va être lancé
ça va vérifier que tout marche, qu'il y a aps eu de **régression**,'
c onéreux, il faut conveaincre la boite d'en utilsier'

**Différents types de tests**
1/=>**Tests unitaires** ça teste une petite fonctionnalité de manière isolée ?
2/=>**Tests d'intégration** tester la foncitonnalité et est ce qu'elle s'intégre bien'
3/=>**tests d'application** tests des fonctionnalités du site

**composer require --dev symfony/test-pack**
Ds **bin/on a phpunit()**On regarde les erreurs et on les efface 
on a un **dossier tests** avec bootstrap.php , kernel de phpUnit

**ON LANCE LES TESTS AVEC php bin/phpunit**
#Tests unitaires
Class ou méthode, va récupérer le résultat attendu
Par cvention le dossier tests dt reproduire l'arborescence de symfo. donc src/
**1/ make:test**
**2/choisir le type** : test case-> unitaire kerneltest ->intégration webtestcase-> applicationapi testcase-> api
**3/Choisir le nom** : Ben propose de suivre l'arbo ms aussi de les ranger
**Par exemple Unit\Service\OmdbTest'
**bien finir le nom par le mot Test pour que ça marche**
4/ds le fichier de test on a une **fct testSomething()** qui utilise des **assertions précodées**, on utilise **$this->assert(résultat attendu, variable testée)**
**NB il ft que les fcts commencent par testQqch()**
Par exemple on vt tester fetchPoster()
On pt pas tester séparément comme il dépend d'autres services fetch, client etc...'
5/ On va **mocker dez dependances**, en créant une simulaiton de celles ci 2 manières
**a/ createMock(maClass::class)** va recréer notre objet ms avec des valeurs null qu'il faut reéfinir ' or là il va nous nulller getposter dc c pas bon.
il y a aussi **b/ getMockBuilder(maClass::class)** qui va perm de créer une copie de la classe demandée et 
on va lui préciser ce qu'elle dt ignorer avec **->disableOriginalConstructor()** => pr désactiver les dépendances
**->onlyMethods(["fetch"])**et ce dt on a besoin
on va finir avec**->getMock()** pour récupérer l'objet'
Puis on va recréer les méthodes qu'on a dit càdire fetch()'
$omdbMock
            ->method("fetch")
            ->with("borat")
            ->willReturn(["Title" => "Borat",etc etc  "Poster" => "https://m.media-amazon.com/images/M/MV5BMTk0MTQ3NDQ4Ml5BMl5BanBnXkFtZTcwOTQ3OTQzMw@@._V1_SX300.jpg"]);

        $poster = $omdbMock->fetchPoster("borat");  <== un test
        $this->assertEquals("https://m.media-amazon.com/images/M/MV5BMTk0MTQ3NDQ4Ml5BMl5BanBnXkFtZTcwOTQ3OTQzMw@@._V1_SX300.jpg", $poster);<= le résultat attendu
}

#Tests d intergration
=> on va créer une **bdd de tests**
=> on fait un **.env.test** et on met ses variables d'evrnmt dedans pour la bdd qui s'appellera **maBBd_test**
automatiqmt, il y aura un **rollback**, les actions en bdd seront annulées automatiqmt
**php bin/console doctrine:database:create --env=test**
**attention on refait les migration et toutes les commandes habituelles  avec --env=test**
=>on utilise le bootkernel qui ns permettra d'avoir accès au service container'

        // on lance symfony 
        $kernel = self::bootKernel();
        // on récupère le conteneur de service
        $container = static::getContainer();
        // une fois que j'ai accès au conteneur
        $omdb = $container->get(Omdb::class);
//je sais pas si j ai raté qqch--
=> on crée un tableau de données à teseter en propriété 
=> on utilise les assert pour verifier en bouclant sur le tableau
foreach (self::TEST_CASES as $title) {
            //  fetcher et tester
            $show = $omdb->fetch($title);

            // est ce que je recois un tableau
            $this->assertIsArray($show);
            // est ce que je recois un tableau avec un index titre
            $this->assertArrayHasKey("Title", $show);
            // est ce que le titre recu est le même que le titre donné
            $this->assertEqualsIgnoringCase($title, $show["Title"]);
        }
//on vérifie la réponse
        $this->assertSame('test', $kernel->getEnvironment());
Idéalmt le tableau des données dt contenir des données qui renvoient true, false ts les cas

##WebTestCases : test d'application
=> ça va concerner nos controllers'
=> va y avoir les **crawlers** : il va fr une requete http vers l'url'
=> ensuite on test qu'on a bien une 200         $this->assertResponseIsSuccessful();
, que le H1 est bien le bon '  $this->assertSelectorTextContains('h1', 'Hello World');
assertSelectorTextContains() va texter l'élément qu'on veut'


==================================================================================
##{JWT}
Recap du fctnmt
ce quo'n copie lors de l'install du bundle ds le security.yaml sert à activer le JWT'
=> pr chq route /api on aura l'authentif JWT' qui va checker si on a un token et si le rôle correspond
=> api login check crée le token
on se connecte en mettant ds le json les identifiants de l'utilsiateur'
pour se co on rajoute **le token ds le bearer**
clé publique serrure, clé privée clé
ds git c pas tout à fait pareil
Le json pour créer le JWT aura la forme

{"username":"admin@gmail.com","password":"admin"} où username est la propriété de  User.php

##
probleme du CORS
il faut iben qu'il y ait cette ligne ds le .env'
**CORS_ALLOW_ORIGIN='^https?://(localhost|127\.0\.0\.1)(:[0-9]+)?$'**
Si le .env se met pas à jour avec le code de Ben
**désinstaller : virer du composer.json ou composer remove**
========================================================================

##CORECTION challenge 1 faire qu'à chq erreur sur les routes api, on ait une erreur au foramt JSON, pas une page d'erreur'
A noter refaire la fiche DOctrine event listener
=>attention les Doctrine evnt cycles c pas top
=>l'event listener et ' le subscriber c kif kif, on pt declencher plusieurs events ave cl'un ou l'autre'
la seule dif est que le subscriber est réutilisable comme les events s définis dedans,
les listeners st des servivs branchés sur dse events
Ben préfère les subscribers mais seb dit que c déprécié

**Mise  en place du listener**
**bin/console make:listener**
On crée le listener qu'on déclenche avant l'erreur comme on se connecte 
ds onKernelException()**KernelEvents::EXCEPTION => 'onKernelException',**
=> pour chercher si la route est une route api on va chercher ds request via l'event 
$request = $event->getRequest();
**A NOTER ds un event listener subscriber ,utilser l'event pour retrouver des infos car il contient souvent Request et Response**'
**ttes les erreures de type 400 st des httpexceptions**
ds l'event on a l'**exception ds getThrowable()**'**le message d'erreur est ds getMessage()**'
penser à dumper l'event'

```

final class ExceptionListener
{
    #[AsEventListener(event: KernelEvents::EXCEPTION)]
    public function onKernelException(ExceptionEvent $event): void
    {
        //  vérifier que dans l'url je n'ai pas /api
        $request = $event->getRequest();
        // si jamais l'url ne commence pas par /api on stop le listener car on est sur la version fullstack du site
        if (strpos($request->getPathInfo(), "/api") !== 0) return;
        // je récupère l'erreur grâce à event
        $exception = $event->getThrowable();

        // j'initalise mes variables par défaut en partant du principe que mon erreur par défaut sera une erreur serveur
        $message = "Server error";
        $statusCode = 500;

        // si jamais on est bien sur une erreur http on remplace les variables par défaut
        if ($exception instanceof HttpException) {
            $message = $exception->getMessage();
            $statusCode = $exception->getStatusCode();
        }
        // on utilise maintenant nos variables pour renvoyer du json
        $data = [
            "statusCode" => $statusCode,
            "message" => $message
        ];

        // je crée le json
        $json = new JsonResponse($data, $statusCode);
        // je le met dans la réponse
        $event->setResponse($json);
    }
}

```

#Correction challenge 2
=> rappel de la problematiq : on vt créer un film et son genre, si on précise le id, ça va en créer un nouveau
=> le pb qd on vt recuperer le genre, c que le deserializer ne va pas vérifier si on en a déjà un en BDD


## custom normalizer
=>les **normalizer trasformt les objets en json out aut**=> d'après chatgpt c pas ça , c en tableau'
=> on **denormalise pour passer du json à aut**
=> on va dc créer notre propré normalisedr pour récupérer nos genres et en faire un json
=> la fct normalize va transformer l'objet symfo en json ou autre md nou on veut l'inverse
=>nous on veut denormaliser,ms en fait il sst interchangeables, puisqu'ils auront les mees fcts 
'
Ben dit la syntaxe c un peu comme un voter,, des conditon spour savoir si on lance ou pas le normaliserur
1/ créer un dossier Serializer et un fichier EntityDenormalizer.php
Tout fichier ds ce dossier se lancera automatiquement qd on lance le serailiser??
normaliser ou denormaliser
2/ on extends du Denormalizer
3/ on rajoute les 3 méthodes  nécessaires à un dénormaliseru
la deuxième méthode va renvoyer true ou false, si ça renvoie true, on lance la méthode 1

on se met sur la route api/shows
Explications sur **supportsDenormalisation**

$data l'id '
$type->l'entité de ce quiest dénormalisé
$format
$context = on met des groupes dedans pour éviter les relations circulaires

On vt lancer la denormalisation pour toutes les entités 
le but c de récupérer l'id ds la fct 1 pour pouvoir récupérer le bon genre d'après son id'
        return $this->entityManager->find($type, $data);=> pour récupérer avec l'em 
c'est à dire find(entite, id)'

===========================

## DENORMALISER MADE IN BEN  => à se mettre dans un repo :)

<?php

namespace App\Serializer;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class EntityDenormalizer implements DenormalizerInterface
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    public function denormalize($data, $type, string $format = null, array $context = []): mixed
    {

        // j'arrive ici que quand c'est une entité que je cherche via le json, du coup on va la chercher en bdd, le type c'est le fqcn et data c'est l'id
        return $this->entityManager->find($type, $data);
    }

    public function supportsDenormalization($data, $type, string $format = null, array $context = []): bool
    {
        //  vérifier si on parle d'une entité et qu'on a en valeur uniquement un nombre

        // si le type dénormalizé est une entité et que sa valeur est un nombre je sais que je vais devoir aller chercher une valeur en bdd donc j'active le dénromalize avec un return true
        if (strpos($type, "App\Entity") === 0 && is_int($data)) {
            return true;
        }
        // dd("data : $data", "type : $type", "format : $format", $context);
        return false;
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            "object" => true,
        ];
    }
}

================================


#============================Episode18=====
Rappel un endpoint APi c une route qui donne accès à des ressources

#CORRECTION 
=> un **controller par endpoint** dit Ben
=> pour éviter le pb des relations circulaires, on peut ignorer des attributs, là par exemple ignorerles shows = l'entité '
Exp :return $this->json($genreRepository->findAll(), 200, [], 
**[AbstractNormalizer::IGNORED_ATTRIBUTES => ['shows']]);**
=> NB à noter : pout le code http de reponse, on peut soit écrire juste le code exple **200**, soit écrire **Response::HTTP_OK** codes courant 200 201 204 401 403 422=> quand il y a des erreurs sémantiques sur l'entité'
=> attention pour nommer nos route convention :
**/collection/{id}/sousCollection**
=>Attentionn à noter aussi bien préciser la méthode http de la route  ds son nom de la route GET  ou POST

=> NB j'ai pas pensé à fr ça, on réutilise les groups pour récupérer les filsm d'un genre'

=>NB si on veut pas que ça fasse une erreur et pouvoir renvoyer sa propre erreur, **rendre $genre nullable** pour que ça envoie pas une exception e tqu'on pnuisse renvoyer un json d'érreur'
 public function getShowsByGenre(Genre $genre = null): Response
    {
        if (!$genre) {
            return $this->json(["error" => ["message" => "Genre inexistant"]], Response::HTTP_NOT_FOUND);
        }
En vrai la 404 restrzeint déjà mais bon pour que ça soit propre, on renvoie du JSON meme ds ce cas.
*


=> **POur faire un create**
dans Postman
mettre la methode post et choisir dans le **body Raw puis JSON**(à droite), on y rentre notre json 
On va créer une variable $data qu'on convertit en JSOn'
on va importer le **serializer interface pour transformer le JSOn en objet Symfo=deserializer**

    $movie = $serializer->deserialize($data, Show::class, 'json => format de départ de la data');
Il faut tester qu'on a bien un JSON'
try {
            // je transforme le json brut en entité show
            $show = $serializer->deserialize($data, Show::class, 'json');
        } catch (NotEncodableValueException $exception) {
            return $this->json([
                "error" =>
                ["message" => $exception->getMessage()]
            ], Response::HTTP_BAD_REQUEST);
        }

Dans le cas où la personne a mal rempli sa requete on envoie une 400 => bad request
Rappels 500 erreur server 400 erreur de l arequete HTTP_BAD_REQUEST
=>**validation des données**
On v autiliser le **validator** qui va pouvoir au cas où afficher les erreurs au client
On va l'importer en param et on va utliser la méth validate()
        $errors = $validator->validate($show);
Si on a des erreurs on va se **creer un tableau d'erreur** avec le nom de la **propriété en index** qui est ds **propertypath** et l'**erreur en valeur** qui est dans message, et on convertira ce tableau en JSON
=>on envoie une **422**
=>ben ns parle de https://github.com/omniti-labs/jsend mais c pas top ,
=> à la fin on persiste et on flush avec l'em'
=> à la fin d'une création la norme REST est de fr une **redirection vers la ressource créée**, comme avec header location en PHP, on utilise là 
        return $this->json($show, Response::HTTP_CREATED, ["Location" => $this->generateUrl("app_api_show_read", ["id" => $show->getId()])]);
se faire un reacaps ur la method json de abstractCOntroller 

On pt voir la redirection en vérifaint ds le header de la requete 
Exemple de create de Ben

#[Route('/api/shows', name: 'app_api_show_create', methods: ['POST'])]
    public function create(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager, ValidatorInterface $validator): JsonResponse
    {

        // je récupère le json en brut dans la requête
        $data = $request->getContent();

        //  gérer le cas ou le json n'est pas au bon format
        try {
            // je transforme le json brut en entité show
            $show = $serializer->deserialize($data, Show::class, 'json');
        } catch (NotEncodableValueException $exception) {
            return $this->json([
                "error" =>
                ["message" => $exception->getMessage()]
            ], Response::HTTP_BAD_REQUEST);
        }

        // on check s'il y a des erreurs de validations
        $errors = $validator->validate($show);
        if (count($errors) > 0) {

            $dataErrors = [];
            // si je suis la c'est que j'ai forcement un tableau d'erreur donc je boucle dessus
            foreach ($errors as $error) {
                // j'ajoute le message d'erreur à l'index correspondant à l'attribut ou il y a un soucis
                $dataErrors[$error->getPropertyPath()] = $error->getMessage();
            }

            return $this->json(["error" => ["message" => $dataErrors]], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $entityManager->persist($show);

        $entityManager->flush();

        //  appeler les films en bdd
        return $this->json($show, Response::HTTP_CREATED, ["Location" => $this->generateUrl("app_api_show_read", ["id" => $show->getId()])]);
    }


RECUPERER UNE RELATION
si on rentre l'id de genre ds le tableau, ça récupère pas, il y a une erreur' cannot persist cascade
Sinon si on met un jsnon abevec les caractéristiques du genre, on va créer un nouveau genre , ce qu'on ne veut pas...'
=> chercher ds serailiszer

API PLATFORM va créer les routes api et tout avec Symfo


##SECURISTAION des routes 
On va pouvoir passer dans le security.yaml et sécuriser
On va utiliser le **JSON WEB TOKEN JWT** acces stateless
il est plus sécurisé que l'api key.
Rappel un POST n'est pa splus séxure qu'un GET, c surtout le fait que ça soit en https qui va compter
On a une route de connexion. La session sera chiffrée ds une suite de caractère.

**LexikJWT https://github.com/lexik/LexikJWTAuthenticationBundle/blob/3.x/Resources/doc/index.rst#getting-started**
On va utioliser le service lexivjwt  **composer require lexik/jwt-authentication-bundle**
Ben ns montre **bundle.php**, il dit ds quel envrnmt(dev/prod/test) se lance un bundle. all=> true , se lance ds ts les evrnmts
Des fois en prod il faut bien que ça soit pareil qu'en dev
En test ca sera pas forcement les memes données, les memes logiques... Dc ce qu'on a en tests, cpour les tests automatisés, pour aps flinguer notre dev'
Pour changer d'envrnmt, c ds le .env => APP_ENV
**Le JWT va ê activé ds ts les evrnmts**
on va généerer sa clé avec **bin/console lexik:jwt:generate-keypair**
on va avoir le **dossier /config/jwt** et bien sûr il est ignoré automatiqmt par .gitignore
On pt régler ds lefichier config, durée de vie du token 3600seconds.
**paramétrage de l'app**
mettre la partie login avt la partie API, pareil pour une partie main'
on copie la doc ds **security.yaml** ( section Configure application security
)
Ds le routes.yaml on rajoute ça api_login_check:
    **path: /api/login_check** => ça crée une route api/login check

**Recuperer un jwtoken via la CLI**
on va créer une route pour exécuter la commande-> non, elle est créée automatiqumt
ds l'username, on met bien ce qui crrspd au name ds notre entité user c à dire le mail'
**Question cmt récupérer les noms user à partir du token ?**
on va mettre un eventListenir sur authentification pas compris xsecurity.authentification .success
on se branche sur l'event pour récupérer les données user'
l**e token va ê stocké côté client et réutilisé,**
si le token expire on en regenere un

**Fr passer le token**
on le fait passer da le authorization header ou en query param
ben a jusste collé son token dhs le hezder de lab requetee ds postman
le jsonwt permet de fr l authentification

Problematiq : on vt renvoyer l'erreur ms on n'a pas de route=> utiliser un event sur l'erreur'
attention detail l erreur sur la response envoyait deud fois l erreur car ds le schema de symfo, il y a comme une deuieme simulation de l'erreur
**'requesttype** ds le responseevent, on a a la meth is mainrequest qui va rencoyer true ou false
        if (!$event->isMainRequest()) return;
**Si on voit des erreurs en double creuser de ce cote là**

#**CORS**
on a un nom de domaine  qi essaie d acceder a un aut nom de domaine B
c est pas autorise par les cors
il va falloir qu'on enleve les cors error pour le dev entre front et back
on va utiliser le **nelmioCORSbUNDLE**
ca a raouté le fichier package/nelmioCOrs.yaml
on y mettrea les serveurs autorisés allow origin *
    paths:
        '^/': 
            # allow_origin: ['*']
on pt sinon mettre ler serveur dun front ds ce path









#============================Episode17=======


#API REST https://www.restapitutorial.com/resources.html
Une API REST c 'est une API web qui respecte certaines contraintes'
**6 contraintes** :
1/**uniform interface** : meme interface pour tous, les 2 parties client et server pvt évoluer indépendammt, on va fr d'un côté un front l'autre le back'
2/ **ressource based** : il ft que depuis l'URL , on pt aller direct aux ressources, ça va pas àç la BDD mais à un chemin vers ces datas
Une donnée est une ressource. 
Une **ressource est le nom de l'entité au pluriel**'
3/**stateless** : hors API, le server va se rappeler de la session par exemple pour faire fctner la navigation. Ds les APi y a pas de mémorisation, ya pas de session.
Chaq requete est autosuffisante, indépendantte. La clé API 
4/**cacheable**: le client pt cacher les réponses, pas besoin de recharger les données => on npourra le fr ds symfo

4/client server
5/**layered system and code on demand** : syst scalable, maineanble avec séaparation des composants, 

JsonWebToken => il ctiendra plus d'infos' permettre a de gérer les roles

insomnia

##CREER SON API
=> plein de sits sont à la fois site fullstack et API independante
=> On va fr un dossier Api
=> on va créer un controller exprès Api\MovieController
Ah non, lol ben ns montre qu'on pt faire un **make:controller --no-template**
ça va créer une route avec nom app_api et qui renvoie du JSON
ds insomnia il crée un dossier avec ts les endpoints de movie
On dt transformer les entités symfo en json ==**normaliser**
Il faut installer le traducteur **composer require symfony/serializer-pack**

ça va dire on a une **réference circulaire**
c quand une entite va fr reference à une autre qui va fr réference à l'autre'
Il y a deux méthodes :1/ l'une va utiliser une callback qui va normaliser un attribut quo'n va lui dire, par exemple l'id'=> pas réussi à montrer

**attributes groups**=>
qd on va recuperer une entité, on ne recupere que les groups.
par exmeple pour le groupe movie, On va recuperer ts les ids qui ccrrspondent aux relations via leur id
il faudra fr attention à pa mettre ds le meme groupe reviews et getmovies.
Le pb c que ça colle pas aux entités, c'est bien à faire quandon a un prjet débutant.'

on pt mettre le groupe sur la classe, ça va lzm ttre sur toute l'entité
#[Groups(['shows'])] ds l'entité'=> ré cupère les infos de shox ms pa les relations
On va creer ds chq entite a un groupe à son nom #[Groups(['casting'])]
, si on vt recup des elemts liés à son entité, 
et sur les sttributq qui st liés on met des ss groupes #[Groups(['nomdelentiteLinked'])] pas sur les relations
on pt mettre autant de grp qu'on vt , séaprés par des,'
penser à use **use Symfony\Component\Serializer\Annotation\Groups;**


et ds la route on fait
#[Route('/api/shows', name: 'app_api_show_list')]
    public function list(ShowRepository $showRepository): JsonResponse
    {
        //  appeler les films en bdd
        return $this->json($showRepository->findAll(), Response::HTTP_OK, [], [
            "groups" => ["show", "castingLinked", "reviewLinked", "userLinked", "seasonLinked", "genreLinked"]
        ]);
    }

**ds la création des groupes, on réfléchit si on a besoin de ttes les propriétés ou pas**

challe
endpoint pour un genre
films pzrv genre
creer un film

##CORRECTION ETOILES
il crée un fragment stars
il gere 3 groipes d'étoi;es
il se dit qu'il y en a 5 à relpmir'
**TwigDslepartial,on lui encapsule des variables**
with
with only**
comme ça le rating fera reference un coup à show.rating un coup à review.rating
        {% include "fragments/_stars.html.twig" with {rating:show.rating}%}







#CORRECTIONDU CHALLENGE

On crée le subscriber MaiçntenanceSubscriber
On choisit de se mettre sur le Response Event
Pour récupérer le contenu de la Response getCOntent pour accéder au contenu de la réponse
On va remplacer le </nav> par notre partie qui complète avec la fct str_replace()
On utilise setContents pour appliquer notre contenu
**marqee** balise html pour faire la bannière moluvante mais dépassé
Pour rendre le message optionnel, rajouter une variable ds le .env


NB .env.local de Ben y a que le nécessaire
DATABASE_URL="mysql://ben:admin@127.0.0.1:3306/jelly_oflix?serverVersion=10.3.39-MariaDB&charset=utf8mb4"
MAILER_DSN=mailjet+smtp://36df9657ba32d60bc9fd67c67ed54112:a162cfbfeee384e12fe201a314c5c88e@in-v3.mailjet.com
OWNER_EMAIL=benjamin.bailly@oclock.io
API_KEY="6b6ebf30"
APP_MAINTENANCE="Maintenance prévue le 09 mars de 11h à 12h"

NB a noter  ptet faire un topo sur le serv.yaml ds le memento
ds le **serv.yaml on a parameters**, c des parametres globax qu'on pt utiliser depuis les controllers, les services'
    app.maintenance:"%env(APP_MAINTENANCE)%"
pour y accéder ds son service, on va l'injecter via son cstructeur'**private ParameterBagInterface $params**
 on pourra l'utiliser **$this->params->get("app.maintenance"));**

Ben ns montre que si on commente la variable
    app.maintenance: "%env(default::APP_MAINTENANCE)%"
si on rajoute **default::** ça va renvoyer une variable nulle meme si elle existe pas
meme si on commente la variable
email de l'admin du site, un état du site qui transite ds plusierus servcies'

**Lifecycle callback**
       $this->updatedAt = new \DateTimeImmutable("now", new \DateTimeZone("Europe/Paris"));

#[ORM\HasLifecycleCallbacks]
en haut de l'entité' au dessus de Class
    #[ORM\PreUpdate] au dessus e la propriété


Corerection de la moyenne des review
**Dés qu'on accède à un event ds l'entité, on accede à cette entité**
On va créer un service=> créer la class et son nameSpace ReviewLIstener.php
Et sa function
On va ds le serv.yaml et on rajoute les bonnes propriétés
App\EventListener\ReviewListener:
        tags:
            -
                # these are the options required to define the entity listener
                name: 'doctrine.orm.entity_listener'
                event: 'prePersist'
                entity: 'App\Entity\Review'
                method: 'updateMovieRating'



events doctrine les plus utilisés
**preRemove prePersist preUpdate**
il suffit de fr dd($reviex) et on l'a ! '



Soluce de seb : 
public function findAverageRating(int $id): array
   {
       return $this->createQueryBuilder('r')
           ->select("avg(r.rating)")
           ->andWhere('r.movie = :id')
           ->setParameter('id', $id)
           ->getQuery()
           ->getOneOrNullResult()
       ;
   }

**ManyToMany bug**
**review est le maitre c lui qi a le droit de fr l'ajout en BDD , il ne rend pas de compte à son entite esclave***
dc pour la modif il fau tla faire à partir de l'esclave pour que ce dernier prévienne le maitre et mette à jour les oinfos de son côté aussi.

**ne pas flusher ds les events INTERDIT**
**ne pas fr de sessions ds le cosntructeur**

en fait quand on uitilise l'event prepersist, ça s epositionne avant le flush dc le fl;us sera faitautomatiqmt après par symfo.'

#============================Episode16=========
Ben ns parle du cas où on vt modifier l'abstractCOntroller pour que ça soit plus simple ms c pas une bonne pratique de modifier le code du framework, 
et en plus on reinitialise en composer installant
Si on vt modifier le comportement du logiciel en lui meme, la fonctionnalité existe ds ts les frameworks,
c les **events - event listeners**
Il y a des sortes de 'portails' qui permettent de rentrer ds le code de Symfony et de lui rajouter notre code
Par exemple si on vt recalculer les notes des films à chaque fois qu'on rajoute/modifie  des review, ça va le fr tout seul

Autre exemple d'utilisation
On fait notre api. Les routes menent au JSON. Mais si y auine erreur => en symfoi, c un epage, il faudra créer un code pour renvoyer le code en json '
On va pas aller changer l'apparence des erreurs ds Symfo ms créer une fonctionnalité pour faire ça'

Rappel Symfony :http kernel doc
Principe de base : Lire la Request et créer la response
Ds le schema de syfo, l'erreur sort de nulle part en haut du schéma=> a voir plus tard'

##Events :
symfony déclenche les events liés au kernel
2 moyens d'écouter les events similaires avec des ecritures différentes
**event subscriber** utilisés par symfo
**event listener** 
La seule différence est que **le subscriber est réutilisable** comme il contient la description de l'event alors que **le listener est un service, il faudra le déclarer ds le service.yml**, on va choisir de les déclencher ou pas'. 


##Cas pratique
On va créer un subscriber avec le maker **bin/console make:subscriber**


Ben donne le nom de l'action au subscriber RandomMovieControllerSubscribedr'
**Puis il ft choisir où  se brancher ...kernel.controller,exception,request,repsonse, vue, l,... => à ql event on souscrit**
**Se réferer au schéma de la doc, pendre l'event qui crrspond à l'étape d'avant,** par exp si je vx des chagmts ds la view, je prends cleui d'avant' '
Faire des dd pour les voir, comme ça quand l'event est déclenché, on voit que ça s'arrete
on rajoute notre logique ds **onKernelController**
On récupère **event** qui a plein d'infos cf dd($event)'
Puis
=>recuprer un film au hasard
Ds le showrepository
On pt pas le fr en DQL ou avec le queryBuilder parce que rand ne fctne pas
On va créer une requetes SQL classique ms poru l'executer n,il faut passer par '
        $conn = $this->getEntityManager()->getConnection();
        $resultSet = $conn->executeQuery($sql);
cette méthode est appel&e ds le event subscriber ds le kernelController
=>pour twig, qui est un srevice, on va lui rajouter une nvelle var globale depuis mon subscriber
pou injecter twig on met en param du constructeur du subscriberprivate Environment $twig
puis on va se lettre le film en variable globale grâce à  **$this->twig->addGlobal**("randomShow", $show);
on pourrac accéder à randomShow sur toutes les pages

POUR RESUMER L IDEE 
**l'event va se placer sur le "chemin" de la procédure , par exemple sur le chemin de l'execution du controller, du coup ts les controllers serton concernés et dc ttes les vues'**

##2e Cas pratique Doctrine events 
L'url est pas seo friendly movie/id
On va vouloir avoir un **slug**  => exp : le-titre-du-film
L'idéal c de combiner le slug et l'id'
On va rajouter unepropriété slug à l'entité Show et qu'à chaque fois qu'on 'on crée ou moidfie le titre, elle est setté le slug.
Avec un event, ça sera plus simple !
Il y a aussi des **event doctrine** ! qu'on appelle **lifeCycle Events**'
https://www.doctrine-project.org/projects/doctrine-orm/en/current/reference/events.html#events-overview
3 manières
**Lifecycle callbacks**, directemt ds l'entité', on crée une fonction avec les attributs spécifiqs #[ORM\HasLifecycleCallbacks]
**Entity listeners** sera appelée pour une entité en particulier
**Lifecycle listeners** similaire ms st appelées sur n'importe ql entité'=> pas assez spécifiq
Ben préfère la 2/ parce que la 1/ mélange de la logique ds l'entité et la 3/ est trop généralisre'
Events à choisir prepersist et preupdate, le preflush a un cptmt bizarre, ben a dit que ça avait buggué

On crée le ShowListenre comme un service classique ds un répertoire Eventlisteners
on copie de la doc pour mettre ds le serv yaml
    App\EventListener\ShowListener:
        tags:
            -
                # these are the options required to define the entity listener
                name: 'doctrine.orm.entity_listener'
                event: 'prePersist'
                entity: 'App\Entity\Show'
                method: 'slugifyTitle'
Ainsi l event se lance a chaque creation
Et en plus on peut avoir acces au film
On fait la meme sur le update event pre

pour slugifier,il existe une fonction déjà ! **setSlug()** qui 
        $show->setSlug(strtolower($this->slugger->slug($show->getTitle())));

use Symfony\Component\String\Slugger\SluggerInterface;
puis on utilise  le slug ds la route

POUR LE CHALLENGE UTILISER le lifecycle calback pou rla date et le listener pour la note

#============================Episode16=========
challenge
g créer les propriétés à la main ds l'entite puis regenerate, make mi et mimi cétait ça qui'l fallait faire '??
noter une bonne fois pour toute la date ds memento

**Attention bien pense rà mettre les contraintes et les null/ default / qd on crée les prorpiétés**
Ds le cstructeur on donne une valeur par défaut


**ROUTERFORNT ET ROUTER BACK** => pas compris son explication

**NB bonne pratique**
C mieux de créer une requete pedrsonnalisée pour l'appeler dans la comande personnalisée'

**querybuilder** rajouter ses commandes ds memento
par défaut ça fait un sélect
si on vt faire un emise à jour on dt donc rajouter -**->update** et  remplacer **getResults par execute**
pour mettre des parametres ->setParameter

public function deactivateOutdated($delay = 7)
    {
        return $this->createQueryBuilder('q')

            // pour réaliser une mise à jour et non une selection il faut utiliser les méthodes update et execute
            ->update()
            // si updated at est inferieur au délais
            ->where("q.updatedAt < :delay")
            // ou qu'il n'y a pas d'updated at et que created at est inferieur au delay
            ->orWhere("q.updatedAt is NULL and q.createdAt < :delay")
            ->setParameter("delay", new DateTime("-$delay days"))
            ->set("q.active", 0)
            ->getQuery()
            ->execute();}
**EVITERDE FR DE SS requetes opur rien !!**

**fixture**a noter
Ben a mis 
            if (mt_rand(0, 1)) {
pour créer des updated at null

**rappel besoin du constructeur de Command pour que ça marche**

**COMMANDES ARGUMENTS ET OPTIONS**
les **arguments** st des mots séparés d'espace, ordonnés'
on y a acces avec input->getArgument('clé')
addArgument('nom',numéro(1required2optionnal4isarray),descript)
les options st pas ordonnées on met--monOption, st généralement optionnelles,ms on pt créer une condition pour qu'elle soit obligatoire'

créer une option
            ->addOption('delay', "d", InputOption::VALUE_REQUIRED, 'How many days you want to go back for deactivate questions');
la description se verra avec --help
pou recuperer la valeur $delay = $input->getOption("delay");
->addArgument("id", InputArgument::OPTIONAL, "Id of the question you want to interact")
->addOption("action", "a", InputOption::VALUE_REQUIRED, "When you pass an id you MUST specifie an action [activate or deac")
->addOption('delay', "d", InputOption::VALUE_REQUIRED, 'How many days you want to go back for deactivate questions');

Ds la console, il suffit de mettre throw \Exception
**throw new Exception**("actions valids are 'activate' or 'deactivate'");
pour enviyer une erreur et arrêter la commande 

**Ben a fait un tableau associatif pour associer l'action à la valeur de $active, ça évite des if'**


Copie de sa commande :


<?php

namespace App\Command;

use App\Entity\Question;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:questions:deactivate',
    description: 'handle the status of questions',
)]
class QuestionsDeactivateCommand extends Command
{
    //  construct avec entityManager
    public function __construct(private EntityManagerInterface $entityManager)
    {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument("id", InputArgument::OPTIONAL, "Id of the question you want to interact")
            ->addOption("action", "a", InputOption::VALUE_REQUIRED, "When you pass an id you MUST specifie an action [activate or deactivate]")
            ->addOption('delay', "d", InputOption::VALUE_REQUIRED, 'How many days you want to go back for deactivate questions');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        // récupération de l'argument
        $id = $input->getArgument("id");
        $action = $input->getOption("action");

        // tableau d'action pour pouvoir réutiliser dans mon code plus loin
        $actions = [
            "activate" => true,
            "deactivate" => false
        ];

        // est ce que j'ai un id et une action s'il manque un seul je ne réalise pas la suite 
        if ($id && $action) {
            if (!array_key_exists($action, $actions)) {
                throw new Exception("actions valids are 'activate' or 'deactivate'");
            } else {
                //  1 - récupérer en bdd la question
                $question = $this->entityManager->getRepository(Question::class)->find($id);
                // 1.2
                if (!$question) {
                    throw new Exception("Id is not valid");
                }
                //  2 - changer le isActive
                $question->setActive($actions[$action]);
                //  3 - flush
                $this->entityManager->flush();
                //  4 - return 
                $io->success("la question avec l'id : $id a bien été '$action'");
                return Command::SUCCESS;
            }
        }
        if ($id && !$action) {
            throw new Exception("you MUST define an action with an id");
        } elseif ($action && !$id) {
            throw new Exception("you MUST define an id with an action");
        }

        // je récupère mon option
        $delay = $input->getOption("delay");
        // si mon option n'est pas renseigné je met une valeur par défaut qui est 7
        if (!$delay) $delay = 7;

        //  appeller la bonne méthode du repository
        $this->entityManager->getRepository(Question::class)->deactivateOutdated($delay);
        $io->success('Success');

        return Command::SUCCESS;
    }
}

NB **si je protege un truc côté front le protéger coté back Si j'ai enlevé le form en front=> enpecher de le créer en back'**
// c'est juste une sécurité anti petit malin
            if (!$question->isActive()) {
                throw $this->createAccessDeniedException("La question est bloqué");
            }

#============================Episode15 ============

## REQUETES HTTP API
=> Problématiq : si les images st plus sur les sites, liens morts , pas d'image'
solution hardcore :scanner automatiqmt les images qui ne fctnent plu spar des images qui crrspdt en ls cherchant sur une APIM
solution plus cool remplacer ttes les images du site par des images d'une API'
Objectifs du jour 
se conencter à l'api et  récupérer une image qui correspond au titre => automatiser tout ça
On va récupérer des images à partir de omdb
g vrée mon compte sur lorlordevweb
exp : http://www.omdbapi.com/?apikey=675aac68&t=titanic

On va créer le service Omdb.php qu'on injecter ds notre controller'
Pour faire les requetes client comme fetch en JS on va utiliser une librairie externe pour faire ça soit **guzzle**
Mais ds symfony on a le composant **httpClient( qui utilise guzzle)**  qui va gérer les requetes synchrones et asynchrones

Donc en résumé on a besoin
**composer require symfony/http-client**
de sa clé APi qu'on va là mettre ds le .env pour l'utiliser ds notre service'
Ds notre service, on récupère le client et la clé ds le constructeur

Dsle service yaml on rappele au conteneur de service qu'il y a besoin de la variable api key'
    App\Service\Omdb:
    # Les paramètres, paramétrable du constructeur du service
        arguments:
        # la correspondance du paramètre et sa valeur
            $apiKey: '%env(API_KEY)%'
La clé API est dans le .env  **API_KEY="6b6ebf30"**

**RESUME A SYNTHETISER définir la var ds le .env, dsle service yaml et l'appeler via le conteneur de servcie' => réflechir si c bien formlulé**
On se **crée r une fct fetch** ds le service, comme ça on va l'appeler ds notre controller'
public function fetch()
    {
        //
        $response = $this->client->request(
            'GET',
            'http://www.omdbapi.com/'
        );
        dd($response);
    }
Pour l'instant 'ds la reponse, on a
getContents qui recupere tte la page comme on a mis l'url du site et pas une API'



Pour recuperer le titre on aurait pu faire je sais pas quoi
ms pour faire plus propre, on va recuperer les params de la la querystring ds **query()**


 public function fetch()
    {
        //
        $response = $this->client->request(
            // la method HTTP
            'GET',
            // L'url
            self::URL,
            // Les options
            [
                "query" => [
                    "apiKey" => $this->apiKey,
                    "t" => $title
                ]
            ]
        );
        $content = $response->getContent();
        dd($content);
    }
}

=> method url reponse

Ensuite on pt convertir le json en tableau grâce à toArray() **$content = $response->toArray();**

Pour récuperer l'image juste et tester le cas où il n'y en a pas dans l''API'
public function fetchPoster(string $title): ?string
    {
        $show = $this->fetch($title);

        if (!array_key_exists("Poster", $show)) {
            return null;
        }

        return $show["Poster"];
    }

Maintenant on va automatiser

##Automatisation de tâches avec le composant console
=>si on fait bin/console list on va voir ttes les commandes
=> on pt avec bin/console créer ses propres bundles aussi
=> on pt créer ses commandes 
Elle doit étendre de la classe Command.
On la crée avec **make command**
Par convention on l'appelle app:macCOmmande pour distinguer les commandes perso des commandes natives '
ça a crée le fichier maCOmande.php dans le dossier Command
il est déjà prérempli:
description c ce qu'on aura ds la liste de bin/console list'
s
**Constructeur**si besoin d'injecter des services'
 public function __construct(private Omdb $omdb, private EntityManagerInterface $entityManager, private MailerService $mailer)
    {
        // permet d'appeller le constructeur parent car il est OBLIGATOIRE pour faire fonctionner une commande
        parent::__construct();
    }
ds configure() : on aura les parametres, par exemple le nom di controller ds makecobtrtolller

**execute()**
les commandes qui s'exécutent'
**$io = new SymfonyStyle($input, $output);**
pour styliser sa cmde, on utilise l'objet 'SymfonyStyle, input correspond aux entrée utilisateur
,output correspond aux infos qu'on affichera à l'utilisateur
$io->success , ->error,->title
cf console how to style a console command





**note cool** :
on pt utiliser l'em pour recuperer les entites'
et pas besoin d'injecter ts les repositorys
**$shows = $this->entityManager->getRepository(Show::class)->findAll();**
'

protected function execute(InputInterface $input, OutputInterface $output): int
    {

        // input correspond aux entrée utilisateur
        // output correspond aux infos qu'on affichera à l'utilisateur
        $io = new SymfonyStyle($input, $output);

        $io->title("Les films commencent à être scannés");
        //  changer les images des films
        //  1 - chercher tous les films
        $shows = $this->entityManager->getRepository(Show::class)->findAll();
        //  2 - boucler sur les films

        foreach ($io->progressIterate($shows) as $show) { => pr la progress bar
            //  3 - fetchPoster
            $poster = $this->omdb->fetchPoster($show->getTitle());

            //  3.5 - vérifier qu'on a bien récupérer un poster
            if ($poster !== "N/A" && $poster !== null) {
                //  4 - mettre à jour le poster du film
                $show->setPoster($poster);
            }
        }

        //  5 - flush
        $this->entityManager->flush();
        //  BONUS - stylisier la commande
        $io->success("Les images ont finis de se mettre à jour");
        // TODO BONUS BONUS - Avoir un mail compte-rendu

        return Command::SUCCESS;
    }
}

##CORRECTION S CREATION D UN SERVICE

on crée le fichier php 
on met le namespace
on crée les fcts dedans
on coupe les instructions
ms cmt récupérer les data
on recupere le user avec service security



pour recuper le flashmessage qd on n'a pa le ...
        $this->flashBag->add("success", "{$show->getTitle()} a bien été ajouté en favoris");

#CORRECTIOn

Pour vérfier la présence d'un objet ds une collection
ça suffit de faire  ds le tpl {% if movie in collectionDeMovie%}
**ABSTRACTCONTROLLER** A NOTER DS MEMENTO
Il permet de fr des trucs courants dc le regarder comme récupérer le userd
$user=$this->getuser()
**Si on a des méthodes qui st pas détectées par VSCOIDe**, on pt rajouter l'entité user , la ligne ci desssous ds la méthode qui en a besoin : '
 /** @var \App\Entity\User $user */
** Fctnalité pas faite : 
qd on a le film en favori, le bouton ajouter aux favoris ne ft pas être affiché ° mais  » pour le supprimer'

**NB à noter ds memento au niveau des partials**
on pt faire passer une vraiable ds un partial en deuxieme param **
**Anoter ds memento**
**Pour récuperer la page précedednte**
Request va ns perm de retrouver la page précédente avec 
        **$referer = $request->headers->get("referer");**
Et on redirige vers une url et non pas une route
        **return $this->redirect($referer);**

**NB à noter sur les manyTomany tout le paragraphe**
si on rajoute une relation sur la table pivot, faire gaffe au owner de la relation , le maitre
Par exemple ds user _ show
celui qui a le inversed by est le maitre
Le maitre est celui sur lequel on fait le make entity dc c important quand on crée la relation manyTOmany ds le maker
Pour virer tous les favoris on a utilsié la méthode de Collection->clear()
        $user->getShows()->clear();
Collection a plein de méthodes qui pvt servir éventuellement...
Attention ds ce cas à l'entité owner !!'
**doctrine regarde l'état de la table maitre qd on flush**'
Si on s'est trompé avec le owner et le slave'
On va supprimer tout ce qui concerne l'autre entité dans l'autre entité' pour virer la relation
on fait un make migrate
et on recrée la relation ds le bon sens

NB le controller dt contenir ce qui concerne l'http ne pas le virer ds un service'






#============================Episode14 ============


##MAILER COMPONENT => pour introduire le concept de service

=> comprend l'intégration Twig et css
=> https://symfony.com/doc/current/mailer.html
=>  **composer require symfony/mailer**
=> ça installe : de quoi parser les mails, les envoyer...
=> dans le .env on a dse lignes qui se st ajoutées
=> les emails st envoyés par des **transporteurs**, c un service tiers, on dt l'installer'
Il y en a plusieurs( meme gmail etc... ),chq transporteur a ses spécificités,  

**MAILJET**
on va utiliser mailjet **composer require symfony/mailjet-mailer**
**abdoulaye conseille mailtrap**
ça rajoute d'autrs lignes ds le .env qui crrspdent à **2 configs 1/ serveur SMTP=> plus simple ou 2/API**=> envoi de masses
On devra le mettre ds le .env.local
=> Explication du fctnmt : **le transporteur va être utilisé par le mailer de symfony qui va ensuite envoyer les emails**
=> on crée un compte puis on va suivre le getStarted->developper->sendYourFirstEmail
On va choisir ensuite de passer par le SMTP puis voir les identifiants/credentials API
on copie sa **clé API** et on la met ds Symfo ds le **.env.local** ds mailer smtp et on remplace PUBLIC KEY 
MAILER_DSN=mailjet+smtp://36df9657ba32d60bc9fd67c67ed54112:PRIVATE_KEY@in-v3.mailjet.com
on va **générer sa secret key** ds mailjet en cliquant sur **reset secret key** et on la met à la place de PRIVATE KEY

**MAILER DE SYMFO**
on va fr un typeHint du MailerInterface **MailerInterface $mailerinterf**
On pt mettre l'envoi de mail sur n'importe quelle action, qd on recoit une erreur 500, les recup de mdp, par exemple'
Cas d'aujourd"'hui'"' : on vt que l'admin recoive un mail à chaque fois qu'on crée un film'
donc on va ds la route ccernée càdire /back/Movie/New
Puis on copie la doc
=> le **MIME email**  structure les mails
qd on fait **new Email** on a une structure qui en découle
->from (c'est nous donc l'admin') sf ds le cas des noreply 
->to (c'est tjrs nous)

$email = (new Email())
                ->from('benjamin.bailly@oclock.io')
                ->to('benjamin.bailly@oclock.io')
                ->subject("Le film {$show->getTitle()} a été crée ")
                ->html('<h1>Un film a été crée</h1> <p>info du film TODO</p>');

            $mailer->send($email);

bien mettre $mailerinterface en use

**Intégration de TWIG ds le composant email**
Il ft utilser un autre objet on fait un **template email**
 **$email = (new TemplatedEmail())**
et au lieu de ->html() on utilise **->htmlTemplate()**
on lui passe des variables avec **-->context**
NB si on met un lien dedans avec path, ça va ns l'afficher'
dc il ns faut le lien absolu
    **    Lien vers le film : <a href="{{absolute_url(path('app_movie_show',{id:show.id}))}}">cliquez ici pour voir le**

Bug on n'a pas le film à l'id crrspondant bien qu'il existe
=> il fallait mettre **left join et pas inner join**'=> cf doc de jointure sql
inner join renvoie rien si l'ue des jointures foire

Pour mettre du css, css inline
sinon il y a un bundle twig a installer **composer require twig/extra-bundle twig/cssinliner-extra**

**SERVICES**
>aut exemple créer un mail à la créat d'un user
on va sortir notre code écrit précédemmt du controller=> on crée un service qu'ion pt réutiliser'
Objectifs rendre le code lisible et maintenable et réutilisable
=> on pt lister les services 
**php bin/console debug:autowiring --all**
: y en a de symfony, y a aussi ts nos controllers fixtures etc,
=>Définition : un service
il suffit ce ccreer une class ds /src avec son nameSpace ()cf services yaml)
=> on ne pt appeler un service que depuis un service, on ne pt utiliser l'autowire que ds un srevice' 
=>**Service container** : c le service qui gère les autres services, c un peu le cerveau qui gére les autrds parties du corps
C grâcé à lui qu'on instancier les services'
=>**création d'un service**'
dossier Services qui ctient les serdvices , exp MailerService.php
il suffit ce ccreer une class ds /src avec son nameSpace ()cf services yaml)
ms les services dependent d'autres services
il ft prévenir le conteneur de service qu'on a besoin du service;
il optimise et ne va instancier qu'un seul obj pour tte la durée du script
 on va fr une **injection de dépendance** 
Créer un constructeur avec le service en typeHint et c tout
nvelle syntaxe depuis phhp8
**public function __construct(
        private MailerInterface $mailer
    ) {
    }**
equivaut à
    // private $mailer;
    // public function __construct(MailerInterface $mailer)
    // {
    //     $this->mailer = $mailer;
    // }


on va mettre des variables  à la place des valeurs

là on va pouvoir appoeler notre servioce custom au controller avec le typeHint et utiliser ses méthodes  MailerService $mailer

**service parameter**
le service container pt se charger de la config
il ft preciser ds le service.yaml la config speciale
1/ds le services.yaml on decrit notre service
# en premier on met le fqcn du service *full qualified class name
    App\Service\MailerService:
2/on décrit les arguments , pr dire qu'il faudra chercher la variable ds le fichier .env'
# Les paramètres, paramétrable du constructeur du service
        arguments:
        # la correspondance du paramètre et sa valeur
            $ownerMail: '%env(OWNER_EMAIL)%'


l'argumt de service sera ds le cstructeur du service'

public function __construct(
        private MailerInterface $mailer,
        private $ownerMail

    ) {
    }
=> qd le cteneur de service vainstancier MailerService, il va voir ds servyaml qu'il ft aller ds le.encv récupérer la var'


ds le .env # OWNER_EMAIL=...@gmail.com

#pour recup le repo, décommenter         // $this->mailer->send($email);
    }


challenge fr le 1
changer la logiq pr mettre en bdd et pas en session

mettre le nb max de favoris ds le .env



##CORRECTION  VOTER
**grace au AbstractController, on a acces au user avec $this-> getUser()**
le point fort du **voter c qu'il s'utilise da les controller',ds twig => ça centralise**
Quand on crée le Voter et qu'on le lie à une entité en le nommant correctement, il est liè à une entité en particulier =>le subject'
le voter lie l'action==$attribute et mle $subject=> l'entité'
le voter va verifier les 2fcts supports() puis voteOn atrribute()
1/la fct supports va vérifier si la permsission est ds le tableu et si l'entité liée est bien une du $suvbject' si c true pour les deux ça pass eà la suite
2/ on cherche la persmission cocnernée ds le switch
Pour checker le role, le mieux c d'**importer le security controller** et de'utiliesr '
**$this->security->isGranted("ROLE_MODERATOR");**
On n'a pas besoin de tester l'admin grâce à la role hierarchy'


Remarque:
ATTENTIONavant php 8 on utilisait attributs pour les annotation donc pour rajouter isgranted dans la route, on utilise la syntaxe       * @IsGranted("QUESTION_EDIT", subject="question")
Après php8 on utilie lse annotaions natives de php 

Dans le tpl, on va utiliser isGranted() pouri afficher ou non les boutos
#============================Episode13 DEBUT SAISON 4 ===
=========


##VOTERS
**VOTERS**
Exemple : si on veut bloquer l'accès à une certaine heure, on pourrait créer un algo qui bloquerait l'accès mais à mettre ds toutes les méthodes de tous les controlelrs=> fastidieux'
Pour cela on a les VOTERS
Il sera lancé qd on apl **isgranted et d'autres méthodes'**
Deux méthodes support() et voteOnAttribute() et 
Le voter va se lancer selon des conditions, des votes, on pt avoir plusieurs votes sur un même sujet
En général, on va utiliser le voter et remplir les "trous""
**support()** rvoie true ou false
va vérifier si le sujet est bien le bon et l entité est bien la bonne
Si ça renvoie true, on passe au **voteOnAttribute()**

**bin/console make:voter**
En général on relie le voter à une entité, ms là ds le cas où on vt bloquer tout le back, on va lui donner un nom custom
ça crée le dossier security avec le voter
on enleve la ligne && accesBackOffice (le subject)
Ds le voter, On crée la var     **public const ACCESS ou autre nom de var = 'BACK_OFFICE_ACCESS';**
ça veut dire que si on trouve cette option, ça va déclencher le voter
**Si on rajoute ça à la route #[IsGranted('BACK_OFFICE_ACCESS')]=>ca lance le voter**
isgranted lance l'appel au voter'
**on peut meme le mettre avant la class à tester**
en fait symfony lance tout les supports des votesr pour voir s'il y a une concordance'
$attribute contient backOffice access  , il lit ce qui'l y a         return in_array($action, [self::ACCESS]);
 dans ou autre nom de var'
On est pas bliégé de créer sa constante, on peut très bien écrire
        return in_array($action, 'popo');
et 
switch ($attribute) {
            case 'popo':

//A REFORMULER ET REVOI//

**vote on attribute contient les variables $attribute, $subject, $token**
**token va ns perm de récupérer l'user connecté**' c lemail en général

**switch ($attribute) { //ça contient nos différentes actions** selon les conditions
            case self::ACCESS:
                // logic to determine if the user can EDIT
                // return true or false
                break;
        }
=> **le voter ne passe que s'il y a un true'**

AuthorizationCheckerInterface a la méth **isGranted** si on vt fr que l'admin accède et pas les autrs, injecter ce service et utiliser isGranted()'
Is granted est lié au composant security 
isgranted prend une action et un sujet
un role est une action **Deux arguments : action et sujet** 

**UN VOTER UN SUJET => faire un voter pour l'entité à bloquer'**

##RECUPERATION D UN PROJET SOUS SYMFONY ANCIEN 5.4 
cloner
composer install ou update
.env.local à modifier =>serverversion faut qu'on précise mariadb copier colle'
migrer
on importe les fixture
 
comme c une version 5 de symfo, aller ds la doc de la version 5
LTS LongTermSupport Realease 

**Ben a enelevé le paramConverter ds questionController**
NB les routes st dans les docblocks

=> seul l'auteur de la question pt accepter la réponse
'




##============================Episode13 AUTHENTIFICATIONCREER USER============
**symphony hash password**
on peut pas utiliser le password hasher de php car il correspond pas au hasher du security.yaml de symfo
Pour utiliser le hasher de symmfony,
**use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;**
on pt pas rajouter le password hasher ds le load du fixture ms ds le constructeur
Ds AppFixtures On crée la propriété      private $passwordHasher;
On le rajoute au constructeur, en param **UserPasswordHasherInterface $passwordHasher** et à l'intérieur'         $this->passwordHasher = $passwordHasher;
Ds la création de la rfixture on set "password" => **$this->passwordHasher->hashPassword($user, "user")**,

##Gestion des rôles 
Dans l'access c otrol du security yaml'
On va trier du plus large au plus précis, comme un entonnoir inversé, 
On commence par la route la plus précise, on finit par la route la plus généraliste
-> S'il n'y a pas de restrictions on met rien
-> On va utiliser les regex pour les routes (cf CHATGPT pour les créer)
--> NB noter que qd le tableau des roles est vide, on a qd meme ROLE USER
-->  Exp **bloquer les routes qui contiennte** /back balblabla edit ou new      - { path: ^/back.*(new|edit), roles: ROLE_ADMIN }
--> Aut exp
# bloquer toutes les routes delete (route qui commence par back, peut importe au milieu et qui a un chiffre à la fin)
pour distinguer la route show de delete c est la méthode POST
        - { path: ^/back.*\d+, roles: ROLE_ADMIN , methods: POST}
- { path: ^/back, roles: ROLE_MANAGER }
On pt utiliser le mot route à la palce de path si on vt mettre les noms des routes
##Pour établir une hiérarchie des rôles, un sorte d'héritage
On peut dire que le role admin hérite du role manager'
**role_hierarchy:ROLE_ADMIN: ROLE_MANAGER** dans le security.yaml, sous les routes de l'access control
--> au lieu d'utilser path on peut mettre **route** , ça va faire le tri en fonction des **noms de routes**'
'

##CRUD DU USER

Modification du form UserTyoe
Pour répéter le mot de passe 
https://symfony.com/doc/current/reference/forms/types/repeated.html
RepeatedType::class,

public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email', EmailType::class, [
                "label" => "Email"
            ])
            ->add('roles', ChoiceType::class, [
                "label" => "Roles",
                "choices" => [
                    "Administrateur" => "ROLE_ADMIN",
                    "Manager" => "ROLE_MANAGER",
                    "Membre" => "ROLE_USER"
                ],
                "expanded" => true,
                "multiple" => true
            ])
            ->add('password', RepeatedType::class, [
                "type" => PasswordType::class,
                "first_options" => [
                    "label" => "Le mot de passe"
                ],
                "second_options" => [
                    "label" => "Répetez le mot de passe"
                ]
            ]);
    }

Dans le controller User,si le form est validé, hasher le mdp avant envoi en BDD
$user->setPassword(
                $passwordHasher->hashPassword(
                    $user,
                    $user->getPassword()
                )
            );

**SYMFONY UX un outil front qui utilise du JS dans symfo** 

Pb du password
On va préciser dans les options d'afficher o unon le mot de passe
CreateForm prend en 3e arg des options, on va créer une option edit ou add
On le met dans le configure Resolve
et ds le controller où y a la route edit
        $form = $this->createForm(UserType::class, $user, ["custom_option" => "edit"]);
public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'custom_option' => 'default'
        ]);
    }
**A NOTER**
Resumé : 1/ on cocnfigure l'option ds le resolver' custom_option' => 'default'
2/ on la nomme ds le createForm en 3e parametre
3/ on fait la conditiond dans le formulaire
if ($options["custom_option"] !== "edit") {
            $builder->add('password', RepeatedType::class, [
                "type" => PasswordType::class,
                "first_options" => [
                    "label" => "Le mot de passe"
                ],
                "second_options" => [
                    "label" => "Répetez le mot de passe"
                ]
            ]);
        }

#Affichage conditionnel seelon le rôle
{% if is_granted('ROLE_ADMIN') %}
Administrateur
{% elseif is_granted('ROLE_MANAGER') %}
Manager
{% else %}
Membre
{% endif %}



##============================Episode12 CHALLENGECRUD VOITURE==================

##SECURITE SYMFO
On install le security bundle
**composer require symfony/security-bundle**
ça crée le security.yaml
les hash, les users, access control => acl
3 cposantes :**user** ,le **firewall** et le **controle d'acces** travaillent en complémentarité ds symfony'
ça part de l'utiliseateur, onfait un make:user  **bin/console make:user**
On définit le discriminant de l'user , en général l'**email**'
puis ça demande si on doit **hasher le mdp**=>oui
on pt revenir en arrière pour retrouver le mdo avec le hash
ça a crée l'entité User avec ses particularités. Si on fait getRoles(), on a le role_user d'office'
ça a mis à jour le security.yaml et relié l'enité User à la sécurité'
**NB On fait un migrate ensuite**

##Access control
Il est lu de haut en bas, s'il trouve une concordance, il s'arrête'
=>ATTention à l'ordre '
        - { path: ^/admin, roles: ROLE_ADMIN }
=> ça vt dire que ttes les routes commmençant par /admin st accessibles à l'admin'
401=> manque d'authentifcation
403 vraimt interdit

En cas d'impossibilité à accéder , on proporse de créer un form'
**bin/console make:security:form-login** 

ça a créé le controller securité et un tpl
On va avoir un formulaire de connexion et meme le rememeber me qui va avec



pour activer le logout
# config/packages/security.yaml
security:
    # ...

    firewalls:
        main:
            # ...
            logout:
                path: /logout

                # where to redirect after logout
                # target: app_any_route



##Créer un utilisateur
email, roles dans un tableau ( on pt mettre ce qu'on veut comme rôle)') Les roles st par convention en MAJUSCULE
Pour hasher un mdp ds la console
**bin/console security:hash-password**
php bin/console security:hash-password
On rentre le mdp à hasher
Et voilà on pt se conencter.
On aura une 403 si on a pas le bon rôle

##Faire en sorte que si on n'a pas les droits, on peut pas voir lelien pour aller sur le backOffice'
app est une variable globale qu'on pt utiliser ds twig
on a avec **app.user** par exemple'
On pt utiliser ça pour fr un affichage conditoinnel

On a la fct **is_granted**  ds twig qu'on va pouvoir utiliser avec un role aut chose cf doc pour compléter et renvooie un bool??'
Supposon qu'on veuille afficher lemenu de connexion que si on est pas connecté :
					{% if is_granted('IS_AUTHENTICATED_FULLY') %} <div du menu de connexion>
{{ is_granted(role, object = null, field = null) }}
https://symfony.com/doc/current/security.html#checking-to-see-if-a-user-is-logged-in

##Configurer access_control dans config/packages/security.yaml pour :





##EASY ADMIN
crée des interfaces d'admin'

composer require easycorp/easyadmin-bundle
php bin/console make:admin:dashboard
On choisit l'entité pour laquelle on fait le backOffice
Ds le DashboradCcontroller on choisit sa mise en forme , la 1/ est la plus simple
On a un Crud controller'
Il faut paramétrer les fields et l'interface
Exple
public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            TextField::new('title'),
            TextEditorField::new('summary'),
        ];
    }'







============================================
Question   ds le formr ,comment choisir une date entre 1980 et 2024 par exemple ?  
==> RANGE ? à creuserd
Pou rla validation du blank assert, c bien 
use Symfony\Component\Validator\Constraints as Assert;
qu'il faut importer ?? pas use Assert\NotBlank;

.env .env.local
=> **les variables du .env.local sont lues après**
en général on met les variables généralistes ds le .env alors que nos données de BDD ds le .env.local

**le.env.local n'est pas envoyé en BDD**

===================================================================================================

##CORRECTION
1/ Idée pour réinstaller Symfo et ts les packages, on pt copier le composer.json d'un projet et fr composer update'
On vire les rucs en trop et on refait composer update
2/ On copie le **.env.local**
3/ On crée la bdd 
4/Créer les entités et les fixtures

Le persist n'est pas obligatoire sur un update'
Faire une page d'acuceil'
penser nà virer la page d'accueil symfo'
pour le findAll => besoin du CarRepository

**BOOTSWATCH** https://bootswatch.com/
On inclut le css ds le header et le js de BS aussi
On pt changer rapidement  le theme avec ça

**Attention aux noms des URL EN FRANCAIS**
mettre le empty data pomur les messages d'erreur'

**FakeFiller Extension pour remplir les forms pour test**

Création du form
Copier coller la doc et modifier
Penser à rajouter le theme twig
Les FlashMessage
**Et les contraintes sur l'entité' ASSERT LENGTH ASSERT NOT BLANK ET  Assert\Type("\DateTimeInterface")** =>recopier ds le memento
Probleme de la valeur nulle=> si on vt mettre la date null, il ns met qd meme 2024
Comme il avait mis nul ds l'entité, ça a créé un bug ??
<th scope="row">{{car.name}}</th>
            {# vérifier si en bdd la date est renseigner #}
            {# si oui on affiche #}
            {% if car.releasedAt is not null %}
            <td>{{car.releasedAt|date("Y")}}</td>
            {% else %}
            {# si non ... #}
            <td>Pas encore de date de sortie</td>
            {% endif %}'

****Pour les flash messages, Ben utilsie le label du message comme variable pour le nom de la class Bootstrap**
Il a meme un bouton pour fermer !**


BUG PAS COMPORIS EXPLICATION
Symfo va créer la clé étrtangère entre brandId et Brand et s'il y a pas de marque, ça va foirer' cf replay dde l'épisode 11h00'
La migration foire.
Donc il a suuprilé ka dernière migration et il relance

Pour le faker pour les marques, Ben propose une solice sans passer en BDD
A parlé de unique-> dans le faker , pour ne pas avoir deux fois la meme valeru

->add('brand', EntityType::class, [
                "label" => "Marque de la voiture",
                "class" => Brand::class
            ]);
=> erreur=> la class ne pt pas etre covnvertie en string 
il faut mettre
->add('brand', EntityType::class, [
                "label" => "Marque de la voiture",
                "class" => Brand::class,
                "choice_label" => "name"
            ]);


##Pour rendre nullable le choix
"empty_data" => "",
// * ci dessous si vous voulez rendre nullable le choix
// "required" => false,
// "placeholder" => "choisissez une marque"
Mais pas en attribut mais en option

##REQUETE CUSTOM
->Par exemple pomur limiter le nb d'élements affichés sur une page d'accueil
-> Ou pour fr les jointures et fr donc moins de requetes. Explications
Avec symfo ya du **Lazy loading** sur les entités liées, si on n'utilise pas les enités liées, symfo ne les récupere pas tout de suite'
Attention à ce phénomène qui peut ralentir le site ! 
Par exemple pour recuperer la marque sur la page d'accueil il va faire une requete de plus pour afficher la marque par item' , on passe d'une requete à 50 requetes si on demande la marque'
Comme symfo ne fait pas la jointure automatiquem
Dans LAravel, le lazy loading fait la jointure tout seul
D'où l'intérêt de fr une requête custom'
Le DQL c du SQL ms orienté objet avec le FQCN complet
**Le queryBuilder est plus dynamique facilement. Il va chercher l'objet qui crrspd au repository ds lequel on l'a appelé'**

public function findByExampleField($value): array
    {
        return $this->createQueryBuilder('1eLettreDeLEntite') c est la 
            ->andWhere('1eLettreDeLEntite.champ = :val')
            ->setParameter('val', $value)
            ->orderBy('1eLettreDeLEntite.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult();
    }


Exemple de la jointure pour récupérer les marques des voitures

public function findWithBrand(): array
    {
        // convention = premiere lettre de l'entité
        // createQueryBuilder fait un select des voiture car on est dans le carRepository
        return $this->createQueryBuilder('c')
            // on demande d'accéder aux brand
            ->innerJoin('c.brand', 'b') b est l'alias '
            // si on veut select les éléments de brand il faut bien ajouter le addSelect
            ->addSelect('b')

            // lance la requete et recupere les résultat
            ->getQuery()
            ->getResult();
    }

On passe grâce à cette joiknture de 30 à 1 requête ! cf barre de debugguer en bas
##============================Episode11 CHALLENGECRUD BACKOFFICE==================
Question : comment dans le formulaitre mettre le firstname et le lastname de la personne en label dans le choices ?
Bug qd j e neleve l ecasting g pas lid dans le flash message


Rajouter les review ds appfixtures , on set les propriétés,
pour les réactions on va fr notre provider
**On va créer un provider AppProvider.php** Un Provider c juste une classe avec une propriété
dedans on met une propriété privée $reactions ds un tableau 
Pour y avoir accès ds le faker, il faut qu'il y ait une fct qui les renvoie les reactins' un getter tout simplement On crée dc une fct gerreactions ds le provider
public function getReactions()
    {
        return $this->reactions;
    }
On poura ainsi l'utiliser avec le faker' 
Ds appfixtures :
        $faker->addProvider(new AppProvider());

**DateTime immutable $review->setWatchedAt(\DateTimeImmutable::createFromMutable($faker->datetime()));**
**>setWatchedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween("-30 days")))**

##REORGANISATION
**On déplace les fichiers dans le dossier et on renomme le namespace** 
ATTENTIONJE L4AI PAS FAIT A REFAIRE !!ah si 

##MAKE CRUD
php bin/console make:crud
Il faudra installer le **composer require security-csrf**     
-> on dit quelle entité
-> on dit qL controller : bien préciser le chemin Back\MovieController
--> automatiqmt, ça a créé les dossiers 
--> et même créer les token csrf
**NB le make crud crée un bouton pour le delete avec le token dedans**
LE CRUD a créé le controllern les tpl et le formType
-->
CSRf exp de la banque
1/l'user est conencté à sa session'
2/ on ouvre un email par exp avec un lien à cliquer , le lien va exécuter une commande qui necessite l'authentification, par exp envoyer de l'argent,
et comme c'était connecté, c bon
Le token CSRF va être inclus ds le form d'envoi de l'argent'
On va comparer le token du form passé en POST et celui stocké en session ??=> A REVOIR

Dans symfony il suffit d'nstalletr le bundle 'security csrf

Cas du form pas géré par symfo : faudra rajouter le csrf soi meme
faudra le fr ds le controller et ds le tpl
On protege que les input sensibles, par exemple la searchbar y a pas besoin
Mais les delete oui

Faille XSS => si qqun essaie d'injecter du js, twig par défaut protège des failles XSS'

**IL faut bien matérialiser la dif visuellement en tre le backOffice et le front** 
-> on pt séparer en blocs et faire des conditions ms fastidieux
-> on pt faire un base.html.twig un pour le front un pour le back
-> on peut faire des blocs spécifiqs qu'on include
-> Ben propose de s'appuyer sur l'héritage ' le base du back extendrait le base de base
on fait un bloc nav qu'on va redéfinir ds le base du back'
Pour mettre en forme le body , on crée un bloc **subbody** à l'intèr du body'

**FORMTYPE DU SHOW**
On n'a pas mis le rate parce qu'on va le rmeplir plus tard'
                'choice_label' => 'name',
 peut recevoir une fonction
Par exemple on pt créer 
// Pour pouvoir afficher sans faire de choice_label :
//Ds l'entité qu'on veut'
Méthode magique existe , on l'appelle ds l'entite'
    public function __toString()
    {
        return $this->name;
    }
c une **fonction magique** qui va trsformer l'objet en string qd on va l'appeler'
donc si on tape name, ça trouve direct le nom du genre  ??
**VALIDATION ASSERTS**
    #[Assert\NotBlank] => équivaut à plusieurs contraintes , le plus complet
Par défaut les champs st pas nullables
Pour tester nos validatins côté php , ds le tpl au niv du form on met {'attr' : {'novalidate' : 'novalidate'}}
ça confirme nos contraintes côté BDD
Les contraintes st testées après, elles viennent valider l'objet'
ça marche du côté add ms pas edit ? Le update traite les donnés différentes seulement
Quand on add un objet null-> il pass ensuite aux contraintes
Quand on update il passe les propriétés à null,dc ça passe pas aux contraintes ??
G PAS COMPRIS
**Pour lancer les contraintes malgré tout, là où les choses st nullables, rajouter un empty_data" => "" sous le label ds les propriétés pas nullables**

POUR RESUMER l'html valide, le JS puis le PHP puis la BDD'

##============================Episode10 =======================

##CORRECTION FORMULAIRE

**regenerate** va créer le repository et getters setters à partir d'une entité'
make:entity --regenerate "App\Entity\Review"
Ben récrée l'entité Review'
Ben dit quon pt supprimer son compte tout en laisssant sa review en anonyme donc met null ok pour username
note interger
reactions JSON => on pt choisir le type **JSON** il sera trsformé en array automatiqmt
**Dans la route mettre l'id**du movie pour pouvoir le récupérer '
**make form**
On crée son form ds un fichier à part, c réutilisable comme ça , on essaie de fr que le controller soit le plus épuré
**Personnalisation du form**
--> enlever un champ ! il suffit de le supprimer
--> dans add on choisit le type et les options ( atetntion à bien prendre le form extension et pas celui de DAL)
Exemple ->add('reactions', ChoiceType::class, [
                "label" => "Vos sentiments sur le film",
                "choices" => [
                    'Rire' => 'smile',
                    'Pleurer' => 'cry',
                    'Réfléchir' => 'think',
                    'Dormir' => 'sleep',
                    'Rever' => 'dream',
                ],
                // choix multiple
                "multiple" => true,
                // boutons
                "expanded" => true
                "help" => "Plusieurs choix possible"

NB le row comprend The form_label(), form_widget() (the HTML input), form_help() and form_errors()
https://symfony.com/doc/current/form/form_customization.html
**Mettre le bouton du form ds le tpl**
On doit décomposer le form pour mettre le bouton submit dedans

form end va afficher le reste du form


**typehint**
indique le type par exemple Request $request
**Show $show grâce au paramConverter qui instancie les entités automatiqmt,ça récuplère directement le show de l'id crrspondante'**



**Recupération en BDD**
        if ($form->isSubmitted() && $form->isValid()) {

getData récupère les données ms automatiqmt, symfo a déjà eregistré les valeurs dans le nouvel objet
donc on en a  pas ofrcément besoin


**Utilisation de l'EMI pour persist et flush'**

Question : on a pas mis GET et POST ds la méthode de la route ça marche quand meme, cplu sindicatif ,, pour une API c'est OBLIGATOIRE
'
**Validater le form**
// ! exemple de contraintes de validations
    #[Assert\NotBlank]
    #[Assert\Length(
        min: 2
    )]
    #[ORM\Column(type: Types::TEXT)]
    private ?string $content = null;

**Traduction des mess d erreurs**
composer require symfony/translation
Dans translate.yaml
framework:
    default_locale: fr
    translator:
        default_path: '%kernel.project_dir%/translations'
        fallbacks:
            - en
        providers:

composer require symfony/intl
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt install php8.2-intl


-----------------------

CHALLENGE
Faire un vbackoffice
Peut etre faireune nav à part
faire make CRUD ou tout faire un make crud pour l'in et le copier'a la main
=> crud fait le controller et les tpl mais vaut mieux faire à la main

Intégredr à oflix
faire une route /back/movie


##============================Episode9 FORMULAIRES  =======================
Rappels donc
1/affichage du formulaire via une route en GET
2/ récupération en POSt dse champs du form
Puis une fois coté serveur
1/ récupération des données
2/vaidation sinon réaffichage du form
3/traitement des données : envoyer un mail, résilier , et eventuellement enregistrer
4/ rediriger (avec un flash message éventuellement)

En symfo, le formulaire va souvent être relié à une entité
On va céer le formulaire dans la même fonction pour le GET et pour le POST ??'


**composer require symfony/form**

Le formulaire va ê créé ds une class,  
soit directmt ds le controller, soit à part
C'est mieux à part'
On crée ds src/form/monForm.php
On pt le faire à la main ms c plus facile avec le maker !
**bin/console make:form** 
-> nom de la classe, finira par type Type, : PostType
--> à ql entite le form est relié (ou pas , par exemple un contact qu'on va pas enregistrer')
--> ça a cée le ficier Posttype.php
On a déjà la fct buildForm() qui crée le form avec nos colonnes de l'entité'
On a déjà configureObjects qui va créer des obj de la class Post
On crée donc une route dans le PostController pour créer un Post qui va utiliser l'objet PostType ' cet objet formulaire connait déjà Post.php

#[Route('/add2', name: 'add2', methods:"GET")]
    public function add2(): Response
    {

        $post = new Post();
        $form = $this->createForm(PostType::class, $post);

        // affiche le formulaire
        return $this->render('post/add2.html.twig', [
            'formPost' => $form   => transmettre l'obj à la vue'
        ]);
    }


On va dans le twig
{% extends 'base.html.twig' %}

{% block title %}Liste des articles{% endblock %}

{% block body %}
<a href="{{ path('app_post_browse') }}">Retour</a> 
<h1>Ajouter un post avec le composant Formulaire</h1>

{{ form(formPost) }} => utilisation de la fct form de twig pour afficher

{% endblock %}

Ds le builder, on pt modifier : enlever les chamops (updated at created at), rajouter des champs, déplacer

La **fonction add() du builder peut avoir des paramètres** 
**add('nomDeLaColonne',type, options dsun tableau)**
par exemple email, url, **$builder->add('image', EmailType::class)**
ça va mettre un type email en html et un tableau d'options
->add('title', TextType::class, [
                'label' => 'Titre'
            ])

DOC A NOTER **https://symfony.com/doc/current/reference/forms/types.html**
Tips ajouter les boutons putôt ds la vue que ds le controller 
**Les options vt dépendre du type choisi** Les types hérient la plupart du FormType
Par exemple pour le textType : on pt rajouter attr(tableaux), data, etc..


##Foramtage des forms pour la vue 
**très précis**
https://symfony.com/doc/current/form/form_customization.html
On a un form form ( cf la doc g rien compris)
dans le **form row** on va pvoir configurer l'affichage aussi' formlabel form widget etc..

**Mais en général on fera un bloc form en twig**
{{ form_start(formPost) }}

    {{ form_row(formPost.title) }}
{{ form_end(formPost)}} => affiche ts les champs non affichés

NB on ne pt pas afficher deux fois le meme champ

##Pour tester en php, il faudra desactiver la validation coté html
**novalidate**
{{ form_start(formPost, {'attr' : {'novalidate' : 'novalidate'}}) }}

->add('author', EntityType::class, [
                'class' => Author::class,
                'choice_label' => 'getFullName',
            ])
On pt rajouter une propriété custom cf exemple ci dessus, twig va chercher la propriété automatiqmt ?? cf replay 13h36 ??



# Modifier les champs


ex : mettre fullname au lieu de l'id de l'auteur

> Entity Author

```php

 public function getFullName() :string
    {
        return $this->firstName . ' ' . $this->lastName;
    }
```

>Form>PostTitle

```php
 ->add('author', EntityType::class, [
                'class' => Author::class,
                'choice_label' => 'fullName', => on choisit la méthode fullname de Author , symfony fait le lien 
            ])
```
on a créé une méthode ds entité pour récupérer le nom entier et on a spécifié quelle méthode utiliser ?? VERIFIER POUR COMPRENDRE ??

##Traitement du form
La route du formulaire dt être crée en GET et en POST 
puis on delande a form de regarder si y a qqch à gérer ds la requete avec handle Request
si le form  est soumis et validé, on 3/traite et on 4/redirige
L'objet a été prérempli automatiqmt par **handleRequest'**
si le form est pas valid, les erreurs vt ê réaffichées avec le formulaite
On pt rajouter des champs à cette étape, par exepmle accepter les mentions légales ,

        if ($form->isSubmitted() && $form->isValid()) {

#[Route('/add2', name: 'add2', methods:["GET", "POST"])]
     #[Route('/add2', name: 'add2', methods:["GET", "POST"])]
    public function add2(Request $request, EntityManagerInterface $em): Response
    {

        $post = new Post();
        $form = $this->createForm(PostType::class, $post);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // lorsque l'on arrive ici, les données ont été 1. récupérées 2. validées
            // Il nous reste à :
            // 3. traiter le formulaire

            // on veut valider le formulaire uniquement si la case à cocher est cochée
            $conditionsAccepted = $form->get('legalMentions')->getData();


            if ($conditionsAccepted)
            {
                $em->persist($post);
                $em->flush();
    
                // 4. rediriger
                $this->addFlash('success', 'Article ajouté');
                return $this->redirectToRoute('app_post_browse');
            }
            else 
            {
                // todo ajouter une erreur au formulaire
                $this->addFlash('error', "Merci d'accepter les conditions");
            }
        }

        // affiche le formulaire
        return $this->render('post/add2.html.twig', [
            'formPost' => $form
        ]);
    }
}

On pt rajouter des champs à cette étape, par exepmle accepter les mentions légales ,
Dans controller dans add
->add('legalMentions', CheckboxType::class, [
                'label' => 'je coche la case',
                'mapped' => false,
Dans vue
    {{ form_row(formPost.legalMentions) }}
Dans controller
On peut faure un get data
NB on pt donc rajouter d'autres données => à creuser ??

##VALIDATION DES DONNEES'
**1ere méth -->On pt rajouter des contraintes de validation -ds le formType** 
Il faut installer le validator  **composer require symfony/validator**
Puis on va utiliser l'option constraints' qui accepte un tableau 
isValid() va tester les contraintes


$builder
            ->add('title', TextType::class, [
                'label' => 'Titre',
                'constraints' => [
                    new **NotBlank**(['message' => 'Merci de saisir un titre'])
                ]
            ])


Le validator pt très bien utilisé ds d'autres projets sans symfo.'


**2ere méth -->directmt sur nos entités, on rajoute les attributs** 
avec Assert (à importer)
use Symfony\Component\Validator\Constraints as Assert;
Exp de la doc
class Author
{
    #[Assert\Email(
        message: 'The email {{ value }} is not a valid email.',
    )]
Exp de gregr
#[ORM\Column(length: 255, nullable: true)]
    #[Assert\Url(message : "Merci de saisir une url valide")]
    private ?string $image = null;

Si par exemple on n'a pas de forulaire, on peut faire la validation direct dans l'objet'

Mais symfo conseillde faire la validation du formulaire dans l'objet  meme '
cf bonnes pratiques https://symfony.com/doc/current/best_practices.html



RECAP
Installer le symfony form et le symfony validatior
créer le form avec make form
le modifier
afficher le formulaire avec this createform dans le controller
la vue va utilier form start, form row pour afficher
on va traiter le form ds le controller
On met les ocntriantes de validation ds l objet



POUR LE CHALLENGE
copier la classe review et la regenerer 
revoiex est relie a un show et une person
formtype nom du champ contrainte


##============================Episode9 DOCTRINE approfondismt =======================
#Correction bugs lanuel
RAPPEL DE DEBUG
On vérifie la migration:  si ça marche pas, on exécute les requetes sql séparément,
on regarde laquelle a échoué et regarder c quoi le pb
on crée la requete corrigée, on vérifie et on la copie dans le fichier de migration
on crée une nouvelle ligne dans le doctrine migrations dans adminer -> nvel élément-> execute à now
**Je le nomme selon le FQCN de la migration modifiée en PHP**

##NELMIO
1/a/installer Nelmio
1/b/ créer le fichier fixtures.yml pour définir les objets
1/c/ créer  le fichier qui extends fixture pour créer lesobjets
2/ l'enregistrer en BDD' avec persist()

1/ a/composer require --dev nelmio/alice
1/b/ fixture.yml
On crée le fichierNelmioFixtures.php  qui extends Fixture cf doc pour créer les objets
on lanc epour essayer **bin/console doctrine:fixtures:load --append --group=NelmioFixtures**
On peut utiliser la méthode objectSet pour faire un foreach dessus

        type: <randomElement(["Film", "Série"])>

        genres: '<numberBetween(1, 6)>x @genre*'

Pour un élément random parmi un tableau

Pour créer les relations on utilise

puis après flush et persist


##============================Episode8  DOCTRINE approfondismt =======================
RAPPELS
1/ entité migration bdd
pb courants
-> si on modifie l'entité ms qu'on n' pa pas fait la migrate migration, va y avoir des migrations pas appliquées
-> si les migrations n'ont pas les memes noms-> incohérences aussi'
-> changer une propriété de l'entité , changer ses getter et setter', changer les targetEntity et mappedBy/inversedBy


QUESTIONj'ai pas compris comment on pouvait modifier le nom de la propriété de la table'?
Je n'arrive pas à faire une modification en BDD et la mémoriser dans mes migrations.
Je change ce que je veux dans Adminer, je récupère la requête et la colle dans le fichier Migrations au niveau du up(), j'ouvre la migration dans Adminer et coche executé à Now'
Bah si en fait ça marche sans faire les migrations je croisK??


CORRECTION
1/Créer l'entité avec le maker et ses relations'
-> créer la relation oneToMany d'où on veut ms greg a l'hab de le faire du côté de Casting, du côté du un je crois ms Doctrine se charge de tout
-> Attention la propriété eest en camelCase'
-> bien mettre la MAJUSCULE à l'entité liée'
-> On peut renommer les foreign key dans le fichier de migration FK_casting_show FK casting_person etc... pour les reconnaitrte ms c pas une obligation
-> on peut faire le smodif dans l'entie , faire l amigration correspondant en la vérifiant  et la migration migrate'
2/utilisation du faker
Si on fait tout dans le meme fichier on fait dans l'orde'
a/ $insertedPersons = []; on rajoute une personne dans la base mais on vérifie si elle a déjà été insérée
if (in_array($currentPerson, $insertedPersons)) {
                // Si la personne a déjà été ajouté, on passe à la ligne suivante
                continue;
            }

 b/$insertedPersonObjectList =  []; =>récupérer un tableau avec ts les objets des personnes pour récupérer la liste des personnes inséres
au lieu de faire avec le repository 
**ON utilise le random de faker pour toujorus avoir le meme aléatoire**


COMPRENDRE ça
 $insertedGenres = [];
        foreach ($genreList as $currentGenre)
        {
            if (in_array($currentGenre, $insertedGenres)) 
            {
                // si le genre a déjà été ajouté, on passe à la ligne suivante
                continue;
            }
            $genre = new Genre();
            $genre->setName($currentGenre);

            $manager->persist($genre);
            $insertedGenres[] = $currentGenre;
        }

**Classer les castings par ordre**
**1/dans twig**
1ere technique cf usort($films, function($filmA, $filmB) {
    return $filmA['year'] - $filmB['year'];
});
en twig
{# {% for currentCasting in movie.castings|sort((movieA, movieB) => movieA.creditOrder <=> movieB.creditOrder) %} #}

2/**en PHP** pour voir les requets lancées cf profiler en bas de la page
On peut modifier la requête faite par Doctrine au niveau de l'entité'
on récupére dans le controller et on classe avec PHP
$castingList = $movie->getCastings()->toArray();
    usort($castingList, function ($castingA, $castingB) {
        return $castingA->getCreditOrder() <=> $castingB->getCreditOrder();
    });
3/ via Doctrine
dans l'entite, au niveau de la relation on va préciser à Doctrine cmt elle va récupérer les castings'
bien cibler avec ORM 
   **#[ORM\OrderBy(["creditOrder" => "ASC"])]**
Dans cette méthode, ça applique cet ordre dans ts les cas ! car orderby est une méthode de ORM machin

Direct **dans le controller avec filtre**        $castingList = $castingRepository->findBy(['show' => $movie], ['creditOrder' => 'ASC']);
orderby limit offset avec by



**Tables pivot-Concept de  Clé primaire composée**
on peut créer une clé primaire composée càdire qu'elle contiendra la clé de l'entiéA et la clé de l'entité2'
ça empeche de faire des doublons
Ms on pt très bien utiliser **unique** dans le fichier php cf contrainte d'unicite' ou dans adminer
#[UniqueConstraint(name: "unique_name", columns: ["name"])]


CACHE
**cat /etc/hosts** => blague => on attribue une autre ip à un nom de domaine dans etc/hosts
**ping adresse_du_site_**
la box pt stocker des données en cache
puis elle va chercher si le nom de domaine correspond à des DNS alentours
puis il va chez gandi
ouis coté serveur
tout ça va générer du cache
Symfo génére du cache
Le cache de DOctrine st dans var/cache 
Pour la mise en prod => ca he:clear avant
dans l'onglet network du navigator, on pt voir les fichiers memory cache'


##CLASS REPOSITORY-REQUETE PERSONNALISEE
findOneBy
findby
Ds le controller grace au repositor**on peut filtrer déjà via findBy() avec les options orderby limit offset** avec by
    $castingList = $castingRepository->findBy(['show' => $movie], ['creditOrder' => 'ASC']);
Mais par exemple si on vt sélect les 5 films ayant une note>4,5 , on dt fr une **requete personnalisée**
On va écrire notre fonction , il  y a plusieurs maières 
**1/soit en SQL, 
2/ soit en DQL => on va fr la requete sur des objets plutôt que sur des colonnes
3/ soit avec le queryBuilder**
Là on va fr avec le DQL https://symfony.com/doc/current/doctrine.html#querying-for-objects-the-repository

**Dans le repository** :
public function findAllGreaterThanPrice(int $price): array
   public function findByRatingOver($minRating): array
   {

        // ici on peut écrire du SQL 
        // ou du DQL 
        // ou utiliser le QueryBuilder à découvrir

        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery(
            'SELECT s
            FROM \App\Entity\Show AS s
            WHERE s.rating >= :min_rating
            ORDER BY s.title ASC'
        )->setParameter('min_rating', $minRating);

        $query->setMaxResults(2); //2 resultats 

        // returns an array of Product objects
        return $query->getResult();
   }

pour la pagination , on va créer la variable pageNumber et spécifier le nb d'éléments et se décaler du nb d'éléments pour la epage, 3e page etc...'

                   pour la nav de la home {% for currentPage in 1..maxPageCount %}
Ppour récupérer le uméro de la page, on le récupère avec GET donc avec Request, il faut use le le hhtpFoundatins
on peut soir écrire le lien avec path et href="{{ path('app_homepage')}}?page={{ currentPage }}">{{ currentPage}}</a> directement le ?page dans le path
ou alors                         <a class="page-link" href="{{ path('app_homepage', {'page' : currentPage})}}">{{ currentPage}}</a>
automatiquement s'il n'y a pas de param, symfony va le mettre en query string '
si on est au début ne pas activer le lien de pageprec et idem page suivante pour la fin


**genre si j'écris' {{ path('app_homepage', {'gender' : 'female' , 'town' : 'NY'} )}} ça va mettre deux param en queryString**


##Jointure
Comme Doctrine est paresseux, il récupère pas forcément 
mais on pt faire la jointure direct ds la requete ds le controller avec une requete speciale


'SELECT s, c, p, g
                FROM \App\Entity\Show AS s
                INNER JOIN s.castings AS c
                INNER JOIN c.person AS p
                INNER JOIN s.genres AS g
                WHERE s.id = :show_id
            '
        )->setParameter('show_id', $showId);

Attention si on dumpe on voit pas forcméent si ça n'a pas été initialisé une fois' (on voit initialized false dans le dump)
C'est plus performant une requete que plusieurs '**optimisation**
NB petit piège avec les jointures INNER JOIN
Si on a un item qui a pas d'intersection, exemple d'un film qui n'a pas de saison=> ça va ps nous trouver de film'
Pour récupérer tous les films meme ceux sans saison ,il faut tout récupérer donc on va utilsier LEFT JOIN
La table de départ de la jointure est importante

**recuperer la requete des shows avec les jointures du movieController**

#QueruyBuilder
on crée un objet
on met son alias et on utilise des where

##fixtures 
il y a deux manieres 
avecphp
nelmio alice bundle
ca va creer un yaml
des entites avec des ids
et on utilise des fcts de faker pour générer les donnée
on pourra fr des jointures aussi
puis ds le fichier de fixtures qu'on lancer avec loadfile'
ca va lire le yaml
on aura un tabl d objets sur lequel boucler et fr persist()


faire une fiche class conceptsdesynfony

manager paramconverter repoditory 
##============================Episode7DOCTRINE =======================
**Response on en a besoin ds le controller pavce qu'un controller renvoie un obj de la classe Response'**




**migration précisions**
domimi  et aller sur une autre migration **avec + ou -**??
**up() et down() st des meth de miogration** migrate-1  VOIR LA DOC POUR LECRITURE exacte
par exemple domimi current -1 pour annuler
**NOTER DS LE MEMENTO avc domimi + aut commandes on peut supprimer/annuler migration avec up() et down() notamment**

#tip à relire et résumer
qd on crée comment entity
many to one récupérer ts les comments à partir du post =>oui
Delete orphans mettre no par défaut en sa de doute

si on saitr qu'il y a plusieurs post on pmet post au pluriel'
Doctrine créera automatiqmt la propriété du côté du 1

#resolution de pb lors ds migrations
-> relire le fichier de migration et regarder en BDD quelles requetes SQL ont été exécutées et voir laquelle bloque 
-> ds son exemple ça essayti d'insérer un auteur alors qu'on en avait pas encore en BDD'
-> il fait des modifs de la BDD pour regler le pb et les rajoute ds la migration
-> il revient sur la migation  dans adminer il dit que c'est executé en cochant la case excute NOW ?
-> ça a exécuté la migration à la main au lieu de domimi

TIP FAIRE UNE FICHE ADMINER ADMINER ds adminer, ds sql command, cliquer sur history
TIP FAIRE UNE FICHE HTML <small> peut signifier un texte d emoindre immprotance, mettre d'autres balises que j'oublie d'utilsier'=> tableau

##recuperation des données des tables étrangeres
pour l auteur {{ post.author.firstName }} {{ post.author.lastName }}
pour les comments {% for currentComment in post.comments %}
NB doctrine ne recupere les infos des relations que si on lui demande

##MANY TO MANY DOCTRINE
**Si on crée la relation à parti d'une entité, c'est elle qui sera propriétaire** de la relation'
Attention si on fait des modif, c'est lui qui sera la référence
Dans show, on va créer la propriété genres **nom au pluriel relation ManyToMany**, et on répond oui pour avoir les genres à partir des shows et vice-verca
dans l'entite.php on reconnait le propriétaire c'est celui où y a inversedBy , l'autre c'est écrit  'mappedBy 
ça va créer une table entitePropriétaire_entite2
on accedera automatiqmt à movie.genres et vice versa genre.movies

Ds le controller on va opouvoir faire **addGenre($genre)** pour rajouter un genre à un film ou ;
addShow($show) qui vait finalement un addgenre et un addShow en meme temps
 **removeGenre($genre)**

Attention si on veut modifier après coup le propriétaire , on peut pas, faut changer le nom de la table pivot aussi
NB qd on a fait le find pour retrouver l'objet sur lequel faire la modif, on n'a pas besoin de faire persist comme on les a récuéprées par DOctrine, on fait que flush'

Entity Manager Interface convertit ... voir chatGPT

A noter **cas particulier des many To many** avec un attribut sur la relation ,
->ici l'exemple de show et person qui ont une relation ""apparait""' et les attributs role' et credit_order
-> ms doctrine ne sait pas gérer les relations avec attributs
-> on pt donc simuler ça en **créant une entité suplémentaire** casting qui contiendra le role et le credit order
et serad reliée aux deux autres avdec des relations manyToOne
On va faire un mini MCD avec les trois entites 

##FIXTURES  orm fixtures
bundle
on extend ixture
on recupere un entity manager
y aura un load sur ttes ces class

On installe **composer require --dev orm-fixtures**
On va créer la fixture avec le maker
ça crée une class **AppFixtures** comme exemple qui extends fixture
on va utiliser une méthode load
On utilisera le manager tout court à la place du entityManager


class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $nbMovies = 100;
        for ($currentMovieNumber = 0; $currentMovieNumber < $nbMovies; $currentMovieNumber++)
        {
            // créer une liste de show
            $show = new Show();
    
            $show->setTitle(uniqid('titre '));
            $show->setDuration(rand(90,240));
            $show->setSummary(uniqid('summary '));
            $show->setSynopsis(uniqid('synopsis '));
            $show->setRating(rand(1,5));
            $show->setCountry(uniqid('Country '));
            $show->setPoster('https://picsum.photos/200/300');

            
            if (rand(1, 3) > 1)
            {
                $show->setType('Film');
            }
            else 
            {
                $show->setType('Série');
                // créer une liste de saisons
                    // associe la saison à un show
                $seasonCount = rand(1, 5);
    
                for($currentSeasonNumber = 1; $currentSeasonNumber <= $seasonCount; $currentSeasonNumber++)
                {
                    $season = new Season();
                    $season->setNumber($currentSeasonNumber);
                    $season->setEpisodeCount(rand(2,9));
                    // ici on fait la jointure entre le show créé et la saison
                    $season->setShow($show);
    
                    // on informe l'entité manager qu'il y a une nouvelle entité à insérer en BDD
                    $manager->persist($season);
                }
            }
    
            // on informe l'entité manager qu'il y a une nouvelle entité à insérer en BDD
            $manager->persist($show);

        }

        // on demande d'exécuter les requetes
        $manager->flush();
    }
}
Puis **doctrine:fixtures:load** => attention ça vide la BDD

Resumé :
au minimum il faut créer la fct load, ms on pt très bien créer d'aut fcts ds lefixture'


On peut créer une fonction pour les pays par exemple pour en avoir un au hasard 
**shuffle($countryList)) et on renvoie le premier élément**
**composer require fakerphp/faker** va créer des fausses données
on crée un objet faker qui a des propriétés name, email,nombre, tabl.de nb,  etc...
il y a des formatters qui permettent d'avoir des donénes dans un certain format, il y en a par défaut ms on pt en chosiir d'aut.'
Après avoir instalé, on crée un objet Faker :
        $faker = Factory::create();
En plus des foramtrterz sil y a des librairies qui st des faker provider sur d'autres choses, des films par exemple'
Exemple avec un provide : 
l faut en chercher pour PHP
composer require xylis/faker-cinema-providers
puis dans le load de l'AppFixture'
**$faker = Factory::create();**
**$faker->addProvider(new \Xylis\FakerCinema\Provider\Movie($faker));**
pour l'image il va ns falloir le titre du film dc on va voir plus tard'

puis on lance la fixture avec doctrine fixture load

pour l'aleatoire, on pt dire la serie de chif qui va lui servir de base'
ca sera la **seed**
$faker->seed(un nombre)
ça va ns renvoyer tjrs les memes données

on fait un 2fichier genrefixture en consolze on peut
on use faker , on fait pareil

$faker->
on crée les genres et on les met en bdd

si on vt executer les genres avant les films il ft rajouter getDependedncies dans appfixtures
et rajouter implements je c pa quoi à l'appFixture'
ms pour recuperer il faut utiliser le repository 
**attention les class qui st pas des controller,on pt pas rajouter Genrerepository ms juste un manager on va injecter le repository ds le constructeur**
private $genrepo
function _construct() {
    $this->genRepo=$genreRepo ;
}
comme c un conteneneur de service , pas un controller

on choist un element au hasard avec randomElements


POR RECUPERE LE CODE
IMPORT  EXTERNAL REPO
ON RECUP SA BRANCHE SUR SON REPO
ON COLLE LE FICHIER A LA RAQCINE
ON TAPE BASH NOMDUFICHIER NOMDUREPODEGREG NOM DENOTRE
commiter avabnt
##============================Episode6 DOCTRINE =============================================================================

##RELATIONS DANS DOCTRINE
**Pour créer la relation, on va créer la deuxième entité**
**bin console make entity**
dans season onva l'appeler movie, on utilise pas le mot id comme on raisonn en objet
fiels type relation
si on sait pas , on met relation pour le type de relation
là c many to one , un show a plusoieurs saisons, une saison crrspd à un show uniqmt
puis çde mande si c null, ça depend de si c autorisé à etre null ou pas
On pt rjaouter une propriété qui va récupérer toutes les seasons pour nous : on l'appelle seasons
Il veut savoir si on supprime un show, est ce qu'on supprime els saisons'
Ds la relation many to one, l entite qui porte la verite est season là, du coté du many
Dans show on a des methodes pour sesasons add/get/remove...

**uniqid** génére un texte aléatoire, c pas du tout pour l'id'
**rand()** nb aléatoire
**$show->setPoster('https://picsum.photos/200/300');**

Dans le controller , on crée un show
$show->setTitle(uniqid('titre '));
On crée un faux show, et les saisons qui y sont liées via 
$season->setShow($show);
On persiste le show et la saison
        $entityManager->persist($show);



#[Route('/initDb/{nbMovies<\d+>}')]
    public function relations(EntityManagerInterface $entityManager, $nbMovies): Response
    {
        for ($currentMovieNumber = 0; $currentMovieNumber < $nbMovies; $currentMovieNumber++)
        {
            // créer une liste de show
            $show = new Show();
    
            $show->setTitle(uniqid('titre '));
            $show->setDuration(rand(90,240));
            $show->setSummary(uniqid('summary '));
            $show->setSynopsis(uniqid('synopsis '));
            $show->setRating(rand(1,5));
            $show->setCountry(uniqid('Country '));
            $show->setPoster('https://picsum.photos/200/300');

            
            if (rand(1, 3) > 1)
            {
                $show->setType('Film');
            }
        $this->addFlash('success', 'Shows créés avec succès');
            else 
            {
                $show->setType('Série');
                // créer une liste de saisons
                    // associe la saison à un show
                $seasonCount = rand(1, 5);
    
                for($currentSeasonNumber = 1; $currentSeasonNumber <= $seasonCount; $currentSeasonNumber++)
                {
                    $season = new Season();
                    $season->setNumber($currentSeasonNumber);
                    $season->setEpisodeCount(rand(2,9));
                    // ici on fait la jointure entre le show créé et la saison
                    $season->setShow($show);
    
                    // on informe l'entité manager qu'il y a une nouvelle entité à insérer en BDD
                    $entityManager->persist($season);
                }
            }
    
            // on informe l'entité manager qu'il y a une nouvelle entité à insérer en BDD
            $entityManager->persist($show);

        }

        // on demande d'exécuter les requetes
        $entityManager->flush();

        $this->addFlash('success', 'Shows créés avec succès');

        return $this->redirectToRoute('app_homepage');
    }




Attention, là on ne pt pas supprimer les films en BDD msnormalement Doctrine devrait le faire
Au lieu de passer paer lerepository,
$show=Show->find($id) ;
on fait
    public function demoDeleteShow(Show $show EntityManagerInterface): Response

**ATTENTION ON PASSE PAR DOCTRINE** car via la bdd on arrivait pas à supprimer les orphelins alors qu'avec DOctrine ct ok'


movie.seasons|length 


##Questions
.env.local ??

après avoir validé les données avec doctrine:schema:validate,
faut-il lancer un bin/console make:entity --regenerate ?
c quoi la commande pour retrouver une commande d'après un string dans le terminal ? 
ctrl +R mais comment on se déplace à travers les résultats de la recherche ?' continuer avec ctrl R

text area mettre entre accolades pour préremplir <textarea>  {{preremplir}}
année-mois-jour


**Param converter**
Directement, on pt l''utiliser , il va récupérer le Post directement graâce à (Post $post)
ça va meme gérer les 404 tout seul
Exp le public function show(Post $post)

##CONFIGURATIONDE SYFMFO =>séparée en plusieurs fichiers dans /config
**services.yaml**=> conteneur de service
autowire=> ts les esrvices ds src st autowiré, càdire injectés ds les controllers
on y précise ce qui est exclut des services
**routes.yaml**
**framework.yaml**
****pour chq package**, on a des fichiers de config associé"
En général on a au dessus la config normale, en dessous when@test
**Dans le fichier doctrine.yaml, on a la variable d'env url: '%env(resolve:DATABASE_URL)%'
**Pour la config de la DB on va faire un fichier .env.local pour ne pas le commiter**
Et on pt aussi configurer le .env pour les autres machines, par exemple celles en dev.
APP_ENV=preprod et on fait le fichier .env.preprod.local

##COrrection
updated at /created at é écoles soit on remplit le updated at à la création, soit la deuxièlme fois
on pt créer l'user pokur la bdd , bien cocher grant options'
NB si on modifie le code de l'entite a la main, veiller à ne pas avoir de conflit avec les migrations'
**mapping**cmt doctrine convertit le code PHP en BDD=> renseigner les bonnes infos pour que ça soit compris pour être convertit en BDD
Pokur mettre le champ unsigned dans le fichier de migration #[ORM\Column(options: ["unsigned" => true] )]
**attention a toujours passer par les entites migration pour effectuer les changements en BDD**
**Utilisiation du param COnverter**:
#[Route('/{id<\d+>}', name: 'read')]
    public function read(Post $post): Response
    {
        // si on arrive ici, c'est que le post existe.
        // si le post n'existait pas, le ParamConverter génère automatiquement une 404
        **attention dans le cas d'une API, on voudrait quand renvoyer** 


        return $this->render('post/read.html.twig', [
            'postList' => $allPosts,
        ]);
    }

    <p>publié le {{ post.publishedAt|date('d/m/Y') }}</p>

Pokur formulaire : 
une route en GET et une en POST
mais symfo va ns smiplifier la chose our les formulaitres
**On peut récupérer les données de Reqyest de diiférentes manières** 
A Request object holds information about the client request. This information can be accessed via several public properties:
request: equivalent of $_POST;
query: equivalent of $_GET ($request->query->get('name'));
cookies: equivalent of $_COOKIE;
attributes: no equivalent - used by your app to store other data (see below);
files: equivalent of $_FILES;
server: equivalent of $_SERVER;
headers: mostly e
Exemple du add de Greg : $title = $request->request->get('title'); pour récupérer ds le POST


mettre datetime imutable

**REQUEST** 
Symfony exécute du code avant d'exécuter le controller, il crée l'objet Request'et il a récupéré toutes les infos cookie, session, etc ... 
c'est un objet qui represente la requete http au format PHP.
Si on en a besoin, on va donc utiliser l'obj Request' 
Il contient les super globales $GET $POST $COOKI $SERVER etc...

**EntityManager**
**EntityManagerc la class qui permet d'écrire ds la BDD**
**POur select c'est les repository**' '




##============================Episode5==DOCTRINE =======================

###**DOCTRINE Présentation**
->Doctrine ne suit pas l'active record contrairement à Eloquent', les méth étaient ds le Model
-> un ORM comme DOctrine sert d'intermédiaire entre le Model et la BDD, c un data mapper, les méth st pas ds le Model 
-> les requetes st ds Doctrine , pas ds les Model ??
-> il va pouvoir générer du SQL et générer des tables, on va devoir lui préciser les types et propriétés etc...
il fera les CREATE SELECT UPDATE DELETE qu'on lui ordonnera via PHP ou via la console'
-> 2 grds principes entityManager pour le CRUD et repository pour select

###**DOCTRINE Installation**
IL faut installer doctrine pour avoir les comandes et configurer la BDD
Il faut installer le symfony orm pack **composer require symfony/orm-pack**
On pt insxtallert des recettes pour utiliser docker mais on dit non
->Modifier le **.env** 
**DATABASE_URL="mysql://explorateur:6q595XmCKm@127.0.0.1:3306/symfoblog?serverVersion=10.11.6-MariaDB&charset=utf8mb4"**

mysql --version pour avoir la version de notre mysql/mariadb
ATTENTION CRREER L USER DA ADMINER useroflix etc cf .env
.env ctient le nom de la bdd

###**DOCTRINE Création BDD**
**bin/console doctrine:database:create** 

Pour voir ttes les commandes doctrine **bin/console doctrine** 

###**DOCTRINE Création Class**
On peut crée des fichiers à la main dans App/Entity avec des attributs , ça va créer des entités ce qui va générérer nos tables automatiqmt
Mais on v apl;utôt utilsier le maker
**bin/console make:entity**
ça va ns créer deux fichiers **machin.php** et **machinReposwitory.php**
on va chosir la **propriété** qu'on veut, son **type**, les relations éventuelles, datetimetz timezone
Si on tape entrée direct, ça va mettre string par défaut et la taille par défaut(255), valeur nulle autorisée ou pas 


###Fichier de migration
On a un trio entite-> migration -> BDD , faut pas toucher aux fichiers de migration
On vt passer de la BDD vide à la BDD qu'on a créée'
on va utiliser **bin/console doctrine:migrations:migrate**
ç_a crée un fichier avec la date et l'heure', c un peu comme git, ça part du code précédent pour avancer,
=> on a ttes les requetes au format PHP, on a une fct up() et une fct down()
up() va en avant, down() annule 
On peut aller à une migration en particulier
cf doctrine:migration:migrate --help

Par exemeple si on a oublié de spécifier un champ unique, 
on le fait dans l'entité .php' (on pt le verifier ) avec la commande  sy**doctrine:schema:validate**
on synchronise avec le mapping
puis on fait **make:migration** pour appliquer ole chgmt ds la migratiob
puis on l'applioque sur la BDD', **doctrine:migrations:migrate**
**POUR RESUMER 1/ on change ds le fichier entite et on verifie eventuellemt si fait directemt ds le fichier  doctrine:schema:validate 2/On appliq la migration bin/console make:migration 3/ On trabsfere sur la BDD**

###Insérer des infos ds la BDD
Doctrine pt faire des nvs enregistrements.
On va le fr ds le fichier controller
On va créer une route doctrine par exemple ds le quel on crée un nv objet et setter ses propriétés.
On va utiliser l'**entityManagerInterface** de Doctrine' qui va avoir ses méthodes 
**persist()** qui va permettre de gérer l'entité' et 
**flush()** va executer les requêtes
Exemple 
#[Route('/demo/doctrine')]
    public function doctrine(EntityManagerInterface $entityManager): Response
    {

        $genre = new Genre();
        $genre->setName(uniqid('genre-'));

        // on demande à l'entity manager de prendre en compte cette entité
        $entityManager->persist($genre);


        // on demande à l'entity manager d'exécuter les requêtes
        $entityManager->flush();

        dd($genre);
        return new Response();

    }

**pour lire la bdd**
A chaque fois qu'on crée une entité, on a le repository correspondant'
on abesoin du **machinRepository** qui auura les **fcts find(par l'id)'), findAll, findBy** (critères en particulier) findOneBy (le premier qui répond au critère)) ** Si on demande qqch qui n'existe pas, ça renvoie null'
On va avoir un **gestionnair ede service** qui va faire les New à notre place=> ts les objets de src seront générés facilement de la manière (MonObjet $monObjet)
ça ns permet de créer l'objet en paramètre de nos fcts'
exemple     public function doctrineRead(GenreRepository $genreRepository): Response donnera
Pour symfony, ttes les class créées st des services,sf les entités et les controllers
ttes les class crées ds src st des services
On pt les voir avec **bin console/autowiring**


Un entiteRepositeory par entite
. c'est crée automatiqmt avec make entity mais si on fait manuellement on hérite du serviceEntityRepository cf doc

##MISEN PRATIQUE 
**CREATION D''UNE ENTITE**
1/ bin/console make:entity puis préciser les propriétés et les types
pour les filsm : note null
ça va créer le fichier entite.php en meme temps, on peut eventuellement le modifier mais penser à modifier les getter/setter correspodnants
on a stocké la propriété type avec le type "array""
on peut utiliser make:entity pour changer l'entité aussi , tant qu'onutilise le meme nom'
NB **les propriétés qu'on rentre st en PHP mas converties en snakecase** pour la BDD automatiqmt'
**pour les uniques il faut le faire à la main ds le fichier**
2/ on génère le ficier migration
3/ on l'execute, après avoir bien vérifié' ==on migre la bdd bin console doctrine migration migrate
**Creation de route!!**
utilisation du BREAD c comme le CRUD
On met en GET, on mettra en POST qd on récupère des données d'un formulaitre, là on y est pas encore
On fait les 4 routes crrspondant ds un ,controller

Twig par défaut va transformer les -> des getter setter en . 




##============================Episode5==UTILISATION DE  SQL========================
Correction
- on est pas obligé rde récupérer le titre du film 
- o n peut utiliser les alias sur les noms des tables aussi products as p qu'on pt meme abreger en FROM product p'
- avg
**Utilisation AVG qui est une fct d'agrégation on utiolsie svt avecv group by**'
-- Récupérer les critiques pour un film donné, ainsi que le nom de l'utilisateur associé.
SELECT user.nickname, review.*
FROM review
INNER JOIN user ON user_id = user.id
WHERE movie_id = 3;

-- Calculer, pour un film, la moyenne des critiques par film (en une seule requête).
SELECT m.id, m.title, AVG(r.rating)
FROM movie AS m
INNER JOIN review r ON movie_id = m.id
WHERE m.id = 3;

--pour ts les films
On va utiliser **GROUP BY** 
SELECT m.id, m.title, AVG(r.rating)
FROM movie AS m
INNER JOIN review r ON movie_id = m.id
GROUP BY m.id;

**DATE**
Greg cseille de tjrs mettre la date au format YYYY-MM-DD pour éviter les confusions



-- Récupérer tous les films pour une année de sortie donnée.
select *
from movie
where 
-- year permet d'extraire l'année d'un champ date
year(release_date) = 2014
-- date_format permet de formater un champ date au format souhaité
or date_format(release_date, '%Y') = 1992

il ya aussi NOT pour dire n'est pas'
Si on vt récupérer les films dt la moy est supèr à 4 on dt utilsier **HAVING** et pas WHERE =>conditions sur les fts d'aggrégation'
** A RECOPIER DS MEMENTO !!
SELECT -- liste des colonnes
FROM -- table principale
INNER JOIN -- si il y a des jointures
WHERE -- les conditions
GROUP BY -- si on a utilisé des fonctions d'aggréations
HAVING -- permet de faire des conditions sur les fonctions d'aggrégations
ORDER BY -- pour ordonner les résultats
LIMIT -- pour limiter le nombre de résultats OFFSET --à  partir de
** 
SQL est le langage, il y a les logiciel squi le prennent en charge
mysql a été acheté par oracle /postgre/ mariadb c la meme que mysql mais en opensource / SQL server cv la meme cote microsoft,

MOCO cf correction du challenge blog
##============================Episode4== UTILISATION DE  SQL========================

MOCODO

Entité : attribut1,attribut2 , 
l'attribut1 est par défaut l'identifiant/discriminant',il sera souligné,
pn pt rakoute un _ devant un attr pour le souligner
Association: sur une ligne Verbe, cardMinCardMax Entité2,cardMinCardMax Entité1 :attribut de l'association'
asso reflexice cf doc







MCD->MLD->MPD

**Petit truc twig à noter**
{% for %}...  {% else %}... {% endfor %}le else va vérifier si l'item est vide', ça équivaut à testeer si l'élément est vide' à l'inrèrieur du for' 

**SQL - Rappels** **REVOIR MERISE**
Pour créer son MCD, on pt se baser sur le brief, sur la maquette aussi.
NB les favoris on pt choisir de les mettre en BDD ou en session
Là on va le smettre en session

**Essayer d'utiliser MOCODO ??'
SHOW 1 show peut avoir plusieurs genres un genre peut appartenir à aucun film ou à plusieurs
 1N SHOW 0NGENRE

SAISON  1 show peut avoir 0 à plusieurs saisons une saisons peut appartenir 1 seule show
 0N  SHOW 1SAISON

ATTENTION dans LE MCD on pense juste données, on ne sait pas encore cmt on va les stocker dc on emploi pas les terms des BDD
**Il faut bien que chaque entité ait un champ unique=discriminant**, on va mettre code_person par exemple pour l'instant si le pseudo n'est pas discriminant'
- attenton à la cardinalité minimale, si c'est 1, il faut absolument que la colonne crrspndante soit remplie'

Exemple du role
On a la personne avec ses champs
On la relie au film
Mais pour rentrer ses caractéristiques (role par exp), on va **rajoueter la propriété role sous le verbe** , ça va définir la relation entre person et film(le role)


EN ligne de commande on pt lancer mysql, on utilise < pour utilier le fichier sql ms faut d'ab aller ds la bonne n=bdd
'
S'il y a des **n comme cardinalités max des deux cotes => many to many'**
C'est la **table pivot/table de relation/table de liaison** qui represente les relations'

ajouer cle etrangere ajouter clé etrangere ds admin en bas de la table
NB on peut regarder les inner join left si on veut , les right st moins utilisées 






























##============================Episode4==CORRECTION EXO METEO ===========================
Questions à moser
qu est ce qu'on fait de la propriété weather
comment couepr la date    "date" => "29-01-2020" en   29-01avec un regex
' requirements: ['name' => [az]] pour que ça soit des lettres
J'ai pas le flash message, il suffisait pas d'ajouter'
        $this->addFlash('success', 'Le flash message stocké en session et montré à l\'user');
Ds le partiel du bouton pour ajouter aux favoris, 
{% set favorite_movies = app.session.get('favorite_movies') %}
On récupère une variable de la session et on la met ds la variable favorite_movies
set fait quoi ? c est pour créer une variable contenant ce qu'on a récupéré qui est ds app.session ??

##CORRECTIONS DE L EXO METEO
=> **préfixe des routes**  #[Route('/', name: 'app_')] param 1 le dossier de base de l'url' param 2 le préfixe de chaque nom de page : les noms de pages commenceront par app_home par exemple 
=> ds un fichier twig, il vaut mieux **refermer la balise html** ds le meem fichier
=> attention je me suis tromoée j'ai pas **bien coupé le block** principal ds l'html '
=> attention je me suis tromoée j'ai pas fait un dossier MOdel pour mettre le Model dedans
=> pour changer l'image c'était juste la classe à changer'
=> pd de la date à raccourcir : pour modifier une chaine de caracteres, on va utiliser un **filtre par exemple en twig**
dans l html <div class="item--forecast">{{ **currentData.date|slice(0, 5)** }} : {{ currentData.min }}°C / 
ali propose avec **date()**
=> NB **le pipe | c'est pour utiliser la fonction sur la variable**'
=> attention aux routes en francais si le site est en francais
Exp :  #[Route('plages', name: 'beaches', methods : ['GET'])]
=> asset est utile qd on n'a pas les images au meme niveau de url notamment'
=> rappel : comme on n'a pas d'id dans data, on a rjaouté un chiffre pour faire comme un tabl asso, ça va auto incrémenté exprès pour les aut items du tbaleau'
=> pour les requirements ecriture simplifiée ou dans le chemin '/ville/{id<\d+>} ?
=> rappel  dans
return $this->render('meteo/homepage.html.twig', [
            'weatherDataList' => $weatherDataList,
        ]);
weatherDataList est le nom de la variable ds la vue
=>pour avoir la bonne image<img src="{{ asset('./images/' ~ weatherData.weather ~ '.png') }}">
=> on peut aussi mettre la nav ds un partial
**=> deux manières de dynamiser l'affichage du bouton nav**
1/ soi ten mettant un if qui contient l'adresse '
                <a class="nav-link {% if app.current_route == 'app_mountains'%} active {% endif %}" href="{{ path('app_mountains') }}">Montagne</a>

2/ soit en créant un bloc différent avec le if'
3/ ds le controller dire ce qu'on active'

##Mise en session de la ville choisie
On crée la route , on va récupérer les datas de la ville choisi, enregistrer en session et on va rediriger
On doit bien avoir l'objet Request'
On va pouvoir mettre en session avec set()
        $this->addFlash('success', 'Ville ' . $weatherData['city'] . ' sélectionnée comme favorite');
On redirige avec le nom de la route en paramètre
flash message : ça va les enregistrer tant qu'on les a pas affiché'
addFlash enregistre ms n'affiche pas'

{# si on n'a pas de ville favorite on affiche le message #}
    {% if app.session.get('favorite_city') %}
    {% set favorite_city = app.session.get('favorite_city') %}
        <!-- Si ville sélectionnée -->
        <p><b>{{ favorite_city.city }}</b></p>
        <p>{{ favorite_city.date }}</p>
        <p><img src="{{ asset('images/' ~ favorite_city.weather ~ '.png') }}"></p>
        <p>{{ favorite_city.min }}°C / {{ favorite_city.max }}°C</p>
    {% else %}
        <!-- Si ville non sélectionnée -->
        <div>Sélectionnez une ville<br>dans la liste de gauche</div>
    {% endif %}

Pour afficher, mettre ça ds le template
    {% for message in app.flashes('success') %}
        <div class="alert alert-success">
            {{ message }}
        </div>
    {% endfor %}
Autre exemple de la doc
{% for label, messages in app.flashes(['success', 'warning']) %}
    {% for message in messages %}
        <div class="flash-{{ label }}">
            {{ message }}
        </div>
    {% endfor %}
{% endfor %}


##============================Episode3==================================================

**Installer le maker**
composer require --dev symfony/maker-bundle
| `bin/console make:controller` | pour générer un controller | 
on pt specifier le nom je crois à tester


##Routes trucs en plus
y aussi le fichier **routes.yaml** où symfony va trouver les routes

On pt **définir une racine** aux routes ds le controller
On met ça en haut de la classe
#[Route('/movie', name: 'app_movie_')]
ce qui signifie que l'url commence par /movie et que le nom des routes commencent par app_movie'

##Recupération des donénes et envoyer à la vue
On va créer un dossier utils avec Data.php pour récupérer les films
Il aura une fonction pur récupérer ts les shows
Rappel on utilise static pour appeler la propriété sans devoir instancier l'objet avec self::maPropriete'
**array key exists** pour verifier si la clé existe dans le tableau


Le tableau asso en 2e param de render permet de trsmettre des donénes à la view
clé pour le nom de la variable et la valeur en valeur

On boucle
**{% for currentMovie in movieList %}**
On nutilise la **syntaxe pointée** pour afficher les propriétés

**commentair een twig {#**

On peut factoriser pour la liste de films qui est comme la home finalement
On crée un dossier _partials et le pariel avec _devant pour une convention (partial==fragment aussi)
On colle dedans le code commun
On l'include dans le html.twig'
**Pour récupérer les param ds les liens des routes**
boucler sur un tabl asso {% for currentId, currentMovie in movieList %}

{{ path('app_movie_show', {id: currentId}) }}


**asset**
cette méth va permettre de retrouver les images css  etc Tout ce qu'il y adans le dossier public,' plus facilement qd on les a mises ds public
Par défaut twig a comme dossier par défaut public, asset cherche donc les img etc dans public
Pour rechercher avec le regex <img src="([^"]*)"
=> asset fait le lien vers le dossier public
<img src="{{ asset('images/logo.png') }}" alt="Symfony!" />

##GESTION DES FAVORIS
=> cmt faire pour enregistrer le film ds les favoris
=> On va utiliser les **sessions**. La session c'est un **tableau, protégé par un code**,
il permet d'**enregistrer les infos** d'une requete http1 à la requête 2' 
On va **mettre le code dans un cookie** qui est session Id
Le **navigateur est configur pour rouvrir la session s'il y a un cookie** '
C'est enregistré ds $_SESSION en php'
on dt lancer session start()
=> Dans Symfony : 
on abesoin du composant httpfoudations httpkernel rechercher la commande???
pour récupérer l'**objet Request** qui ctikent le tableau session, cookie etc...'
Ds les controllers, symfony va fournir les bons arguments, on pourra récupérer la session via l'objet' Request
(ça sera pas pareil pour les aut classes,on utilisera des services)
    public function demo(Request $request): Response
On pourra lire ou écrire ds la session grâce à Request
Exemple :
#[Route('/demo/hello/{name}')]
    public function hello(string $name, Request $request): Response 
    {
        $session = $request->getSession(); <= on récupère Request

        $session->set('name', $name);
        $response = new Response();

        $response->setContent('<body><h1>Hello ' .  $name . '</h1></body>');
        // this looks exactly the same
        return $response;
    }

    
    #[Route('/demo/session/hello')]
    public function sessionHello(Request $request): Response <= on importe bien Request
    {
        $response = new Response();

        $session = $request->getSession();
        // récupérer le nom qui est dans la session
        // et l'afficher dans le message
        $name = $session->get('name','nomParDéfaut'); <=on pt mettre un nom par défaut
        $response->setContent('<body><h1>Hello ' .  $name . '</h1></body>');
        // this looks exactly the same
        return $response;
    }

1/ Quand on clique ça va faire comme un formulaire on va rajouter en session 
On va faire une route en GET qui va enregistrer en favoris favoriteAdd et 
2/ après on redirigera vers les favoris


        $session->set('movie', $movie);

 $session->set('movies', []);


3/Redirection avec **redirectToRoute()**
        return $this->redirectToRoute('nomDeLaRoute');

Quand on a redirigé, on affiche un message pour informer l'user'
On utilies la session pour enregistrer le message, on pourrait faire
        $session->set('success_message', 'Film ' . $movie['title'] . ' ajouté avec succès');
Mais il faut l'effcaer dés qu'il est vu'
C'est ce qu'on appelle un **flash message** => dés qu(il sera lu, il sera supprimé)
Il ya la fct ds symofny
 ONFERA  **$this->addFlash('success', 'Le film ' . $movie['title'] . ' a été ajouté avec succès');**


{% for message in app.flashes('success') %}
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    {{ message }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            {% endfor %}

Pmour afficher les favoris dans la vue, on aura plus qu'à récupérer, dans le Moviecontroller les favoris enregistrés ds la session avec $session = $request->getSession() et récupérer la bonne clé;'

href="{{ path('app_movie_show', {id : currentMovieId}) }} pour récupérer l'url du film  courant'

##supprimer des favoris
nb pour recuperer l'id', comme c pas une propriété de $movie, on le sort en param de rebnder ds le controller cf lien 
on verifie que le film est en favori sinon on fait rien pour l'instant'ca serdt a rie n de rajouter des infos



public function favoritesRemove(int $id, Request $request): Response
    {


        $session = $request->getSession();
        // récupérer les éventuels movies en sessions dans une variable $moviesInSession
        $moviesInSession = $session->get('favorite_movies', []);

        // supprimer le film du tableau des favoris
        unset($moviesInSession[$id]);
        // todo afficher le nom du film dans le message flash
        $this->addFlash('success', 'Le film a été supprimé de vos favoris');

        // réécrire le tableau dans la session ( à la meme clef )
        $session->set('favorite_movies', $moviesInSession); 


        // rediriger l'utilisateur sur la page /favorites
        return $this->redirectToRoute('app_movie_favorites');

    }


##changer l icone add si le film est déjà ds les favoris

 Session attention il faut un getsession oour lancer la session sinon ca sera vuide
récupérer les données en session ds twig
{{ dump(app.session.get('favorite_movies')) }}


 dans moivielist.htmltwig
utilisation du if ds twig
{# {{ dump(app.session.get('favorite_movies')) }} #}
        {% set favorite_movies = app.session.get('favorite_movies') %}
        {% if favorite_movies[currentId] is defined  %}
        <a href="{{ path('app_movie_favorites_remove', {id: currentId})}}" class="movie__favorite fs-1 my-2 mx-3 link-danger"><i class="bi bi-bookmark-x-fill"></i></a>
        {% else %}
        <a href="{{ path('app_movie_favorites_add', {id: currentId}) }}" class="movie__favorite fs-1 my-2 mx-3 link-danger"><i class="bi bi-bookmark-plus"></i></a>
        {% endif %}
                       
On va reutiliser ce bout de code, on pt le copier coller.
ms sinon on utilise un  **partial**
include ds show.html.twig ms l id est moivie.id ms pas currentId
on va dc préciser de cghanger cette valeur
{{ include('movie/_partials/_favorite_button.html.twig', {currentId: movie.id}) }} <=currentid sera rplacé par movie.id
include accepte donc des param

##gestion des films n'existant pas en bdd'
=>404
=>Renvoyer une exception avec createNotFoundException
if (empty($movie))
        {
            // le film n'existe pas en BDD
            // 404
            throw $this->createNotFoundException('Le film demandé n\'existe pas');
        }
Si ds le fichier .env on se met en mode prof, on pt mettre une jolie 404, pour l'utilisateur'
créer l'arborescence dans templates/
└─ bundles/
   └─ TwigBundle/
      └─ Exception/
         ├─ error404.html.twig
         ├─ error403.html.twig
         └─ error.html.twig      # All other HTML errors (including 500)'
on a acces a la var {{ exception.message }}
testes sa page d erreur http://127.0.0.1:8000/_error/404

bin/console cache:clear effacer le cache

#stocker le theme en session

#mettre active qd on est sur la page ds le menu 

ctrl f pour chercher sa route ds le dump
{% if app.request.get('_route') == 'app_homepage' %}
{% if app.current_route == 'app_movie_list' %}active{% endif %}

on pt cr&er un bloc pour contenir la clzss @Pierre Morin la 3e methode pour rajouter active est de créer  un bloc twig qui va contenir le texte active {{active}} et l'afficher ou non je crois

##============================Episode 2===========

##SYMFONY INSTALLATION
On va utiliser le skeleton, il va installer uniqmt le MVC de symfo
Ms y a pas le reste... BDD/users etc...
**Webapp** peut etre très utile, il comprend : doctrine twig secu etc...
**composer create-project symfony/skeleton** 
dans son dossier
ça va installer composer et les dependance principales(php,console,flex,runtime,etc...)
ça va installer **symfony-flex** qui va s'occuper de la config
qui vérifie si ya des recettes
Symfony va donc copier des fichiers lock, gitignore,env, dossier vendor, 
dossier var=>dossier pour optimiser et mettre en cache, contient aussi le dossier log
index.php =>pt d'entree unique'
autoload App\\:"src/"
On a aussi une console  bin/console

Si on installe depuis un projet existant, on medt les fichiers à la racine

Si on lance le projet depuis le serveur Apache et pas le php, il faut installer un package
On lance le serveur php avec les 0.0.0. pour que les autres puissent y accéder
Apache va servir à htaccess
Pack nécessaire , va rajouter un fichier htaccess
JE ME SUIS ARRETEE LA  DANS LE LIVECODING
**composer require symfony/apache-pack**

##Creer des routes , des pages, controllers
-> on **crée le controller ds le dossier et on lui associe sa route directement** au même endroit
dans le MainCOntroleller.php
<?php

namespace App\Controller;
use Symfony\Component\Routing\Annotation\Route;


namespace App\Controller;

class MainController
{
    #[Route('/')] => création de la route
    public function home(): Response => symfo  impose d'renvoyer une réponse'
    {
        return new Response('Hello les Jellys');=> qu'on renvoie donc ici' 
    }
        

}
Cet exemple renvoie une réponse
**Response** est un objet avec bcp bcp de propriétés pratiques , ça peut contenir les donénes et on pt les changer, envoyer des codes http ... on verra plus tard.
Commande utile :
**bin/console debug:router** => por voir toutes nos routes 

On va utiliser **twig** qui va ns perm d'afficher du HTML facilement ds la Response
**composer require twig**
Symfo a une liste de raccourcis, c symfony flex qui va chercher, en fait la cmd ci-dessus, ça corrspd à symfony/twig-pack
Avec symfo, on utilise le bundle. Si on était oavec autre chose, on utilise que le composant/pack Twig séparé.
Si l'autocomplétion marche pas en html ds les fichiers twig, instller l'**extension twig**'de vscode
**recette :code exécuté par symfony-flex**  

##TWIG Pour utiliser Twig avec symlfo on va voir la doc de Symfo

**base.html.twig**
On a des emplacements
On va copier ce fichier pour créer nos aut tpl
-> on copie notre html ds base.html.twig
On va comparer les deux fichiers klist sho index ?? 
avec vscode on pt faire fr clic droit compare selected(pas réussi)
OLn **définit des blocs**
    **{% block NomduBloc %}Du texte par défaut {% endblock %}**
On va utiliser la fonction **render()** pour retourner le tpl qu'on vt utiliser'
Par défaut on va mettre les tpl dans un dossier ""main""
On met la double extension pour reconnaitre, onpourrait mettre que twig mais html ns informe que c un html
Ou dans vscode aller dans fichier preferences paramèters extensions emmet include languages et ajouter l'élement clé twig  valeur html'
POur utiliser ses méth, il faut **étendre de la class AbstractController**
Attention les tpl devront etre mis ds le **dossier templates**

VOcabulaire l
layout trame avec les variables
tpl html comlet


**template inheritance and layouts**
On définit sur ql tpl on se base par exp base.html.twig
on spécifie ce que les blocs contiennent
{% extends 'base.html.twig' %}

{% block body %}
<h1>Template home</h1>
{% endblock %}

SYNTAXE 

**{% block Nom du bloc %}**
**Contenu du bloc en html**
**{% endblock %}**

Copier les fichiers css et images dans le dossier plublic

donc 1/ on crée un bloc{% block title %}Bienvenue - O'flix{% endblock %}
Dont on change le contenu ds le les laytous
AREVOIR ??

##Deux types de balises  Double moustache{{ et moustache à lunettes {%}

**{{**pour afficher}}  **{%}** pour les instructions
On pt utilsierd des variables de php par exp {{foo.bar}} pour accéder à la propriété bar de foo
On pt déclarer des var dedans (déconseillé)
Utiliser des fcts prédéfinies avec le pipeline | 
Faire des boucles, conditions avec{%} attention à la syntaxe qui est proche de JS plutôt
On pt fr des include de tpl
On pt fr des **héritages de tpl** avec extend et parent
par défeaut les variables sont html échappées (on pt avoir le contenu brut sinon)
Pour concaténer **~**
iil y a des fonciton snatives **endswith()**, **match()**
Les blocs pvr aussi contenir des classes par exemple pour faire changer l'apparence selon le tpl'


Symfo va recevoir la requete http et la trsformer en objet Request et il va tout faire, après être passé par notre controller, pour renvoyer un objet Response


##Web debug toolbar
Profiler pack à installer
**composer require symfony/profiler-pack**
Dans le navigateur, **on verra en bas des infos de debug**
**cliquer sur le sf en bas** 
On ne le verra que si y a une balise body ds le html
On pt **voir les requetes et leur historique** !


ON VERIFIE QU'ON A BIEN VAR DUMp
    {{ dump('coucou') }}


Pou rintégrer le vardumper à twig


composer require --dev symfony/debug-bundle



##AppVariable app
Accessible partout je coris  
objet Request et autres infos
accessible directemetn


===================
##Génération des url  
Si on définit la route direct ds le controller, symfo **attribue des noms** automatiquemt mas on pt personnaliser avec **name**

Exemple :
class MainController extends AbstractController
{
    #[Route('/', name: 'app_homepage')]
    public function home(): Response
    {
        return $this->render('main/home.html.twig');
    }
}
On va se servir de la route pour générer une url qd on est ds le tpl avec  la **méth path()**
Exemple
<a href="{{ path('app_homepage') }}" </a>

**générer les url ça permet de pouvoir les modifier facilement**

On va pouvoir **récuéprer les paramètres déclarés ds les controllers**
#[Route('/demo/{monparam}/{mondeuxiemeParam}')]
    public function demo(int $monparam, string $mondeuxiemeParam): Response
    {
        $response = new Response();


#[Route('/demo/hello/{name}')]
public function hello(string $name): Response
{
    $response = new Response();

    $response->setContent('<h1>Hello ' .  $name . '</h1>');


Mais attention à spécifier les param et **leur type** on va utiliser **requirements()**
    #[Route('/demo/{id}/{secret}', requirements: ['id' => '\d+'])]
on pt l'écrire d'une anière plus concise cf doc '     #[Route('/blog/{page<\d+>}', name: 'blog_list')]

    public function demoParam(int $id, string $secret): Response

**L'ordre des actions est important** ds symfo'

On peut spécifier **la méthode http**
    #[Route('/demo/hello/{name}', methods: ['POST'])]

On peut mettre des valeurs par défaut $id=1 


==================================================



##HTACCESS

##RewriteEngine
Installation On

# Définit dynamiquement l'URL de base du projet
RewriteCond %{REQUEST_URI}::$1 ^(/.+)/(.*)::\2$
RewriteRule ^(.*) - [E=BASE_URL:%1]

# Nos URLs
# TO DO challenge

# Pour tout fichier n'existant pas, on utilise notre propre page 404
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule . index.php?page=error404 [L]


RewriteRule ^contact$ index.php?page=contact [L] 
[L] ça arrête la recherche 












#SYMFONY

#La version de symfony corrsepend à notre PHP

=================================================================================================================================================

##HTTP FOUNDATION
On l'installe avec la comamnde composer require symfony/http-foundation

composant permet de remplacer les var globales (POST,GET etc) de php par un objet requete
parameterBag :v sorte de tableau qui permet d'accéder aux valeurs'
Il va créer unobjet Request qui ncontiendra nos variables : 
$request = new Request(
    $_GET,
    $_POST,
    [],
    $_COOKIE,
    $_FILES,
    $_SERVER
);

Dans le fichier App on va créer un objet **Request**
    private Request $request;
pour traiter la requête
on peut utiliser
        $this->request = Request::createFromGlobals();


On peut aussi récupérer des réponses ds des objets **Response** 

=================================================================================================================================================
##REGEX NOTES
Soit l'htaaccess suivant
RewriteRule ^user\/(\d+)$ index.php?controller=user&id=$1 [L]
=> rewrite rule nvelle adr ancienne url

^ correspond au début de la chaîne
$ fin de la chaîne
d+ contient un ou plusrs chiffres D tout sauf un chif
. joker n'importe quel caracterer'
[abc] une lettre parmi a b ou c
[^b]og => match hog,cog mais pas bog 
 \w metacharacter  [A-Za-z0-9_]
[a-v] lettres de a à v 
a{3} 3 a ; a{1,3} => 1 à 3 a {3,} au moins un a

a+ au moins un a
[abc] au moins un a un b ou un c
a* 0 à plusieurs a **Kleene star and plus**
ab?c abc ou ac car b? signifie b  optionnel
\s any whitespace \S tout ce qui n'est pas espace'
^…$   ^pour le début $ pour la fin de la string à matcher

Match groups par exp pour extraire un numero de tel , un email.. avec les parenthèses
On va capturer entre les parenthèses qqch 
^(IMG\d+)\.png$  **capturer**a le nom du fichier sans l'extension png'

On peut utiliser le | pour "ou"


^(file.+)\.pdf$ les fichiers commençant par  file  et finissant par l'extension .pdf
ça va capturer ce qui'l y a entre les parentheses ds la variable $1, $2 si yen a 2 etc...'

Dan sle htaccess
RewriteRule ^(.*) - [E=BASE_URL:%1]
ça veur dire :
On sélectionne toute l'url et on ecrit une var d'evrnmt qui la contient


/contact/show/2 vers index.php?page=contact&id=2



REPONSEDE GREG pour le challengr:
RewriteRule ^contact/show/(\d+)$ index.php?page=contact&id=$1 [L]



Raccourcis intéressants
Ctrl ou alt sur la fct pour la voir ds son fichier
ctrl ou alt pour plusieurs curseur spourcopier plusierus fois
ctrl espace pour importer le namespace /use de la classe



## EPISODE 1 - Révisions

#C quoi Symfony
=> **Ens. de composants php réutilisables** et aussi un **framework PHP** avec architecture MVC 
=> les composants sont donc réutilisables sans avoir besoin du framework obligatoirement
Exp. de composants : Console, Routing

##Pourquoi Symfo plutôt que Laravel
-> c'est plus organisé
-> c plus complexe
-> l'organisation en composants est plus personnalisable contrairement à d'autres frameworks qui dvt imposer
-> par exp, on pt changer les fichiers de place si on vt

##Rappel http  / client serveur
->API ça sera l'interace entre sl'app et le client
-> cf cours car g pas suivi


##MVC Rappels
1/un point d'entrée unique qui va regrouper toutes els requetes :
routage=> quel code va être exécuté pour la page
dispatch->lancement du code
2/ le controller va afficher le tpl et générer le html avec des données spécifiques, c'est le controlledr qui va récupérer les données'

##exemple du projet 
-> point d'entrée = index.php
-> là ds ce projet, le routage est dans app.php.
On essaie d'écrire moins de code en dehors des classes. On range tout ds les classes
-> le controoller va exécuter les bonnes fcts
**Rappel une méthode qui s'éxecute qd on appelle une route est une ACTION**
quels fichiers revoient une réponse ??
la view
**ob start() temporisation de l'affichage'** on recupere ob get clean
çapermet de choisir si ça afficher non g pas compris loo cf 10h52 du cours
-> Gestion des erreurs à faire en deuxième 
-> Pour rajouter une page : 1/ definir la route 2/la méthode 3/les données et le tpl


##Organisation du code
**DOCBLOCKS** : c'est les **commentaires qui documentent** l'application,les fonctions, les variables,
vscode va les afficher qd on passe le curseur de la souris devant la fct
On y met une description courtedans la première ligne.
Puis on rajoute des tags **@param** , **@return**avec le type 
Il y a des logiciels qui pvt regrouper les docblocks pour faire la doc.
Exemple :
<?php
/**
 * A summary informing the user what the associated element does.
 *
 * A *description*, that can span multiple lines, to go _in-depth_ into
 * the details of this element and to provide some background information
 * or textual references.
 *
 * @param string $myArgument With a *description* of this argument,
 *                           these may also span multiple lines.
 *
 * @return void
 */
 function myFunction($myArgument)
 {
 }


Ce qui est différent de specifier le type attendu du paramètre entre les parenthèses d'une fct
exp **mafunction(integer $variable ) :string**
**on attend un integer en param et ça renvoie un string **
On pt spécifier mêm $thois self static un nom de class avec son FQCN,  ... 

cf doc
https://docs.phpdoc.org/3.0/guide/references/phpdoc/tags/index.html
https://docs.phpdoc.org/3.0/guide/guides/types.html#supported-types

**IMPORTANT DE TYPER POUR  PAS AVOIR moins ERREUR**

**Séparer le code réutilisable du code spécifique au projet**
-> créer deux dossiers, un pour l'app, un pour le framework' et un public
-> il va falloir changer certains chemins
On pt utiliser __DIR__ mais attention à bien rajouter le / à la fin comme il est pas compris dans le DIR
-> index.php on le met d sl edossier public qui ctiendra aussi les assets on rajoute ../ pour leurs chemins
-> on doit sortir le tableau des routes et on le met ds un fichier à part, on va dc le require
-> tout ce qui est du controller on le laisse mais ce qui est spécifique on le met ds un maintCotroller qu'on va utiliser ds l'app'
-> Controller@home deviennent MainCOntroller@home
            die(__LINE__);
->  si erreur dans le chargement "File not found" verifier que le htaccess est avec l'index.php'"
-> on divise le model en appModel et en Model ,AppModel extends Model
-->on déplace les tpl ds le dossier app -> il faudra changer le chemin vers eux aussi, on a fait un dossier template et un aut layaout

##Namespaces
ILs répondent au pb de conflits de noms similaires ds les classes.
Les namespaces vt perm de différencier de ql classe on parle.
Ce st des sortes de chemins virtuels vers les classes.
En général, le 1er identifiant du namespace est discriminant par exemple
namespace = laure
et App se retrouvera graĉe au namespace Laure
On va rajouter les namespaces à nos classes avec namespace nomDuNameSpace ; 
on va ensuite l'appeler avec use et son chemin FQCN complet'


##PSR4
C'est des règles àrespecter lors de la création des classes :
- la racine du namespace crrspd à un dossier précis
- on crée une class par fichier
- le nom du fichier est le nom de la classe
- le reste du namespace dt crrspdre à l'arborescence du dossier'

##Autoload
Pour ne pas avoir à importer chaque classe, on a l'autoload.
L'autoload va essayer de charger les class automatiqumt'
là on modifie ds index.php les bons namespaces (après c composer qui le fera tout seul)

##COMPOSER
on fait **composer init** 
ça va créer un **composer.json**
On répond aux questions
C'est là que ça demande si on vt utiliser le mapping PSR4' on dit ok
Ensuite, on va aller ds le fichier composer.json et on **modifie la racine**
on fait **composer install** , ça va lancer la copie des dépendances à partir du composer.json et du **dump autoload**
et puis on require le **vendor/autoload** ds php dans index.php
**NB ON N UTILISE PAS cmposer update à tort et à travers, à ne pas utilsier en prod, car update les dernières lib**
- `composer require [nom-de-la-dependance]` : permet d'ajouter une dépendance







