# Passer une application en HTTPS

> ℹ️ Ce tutoriel part du principe que tu as suivi [le tutoriel de déploiement d'une SPA Vite](./deploy-vite-spa.md) et/ou [le tutoriel d'une application Symfony](./deploy-symfony.md) et que ton projet est bien en ligne sur ta VM Server Kourou.

> ⚠️ Si ton projet est composé d'une SPA et d'une API, il faut que l'API communique en HTTPS pour que la SPA puisse passer en HTTPS. En effet, si tu passes le front-end en HTTPS mais qu'il cherche encore à faire des requêtes vers une API en HTTP, le navigateur considérera ces opérations comme non sécurisées et les empêchera.

## Étape 1 : Installer Certbot

```bash
sudo apt update
sudo apt install -y certbot python3-certbot-apache
```

## Étape 2 : Générer le certificat SSL et mettre en place HTTPS

> ⚠️ Avant de faire cette étape, tu dois rendre ta VM Server Kourou accessible au reste du monde. En effet, Certbot va faire générer un certificat SSL à l'autorité de certification Let's Encrypt, qui a besoin de pouvoir faire une requête HTTP à ta VM Server pour vérifier que c'est bien elle qui demande le certificat. Tu peux le faire en cliquant sur le bouton "Rendre la VM publique" sur [la page d'administration de ta VM Server Kourou](https://kourou.oclock.io/ressources/vm-cloud/).

```bash
sudo certbot --apache
```

Certbot va ensuite te demander quelques informations pour lui permettre de générer le certificat SSL.

```
Enter email address (used for urgent renewal and security notices)
> email@oclock.school
```
Saisis un e-mail auquel tu es joignable, de préférence. Tu peux par exemple donner ton adresse e-mail en `@oclock.school`.

```
Please read the Terms of Service at https://letsencrypt.org/documents/LE-SA-v1.3-September-21-2022.pdf.
You must agree in order to register with the ACME server. Do you agree?
> Y
```
Accepte les conditions d'utilisation de Let's Encrypt en saisissant `Y` ici.

```
Would you be willing, once your first certificate is successfully issued, to share your email address with the Electronic Frontier Foundation, a founding partner of the Let's Encrypt project and the non-profit organization that develops Certbot?
We'd like to send you email about our work encrypting the web, EFF news, campaigns, and ways to support digital freedom.
> N
```
Tu peux choisir de t'inscrire à la newsletter de la fondation EFF qui édite Certbot. Ceci n'est pas obligatoire pour générer le certificat SSL, tu peux donc répondre `Y` pour accepter, ou `N` pour refuser.

```
Please enter the domain name(s) you would like on your certificate (comma and/or space separated)
> pseudo-server.eddi.cloud
```
Entre le nom de domaine de ta VM Server Cloud pour que Let's Encrypt puisse tester son existence et générer un certificat SSL pour lui.

> ⚠️ Si Let's Encrypt ne peut pas tester l'existence de ta VM, vérifie que tu as bien rendu ta VM publique et relance la commande.


## Étape 3 : _HTTPS and chill_ 😎🌴

Voilà, c'est tout ! Ton site devrait être accessible via HTTPS !

Tu peux vérifier en te rendant sur ta VM Server Kourou avec ton navigateur web `https://pseudo-server.eddi.cloud`.

> ℹ️ Normalement, Certbot a modifié ta configuration Apache pour rediriger automatiquement les requêtes faites en HTTP vers leur équivalent en HTTPS. Pense quand même à mettre à jour les URLs que tu utilises dans les différents projets si tu fais des appels API.
