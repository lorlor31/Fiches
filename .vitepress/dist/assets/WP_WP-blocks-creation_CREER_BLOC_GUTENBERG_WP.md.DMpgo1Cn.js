import{_ as l,D as e,c as r,j as s,a,I as t,a2 as n,o}from"./chunks/framework.TebtTzPX.js";const B=JSON.parse('{"title":"CREER UN BLOC GUTENBERG","description":"","frontmatter":{},"headers":[],"relativePath":"WP/WP-blocks-creation/CREER_BLOC_GUTENBERG_WP.md","filePath":"WP/WP-blocks-creation/CREER_BLOC_GUTENBERG_WP.md"}'),c={name:"WP/WP-blocks-creation/CREER_BLOC_GUTENBERG_WP.md"},d=n(`<h1 id="creer-un-bloc-gutenberg" tabindex="-1">CREER UN BLOC GUTENBERG <a class="header-anchor" href="#creer-un-bloc-gutenberg" aria-label="Permalink to &quot;CREER UN BLOC GUTENBERG&quot;">​</a></h1><p>Basé sur <a href="https://developer.wordpress.org/block-editor/getting-started/tutorial/" target="_blank" rel="noreferrer">https://developer.wordpress.org/block-editor/getting-started/tutorial/</a> + autres</p><h2 id="quelques-concepts-en-vrac-sur-le-fonctionnement-des-blocs-a-relire-a-la-fin-du-tuto" tabindex="-1">Quelques concepts en vrac sur le fonctionnement des blocs (à relire à la fin du tuto) <a class="header-anchor" href="#quelques-concepts-en-vrac-sur-le-fonctionnement-des-blocs-a-relire-a-la-fin-du-tuto" aria-label="Permalink to &quot;Quelques concepts en vrac sur le fonctionnement des blocs (à relire à la fin du tuto)&quot;">​</a></h2><ul><li>L&#39;enregistrement = registration se fait côté client et côté serveur (cf . <a href="https://developer.wordpress.org/block-editor/getting-started/fundamentals/registration-of-a-block/" target="_blank" rel="noreferrer">https://developer.wordpress.org/block-editor/getting-started/fundamentals/registration-of-a-block/</a>).</li><li>Pour le rendu, il faut choisir entre un rendu statique (via la fct <code>save()</code> ) ou un rendu dynamique via <code>render.php</code>, si on a des données qui sont récupérées via API ou autre ou générées ... Ou les deux !</li><li><code>npm run start</code> va nous servir pour voir les changements en temps réel lors du développement du bloc. Mais une fois le bloc fonctionnel, on pourra le builder avec <code>npm run build</code> et copier les fichiers dans le dossier /build du plugin.</li></ul><h2 id="installer-create-block" tabindex="-1">Installer create-block <a class="header-anchor" href="#installer-create-block" aria-label="Permalink to &quot;Installer create-block&quot;">​</a></h2><p>Create-block va installer un package node pour avoir la structure du plugin qi contiendra le bloc. Créer un répertoire qui contiendra le plugin et dedans, lancer la commande : <code>npx @wordpress/create-block@latest copyright-date-block --variant=dynamic</code> Le plugin sera disponible au nom <strong>Copyright Date Block</strong> ds le tableau de bord admin et ds Gutenberg. Un dossier Copyright Date Block a été créé dans /plugins.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>Commandes utiles disponibles pour Create-block</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  $ npm start</span></span>
<span class="line"><span>    Starts the build for development.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  $ npm run build</span></span>
<span class="line"><span>    Builds the code for production.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  $ npm run format</span></span>
<span class="line"><span>    Formats files.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  $ npm run lint:css</span></span>
<span class="line"><span>    Lints CSS files.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  $ npm run lint:js</span></span>
<span class="line"><span>    Lints JavaScript files.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  $ npm run plugin-zip</span></span>
<span class="line"><span>    Creates a zip file for a WordPress plugin.</span></span></code></pre></div><p>Aller dans le dossier du bloc Copyright Date Block et lancer <code>npm run start</code> pour voir les changements en temps réél.</p><h2 id="structure-du-bloc" tabindex="-1">Structure du bloc <a class="header-anchor" href="#structure-du-bloc" aria-label="Permalink to &quot;Structure du bloc&quot;">​</a></h2><p><a href="https://developer.wordpress.org/block-editor/getting-started/fundamentals/file-structure-of-a-block/" target="_blank" rel="noreferrer">https://developer.wordpress.org/block-editor/getting-started/fundamentals/file-structure-of-a-block/</a></p><p>Il y a en général les fichiers suivants :</p><ul><li><code>block.json</code></li><li><code>index.js</code></li><li><code>index.css</code></li><li><code>style-index.css</code></li><li><code>edit.js</code></li><li><code>save.js</code></li><li><code>style.css</code></li><li><code>editor.css</code>.</li></ul><h3 id="block-json-ds-src" tabindex="-1">block.json ds /src <a class="header-anchor" href="#block-json-ds-src" aria-label="Permalink to &quot;block.json ds /src&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;$schema&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://schemas.wp.org/trunk/block.json&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;apiVersion&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;create-block/copyright-date-block&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;version&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;0.1.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;title&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Copyright Date Block&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;category&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;widgets&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;icon&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;smiley&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Icons de Dashicons</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;description&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;La description de mon bloc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;example&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {},</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;supports&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: { </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Options dispos pour le style du bloc </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;html&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;textdomain&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;copyright-date-block&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;editorScript&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;file:./index.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;editorStyle&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;file:./index.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//style côté éditeur</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;style&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;file:./style-index.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//style côté frontend</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;render&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;file:./render.php&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// rendu dynamique via PHP</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;viewScript&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;file:./view.js&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> //js côté frontend</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><ul><li><strong>icon</strong> : On peut utiliser les icônes de <a href="https://developer.wordpress.org/resource/dashicons/#pdf" target="_blank" rel="noreferrer">Dashicons</a>. On peut enlever la ligne &quot;icon&quot; si on veut par exemple mettre un svg à la place. Il faudra le faire dans le fichier index.js (cf ci-dessous)</li><li><strong>supports</strong> : On peut rajouter des options pour que l&#39;utilisateur customise le style du bloc. Des sortes de propriétés CSS.</li></ul><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;supports&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;color&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;background&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;text&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;html&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;typography&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;fontSize&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">},</span></span></code></pre></div><p><a href="https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/" target="_blank" rel="noreferrer">Doc détaillée sur les supports</a> Si le style est juste géré par les supports, on peut enlever les lignes editorStyle, style et viewScript du block.json. Et de même, on pourra enlever les lignes</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>In the edit.js file, remove the lines that import editor.scss</span></span>
<span class="line"><span>In the index.js file, remove the lines that import style.scss</span></span>
<span class="line"><span>Delete the editor.scss, style.scss, and view.js files</span></span></code></pre></div><h3 id="index-js-ds-src" tabindex="-1">index.js ds /src <a class="header-anchor" href="#index-js-ds-src" aria-label="Permalink to &quot;index.js ds /src&quot;">​</a></h3><p>Fichier js principal, sert notamment à l&#39;enregistrement côté client avec la fonction <code>registerBlockType</code>. Là on a personnalisé l&#39;icône avec un svg.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> calendarIcon</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">svg</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        viewBox</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;0 0 24 24&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        xmlns</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;http://www.w3.org/2000/svg&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        aria-hidden</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;true&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        focusable</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;false&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">path</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm.5 16c0 .3-.2.5-.5.5H5c-.3 0-.5-.2-.5-.5V7h15v12zM9 10H7v2h2v-2zm0 4H7v2h2v-2zm4-4h-2v2h2v-2zm4 0h-2v2h2v-2zm-4 4h-2v2h2v-2zm4 0h-2v2h2v-2z&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">svg</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">registerBlockType</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">( metadata.name, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    icon: calendarIcon,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    edit: Edit</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} );</span></span></code></pre></div><h3 id="edit-js-ds-src" tabindex="-1">edit.js ds /src <a class="header-anchor" href="#edit-js-ds-src" aria-label="Permalink to &quot;edit.js ds /src&quot;">​</a></h3><p>Contrôle l&#39;apparence dans l&#39;éditeur Gutenberg.</p><ul><li>useBlockProps() correspond aux classes et styles requises par l&#39;éditeur</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default function Edit() {</span></span>
<span class="line"><span>    const currentYear = new Date().getFullYear().toString();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>        &lt;p { ...useBlockProps() }&gt;© { currentYear }&lt;/p&gt;</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Là on a déclaré une constante qu&#39;on va afficher dans un élément HTML <code>&lt;p&gt;</code> mais on va souvent utiliser des blocs WP déjà développés <a href="https://wordpress.github.io/gutenberg/?path=/docs/docs-introduction--page" target="_blank" rel="noreferrer">composants WP</a>. On verra plus tard qu&#39;on aura souvent dans le <code>return</code>une structure :</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>return (</span></span>
<span class="line"><span>        &lt;Fragment&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // Toolbar</span></span>
<span class="line"><span>            &lt;BlockControls&gt; </span></span>
<span class="line"><span>            &lt;/BlockControls&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // L&#39;inspecteur</span></span>
<span class="line"><span>            &lt;InspectorControls&gt;</span></span>
<span class="line"><span>            &lt;/InspectorControls&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // Bloc</span></span>
<span class="line"><span>            &lt;div { …blockProps }&gt;</span></span>
<span class="line"><span>                &lt;RichText /&gt;</span></span>
<span class="line"><span>            &lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;/Fragment&gt;</span></span>
<span class="line"><span>    )</span></span></code></pre></div><p>( vérifier si la Toolbar est dispo pour ts les composants)</p><h3 id="render-php-ds-src" tabindex="-1">render.php ds /src <a class="header-anchor" href="#render-php-ds-src" aria-label="Permalink to &quot;render.php ds /src&quot;">​</a></h3><p>En modifiant le fichier edit.js, le bloc est modifié dans l&#39;interface de l&#39;éditeur mais par contre dans le rendu de la page, on n&#39;aura pas encore le contenu modifié.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;?php</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>?&gt;</span></span>
<span class="line"><span>&lt;p &lt;?php echo get_block_wrapper_attributes(); ?&gt;&gt;© &lt;?php echo date( &quot;Y&quot; ); ?&gt;&lt;/p&gt;</span></span></code></pre></div><h2 id="rajouter-des-attributs-de-bloc" tabindex="-1">Rajouter des attributs de bloc <a class="header-anchor" href="#rajouter-des-attributs-de-bloc" aria-label="Permalink to &quot;Rajouter des attributs de bloc&quot;">​</a></h2><p>Les attributs de blocs vont permettre de stocker de la donnée pour le bloc qui pourra ensuite être utilisée pour modifier le balisage du bloc. L&#39;exemple se base sur l&#39;ajout d&#39;une date de début au bloc Copyright.</p><ul><li>Dans block.json, on rajoute les attributs :</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;attributes&quot;: {</span></span>
<span class="line"><span>    &quot;showStartingYear&quot;: { // savoir si on affiche cette date de début</span></span>
<span class="line"><span>        &quot;type&quot;: &quot;boolean&quot;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    &quot;startingYear&quot;: { //attribut de la date de début</span></span>
<span class="line"><span>        &quot;type&quot;: &quot;string&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>},</span></span></code></pre></div><ul><li>Dans edit.js, on va rajouter des contrôles de réglages dans l&#39;UI grâce au composant <strong>InspectorControls</strong>.</li></ul><ol><li>On va l&#39;importer : <code>import { InspectorControls, useBlockProps } from &#39;@wordpress/block-editor&#39;;</code></li><li>On va aussi importer des Core Components pour customiser notre UI : <code>import { PanelBody, TextControl, ToggleControl } from &#39;@wordpress/components&#39;;</code></li><li>On va créer un fragment <code>&lt;&gt;&lt;/&gt;</code>qui contiendra le JSX</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default function Edit() {</span></span>
<span class="line"><span>    const currentYear = new Date().getFullYear().toString();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>        &lt;&gt;</span></span>
<span class="line"><span>            &lt;InspectorControls&gt;</span></span>
<span class="line"><span>                &lt;PanelBody title={ __( &#39;Settings&#39;, &#39;copyright-date-block&#39; ) }&gt;</span></span>
<span class="line"><span>                    Testing</span></span>
<span class="line"><span>                &lt;/PanelBody&gt;</span></span>
<span class="line"><span>            &lt;/InspectorControls&gt;</span></span>
<span class="line"><span>            &lt;p { ...useBlockProps() }&gt;© { currentYear }&lt;/p&gt;</span></span>
<span class="line"><span>        &lt;/&gt;</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,38),h={start:"4"},u=s("li",null,[a("Pour customiser le contrôle du texte, on va utiliser le composant "),s("strong",null,"TextControl"),a(".Il faut utiliser les "),s("strong",null,"attributs"),a(" et la fonction "),s("strong",null,"setAttributes()"),a(" en paramètre de edit() .Et on va déclarer les attributs avec "),s("code",null,"const { showStartingYear, startingYear } = attributes;"),a(" .")],-1),k=n(`<ul><li>un label : “Starting year”</li><li>une valeur : qui prendra la valeur de l&#39;attribut <code>startingYear</code></li><li>onChange avec une fonction qui mettra à jour <code>startingYear</code> quand la valeur du texte changera</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default function Edit( { attributes, setAttributes } ) {</span></span>
<span class="line"><span>    const { showStartingYear, startingYear } = attributes;</span></span>
<span class="line"><span>    const currentYear = new Date().getFullYear().toString();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>        &lt;&gt;</span></span>
<span class="line"><span>            &lt;InspectorControls&gt;</span></span>
<span class="line"><span>                &lt;PanelBody title={ __( &#39;Settings&#39;, &#39;copyright-date-block&#39; ) }&gt;</span></span>
<span class="line"><span>                    &lt;TextControl</span></span>
<span class="line"><span>                        __nextHasNoMarginBottom</span></span>
<span class="line"><span>                        __next40pxDefaultSize</span></span>
<span class="line"><span>                        label={ __(</span></span>
<span class="line"><span>                            &#39;Starting year&#39;,</span></span>
<span class="line"><span>                            &#39;copyright-date-block&#39;</span></span>
<span class="line"><span>                        ) }</span></span>
<span class="line"><span>                        value={ startingYear || &#39;&#39; }</span></span>
<span class="line"><span>                        onChange={ ( value ) =&gt;</span></span>
<span class="line"><span>                            setAttributes( { startingYear: value } )</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                    /&gt;</span></span>
<span class="line"><span>                &lt;/PanelBody&gt;</span></span>
<span class="line"><span>            &lt;/InspectorControls&gt;</span></span>
<span class="line"><span>            &lt;p { ...useBlockProps() }&gt;© { currentYear }&lt;/p&gt;</span></span>
<span class="line"><span>        &lt;/&gt;</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Cela a permis d&#39;enregistrer la valeur tapée dans le champ Text dans les données du bloc.</p>`,3),g={start:"6"},E=s("strong",null,"Toggle",-1),b=n(`<ul><li>un label : &quot;Show starting year”</li><li>un checked : qui prendra la valeur de l&#39;attribut <code>showStartingYear</code></li><li>onChange avec une fonction qui mettra à jour <code>showStartingYear</code> quand on cliquera sur le toggle</li><li>on pourra n&#39;afficher l&#39;input text que si le checked est à true avec l&#39;opérateur logique &amp;&amp;.</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>export default function Edit( { attributes, setAttributes } ) {</span></span>
<span class="line"><span>    const { showStartingYear, startingYear } = attributes;</span></span>
<span class="line"><span>    const currentYear = new Date().getFullYear().toString();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>        &lt;&gt;</span></span>
<span class="line"><span>            &lt;InspectorControls&gt;</span></span>
<span class="line"><span>                &lt;PanelBody title={ __( &#39;Settings&#39;, &#39;copyright-date-block&#39; ) }&gt;</span></span>
<span class="line"><span>                    &lt;ToggleControl</span></span>
<span class="line"><span>                        checked={ !! showStartingYear }</span></span>
<span class="line"><span>                        label={ __(</span></span>
<span class="line"><span>                            &#39;Show starting year&#39;,</span></span>
<span class="line"><span>                            &#39;copyright-date-block&#39;</span></span>
<span class="line"><span>                        ) }</span></span>
<span class="line"><span>                        onChange={ () =&gt;</span></span>
<span class="line"><span>                            setAttributes( {</span></span>
<span class="line"><span>                                showStartingYear: ! showStartingYear,</span></span>
<span class="line"><span>                            } )</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                    /&gt;</span></span>
<span class="line"><span>                    { showStartingYear &amp;&amp; (</span></span>
<span class="line"><span>                        &lt;TextControl</span></span>
<span class="line"><span>                            __nextHasNoMarginBottom</span></span>
<span class="line"><span>                            __next40pxDefaultSize</span></span>
<span class="line"><span>                            label={ __(</span></span>
<span class="line"><span>                                &#39;Starting year&#39;,</span></span>
<span class="line"><span>                                &#39;copyright-date-block&#39;</span></span>
<span class="line"><span>                            ) }</span></span>
<span class="line"><span>                            value={ startingYear || &#39;&#39; }</span></span>
<span class="line"><span>                            onChange={ ( value ) =&gt;</span></span>
<span class="line"><span>                                setAttributes( { startingYear: value } )</span></span>
<span class="line"><span>                            }</span></span>
<span class="line"><span>                        /&gt;</span></span>
<span class="line"><span>                    ) }</span></span>
<span class="line"><span>                &lt;/PanelBody&gt;</span></span>
<span class="line"><span>            &lt;/InspectorControls&gt;</span></span>
<span class="line"><span>            &lt;p { ...useBlockProps() }&gt;© { currentYear }&lt;/p&gt;</span></span>
<span class="line"><span>        &lt;/&gt;</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Le toggle se met bien à jour.</p><ol start="7"><li>Mettre à jour le contenu du bloc</li></ol><ul><li>On crée la logique pour afficher la date de début si elle existe avecla variable displayDate .</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>   let displayDate;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if ( showStartingYear &amp;&amp; startingYear ) {</span></span>
<span class="line"><span>            displayDate = startingYear + &#39;–&#39; + currentYear;</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        displayDate = currentYear;</span></span>
<span class="line"><span>    }</span></span></code></pre></div><ul><li>On met à jour la fonction edit.js pour utiliser la nouvelle variable displayDate.</li></ul><ol start="8"><li>Mettre à jour le rendu de la page dans render.php Three variables are exposed in render.php, which you can use to customize the block’s output: $attributes (array): The block attributes. $content (string): The block default content. $block (WP_Block): The block instance. On va faire ce qu&#39;on a fait dans edit.js, déclarer la variable et l&#39;utiliser</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if ( ! empty( $attributes[&#39;startingYear&#39;] ) &amp;&amp; ! empty( $attributes[&#39;showStartingYear&#39;] ) ) {</span></span>
<span class="line"><span>    $display_date = $attributes[&#39;startingYear&#39;] . &#39;–&#39; . $current_year;</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>    $display_date = $current_year;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>donc render.php sera finalement :</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;?php</span></span>
<span class="line"><span>$current_year = date( &quot;Y&quot; );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ( ! empty( $attributes[&#39;startingYear&#39;] ) &amp;&amp; ! empty( $attributes[&#39;showStartingYear&#39;] ) ) {</span></span>
<span class="line"><span>    $display_date = $attributes[&#39;startingYear&#39;] . &#39;–&#39; . $current_year;</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>    $display_date = $current_year;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>?&gt;</span></span>
<span class="line"><span>&lt;p &lt;?php echo get_block_wrapper_attributes(); ?&gt;&gt;</span></span>
<span class="line"><span>    © &lt;?php echo esc_html( $display_date ); ?&gt;</span></span>
<span class="line"><span>&lt;/p&gt;</span></span></code></pre></div><h2 id="rajout-d-un-rendu-statique" tabindex="-1">Rajout d&#39;un rendu statique <a class="header-anchor" href="#rajout-d-un-rendu-statique" aria-label="Permalink to &quot;Rajout d&#39;un rendu statique&quot;">​</a></h2><p><a href="https://developer.wordpress.org/block-editor/getting-started/tutorial/#adding-static-rendering" target="_blank" rel="noreferrer">https://developer.wordpress.org/block-editor/getting-started/tutorial/#adding-static-rendering</a> Un bloc peut utiliser le rendu statique, dynamique ou les deux. Là le bloc est rendu dynamiquement : les données ( attributs des balises etc) sont enregistrées ds la BDD mais pas le rendu final en HTML. Le rendu statique va permettre de sauvegarde rle bloc en BDD et si on désinstalle le plugin du bloc, on ne perdra pas les données. =&gt; c&#39;est plus prudent et pérenne</p><p>1/ Utilisation de la fonction save()</p><ul><li>On va créer un fichier save.js avec</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { useBlockProps } from &#39;@wordpress/block-editor&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default function save() {</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>        &lt;p { ...useBlockProps.save() }&gt;</span></span>
<span class="line"><span>            { &#39;Copyright Date Block – hello from the saved content!&#39; }</span></span>
<span class="line"><span>        &lt;/p&gt;</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li>Dans index.js, on importe cette fonction : <code>import save from &#39;./save&#39;; </code> et on rajoute save dans registerBlockType.</li><li>On aura des erreurs en front comme le HTML du bloc n&#39;est pas enregistré en BDD.</li><li>On va créer la fonction save en s&#39;inspirant de edit()</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default function save( { attributes } ) {</span></span>
<span class="line"><span>    const { showStartingYear, startingYear } = attributes;</span></span>
<span class="line"><span>    const currentYear = new Date().getFullYear().toString();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    let displayDate;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if ( showStartingYear &amp;&amp; startingYear ) {</span></span>
<span class="line"><span>        displayDate = startingYear + &#39;–&#39; + currentYear;</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        displayDate = currentYear;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>        &lt;p { ...useBlockProps.save() }&gt;© { displayDate }&lt;/p&gt;</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li>Mais un problème se posera si on essaie de mettre à jour ultérieurement, le HTML en BDD sera contradictoire avec les données générées dynamiquement donc il faut rajouter un attribut fallbackCurrentYear qui va nous permettre de gérer les contradictions. On remplacera currentYear par cet attribut dans save (cf ficher save.js final).</li><li>Il faut veiller aussi à ne pas rendre de HTML si on n&#39;a pas de fallbackCurrentYear, revoir toute la partie <a href="https://developer.wordpress.org/block-editor/getting-started/tutorial/#handling-dynamic-content-in-statically-rendered-blocks" target="_blank" rel="noreferrer">https://developer.wordpress.org/block-editor/getting-started/tutorial/#handling-dynamic-content-in-statically-rendered-blocks</a></li></ul><h2 id="creer-categorie-de-blocs" tabindex="-1">CREER CATEGORIE DE BLOCS <a class="header-anchor" href="#creer-categorie-de-blocs" aria-label="Permalink to &quot;CREER CATEGORIE DE BLOCS&quot;">​</a></h2><p>Dans functions.php</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function ajouter_categorie_personnalisee_blocs( $categories, $post ) {</span></span>
<span class="line"><span>    return array_merge(</span></span>
<span class="line"><span>        $categories,</span></span>
<span class="line"><span>        array(</span></span>
<span class="line"><span>            array(</span></span>
<span class="line"><span>                &#39;slug&#39;  =&gt; &#39;ma-categorie-personnalisee&#39;,</span></span>
<span class="line"><span>                &#39;title&#39; =&gt; __( &#39;Ma catégorie personnalisée&#39;, &#39;mon-theme&#39; ),</span></span>
<span class="line"><span>                &#39;icon&#39;  =&gt; &#39;star-filled&#39;, // Optionnel : un icône pour représenter l</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>add_filter( &#39;block_categories_all&#39;, &#39;ajouter_categorie_personnalisee_blocs&#39;, 10, 2 );</span></span></code></pre></div><h2 id="voir-tous-les-blocs-enregistres" tabindex="-1">VOIR TOUS LES BLOCS ENREGISTRES <a class="header-anchor" href="#voir-tous-les-blocs-enregistres" aria-label="Permalink to &quot;VOIR TOUS LES BLOCS ENREGISTRES&quot;">​</a></h2><p>Dans functions.php</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>add_action( &#39;init&#39;, function() {</span></span>
<span class="line"><span>    $blocks = WP_Block_Type_Registry::get_instance()-&gt;get_all_registered();</span></span>
<span class="line"><span>    foreach ( $blocks as $block_name =&gt; $block ) {</span></span>
<span class="line"><span>        laure_log( $block_name );</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span></code></pre></div>`,25);function y(v,m,C,q,f,F){const i=e("TextControl"),p=e("ToggleControl");return o(),r("div",null,[d,s("ol",h,[u,s("li",null,[a("On utilisera ensuite notre composant "),t(i),a(" qui aura :")])]),k,s("ol",g,[s("li",null,[a("On va passer au "),E,a(". On va utiliser le composant "),t(p),a(". De la même manière, on configure :")])]),b])}const x=l(c,[["render",y]]);export{B as __pageData,x as default};
