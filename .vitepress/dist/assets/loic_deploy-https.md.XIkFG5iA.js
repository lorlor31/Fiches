import{_ as e,c as t,o as a,a2 as s}from"./chunks/framework.CEgrwLex.js";const g=JSON.parse('{"title":"Passer une application en HTTPS","description":"","frontmatter":{},"headers":[],"relativePath":"loic/deploy-https.md","filePath":"loic/deploy-https.md"}'),i={name:"loic/deploy-https.md"},n=s(`<h1 id="passer-une-application-en-https" tabindex="-1">Passer une application en HTTPS <a class="header-anchor" href="#passer-une-application-en-https" aria-label="Permalink to &quot;Passer une application en HTTPS&quot;">​</a></h1><blockquote><p>ℹ️ Ce tutoriel part du principe que tu as suivi <a href="./deploy-vite-spa.html">le tutoriel de déploiement d&#39;une SPA Vite</a> et/ou <a href="./deploy-symfony.html">le tutoriel d&#39;une application Symfony</a> et que ton projet est bien en ligne sur ta VM Server Kourou.</p></blockquote><blockquote><p>⚠️ Si ton projet est composé d&#39;une SPA et d&#39;une API, il faut que l&#39;API communique en HTTPS pour que la SPA puisse passer en HTTPS. En effet, si tu passes le front-end en HTTPS mais qu&#39;il cherche encore à faire des requêtes vers une API en HTTP, le navigateur considérera ces opérations comme non sécurisées et les empêchera.</p></blockquote><h2 id="etape-1-installer-certbot" tabindex="-1">Étape 1 : Installer Certbot <a class="header-anchor" href="#etape-1-installer-certbot" aria-label="Permalink to &quot;Étape 1 : Installer Certbot&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -y</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> certbot</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> python3-certbot-apache</span></span></code></pre></div><h2 id="etape-2-generer-le-certificat-ssl-et-mettre-en-place-https" tabindex="-1">Étape 2 : Générer le certificat SSL et mettre en place HTTPS <a class="header-anchor" href="#etape-2-generer-le-certificat-ssl-et-mettre-en-place-https" aria-label="Permalink to &quot;Étape 2 : Générer le certificat SSL et mettre en place HTTPS&quot;">​</a></h2><blockquote><p>⚠️ Avant de faire cette étape, tu dois rendre ta VM Server Kourou accessible au reste du monde. En effet, Certbot va faire générer un certificat SSL à l&#39;autorité de certification Let&#39;s Encrypt, qui a besoin de pouvoir faire une requête HTTP à ta VM Server pour vérifier que c&#39;est bien elle qui demande le certificat. Tu peux le faire en cliquant sur le bouton &quot;Rendre la VM publique&quot; sur <a href="https://kourou.oclock.io/ressources/vm-cloud/" target="_blank" rel="noreferrer">la page d&#39;administration de ta VM Server Kourou</a>.</p></blockquote><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> certbot</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --apache</span></span></code></pre></div><p>Certbot va ensuite te demander quelques informations pour lui permettre de générer le certificat SSL.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Enter email address (used for urgent renewal and security notices)</span></span>
<span class="line"><span>&gt; email@oclock.school</span></span></code></pre></div><p>Saisis un e-mail auquel tu es joignable, de préférence. Tu peux par exemple donner ton adresse e-mail en <code>@oclock.school</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Please read the Terms of Service at https://letsencrypt.org/documents/LE-SA-v1.3-September-21-2022.pdf.</span></span>
<span class="line"><span>You must agree in order to register with the ACME server. Do you agree?</span></span>
<span class="line"><span>&gt; Y</span></span></code></pre></div><p>Accepte les conditions d&#39;utilisation de Let&#39;s Encrypt en saisissant <code>Y</code> ici.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Would you be willing, once your first certificate is successfully issued, to share your email address with the Electronic Frontier Foundation, a founding partner of the Let&#39;s Encrypt project and the non-profit organization that develops Certbot?</span></span>
<span class="line"><span>We&#39;d like to send you email about our work encrypting the web, EFF news, campaigns, and ways to support digital freedom.</span></span>
<span class="line"><span>&gt; N</span></span></code></pre></div><p>Tu peux choisir de t&#39;inscrire à la newsletter de la fondation EFF qui édite Certbot. Ceci n&#39;est pas obligatoire pour générer le certificat SSL, tu peux donc répondre <code>Y</code> pour accepter, ou <code>N</code> pour refuser.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Please enter the domain name(s) you would like on your certificate (comma and/or space separated)</span></span>
<span class="line"><span>&gt; pseudo-server.eddi.cloud</span></span></code></pre></div><p>Entre le nom de domaine de ta VM Server Cloud pour que Let&#39;s Encrypt puisse tester son existence et générer un certificat SSL pour lui.</p><blockquote><p>⚠️ Si Let&#39;s Encrypt ne peut pas tester l&#39;existence de ta VM, vérifie que tu as bien rendu ta VM publique et relance la commande.</p></blockquote><h2 id="etape-3-https-and-chill-😎🌴" tabindex="-1">Étape 3 : <em>HTTPS and chill</em> 😎🌴 <a class="header-anchor" href="#etape-3-https-and-chill-😎🌴" aria-label="Permalink to &quot;Étape 3 : _HTTPS and chill_ 😎🌴&quot;">​</a></h2><p>Voilà, c&#39;est tout ! Ton site devrait être accessible via HTTPS !</p><p>Tu peux vérifier en te rendant sur ta VM Server Kourou avec ton navigateur web <code>https://pseudo-server.eddi.cloud</code>.</p><blockquote><p>ℹ️ Normalement, Certbot a modifié ta configuration Apache pour rediriger automatiquement les requêtes faites en HTTP vers leur équivalent en HTTPS. Pense quand même à mettre à jour les URLs que tu utilises dans les différents projets si tu fais des appels API.</p></blockquote>`,22),o=[n];function r(p,l,c,u,d,h){return a(),t("div",null,o)}const m=e(i,[["render",r]]);export{g as __pageData,m as default};