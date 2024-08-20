# Stratégie CI/CD

## Objectifs
- **Automatiser** et **accélérer** le dév de logiciels, accéléer la fréquence de distribution
- Automatiser les étapes de dév et surveiller les étapes du cycle de vie des apps

## Première étape : CI
- CI : **Continuous Integration** => intégration continue
- **Automatisation des processus du dév** : **tests unitaires**, demande de merge (**MR**), **PR**
- Petites itérations, intervalles réguliers
- Puis on publie ces sous ensembles sur un outil **SCM** = Outil de Gestion du Code Source = GIT
- **Pipeline** = ensemble des étapes qu’on met en place pour développer un logiciel . Puis **contrôle**. Puis **build**. Puis **tests automatisés** pour vérifer **qualité du code** , **interactions des fctnalités** entre elles
- Contrôler le plus tôt possible pour détecter le pb le + tôt => **shift left**
- **Compilation puis tests puis archivage**

## Deuxième étape : CD 
- CD : Continuous Delivery et Continuous Deployment : livraison et déploiement continus
- **livraison** = préparation avant le déploiement, on va faire des tests pour qu'il n'y ait pas d'erreur
- **déploiement** automatique est ardu

## Pipeline

- **Ensemble des étapes** qu’on met en place **pour développer** un logiciel dans une stratégie CI/CD :

    1. Développement 
    2. Build 
    3. Tests unitaires automatisés 
    4. Analyse
    5. Livraison
    6. Déploiement

- Il va utiliser des **outils de tests** de la **qualité du code** (**SonarQube**), de la **sécurité** (accès, infos sensibles, contrôles réguliers pour vérifier les vulnérabilités liées à des màj **Snyk**)

## Outils courants

- Gitlab CI/CD : suite d'outils pour mettre en place des pipelines de Gitlab
- Github Action : suite d'outils idem de Git
- Jenkins : serveur Java
- Azure Pipeline : par Microsoft, pour les repos Azure Devops
- Circle CI : prd en charge bcp de langages
- Bamboo, ArgoCD 

## CI/CD et Devops
- Devops == Développeurs et équipe opérationnelle
- La culture Devops utilise la démarche CI/CD
