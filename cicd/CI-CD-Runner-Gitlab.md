# RUNNER GITLAB

## Définitions : Runner / Pipeline / Stages / Jobs
    - Un **runner** est une sorte de programme/**service** qui va permettre d'exécuter des **jobs**. 
    - Il peut être **lié à un projet spécifique** ou **partagé**.
    - Quand il est de projet, il est enregistré sur l'ordi et le programme gitlab-runner va lancer une instance de ce runner pour exécuter les commandes qu'il contient.
    - Ces commandes sont dans un fichier .gitlab-ci.yml qui servira à créer les **pipelines**, c'est l'enchaînement des **stages**
    - Les **stages** contiennent des **jobs** qui s'exécutent les uns après les autres.

## Etapes principales de la mise en oeuvre du runner

1. Créer un repo sur Gitlab
2. Créer le runner : 
    - Aller dans **Settings->CI/CD->Runners**
    - Cliquer sur **New Project Runner** et vérifier la conf ( cocher "Run untagged jobs")
    - Cliquer sur **Create runner**
3. Enregistrer le runner :
    - Mettre Linux et copier le code.
    - Ouvrir un terminal et coller la commande copiée précédée de **sudo**
    - Pour `Enter the GitLab instance URL` faire Entrée
    - Taper le nom qu'on veut pour le runner.
    - Taper `shell` pour l'exécuteur.
    - La config du runner sera rajoutée dans le fichier `/etc/gitlab-runner/config.toml`
4. Editer le runner :
    - Aller dans Build=> Pipeline Editor
    - Editer le fichier .gitlab-ci.yml
5. A faire avant, après, selon les cas :
- Déclarer des variables d'environnement, qu'on peut même faire varier selon les environnements (dev,prod etc...). Exp : DATABASE_URL="mysql://${DATABASE_USER}:${DATABASE_PWD}@127.0.0.1:3306/${DATABASE_NAME}". Attention à mettre les variables à remplacer entourées par ${}, sans guillemets.
- Attention à décocher que la variable ne fonctionne que sur des branches protégées si ce n'est pas nécessaire.
- Pour déclarer des environnements, Operate->Environments.
- Bien vérifier que le runner est lancé dans la liste des runners
- Décocher la possibilité d'utiliser des runners partagés.
- 

## Explications sur le déroulement 

- **GitLab détecte le push** et vérifie s'il existe un fichier .gitlab-ci.yml dans le dépôt. Ce fichier définit la configuration du pipeline CI/CD, y compris les étapes (stages) et les jobs à exécuter. 
- Il **crée un pipeline** en fonction des instructions définies dans le fichier .gitlab-ci.yml. Chaque job est ajouté à la file d'attente du runner pour être exécuté.
- Un **runner approprié** est sélectionné pour exécuter les jobs du pipeline. Cela peut être un runner partagé (Shared Runner) ou un runner spécifique dédié au projet.
- Le runner récupère les jobs de la file d'attente et les **exécute dans l'environnement spécifié**. Chaque job peut impliquer des tâches telles que la compilation de code, l'exécution de tests, la construction d'artefacts, ou le déploiement d'applications.
- Pendant l'exécution, le runner génère des **logs et des rapports** qui sont renvoyés à GitLab. Vous pouvez voir l'état d'avancement et les détails de chaque job dans l'interface GitLab.
- Chaque job retourne un **état de sortie** (success ou failure) à GitLab une fois terminé. GitLab utilise ces résultats pour décider de la progression du pipeline et de l'état global du build.
- Une fois que tous les jobs sont terminés, le runner **nettoie** les ressources utilisées (par exemple, les conteneurs Docker) et archive éventuellement les artefacts générés (comme les fichiers de build).


## Exemples de scripts pour s'inspirer

### Script avec deux environnements, les variables ont été déclarées au préalable pour ces deux environnements

Attention en env de prod, il faudra déclencher manuellement le déploiement.

```
# Initialisation de commandes utiles au traitement (communes aux différents environnements)
before_script:
  # instructions requises pour l'authentification par clef
 - eval $(ssh-agent)
  - echo "$SSH_PRIVATE_KEY" | ssh-add -
  - pwd
  - ls -alrt

# S'affichera uniquement lors d'un déploiement de la branche "develop"
livraison_sur_environnement_de_development:
  rules:
    - if: '$CI_COMMIT_BRANCH == "develop"'
  environment: development

  script:
      # Génération dynamique du fichier de configuration ".env" à partir du template ".env.example"
      # (les patterns sont remplacés par les variables déclarées dans Gitlab 
      # qui deviennent des variables d'environnement dans le contexte du Runner)
      - envsubst < ".env.example" > fichier_temporaire && mv fichier_temporaire ".env"
      - ls -alrt

      # Suppression des fichiers et dossiers à exclure du transfert
      - rm .env.example
      - rm -rf .git/
      - rm .gitlab-ci.yml

      # Affichage du chemin courant pour information, 
      # on remonte d'un dossier supérieur pour jouer la commande d'archive
      - pwd
      - cd ..

      # Suppression du dossier "development" d'un déploiement précédent
      # Création de l'archive et affichage du contenu du dossier courant pour visualiser l'existence de l'archive
      - rm -rf development
      - mv ./ci_lot4 ./development
      - tar -czf ci_lot4_development.tar.gz ./development
      - ls -alrt      

      # Transfert de l'archive et message d'information affiché dans la console du pipeline
       - scp -P 5022 -p ci_lot4_development.tar.gz nomUtilisateur@nomHote.com:/home/chemin_absolu_jusqu_au_dossier_parent_du_projet/
      - echo "Copie de l'archive terminée"
      # Connexion en ssh sur le serveur distant pour décompresser l'archive puis la 
      # supprimer (car devenue inutile après usage)
      - ssh -p '5022' il manque une ‘ ici  nomUtilisateur@nomHote.com' /bin/bash<<-EOT
      - cd /home/chemin_absolu_jusqu_au_dossier_parent_du_projet/
      - tar -xzf ci_lot4_development.tar.gz
      - rm ci_lot4_development.tar.gz
      - EOT 

# S'affiche uniquement lors d'un déploiement de la branche "main"
livraison_sur_environnement_de_production:
  rules:
    # si la branche est main
    - if: '$CI_COMMIT_BRANCH == "main"'
      when: manual
  environment: production

  script:
      # Génération dynamique du fichier de configuration ".env" à partir du template ".env.example"
      # (les patterns sont remplacés par les variables déclarées dans Gitlab 
      # qui deviennent des variables d'environnement dans le contexte du Runner)
      - envsubst < ".env.example" > fichier_temporaire && mv fichier_temporaire ".env"
      - ls -alrt

      # Suppression des fichiers et dossiers à exclure du transfert
 - rm .env.example
      - rm -rf .git/
      - rm .gitlab-ci.yml

      # Affichage du chemin courant pour information, on remonte d'un dossier 
      # supérieur pour jouer la commande d'archive
      - pwd
      - cd ..
      
      # Suppression du dossier "production" d'un déploiement précédent
      # Création de l'archive et affichage du contenu du dossier courant pour visualiser l'existence de l'archive
      - rm -rf production      
      - mv ./ci_lot4 ./production
      - tar -czf ci_lot4_production.tar.gz ./production
      - ls

      # Transfert de l'archive et message d'information affiché dans la console du pipeline
       - scp -P 5022 -p ci_lot4_production.tar.gz nomUtilisateur@nomHote.com:/home/chemin_absolu_jusqu_au_dossier_parent_du_projet/
      - echo "Copie de l'archive terminée"
      # Connexion en ssh sur le serveur distant pour décompresser
      #  l'archive puis la supprimer (car devenue inutile après usage)
      - ssh -p '5022' ‘nomUtilisateur@nomHote.com' /bin/bash<<-EOT
      - cd /home/chemin_absolu_jusqu_au_dossier_parent_du_projet/        
      - tar -xzf ci_lot4_production.tar.gz
      - rm ci_lot4_production.tar.gz
      - EOT 

```
### Script pour un projet réalisé avec Symfony


```
j_execute_les_instructions_de_livraison:


 cache:
   paths:
     - vendor/


 script:
     # Génération dynamique du fichier de configuration ".env.local" à partir du template ".env"
     # (les patterns sont remplacés par les variables déclarées dans Gitlab
     # qui deviennent des variables d'environnement dans le contexte du Runner)
     - envsubst < ".env" > fichier_temporaire && mv fichier_temporaire ".env.local"
     - ls -alrt
 
     # Installation de Composer dans le répertoire courant
     - curl -sS https://getcomposer.org/installer | php -- --install-dir=./ --filename=composer


     # Installation de symfony et de ses dépendances dans le répertoire courant
     -  php ./composer install --working-dir=./


     # Commandes requises pour l'authentification par clef
     - eval $(ssh-agent)
     - echo "$SSH_PRIVATE_KEY" | ssh-add -


     # Suppression du dossier .git et fichier à exclure du transfert
     - rm -rf .git/
     - rm .gitlab-ci.yml


     # Affichage du chemin courant pour information, on remonte d'un dossier supérieur pour jouer la commande d'archive
     - pwd
     - cd ..


     # Création de l'archive et affichage du contenu du dossier courant pour visualiser l'existence de l'archive
     # Le nom du dossier courant correspond au slug du projet
     - tar -czf ci_lot5.tar.gz ./ci_lot5
     - ls


     # Transfert de l'archive et message d'information affiché dans la console du pipeline
     - scp -P 'numPort' -p ci_lot5.tar.gz nomUtilisateur@nomHote.com:/home/chemin_absolu_jusqu_au_dossier_parent_du_projet/
     - echo "Copie de l'archive terminée"


     # Connexion en ssh sur le serveur distant pour décompresser l'archive puis la supprimer (car devenue inutile après usage)
     - ssh -p 'numPort' 'nomUtilisateur@nomHote.com' /bin/bash<<-EOT
     - cd /home/chemin_absolu_jusqu_au_dossier_parent_du_projet/
     - tar -xzf ci_lot5.tar.gz
     - rm ci_lot5.tar.gz
     - EOT   
```

### Script pour un projet réalisé avec NPM


```
j_execute_les_instructions_de_livraison:


 script:


     # Exécution de npm pour installer les dépendances du projet
     - npm install


     # Commandes requises pour l'authentification par clef
     - eval $(ssh-agent)
     - echo "$SSH_PRIVATE_KEY" | ssh-add -


     # Suppression du dossier .git et fichier à exclure du transfert
     - rm -rf .git/
     - rm .gitlab-ci.yml


     # Affichage du chemin courant pour information, on remonte d'un dossier supérieur pour jouer la commande d'archive
     - pwd
     - cd ..


     # Création de l'archive et affichage du contenu du dossier courant pour visualiser l'existence de l'archive
     # Le nom du dossier courant correspond au slug du projet
     - tar -czf ci_lot6.tar.gz ./ci_lot6
     - ls

     # Transfert de l'archive et message d'information affiché dans la console du pipeline
     - scp -P 'numPort' -p ci_lot6.tar.gz nomUtilisateur@nomHote.com:/home/chemin_absolu_jusqu_au_dossier_parent_du_projet/
     - echo "Copie de l'archive terminée"


     # Connexion en ssh sur le serveur distant pour décompresser l'archive puis la supprimer (car devenue inutile après usage)
     - ssh -p 'numPort' 'nomUtilisateur@nomHote.com' /bin/bash<<-EOT
     - cd /home/chemin_absolu_jusqu_au_dossier_parent_du_projet/
     - tar -xzf ci_lot6.tar.gz
     - rm ci_lot6.tar.gz
     - EOT  
```

### Script pour forcer l'usage de versions de npm et PHP


```
J_affiche les versions de npm, de node.js et de php utilisées par votre runner:
 
 # Déclaration d’une variable d’environnement pour personnaliser les commandes
 variables:
   PATH: "$HOME/bin:$PATH"


 script:
   # Installer nvm
   - curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
   # Permettre au bash d'exécuter nvm sans avoir à relancer le shell
   - export NVM_DIR="$HOME/.nvm"
   - |
     if [ -s "$NVM_DIR/nvm.sh" ]; then
       . "$NVM_DIR/nvm.sh"
     fi
   # Aller dans le répertoire qui va accueillir le build de votre dépôt, par exemple /home/gitlab-runner , remplacer si vous n’avez pas installé gitlab-runner le même dossier
   - cd /home/gitlab-runner
   # Forcer node.js à utiliser la version 14.15.1
   - nvm install 14.15.1
   # Affichage des versions de node et de npm utilisées
   - echo -e "\033[1;33mVotre runner utilise la version $(node -v) de node et la version $(npm -v) de npm. \033[0m"
   # Forcer php à utiliser la version 8.1
   # Création d'un lien symbolique qui pointe vers le binaire de la version de PHP désirée dans le dossier personnel de l’utilisateur
   - mkdir -p $HOME/bin
   - ln -sfn /usr/bin/php8.1 $HOME/bin/php
   - export PATH=$HOME/bin:$PATH
   # Affichage de la version de php utilisée
   - echo -e "\033[1;33m Votre runner utilise la version $(php -v) . \033[0m"

```