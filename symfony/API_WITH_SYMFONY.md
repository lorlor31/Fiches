# CREER UNE API AVEC SYMFONY

## CREER UN PROJET SYMFONY AVEC COMPOSANTS ESSENTIELS

`composer create-project symfony/skeleton nomDeMonProjet`
et si nécessaire ?
`composer require api`

On aura besoin aussi du :
- maker `composer require symfony/maker-bundle --dev`
- doctrine `composer require symfony/orm-pack`
- validator `composer require symfony/validator`
- securyty bundle `composer require symfony/security-bundle`
## CONTROLLER ET ROUTES

Créer un controller sans tpl : `bin/console make:controller --no-template`
Installer le serializer : `composer require symfony/serializer-pack`
L'importer en paramètre ds le controller `SerializerInterface $serializer`

### Dans le controller, on va créer des routes qui seront les endpoints de l'API :
- ça suit la même structure que des routes classiques mais attention à bien stipuler la méthode HTTP
`#[Route('url', name: 'nom', methods: ['methode'], requirements: contraintes)]`
- on rajoute `: JsonResponse` à la fin des méthodes pour dire qu'on attend bien un JSON
Exemple :
`#[Route('/api/genres/{id}/shows', name: 'app_api_genres_getShows', methods: ['GET'], requirements: ['id' => 'd+'])]`

### On récupère les JSON grâce à la méthode ->json() de l'AbstractController

    `return $this->json($data, $status = 200, $headers = [], $context = []);`

    $data = données à convertir en json
    $status = code http ou réponse http
    $headers = headers éventuels par exemple pour la redirection
    $context = contexte d'application de la sérialisation, par exemple pour les groupes 

### Cas du Create

- La route est en POST !
- Bien typeHinter Request, Serializer
- On récupère la data avec getContent()
- En API REST, la convention est de rediriger vers la liste :
<!-- //TODO verifier que la mise en page est ok :) -->
            $data = $request->getContent();
            $product = $serializer->deserialize($data, product::class, 'json');
            $entityManager->persist($product);
            $entityManager->flush();
            return $this->json(
            $product, 
            Response::HTTP_CREATED, 
            ["Location" => $this->generateUrl("app_products")]
            ); 
- Attention il peut y avoir des relations circulaires, cf normalizer ci-dessous
- Pour tester le Create, envoyer un JSON via Postman (dans body->raw->JSON)
## VALIDATIONS ET CONTRAINTES

- à rajouter au-dessus des propriétés des entités
https://symfony.com/doc/current/reference/constraints.html

` #[Assert\NotBlank]`
va empêcher la valeur d'être nulle ou vide

> Autres exemples :  
- #[Assert\NotNull]  
- #[Assert\Length(min: 2)]  
- #[Assert\DateTime]
- #[Assert\Choice([['ROLE_USER'],[ 'ROLE_ADMIN']])]
- #[Assert\ExpressionSyntax(
    allowedVariables: ['created','archived','obsolete','deleted'],
    message : 'You should provide a valid status for the contract ! '
)]

> Attention : il y a deux types de contraintes : 
- celles de Symfony : `#[Assert\type(Types::DATE_IMMUTABLE)]`

- celles de Doctrine : `#[ORM\Column(type: Types::DATETIME_IMMUTABLE )]`

## SERIALIZER ET NORMALIZER

Le composant serializer va permettre de **convertir l'objet en JSON = sérialiser** (on désérialise qd on convertit le JSON en objet).
Son installation suffit à convertir automatiquement les objets en JSON.
Mais il a beaucoup d'autres outils pour nous permettre de régler des problèmes courants...

### Références circulaires et groupes d'annotation
Pour régler le problème des références circulaires lors de la récupération des données en JSON sur des entités ayant des relations avec d'autres, on va utiliser les groupes :

1. importer la classe des groupes dans l'entité :

`use Symfony\Component\Serializer\Annotation\Groups;`

2. au-dessus de la déclaration de la classe de l'entité, créer un groupe :

`#[Groups(['product'])]`

3. Pour chaque propriété, sauf celles concernant des relations, rajouter un sous-groupe :

`#[Groups(['productLinked'])]`

4. Récupérer, avec le controller, uniquement les groupes désirés : 

`return $this->json(
            $products ,
            Response::HTTP_OK,
            [],
            ["groups"=>['product','brandLinked']]
        );`

5. A tester : on peut aussi sélectionner certains attributs (cf doc) et ignorer des attributs lors de la sérialisation :  
Exp : `return $this->json($genreRepository->findAll(), 200, [], 
[AbstractNormalizer::IGNORED_ATTRIBUTES => ['shows']]);`

