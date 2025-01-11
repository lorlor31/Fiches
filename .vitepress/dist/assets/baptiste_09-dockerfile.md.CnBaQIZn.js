import{_ as e,c as s,o as i,a2 as a}from"./chunks/framework.TebtTzPX.js";const g=JSON.parse('{"title":"Construire nos propres images Docker","description":"","frontmatter":{},"headers":[],"relativePath":"baptiste/09-dockerfile.md","filePath":"baptiste/09-dockerfile.md"}'),n={name:"baptiste/09-dockerfile.md"},t=a(`<h1 id="construire-nos-propres-images-docker" tabindex="-1">Construire nos propres images Docker <a class="header-anchor" href="#construire-nos-propres-images-docker" aria-label="Permalink to &quot;Construire nos propres images Docker&quot;">​</a></h1><p>On a vu qu&#39;on pouvait facilement démarrer un environnement de développement PHP grâce à Docker et l&#39;image officielle PHP, mais cet environnement n&#39;est pas complet : il nous manque par exemple le gestionnaire de dépendances Composer !</p><p>Pour remédier à cela, nous allons <strong>construire notre propre image Docker</strong> !</p><p>Nous allons nous baser sur l&#39;image officielle PHP et la &quot;personnaliser&quot; pour qu&#39;elle puisse héberger notre backend Laravel.</p><p>Pour construire une image Docker, on a besoin d&#39;un <strong>Dockerfile</strong>.</p><h2 id="dockerfile" tabindex="-1">Dockerfile <a class="header-anchor" href="#dockerfile" aria-label="Permalink to &quot;Dockerfile&quot;">​</a></h2><p>Le <strong>Dockerfile</strong> est un fichier propre à Docker, qui permet de créer nos propres images Docker personnalisées à partir d&#39;images existantes.</p><p>⚠️ Attention, ce fichier <strong>doit s&#39;appeller Dockerfile</strong>, sans extension et avec un <code>D</code> majuscule.</p><p>Sa syntaxe est spécifique à Docker, on y décrit plusieurs instructions qui seront traitées une par une.</p><p>Une partie des instructions disponibles (les plus utiles) :</p><ul><li><code>FROM &lt;image&gt;</code> : en général la première instruction, permet d&#39;indiquer <strong>à partir de quelle image on veut construire la notre</strong>.</li><li><code>RUN &lt;command&gt;</code> : permet de lancer une commande dans le conteneur, un peu comme <code>docker exec</code> !</li><li><code>CMD &lt;command&gt;</code> : permet de lancer une commande <strong>au démarrage du conteneur</strong>. Cette instruction ne doit être présente qu&#39;une seule fois, et peut servir par exemple à démarrer notre application si nécessaire.</li><li><code>LABEL &lt;key&gt;:&lt;value&gt;</code> : permet d&#39;ajouter des métadonnées à notre image, à titre informatif.</li><li><code>EXPOSE &lt;port&gt;</code> : informe Docker que notre image va écouter sur un port spécifique. Cette instruction ne redirige pas le port pour autant, cette instruction sert à documenter notre image.</li><li><code>ENV &lt;key&gt;=&lt;value&gt;</code> : permet de définir une variable d&#39;environnement <code>&lt;key&gt;</code> et lui donner la valeur <code>&lt;value&gt;</code>.</li><li><code>COPY &lt;source&gt; &lt;destination&gt;</code> : permet de copier des fichiers de l&#39;hôte à l&#39;intérieur du conteneur.</li><li><code>WORKDIR /chemin/vers/workdir</code> : permet de se déplacer dans un dossier à l&#39;intérieur du conteneur, utilisé souvent avant de lancer des commandes avec <code>RUN</code>.</li></ul><h3 id="creer-un-dockerfile-pour-laravel" tabindex="-1">Créer un Dockerfile pour Laravel <a class="header-anchor" href="#creer-un-dockerfile-pour-laravel" aria-label="Permalink to &quot;Créer un Dockerfile pour Laravel&quot;">​</a></h3><p>Pour notre backend Laravel, on peux utiliser le <code>Dockerfile</code> suivant :</p><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># on part de l&#39;image PHP 8.1 avec Apache</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> php:8.1-apache</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># En suivant les instructions de la doc sur le Dockerhub, on active l&#39;extention PHP pdo_mysql</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> docker-php-ext-install pdo_mysql</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Toujours en suivant la doc, on installe l&#39;utilitaire pour dézipper &amp; l&#39;extention PHP zip</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> apt update</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> apt install -y libzip-dev zip</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> docker-php-ext-install zip</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># On se place dans le dossier /var/www/html</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">WORKDIR</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /var/www/html</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Et on copie le contenu du dossier courant (.) à l&#39;intérieur de l&#39;hôte (dossier back)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># dans le dossier courant à l&#39;intérieur de l&#39;image (dossier /var/www/html)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">COPY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> . .</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Toujours en suivant la doc, on récupère Composer depuis une image Docker officielle</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># et on on le copie dans notre image (à l&#39;emplacement /usr/bin/composer)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">COPY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> --from=composer:latest /usr/bin/composer /usr/bin/composer</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># On lance la commande \`cp .env.example .env\` à l&#39;intérieur de l&#39;image</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> cp .env.example .env</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Puis on lance la commande \`composer install\` pour installer les dépendances</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> composer install --no-interaction --optimize-autoloader</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># On lance la commande \`php artisan key:generate\`, nécessaire au bon fonctionnement de Laravel</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> php artisan key:generate</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># On ajoute les droits d&#39;écriture à tout le monde sur le dossier /var/www/html/storage, pour que Laravel puisse écrire ses logs et son cache</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> chmod -R a+w /var/www/html/storage</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># On modifie le DocumentRoot du virtual host par défaut d&#39;apache, toujours en suivant la doc</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ENV</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> APACHE_DOCUMENT_ROOT /var/www/html/public</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sed -ri -e </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;s!/var/www/html!\${APACHE_DOCUMENT_ROOT}!g&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /etc/apache2/sites-available/*.conf</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sed -ri -e </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;s!/var/www/!\${APACHE_DOCUMENT_ROOT}!g&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Et pour finir on permet à Apache de lire les fichiers .htaccess et on active la réecriture d&#39;URL</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sed -i </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/&lt;Directory </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\/</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">var</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\/</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">www</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\/</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&gt;/,/&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\/</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Directory&gt;/ s/AllowOverride None/AllowOverride all/&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /etc/apache2/apache2.conf</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> a2enmod rewrite</span></span></code></pre></div><p>💡 On doit placer ce fichier à l&#39;intérieur de notre dossier <code>back</code>, il est déjà présent.</p><h2 id="docker-build" tabindex="-1">Docker build <a class="header-anchor" href="#docker-build" aria-label="Permalink to &quot;Docker build&quot;">​</a></h2><p>Une fois notre <code>Dockerfile</code> prêt, on va pouvoir demander à Docker de construire notre image. Pour cela, on utilise la commande <code>docker build</code> :</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> back</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -t</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pomodoro-backend-laravel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> .</span></span></code></pre></div><p>💡 L&#39;argument <code>-t pomodoro-backend-laravel</code> nous permet de <strong>donner un nom à notre image</strong>.</p><p>Observez le terminal : on peut y voir toutes les commandes qu&#39;on a mis dans le <code>Dockerfile</code> être lancées une par une ! À la fin, Docker va nous indiquer :</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Successfully</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> built</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 1f5d64344316</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Successfully</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tagged</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pomodoro-backend-laravel:latest</span></span></code></pre></div><p>Ce message nous indique que notre image a été construite avec succès, et a été <em>taggée</em> (= nommée) <code>pomodoro-backend-laravel:latest</code>.</p><p>Par défaut, notre image a le tag <code>latest</code>, mais on peut spécifier le tag souhaité pour créer différentes versions de notre image (exemple : <code>docker build -t pomodoro-backend-laravel:experimental</code>).</p><p>On peut maintenant démarrer un conteneur à partir de notre nouvelle image :</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -dp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 8080:80</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pomodoro-backend-laravel</span></span></code></pre></div><p>Ouvrez votre navigateur à l&#39;adresse <a href="http://localhost:8080" target="_blank" rel="noreferrer">http://localhost:8080</a>, vous devriez voir la documentation de notre API 🎉</p><p>Essayez ensuite l&#39;URL <a href="http://localhost:8080/api/tasks" target="_blank" rel="noreferrer">http://localhost:8080/api/tasks</a>. On a une erreur Laravel : <code>SQLSTATE[HY000] [2002] Connection refused</code>. Une petite idée d&#39;où peut venir cette erreur ?</p><details><summary>Solution</summary><p>On a oublié de configurer notre base de données dans le fichier <code>.env</code> !</p><blockquote><p>Mais on fait comment, on a pas installé MySQL ? Ni chargé notre fichier <code>DB.sql</code> !</p></blockquote><p>On verra ça par la suite 😉</p></details><h2 id="docker-push" tabindex="-1">Docker push <a class="header-anchor" href="#docker-push" aria-label="Permalink to &quot;Docker push&quot;">​</a></h2><p>Pour l&#39;instant, l&#39;image qu&#39;on vient de créer (on dit aussi parfois <strong>compiler</strong>) n&#39;est disponible que sur notre hôte. Comment faire si on veut la déployer sur un serveur de production ?</p><p>On va publier notre image sur le <strong>DockerHub</strong> !</p><p>On utilise pour cela la commande <code>docker push</code>, mais on doit au préalable se connecter :</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> login</span></span></code></pre></div><p>Saisissez vos identifiants DockerHub quand ils vous sont demandés.</p><p>Rendez-vous ensuite sur le <a href="https://hub.docker.com/" target="_blank" rel="noreferrer">DockerHub</a>, connectez-vous si nécessaire, et cliquez sur le bouton <code>Create repository</code>. Comme nom, saisissez <code>pomodoro-backend-laravel</code>, et choisissez la visibilité publique.</p><p>Pour indiquer à Docker quelle image il faut publier, on doit <strong>tagger</strong> notre image avec notre nom d&#39;utilisateur :</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> image</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tag</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pomodoro-backend-laravel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> PSEUDO-DH/pomodoro-backend-laravel:latest</span></span></code></pre></div><p>💡 N&#39;oubliez pas de remplacer <code>PSEUDO-DH</code> par votre nom d&#39;utilisateur DockerHub !</p><p>On peut ensuite publier notre image avec la commande :</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> push</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> PSEUDO-DH/pomodoro-backend-laravel:latest</span></span></code></pre></div><p>Une fois l&#39;image publiée, on pourra l&#39;utiliser sur n&#39;importe quelle machine sur laquelle Docker est installé avec la commande :</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -dp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 8080:80</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> PSEUDO-DH/pomodoro-backend-laravel</span></span></code></pre></div><p>On s&#39;occupera du déploiement sur notre serveur de production par la suite, mais avant, et si on regardait comment mettre en place la base de données ?</p><p>Pour cela, on va découvrir comment faire fonctionner des <strong>applications multi-conteneurs avec Docker Compose</strong> ! Ça se passe par <a href="./10-docker-compose.html">ici</a>.</p>`,44),l=[t];function r(p,o,d,c,h,k){return i(),s("div",null,l)}const m=e(n,[["render",r]]);export{g as __pageData,m as default};