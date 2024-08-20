import{_ as e,c as i,o as t,a2 as s}from"./chunks/framework.BXMoTSpH.js";const h=JSON.parse('{"title":"Stratégie CI/CD","description":"","frontmatter":{},"headers":[],"relativePath":"cicd/CI-CD-definitions.md","filePath":"cicd/CI-CD-definitions.md"}'),l={name:"cicd/CI-CD-definitions.md"},r=s('<h1 id="strategie-ci-cd" tabindex="-1">Stratégie CI/CD <a class="header-anchor" href="#strategie-ci-cd" aria-label="Permalink to &quot;Stratégie CI/CD&quot;">​</a></h1><h2 id="objectifs" tabindex="-1">Objectifs <a class="header-anchor" href="#objectifs" aria-label="Permalink to &quot;Objectifs&quot;">​</a></h2><ul><li><strong>Automatiser</strong> et <strong>accélérer</strong> le dév de logiciels, accéléer la fréquence de distribution</li><li>Automatiser les étapes de dév et surveiller les étapes du cycle de vie des apps</li></ul><h2 id="premiere-etape-ci" tabindex="-1">Première étape : CI <a class="header-anchor" href="#premiere-etape-ci" aria-label="Permalink to &quot;Première étape : CI&quot;">​</a></h2><ul><li>CI : <strong>Continuous Integration</strong> =&gt; intégration continue</li><li><strong>Automatisation des processus du dév</strong> : <strong>tests unitaires</strong>, demande de merge (<strong>MR</strong>), <strong>PR</strong></li><li>Petites itérations, intervalles réguliers</li><li>Puis on publie ces sous ensembles sur un outil <strong>SCM</strong> = Outil de Gestion du Code Source = GIT</li><li><strong>Pipeline</strong> = ensemble des étapes qu’on met en place pour développer un logiciel . Puis <strong>contrôle</strong>. Puis <strong>build</strong>. Puis <strong>tests automatisés</strong> pour vérifer <strong>qualité du code</strong> , <strong>interactions des fctnalités</strong> entre elles</li><li>Contrôler le plus tôt possible pour détecter le pb le + tôt =&gt; <strong>shift left</strong></li><li><strong>Compilation puis tests puis archivage</strong></li></ul><h2 id="deuxieme-etape-cd" tabindex="-1">Deuxième étape : CD <a class="header-anchor" href="#deuxieme-etape-cd" aria-label="Permalink to &quot;Deuxième étape : CD&quot;">​</a></h2><ul><li>CD : Continuous Delivery et Continuous Deployment : livraison et déploiement continus</li><li><strong>livraison</strong> = préparation avant le déploiement, on va faire des tests pour qu&#39;il n&#39;y ait pas d&#39;erreur</li><li><strong>déploiement</strong> automatique est ardu</li></ul><h2 id="pipeline" tabindex="-1">Pipeline <a class="header-anchor" href="#pipeline" aria-label="Permalink to &quot;Pipeline&quot;">​</a></h2><ul><li><p><strong>Ensemble des étapes</strong> qu’on met en place <strong>pour développer</strong> un logiciel dans une stratégie CI/CD :</p><ol><li>Développement</li><li>Build</li><li>Tests unitaires automatisés</li><li>Analyse</li><li>Livraison</li><li>Déploiement</li></ol></li><li><p>Il va utiliser des <strong>outils de tests</strong> de la <strong>qualité du code</strong> (<strong>SonarQube</strong>), de la <strong>sécurité</strong> (accès, infos sensibles, contrôles réguliers pour vérifier les vulnérabilités liées à des màj <strong>Snyk</strong>)</p></li></ul><h2 id="outils-courants" tabindex="-1">Outils courants <a class="header-anchor" href="#outils-courants" aria-label="Permalink to &quot;Outils courants&quot;">​</a></h2><ul><li>Gitlab CI/CD : suite d&#39;outils pour mettre en place des pipelines de Gitlab</li><li>Github Action : suite d&#39;outils idem de Git</li><li>Jenkins : serveur Java</li><li>Azure Pipeline : par Microsoft, pour les repos Azure Devops</li><li>Circle CI : prd en charge bcp de langages</li><li>Bamboo, ArgoCD</li></ul><h2 id="ci-cd-et-devops" tabindex="-1">CI/CD et Devops <a class="header-anchor" href="#ci-cd-et-devops" aria-label="Permalink to &quot;CI/CD et Devops&quot;">​</a></h2><ul><li>Devops == Développeurs et équipe opérationnelle</li><li>La culture Devops utilise la démarche CI/CD</li></ul>',13),o=[r];function a(n,u,d,c,p,g){return t(),i("div",null,o)}const C=e(l,[["render",a]]);export{h as __pageData,C as default};
