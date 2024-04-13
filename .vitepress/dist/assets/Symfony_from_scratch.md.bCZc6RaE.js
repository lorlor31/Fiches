import{_ as e,c as r,o as a,a2 as o}from"./chunks/framework.mHHrDb8M.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"Symfony_from_scratch.md","filePath":"Symfony_from_scratch.md"}'),s={name:"Symfony_from_scratch.md"},n=o(`<h2 id="installer" tabindex="-1">Installer <a class="header-anchor" href="#installer" aria-label="Permalink to &quot;Installer&quot;">​</a></h2><h3 id="creation-du-projet-et-installation-d-apache" tabindex="-1">Création du projet et installation d&#39;apache <a class="header-anchor" href="#creation-du-projet-et-installation-d-apache" aria-label="Permalink to &quot;Création du projet et installation d&#39;apache&quot;">​</a></h3><p>composer create-project symfony/skeleton composer require symfony/apache-pack dépalcer kes fichiers de skeleton vers la racine sudo chmod -R 777 var</p><h3 id="installation-des-composants-essentiels" tabindex="-1">Installation des composants essentiels <a class="header-anchor" href="#installation-des-composants-essentiels" aria-label="Permalink to &quot;Installation des composants essentiels&quot;">​</a></h3><p>composer require twig/twig composer require --dev symfony/debug-bundle composer require symfony/profiler-pack composer require http-foundation composer require --dev symfony/maker-bundle composer require symfony/orm-pack composer require symfony/security-bundle</p><p><strong>Pour le faire en deux lignes, à tester :</strong> composer require twig/twig symfony/profiler-pack http-foundation symfony/orm-pack symfony/security-bundle composer require --dev symfony/debug-bundle --dev symfony/maker-bundle</p><h3 id="installation-des-composants-frequents" tabindex="-1">Installation des composants fréquents <a class="header-anchor" href="#installation-des-composants-frequents" aria-label="Permalink to &quot;Installation des composants fréquents&quot;">​</a></h3><p>composer require symfony/http-client composer require --dev orm-fixtures composer require fakerphp/faker composer require symfony/form composer require easycorp/easyadmin-bundle composer require symfony/mailer composer require symfony/mailjet-mailer composer require lexik/jwt-authentication-bundle composer require nelmio/cors-bundle composer require knplabs/knp-snappy-bundle</p><p>cf composer require webapp noter ce que ça comprend</p><h2 id="configurer-le-env-local" tabindex="-1">configurer le .env.local <a class="header-anchor" href="#configurer-le-env-local" aria-label="Permalink to &quot;configurer le .env.local&quot;">​</a></h2><p>Dans la ligne : <code>DATABASE_URL=&quot;mysql://app:!ChangeMe!@127.0.0.1:3306/app?serverVersion=10.11.2-MariaDB&amp;charset=utf8mb4&quot;</code></p><ul><li>Remplacer <code>app:!ChangeMe!</code> par <code>votre_utilisateur:votre_MDP</code></li><li>Remplacer <code>app?</code> par <code>votre_BDD?</code></li><li>Vérifier sa version de mysql en tapant la commande <code>mysql --version</code> dans le terminal</li><li>Modifier éventuellement dans <code>10.11.2</code> par les bons chiffres.</li></ul><p>NB :</p><ul><li>si le projet utilise un autre SGBDR, il faudra sélectionner la variable DATABASE_URL correspondant.</li><li>configurer les autres variables d&#39;environnement si existantes.</li><li>enlever le # qui commente la variable hein.</li></ul><h2 id="pour-essayer-tailwind" tabindex="-1">pour essayer tailwind <a class="header-anchor" href="#pour-essayer-tailwind" aria-label="Permalink to &quot;pour essayer tailwind&quot;">​</a></h2><p>composer require symfony/asset-mapper symfony/asset symfony/twig-pack ou composer require symfony/webpack-encore-bundle</p><p>For the prod environment, before deploy, you should run: php bin/console asset-map:compile</p><h2 id="lancer-serveur" tabindex="-1">Lancer serveur <a class="header-anchor" href="#lancer-serveur" aria-label="Permalink to &quot;Lancer serveur&quot;">​</a></h2><p>php -S 0.0.0.0:8000 -t public</p><p>======================================================================================</p><h2 id="commandes-extra-utiles" tabindex="-1">Commandes extra utiles <a class="header-anchor" href="#commandes-extra-utiles" aria-label="Permalink to &quot;Commandes extra utiles&quot;">​</a></h2><p>bin/console make:controller nomDuController bin/console debug:autowiring --all bin/console cache:clear bin/console debug:router</p><p>**trucs que j&#39;oublie recuperer l&#39;user ds controller avec le service security $user=$this-&gt;security-&gt;getUser(); recuperer l&#39;user ds tpl avec app.get.user</p><p>=========================================================================================</p><h2 id="creer-les-routes" tabindex="-1">Créer les routes <a class="header-anchor" href="#creer-les-routes" aria-label="Permalink to &quot;Créer les routes&quot;">​</a></h2><p>On crée le controller avec le maker si on veut et les routes dedans On crée le tpl</p><p>==============================================================</p><h2 id="creer-la-db-avec-doctrine" tabindex="-1">Créer la db avec doctrine <a class="header-anchor" href="#creer-la-db-avec-doctrine" aria-label="Permalink to &quot;Créer la db avec doctrine&quot;">​</a></h2><ul><li>bin/console doctrine:database:create ============================================================================</li></ul><h2 id="installation-d-un-projet-recupere-via-un-depot-clone" tabindex="-1">Installation d&#39;un projet récupéré via un dépôt cloné : <a class="header-anchor" href="#installation-d-un-projet-recupere-via-un-depot-clone" aria-label="Permalink to &quot;Installation d&#39;un projet récupéré via un dépôt cloné :&quot;">​</a></h2><ol><li><p><strong>Cloner</strong> le repo</p></li><li><p>Installer <strong>composer</strong> et ses dépendances</p></li></ol><p><code>composer install</code></p><ol start="3"><li><p>Configurer le <strong>.env</strong> ( copier le fichier en .env.local et remplacer dans DATABASE_URL par ses identifiants BDD)</p></li><li><p>Créer la <strong>BDD</strong>, appliquer les migrations et exécuter les fixtures s&#39;il y en a :</p></li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>- bin/console doctrine:database:create</span></span>
<span class="line"><span>- bin/console doctrine:migrations:migrate</span></span>
<span class="line"><span>- bin/console doctrine:fixtures:load</span></span></code></pre></div>`,34),t=[n];function l(i,c,p,d,u,m){return a(),r("div",null,t)}const b=e(s,[["render",l]]);export{f as __pageData,b as default};
