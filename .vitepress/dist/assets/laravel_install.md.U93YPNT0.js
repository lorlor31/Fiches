import{_ as n,c as a,o as s,a2 as e}from"./chunks/framework.TebtTzPX.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"laravel/install.md","filePath":"laravel/install.md"}'),p={name:"laravel/install.md"},i=e(`<h2 id="installation-mise-en-marche" tabindex="-1">INSTALLATION - MISE EN MARCHE <a class="header-anchor" href="#installation-mise-en-marche" aria-label="Permalink to &quot;INSTALLATION - MISE EN MARCHE&quot;">​</a></h2><p>Les commandes ci-dessous correspondent au cas où on récupère un projet.</p><ul><li>On installe composer : <code>composer install</code></li><li>Le fichier .env.example doit être copié en .env avec nos valeurs. NB : APP_DEBUG à true en environnement de developpement.</li><li>Génération de la clé Laravel : \`php artisan key:generate</li><li>Jouer les migrations : <code>php artisan migrate</code></li><li>Créer les liens symboliques : <code>php artisan storage:link</code></li><li>Quelques tips en vrac récupérés du readme du projet :</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>**Create a command :**</span></span>
<span class="line"><span>php artisan make:command SendCompletionReminderEmails</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**Use a command :**</span></span>
<span class="line"><span>php artisan signature_value</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**Create a mail :**</span></span>
<span class="line"><span>php artisan make:mail CandidateReminderEmail</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**Crontab parameters :**</span></span>
<span class="line"><span>Edit the file : app/Console/Kernel.php</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**Launch all schedule commands in Kernel.php :**</span></span>
<span class="line"><span>php artisan schedule:run</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**List existing schedule commands :**</span></span>
<span class="line"><span>php artisan schedule:list</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**Tips :**</span></span>
<span class="line"><span>- If the debug toolbar doesn&#39;t appear in local, try this command : </span></span>
<span class="line"><span>php artisan vendor:publish --provider=&quot;Barryvdh\\Debugbar\\ServiceProvider&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- If the error &quot;php extension fileinfo is missing from your system&quot; appears when you run &quot;composer install&quot;, you can run &quot;php --ini&quot; inside terminal to see which files are used by PHP in CLI mode, you need to edit your php.ini and remove &quot;;&quot; before ;extension=fileinfo</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- For truncate data it would be necessary to deactivate foreign key checks in mysql client and then reactivate </span></span>
<span class="line"><span>SET foreign_key_checks = 0</span></span>
<span class="line"><span>SET foreign_key_checks = 1</span></span></code></pre></div>`,4),l=[i];function t(o,r,c,d,u,m){return s(),a("div",null,l)}const v=n(p,[["render",t]]);export{_ as __pageData,v as default};
