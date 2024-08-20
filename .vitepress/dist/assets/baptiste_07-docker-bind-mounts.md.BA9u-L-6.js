import{_ as e,c as n,o,a2 as t}from"./chunks/framework.BXMoTSpH.js";const k=JSON.parse('{"title":"Docker : bind mounts","description":"","frontmatter":{},"headers":[],"relativePath":"baptiste/07-docker-bind-mounts.md","filePath":"baptiste/07-docker-bind-mounts.md"}'),s={name:"baptiste/07-docker-bind-mounts.md"},a=t(`<h1 id="docker-bind-mounts" tabindex="-1">Docker : bind mounts <a class="header-anchor" href="#docker-bind-mounts" aria-label="Permalink to &quot;Docker : bind mounts&quot;">​</a></h1><p>Les <code>bind mounts</code> (points de montage en français) permettent de &quot;monter&quot; un dossier de notre ordinateur hôte à l&#39;intérieur du conteneur.</p><p>C&#39;est un peu comme si on branchait une clé USB contenant notre code sur le conteneur !</p><p>Les fichiers à l&#39;intérieur de ce dossier seront donc <strong>accessibles à la fois depuis notre ordinateur et depuis le conteneur</strong>. Ces bind mounts sont donc très pratique pour se <strong>créer un environnement de développement local</strong>, mais on y reviendra.</p><h2 id="creer-un-bind-mount" tabindex="-1">Créer un bind mount <a class="header-anchor" href="#creer-un-bind-mount" aria-label="Permalink to &quot;Créer un bind mount&quot;">​</a></h2><p>On ne peut créer un bind mount qu&#39;à la création du conteneur ! On ajoute pour cela l&#39;argument <code>-v</code>, <code>--volume</code> ou <code>--mount</code> à notre commande <code>docker run</code>.</p><p>💡 L&#39;argument <code>--mount</code> a une syntaxe un peu plus complexe et un fonctionnement différent des arguments <code>-v</code> ou <code>--volume</code>, nous le verrons plus tard.</p><p>Après l&#39;argument <code>-v</code>, nous allons devoir préciser <strong>deux chemins</strong> séparés par le caractère <code>:</code>. Le premier chemin correspond au dossier sur l&#39;ordinateur hôte, le second correspond à <strong>l&#39;emplacement dans lequel on souhaite monter le dossier</strong>.</p><p>Par exemple, si on veut monter notre dossier <code>front</code> à l&#39;emplacement <code>/usr/local/apache2/htdocs</code> dans notre conteneur <code>apache</code>, on va utiliser la commande suivante, <strong>à lancer depuis la racine de ce dépôt</strong> :</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -dp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 8000:80</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apache</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -v</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./front:/usr/local/apache2/htdocs/</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> httpd</span></span></code></pre></div><blockquote><p>C&#39;est quoi, ce dossier <code>/usr/local/apache2/htdocs</code> ? 🤔</p></blockquote><p>Le dossier <code>/usr/local/apache2/htdocs</code> est le <code>DocumentRoot</code> (vous vous souvenez ? on en a parlé hier !) utilisé par l&#39;image <code>httpd</code> pour le virtual host par défaut d&#39;Apache. En général c&#39;est plutôt <code>/var/www/html</code>, mais dans le cas présent ce n&#39;est pas le cas. On peut trouver cette information dans la <a href="https://hub.docker.com/_/httpd" target="_blank" rel="noreferrer">documentation de l&#39;image sur le DockerHub</a>.</p><p>Ouvrez votre navigateur et rendez-vous à l&#39;adresse <a href="http://localhost:8000/" target="_blank" rel="noreferrer">http://localhost:8000/</a>, vous devriez y trouver le frontend de notre application Pomodor&#39;O 🎉</p><h2 id="utiliser-les-bind-mounts-pour-creer-un-environnement-de-dev" tabindex="-1">Utiliser les bind mounts pour créer un environnement de dév <a class="header-anchor" href="#utiliser-les-bind-mounts-pour-creer-un-environnement-de-dev" aria-label="Permalink to &quot;Utiliser les bind mounts pour créer un environnement de dév&quot;">​</a></h2><p>La favicon de notre projet n&#39;est pas dans le bon dossier : elle est à la racine du dépôt, alors qu&#39;elle devrait être dans le dossier <code>front</code>. Essayez de déplacer cette favicon au bon endroit, puis actualisez votre navigateur avec <code>Ctrl+Shift+R</code> (attention au cache !).</p><blockquote><p>Mais la modification est déjà visible dans le conteneur ? 😱</p></blockquote><p>Hé oui ! On l&#39;a dit tout à l&#39;heure, avec un <strong>bind mount</strong>, les fichiers à l&#39;intérieur du dossier monté sont <strong>accessibles à la fois depuis notre ordinateur et depuis le conteneur</strong> !</p><p>On peut donc développer sur notre VSCode, comme d&#39;habitude, et voir les modifications en direct grâce à notre conteneur Apache ! Plus besoin d&#39;installer Apache sur notre machine, on peut se contenter d&#39;utiliser un conteneur Docker.</p><blockquote><p>Mais là, on a juste Apache, donc il est un peu tout nul ton environnement de dev !</p></blockquote><p>Essayons de monter un environnement de développement avec Apache + PHP !</p><h3 id="environnement-de-dev-php" tabindex="-1">Environnement de dév PHP <a class="header-anchor" href="#environnement-de-dev-php" aria-label="Permalink to &quot;Environnement de dév PHP&quot;">​</a></h3><p>Si on cherche un peu sur le DockerHub, on va vite trouver une <a href="https://hub.docker.com/_/php" target="_blank" rel="noreferrer">image officielle PHP</a>.</p><p>Quand on souhaite utiliser une image, il faut jeter un coup d&#39;oeil à sa documentation ! On peut y lire que l&#39;image propose différentes variantes :</p><ul><li><code>php:&lt;version&gt;-cli</code></li><li><code>php:&lt;version&gt;-apache</code></li><li><code>php:&lt;version&gt;-fpm</code></li><li><code>php:&lt;version&gt;-alpine</code></li></ul><p>Ah ! Ça tombe bien, l&#39;image officielle PHP dispose donc d&#39;une version avec Apache pré-installé &amp; configuré, parfait !</p><p>Créeons un dossier <code>demo-php</code> à la racine de notre dépôt, puis lançons la commande suivante :</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -dp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 8001:80</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mon-env-de-dev-php</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -v</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./demo-php:/var/www/html</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> php:8.2-apache</span></span></code></pre></div><p>💡 Je mets ici le port <code>8001</code> parce qu&#39;on a pas stoppé notre conteneur précédent !</p><p>Une fois l&#39;image téléchargée et le conteneur lancé, ouvrez votre navigateur à l&#39;adresse <a href="http://localhost:8001/" target="_blank" rel="noreferrer">http://localhost:8001/</a>. Vous devriez avoir une erreur <code>Forbidden</code>, c&#39;est normal.</p><p>Créez un fichier <code>index.php</code> dans le dossier <code>demo-php</code>, et ajoutez-y le contenu suivant :</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">php</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Hello from Docker !&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><p>Actualisez la page et ...</p><p>Cet enviromment de développement est très basique : il manque par exemple le gestionnaire de dépendances Composer !</p><blockquote><p>Comment on fait, si on a besoin d&#39;un environnement plus complexe ?</p></blockquote><p>On va pouvoir se connecter à notre conteneur pour lancer des commandes à l&#39;intérieur ! On découvre comment faire ça par <a href="./08-docker-exec.html">ici</a>.</p>`,35),i=[a];function r(d,p,l,c,u,h){return o(),n("div",null,i)}const v=e(s,[["render",r]]);export{k as __pageData,v as default};
