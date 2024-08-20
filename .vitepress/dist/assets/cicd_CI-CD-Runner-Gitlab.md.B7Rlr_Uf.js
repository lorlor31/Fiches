import{_ as n,c as s,o as a,a2 as e}from"./chunks/framework.BXMoTSpH.js";const v=JSON.parse('{"title":"RUNNER GITLAB","description":"","frontmatter":{},"headers":[],"relativePath":"cicd/CI-CD-Runner-Gitlab.md","filePath":"cicd/CI-CD-Runner-Gitlab.md"}'),p={name:"cicd/CI-CD-Runner-Gitlab.md"},l=e(`<h1 id="runner-gitlab" tabindex="-1">RUNNER GITLAB <a class="header-anchor" href="#runner-gitlab" aria-label="Permalink to &quot;RUNNER GITLAB&quot;">​</a></h1><h2 id="definitions-runner-pipeline-stages-jobs" tabindex="-1">Définitions : Runner / Pipeline / Stages / Jobs <a class="header-anchor" href="#definitions-runner-pipeline-stages-jobs" aria-label="Permalink to &quot;Définitions : Runner / Pipeline / Stages / Jobs&quot;">​</a></h2><pre><code>- Un **runner** est une sorte de programme/**service** qui va permettre d&#39;exécuter des **jobs**. 
- Il peut être **lié à un projet spécifique** ou **partagé**.
- Quand il est de projet, il est enregistré sur l&#39;ordi et le programme gitlab-runner va lancer une instance de ce runner pour exécuter les commandes qu&#39;il contient.
- Ces commandes sont dans un fichier .gitlab-ci.yml qui servira à créer les **pipelines**, c&#39;est l&#39;enchaînement des **stages**
- Les **stages** contiennent des **jobs** qui s&#39;exécutent les uns après les autres.
</code></pre><h2 id="etapes-principales-de-la-mise-en-oeuvre-du-runner" tabindex="-1">Etapes principales de la mise en oeuvre du runner <a class="header-anchor" href="#etapes-principales-de-la-mise-en-oeuvre-du-runner" aria-label="Permalink to &quot;Etapes principales de la mise en oeuvre du runner&quot;">​</a></h2><ol><li>Créer un repo sur Gitlab</li><li>Créer le runner : <ul><li>Aller dans <strong>Settings-&gt;CI/CD-&gt;Runners</strong></li><li>Cliquer sur <strong>New Project Runner</strong> et vérifier la conf ( cocher &quot;Run untagged jobs&quot;)</li><li>Cliquer sur <strong>Create runner</strong></li></ul></li><li>Enregistrer le runner : <ul><li>Mettre Linux et copier le code.</li><li>Ouvrir un terminal et coller la commande copiée précédée de <strong>sudo</strong></li><li>Pour <code>Enter the GitLab instance URL</code> faire Entrée</li><li>Taper le nom qu&#39;on veut pour le runner.</li><li>Taper <code>shell</code> pour l&#39;exécuteur.</li><li>La config du runner sera rajoutée dans le fichier <code>/etc/gitlab-runner/config.toml</code></li></ul></li><li>Editer le runner : <ul><li>Aller dans Build=&gt; Pipeline Editor</li><li>Editer le fichier .gitlab-ci.yml</li></ul></li><li>A faire avant, après, selon les cas :</li></ol><ul><li>Déclarer des variables d&#39;environnement, qu&#39;on peut même faire varier selon les environnements (dev,prod etc...). Exp : DATABASE_URL=&quot;mysql://\${DATABASE_USER}😒{DATABASE_PWD}@127.0.0.1:3306/\${DATABASE_NAME}&quot;. Attention à mettre les variables à remplacer entourées par \${}, sans guillemets.</li><li>Attention à décocher que la variable ne fonctionne que sur des branches protégées si ce n&#39;est pas nécessaire.</li><li>Pour déclarer des environnements, Operate-&gt;Environments.</li><li>Bien vérifier que le runner est lancé dans la liste des runners</li><li>Décocher la possibilité d&#39;utiliser des runners partagés.</li><li></li></ul><h2 id="explications-sur-le-deroulement" tabindex="-1">Explications sur le déroulement <a class="header-anchor" href="#explications-sur-le-deroulement" aria-label="Permalink to &quot;Explications sur le déroulement&quot;">​</a></h2><ul><li><strong>GitLab détecte le push</strong> et vérifie s&#39;il existe un fichier .gitlab-ci.yml dans le dépôt. Ce fichier définit la configuration du pipeline CI/CD, y compris les étapes (stages) et les jobs à exécuter.</li><li>Il <strong>crée un pipeline</strong> en fonction des instructions définies dans le fichier .gitlab-ci.yml. Chaque job est ajouté à la file d&#39;attente du runner pour être exécuté.</li><li>Un <strong>runner approprié</strong> est sélectionné pour exécuter les jobs du pipeline. Cela peut être un runner partagé (Shared Runner) ou un runner spécifique dédié au projet.</li><li>Le runner récupère les jobs de la file d&#39;attente et les <strong>exécute dans l&#39;environnement spécifié</strong>. Chaque job peut impliquer des tâches telles que la compilation de code, l&#39;exécution de tests, la construction d&#39;artefacts, ou le déploiement d&#39;applications.</li><li>Pendant l&#39;exécution, le runner génère des <strong>logs et des rapports</strong> qui sont renvoyés à GitLab. Vous pouvez voir l&#39;état d&#39;avancement et les détails de chaque job dans l&#39;interface GitLab.</li><li>Chaque job retourne un <strong>état de sortie</strong> (success ou failure) à GitLab une fois terminé. GitLab utilise ces résultats pour décider de la progression du pipeline et de l&#39;état global du build.</li><li>Une fois que tous les jobs sont terminés, le runner <strong>nettoie</strong> les ressources utilisées (par exemple, les conteneurs Docker) et archive éventuellement les artefacts générés (comme les fichiers de build).</li></ul><h2 id="exemples-de-scripts-pour-s-inspirer" tabindex="-1">Exemples de scripts pour s&#39;inspirer <a class="header-anchor" href="#exemples-de-scripts-pour-s-inspirer" aria-label="Permalink to &quot;Exemples de scripts pour s&#39;inspirer&quot;">​</a></h2><h3 id="script-avec-deux-environnements-les-variables-ont-ete-declarees-au-prealable-pour-ces-deux-environnements" tabindex="-1">Script avec deux environnements, les variables ont été déclarées au préalable pour ces deux environnements <a class="header-anchor" href="#script-avec-deux-environnements-les-variables-ont-ete-declarees-au-prealable-pour-ces-deux-environnements" aria-label="Permalink to &quot;Script avec deux environnements, les variables ont été déclarées au préalable pour ces deux environnements&quot;">​</a></h3><p>Attention en env de prod, il faudra déclencher manuellement le déploiement.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Initialisation de commandes utiles au traitement (communes aux différents environnements)</span></span>
<span class="line"><span>before_script:</span></span>
<span class="line"><span>  # instructions requises pour l&#39;authentification par clef</span></span>
<span class="line"><span> - eval $(ssh-agent)</span></span>
<span class="line"><span>  - echo &quot;$SSH_PRIVATE_KEY&quot; | ssh-add -</span></span>
<span class="line"><span>  - pwd</span></span>
<span class="line"><span>  - ls -alrt</span></span>
<span class="line"><span></span></span>
<span class="line"><span># S&#39;affichera uniquement lors d&#39;un déploiement de la branche &quot;develop&quot;</span></span>
<span class="line"><span>livraison_sur_environnement_de_development:</span></span>
<span class="line"><span>  rules:</span></span>
<span class="line"><span>    - if: &#39;$CI_COMMIT_BRANCH == &quot;develop&quot;&#39;</span></span>
<span class="line"><span>  environment: development</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  script:</span></span>
<span class="line"><span>      # Génération dynamique du fichier de configuration &quot;.env&quot; à partir du template &quot;.env.example&quot;</span></span>
<span class="line"><span>      # (les patterns sont remplacés par les variables déclarées dans Gitlab </span></span>
<span class="line"><span>      # qui deviennent des variables d&#39;environnement dans le contexte du Runner)</span></span>
<span class="line"><span>      - envsubst &lt; &quot;.env.example&quot; &gt; fichier_temporaire &amp;&amp; mv fichier_temporaire &quot;.env&quot;</span></span>
<span class="line"><span>      - ls -alrt</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      # Suppression des fichiers et dossiers à exclure du transfert</span></span>
<span class="line"><span>      - rm .env.example</span></span>
<span class="line"><span>      - rm -rf .git/</span></span>
<span class="line"><span>      - rm .gitlab-ci.yml</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      # Affichage du chemin courant pour information, </span></span>
<span class="line"><span>      # on remonte d&#39;un dossier supérieur pour jouer la commande d&#39;archive</span></span>
<span class="line"><span>      - pwd</span></span>
<span class="line"><span>      - cd ..</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      # Suppression du dossier &quot;development&quot; d&#39;un déploiement précédent</span></span>
<span class="line"><span>      # Création de l&#39;archive et affichage du contenu du dossier courant pour visualiser l&#39;existence de l&#39;archive</span></span>
<span class="line"><span>      - rm -rf development</span></span>
<span class="line"><span>      - mv ./ci_lot4 ./development</span></span>
<span class="line"><span>      - tar -czf ci_lot4_development.tar.gz ./development</span></span>
<span class="line"><span>      - ls -alrt      </span></span>
<span class="line"><span></span></span>
<span class="line"><span>      # Transfert de l&#39;archive et message d&#39;information affiché dans la console du pipeline</span></span>
<span class="line"><span>       - scp -P 5022 -p ci_lot4_development.tar.gz nomUtilisateur@nomHote.com:/home/chemin_absolu_jusqu_au_dossier_parent_du_projet/</span></span>
<span class="line"><span>      - echo &quot;Copie de l&#39;archive terminée&quot;</span></span>
<span class="line"><span>      # Connexion en ssh sur le serveur distant pour décompresser l&#39;archive puis la </span></span>
<span class="line"><span>      # supprimer (car devenue inutile après usage)</span></span>
<span class="line"><span>      - ssh -p &#39;5022&#39; il manque une ‘ ici  nomUtilisateur@nomHote.com&#39; /bin/bash&lt;&lt;-EOT</span></span>
<span class="line"><span>      - cd /home/chemin_absolu_jusqu_au_dossier_parent_du_projet/</span></span>
<span class="line"><span>      - tar -xzf ci_lot4_development.tar.gz</span></span>
<span class="line"><span>      - rm ci_lot4_development.tar.gz</span></span>
<span class="line"><span>      - EOT </span></span>
<span class="line"><span></span></span>
<span class="line"><span># S&#39;affiche uniquement lors d&#39;un déploiement de la branche &quot;main&quot;</span></span>
<span class="line"><span>livraison_sur_environnement_de_production:</span></span>
<span class="line"><span>  rules:</span></span>
<span class="line"><span>    # si la branche est main</span></span>
<span class="line"><span>    - if: &#39;$CI_COMMIT_BRANCH == &quot;main&quot;&#39;</span></span>
<span class="line"><span>      when: manual</span></span>
<span class="line"><span>  environment: production</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  script:</span></span>
<span class="line"><span>      # Génération dynamique du fichier de configuration &quot;.env&quot; à partir du template &quot;.env.example&quot;</span></span>
<span class="line"><span>      # (les patterns sont remplacés par les variables déclarées dans Gitlab </span></span>
<span class="line"><span>      # qui deviennent des variables d&#39;environnement dans le contexte du Runner)</span></span>
<span class="line"><span>      - envsubst &lt; &quot;.env.example&quot; &gt; fichier_temporaire &amp;&amp; mv fichier_temporaire &quot;.env&quot;</span></span>
<span class="line"><span>      - ls -alrt</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      # Suppression des fichiers et dossiers à exclure du transfert</span></span>
<span class="line"><span> - rm .env.example</span></span>
<span class="line"><span>      - rm -rf .git/</span></span>
<span class="line"><span>      - rm .gitlab-ci.yml</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      # Affichage du chemin courant pour information, on remonte d&#39;un dossier </span></span>
<span class="line"><span>      # supérieur pour jouer la commande d&#39;archive</span></span>
<span class="line"><span>      - pwd</span></span>
<span class="line"><span>      - cd ..</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      # Suppression du dossier &quot;production&quot; d&#39;un déploiement précédent</span></span>
<span class="line"><span>      # Création de l&#39;archive et affichage du contenu du dossier courant pour visualiser l&#39;existence de l&#39;archive</span></span>
<span class="line"><span>      - rm -rf production      </span></span>
<span class="line"><span>      - mv ./ci_lot4 ./production</span></span>
<span class="line"><span>      - tar -czf ci_lot4_production.tar.gz ./production</span></span>
<span class="line"><span>      - ls</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      # Transfert de l&#39;archive et message d&#39;information affiché dans la console du pipeline</span></span>
<span class="line"><span>       - scp -P 5022 -p ci_lot4_production.tar.gz nomUtilisateur@nomHote.com:/home/chemin_absolu_jusqu_au_dossier_parent_du_projet/</span></span>
<span class="line"><span>      - echo &quot;Copie de l&#39;archive terminée&quot;</span></span>
<span class="line"><span>      # Connexion en ssh sur le serveur distant pour décompresser</span></span>
<span class="line"><span>      #  l&#39;archive puis la supprimer (car devenue inutile après usage)</span></span>
<span class="line"><span>      - ssh -p &#39;5022&#39; ‘nomUtilisateur@nomHote.com&#39; /bin/bash&lt;&lt;-EOT</span></span>
<span class="line"><span>      - cd /home/chemin_absolu_jusqu_au_dossier_parent_du_projet/        </span></span>
<span class="line"><span>      - tar -xzf ci_lot4_production.tar.gz</span></span>
<span class="line"><span>      - rm ci_lot4_production.tar.gz</span></span>
<span class="line"><span>      - EOT</span></span></code></pre></div><h3 id="script-pour-un-projet-realise-avec-symfony" tabindex="-1">Script pour un projet réalisé avec Symfony <a class="header-anchor" href="#script-pour-un-projet-realise-avec-symfony" aria-label="Permalink to &quot;Script pour un projet réalisé avec Symfony&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>j_execute_les_instructions_de_livraison:</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span> cache:</span></span>
<span class="line"><span>   paths:</span></span>
<span class="line"><span>     - vendor/</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span> script:</span></span>
<span class="line"><span>     # Génération dynamique du fichier de configuration &quot;.env.local&quot; à partir du template &quot;.env&quot;</span></span>
<span class="line"><span>     # (les patterns sont remplacés par les variables déclarées dans Gitlab</span></span>
<span class="line"><span>     # qui deviennent des variables d&#39;environnement dans le contexte du Runner)</span></span>
<span class="line"><span>     - envsubst &lt; &quot;.env&quot; &gt; fichier_temporaire &amp;&amp; mv fichier_temporaire &quot;.env.local&quot;</span></span>
<span class="line"><span>     - ls -alrt</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>     # Installation de Composer dans le répertoire courant</span></span>
<span class="line"><span>     - curl -sS https://getcomposer.org/installer | php -- --install-dir=./ --filename=composer</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>     # Installation de symfony et de ses dépendances dans le répertoire courant</span></span>
<span class="line"><span>     -  php ./composer install --working-dir=./</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>     # Commandes requises pour l&#39;authentification par clef</span></span>
<span class="line"><span>     - eval $(ssh-agent)</span></span>
<span class="line"><span>     - echo &quot;$SSH_PRIVATE_KEY&quot; | ssh-add -</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>     # Suppression du dossier .git et fichier à exclure du transfert</span></span>
<span class="line"><span>     - rm -rf .git/</span></span>
<span class="line"><span>     - rm .gitlab-ci.yml</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>     # Affichage du chemin courant pour information, on remonte d&#39;un dossier supérieur pour jouer la commande d&#39;archive</span></span>
<span class="line"><span>     - pwd</span></span>
<span class="line"><span>     - cd ..</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>     # Création de l&#39;archive et affichage du contenu du dossier courant pour visualiser l&#39;existence de l&#39;archive</span></span>
<span class="line"><span>     # Le nom du dossier courant correspond au slug du projet</span></span>
<span class="line"><span>     - tar -czf ci_lot5.tar.gz ./ci_lot5</span></span>
<span class="line"><span>     - ls</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>     # Transfert de l&#39;archive et message d&#39;information affiché dans la console du pipeline</span></span>
<span class="line"><span>     - scp -P &#39;numPort&#39; -p ci_lot5.tar.gz nomUtilisateur@nomHote.com:/home/chemin_absolu_jusqu_au_dossier_parent_du_projet/</span></span>
<span class="line"><span>     - echo &quot;Copie de l&#39;archive terminée&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>     # Connexion en ssh sur le serveur distant pour décompresser l&#39;archive puis la supprimer (car devenue inutile après usage)</span></span>
<span class="line"><span>     - ssh -p &#39;numPort&#39; &#39;nomUtilisateur@nomHote.com&#39; /bin/bash&lt;&lt;-EOT</span></span>
<span class="line"><span>     - cd /home/chemin_absolu_jusqu_au_dossier_parent_du_projet/</span></span>
<span class="line"><span>     - tar -xzf ci_lot5.tar.gz</span></span>
<span class="line"><span>     - rm ci_lot5.tar.gz</span></span>
<span class="line"><span>     - EOT</span></span></code></pre></div><h3 id="script-pour-un-projet-realise-avec-npm" tabindex="-1">Script pour un projet réalisé avec NPM <a class="header-anchor" href="#script-pour-un-projet-realise-avec-npm" aria-label="Permalink to &quot;Script pour un projet réalisé avec NPM&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>j_execute_les_instructions_de_livraison:</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span> script:</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>     # Exécution de npm pour installer les dépendances du projet</span></span>
<span class="line"><span>     - npm install</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>     # Commandes requises pour l&#39;authentification par clef</span></span>
<span class="line"><span>     - eval $(ssh-agent)</span></span>
<span class="line"><span>     - echo &quot;$SSH_PRIVATE_KEY&quot; | ssh-add -</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>     # Suppression du dossier .git et fichier à exclure du transfert</span></span>
<span class="line"><span>     - rm -rf .git/</span></span>
<span class="line"><span>     - rm .gitlab-ci.yml</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>     # Affichage du chemin courant pour information, on remonte d&#39;un dossier supérieur pour jouer la commande d&#39;archive</span></span>
<span class="line"><span>     - pwd</span></span>
<span class="line"><span>     - cd ..</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>     # Création de l&#39;archive et affichage du contenu du dossier courant pour visualiser l&#39;existence de l&#39;archive</span></span>
<span class="line"><span>     # Le nom du dossier courant correspond au slug du projet</span></span>
<span class="line"><span>     - tar -czf ci_lot6.tar.gz ./ci_lot6</span></span>
<span class="line"><span>     - ls</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     # Transfert de l&#39;archive et message d&#39;information affiché dans la console du pipeline</span></span>
<span class="line"><span>     - scp -P &#39;numPort&#39; -p ci_lot6.tar.gz nomUtilisateur@nomHote.com:/home/chemin_absolu_jusqu_au_dossier_parent_du_projet/</span></span>
<span class="line"><span>     - echo &quot;Copie de l&#39;archive terminée&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>     # Connexion en ssh sur le serveur distant pour décompresser l&#39;archive puis la supprimer (car devenue inutile après usage)</span></span>
<span class="line"><span>     - ssh -p &#39;numPort&#39; &#39;nomUtilisateur@nomHote.com&#39; /bin/bash&lt;&lt;-EOT</span></span>
<span class="line"><span>     - cd /home/chemin_absolu_jusqu_au_dossier_parent_du_projet/</span></span>
<span class="line"><span>     - tar -xzf ci_lot6.tar.gz</span></span>
<span class="line"><span>     - rm ci_lot6.tar.gz</span></span>
<span class="line"><span>     - EOT</span></span></code></pre></div><h3 id="script-pour-forcer-l-usage-de-versions-de-npm-et-php" tabindex="-1">Script pour forcer l&#39;usage de versions de npm et PHP <a class="header-anchor" href="#script-pour-forcer-l-usage-de-versions-de-npm-et-php" aria-label="Permalink to &quot;Script pour forcer l&#39;usage de versions de npm et PHP&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>J_affiche les versions de npm, de node.js et de php utilisées par votre runner:</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> # Déclaration d’une variable d’environnement pour personnaliser les commandes</span></span>
<span class="line"><span> variables:</span></span>
<span class="line"><span>   PATH: &quot;$HOME/bin:$PATH&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span> script:</span></span>
<span class="line"><span>   # Installer nvm</span></span>
<span class="line"><span>   - curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash</span></span>
<span class="line"><span>   # Permettre au bash d&#39;exécuter nvm sans avoir à relancer le shell</span></span>
<span class="line"><span>   - export NVM_DIR=&quot;$HOME/.nvm&quot;</span></span>
<span class="line"><span>   - |</span></span>
<span class="line"><span>     if [ -s &quot;$NVM_DIR/nvm.sh&quot; ]; then</span></span>
<span class="line"><span>       . &quot;$NVM_DIR/nvm.sh&quot;</span></span>
<span class="line"><span>     fi</span></span>
<span class="line"><span>   # Aller dans le répertoire qui va accueillir le build de votre dépôt, par exemple /home/gitlab-runner , remplacer si vous n’avez pas installé gitlab-runner le même dossier</span></span>
<span class="line"><span>   - cd /home/gitlab-runner</span></span>
<span class="line"><span>   # Forcer node.js à utiliser la version 14.15.1</span></span>
<span class="line"><span>   - nvm install 14.15.1</span></span>
<span class="line"><span>   # Affichage des versions de node et de npm utilisées</span></span>
<span class="line"><span>   - echo -e &quot;\\033[1;33mVotre runner utilise la version $(node -v) de node et la version $(npm -v) de npm. \\033[0m&quot;</span></span>
<span class="line"><span>   # Forcer php à utiliser la version 8.1</span></span>
<span class="line"><span>   # Création d&#39;un lien symbolique qui pointe vers le binaire de la version de PHP désirée dans le dossier personnel de l’utilisateur</span></span>
<span class="line"><span>   - mkdir -p $HOME/bin</span></span>
<span class="line"><span>   - ln -sfn /usr/bin/php8.1 $HOME/bin/php</span></span>
<span class="line"><span>   - export PATH=$HOME/bin:$PATH</span></span>
<span class="line"><span>   # Affichage de la version de php utilisée</span></span>
<span class="line"><span>   - echo -e &quot;\\033[1;33m Votre runner utilise la version $(php -v) . \\033[0m&quot;</span></span></code></pre></div>`,18),i=[l];function r(t,o,c,u,d,m){return a(),s("div",null,i)}const f=n(p,[["render",r]]);export{v as __pageData,f as default};
