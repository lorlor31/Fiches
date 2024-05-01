# NOTIONS Développement Web

# SECURITE 

## Injection XSS (Cross Site Scripting)

- Principe =  On injecte du **code sous forme de script**, en général du JS
- Voies possibles : 
    - champs de **formulaires** 
    - **paramètres d'URL** : on crée un lien vers l'URL modifiée
    - mais aussi **données récupérées d'une API** qu'on affecterait à une variable
- Buts : récupérer des infos confidentielles (local storage, token, mdp admin...) puis se les envoyer avec AJAX
- Précautions : => **assainir l'html** si on a besoin du html et pas que du contenu des éléments en
    - enlevant les balises html : **strip_tags de PHP**
    - transformant les balises en entités html **htmlentities en PHP**
    - utilisant des librairies comme DOMPurify en JS
    - évitant quand ça n'est pas nécessaire les innerHTML en JS, dangerouslySetInnerHTML en React...
- A creuser : il y en a des persistantes et non-persistantes et autres ??

## AJAX

- Asynchronous Javascript And Xml 
- Technologie qui permet de **faire des requêtes http de manière asynchrone, sans avoir besoin de recharger la page**
- Peut utiliser l'API du navigateur fetch(), AXIOS, XMLhttpRequest

## INJECTION SQL

- Principe : on injecte une requête SQl malveillante via un **formulaire / URL**
- Voies possibles : formulaire, queryString
- Buts : exécuter une requête SQl sur la BDD
- Précautions : 
    - Avant : **échappement** des caractères pour transformer les '  " \ avec addslashes() en PHP par exep
    - Utiliser des **requêtes préparées**
- Exemple de requête préparée : 
```
// récupérer la valeur passée dans le formulaire
$username = $_POST['login'];
// créer la requête avec un jeton (ou paramètre préparéé)
$query = "SELECT * FROM users WHERE username = :username ";
// on PREPARE la requête 
$statement = $pdo->prepare($query);
//On remplace les jetons par les valeurs
$statement->execute([
  ":username" => $username
]);
```

## CSRF (Cross-Site Request Forgery)

- Principe : on utilise la session de qqun pour faire qqch a sa place. Pour cela, on va lui envoyer par mail un lien qui va contenir une URL modifiée et on profit que sa session est tjrs connectée.
- Buts : on peut changer son mdp, usurper son identité, etc...
- Voies possibles : un formulaire dont l'URL a une queryString pas protégée que le hacker complète avec son mdp par exp, 
- Précautions : => utiliser un token CSRF 
    1/ On génère un token aléatoire qui change à chaque affichage du formulaire et on le met dans un input hidden 
    ` <input type="hidden" name="token" value="<?= $token ?>">`
    2/ On stocke ce token unique en session.
    3/ On l'envoie en même temps que le form
    4/ Le serveur va comparer le token reçu avec celui stocké en session.


## ROBOTS.TXT

Ce fichier sert à préciser 
1. quels dossier/ fichiers on ne veut pas que les crawlers des moteurs de recherche **explorent**
2. **indexent**
3. **sitemap** 
Son absence peut être dangereuse si on a des données sensibles qu'on ne veut pas indexer.