### Dénormalisation
Dans le cas où on veut pouvoir créer un enregistrement avec des infos liées à un autre enregistrement, si on ne dénormalise pas, ça va créer un nouvel enregistrement de l'entité liée.
On va utilsier le dénormaliseur cf fichier /src/Serializer/EntityDenormalizer.php
Tout fichier placé ds le dossier /Serializer sera inspecté par Symfony lors de l'utilisation du serializer.
Ce dénormalizer permet de récupérer les infos liées à une entité à partir de son id.
Il suffira de spécifier l'id lors de la création du JSON sous la forme `{"propriété":id }`.

## AUTHENTIFICATION AVEC UN JSON WEB TOKEN
Culture G : L'authentification peut généralement se faire avec les sessions, l'identifiant est dans les headers. Mais si'l y a plusieurs serveurs, on peut plus retrouver le serveur qui détient le login, les serveurs vont être stateless et ne mémorisent pas l'état, ils sont indépendants, le JWT va contenir les infos d'authentification, il a 3 blocs : 1. entête(algo de chiffrage) 2. corps(claims=infos en JSON,dates de création et d'expiration) 3. signature (signature qui valide le token). 
=> LE JWT permet donc de ne pas avoir à faire des allers /retours entre serveurs et BDD, il est aussi utile pour les app mobiles et les API, et aussi on peut utiliser la clé privée pour être validée par un organisme public qui aurait accès à la clé publique.
cf doc. https://github.com/lexik/LexikJWTAuthenticationBundle/blob/3.x/Resources/doc/index.rst#getting-started

1. Installation du composant lexik/jwt-authentication-bundle
` composer require lexik/jwt-authentication-bundle`

2. Générer les clés 
`php bin/console lexik:jwt:generate-keypair`

3. Rajouter dans le .env
```
    JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
    JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
    JWT_PASSPHRASE=
```
4. Dans config/packages/security.yaml

```
security:
    enable_authenticator_manager: true # Only for Symfony 5.4
    # ...

    firewalls:
        login:
            pattern: ^/api/login
            stateless: true
            json_login:
                check_path: /api/login_check
                success_handler: lexik_jwt_authentication.handler.authentication_success
                failure_handler: lexik_jwt_authentication.handler.authentication_failure

        api:
            pattern:   ^/api
            stateless: true
            jwt: ~

    access_control:
        - { path: ^/api/login, roles: PUBLIC_ACCESS }
        - { path: ^/api,       roles: IS_AUTHENTICATED_FULLY }
```

5. Dans config/routes.yaml : 
```
api_login_check:
    path: /api/login_check
```
Cette route a été créée automatiquement par lexikJWT.

6. Pour s'authentifier manuellement il faut copier le json des identifiants 
`{"username":"admin@gmail.com","password":"admin"}` où username est la propriété discriminante dans User.php
dans le body de la requête et envoyer à /api/login_check
ça va générer un token qu'on va copier dans authorization->bearer ds postman lors de l'accès aux routes protégées.
=> g pas compris comment c'lié à l'ACL ?
=> lire de la doc pour synthétiser


Il faut avoir crée le user avec make:user avant.

RESUME POUR JWT
1/ créer le user avec make:user et mettre des id et mdp
2/ installer le bundle lexikJWT
3/ générer les clés
4/ configurer les fichiers
5/ aller sur la route [api/login_check](http://localhost:8080/api/login_check)
6/ envoyer le {"username":"admin@gmail.com","password":"admin"} dans le body en POST 
7/ récupérer le token
Explications : la configuration via routes.yaml et services.yaml va permettre de gérer l'authentification.
Les infos de hashage du pwd et la vérification de la clé st dans le fichier security.yaml et .env.
Automatiquement le token va être envoyé dans le header et contient le role donc va permettre ou non l'accès à la route selon l'ACL du security.yaml.

hasher de symfo en CLI bin/console security:hash-password

<!-- ============extrait de l issue 
Je pense que vous mélangez un peu les choses ici : vous devriez avoir une route dédiée à l'authentification (le fameux login que gère pour vous le bundle LexikJWT) et une autre route dédiée à la récupération des informations de l'utilisateur du token 🙂

Il est souvent d'usage de trouver dans des API qui utilisent des tokens JWT pour l'authentification une route /me qui détermine l'utilisateur à partir du token JWT et renvoie ses informations.

Très concrètement, vu que LExikJWT gère toute la partie authentification et vérification du token, ça signifie que vous n'avez qu'à créer cette route et son controller, dans lequel vous pourrez simplement utiliser $this->getUser() pour récupérer l'utilisateur déduit du token, et renvoyer ses informations en JSON. -->



## CORS ORIGIN


1. Installer nelmio CORS bundle

`composer require nelmio/cors-bundle`

2. Exemples de conf de ../config/packages/nelmio_cors.yaml
`paths:'^/': # allow_origin: ['*']`
ou
`paths:'^/': # allow_origin: ['nom_de_domaine_autorisé']`