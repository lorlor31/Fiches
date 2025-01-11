import{_ as p,D as t,c as i,j as a,a as s,I as n,a2 as l,o as c}from"./chunks/framework.TebtTzPX.js";const E=JSON.parse('{"title":"CREER UN BLOC RICHTEXT","description":"","frontmatter":{},"headers":[],"relativePath":"WP/WP-blocks-creation/CREER_BLOC_RICHTEXT.md","filePath":"WP/WP-blocks-creation/CREER_BLOC_RICHTEXT.md"}'),r={name:"WP/WP-blocks-creation/CREER_BLOC_RICHTEXT.md"},u=l(`<h1 id="creer-un-bloc-richtext" tabindex="-1">CREER UN BLOC RICHTEXT <a class="header-anchor" href="#creer-un-bloc-richtext" aria-label="Permalink to &quot;CREER UN BLOC RICHTEXT&quot;">​</a></h1><p>On aura un champ texte éditable avec sa toolbar avec la possibilité de configurer bold, italic, etc dans <code> Allowed format</code>.</p><h2 id="docs-officielles" tabindex="-1">Docs officielles : <a class="header-anchor" href="#docs-officielles" aria-label="Permalink to &quot;Docs officielles :&quot;">​</a></h2><ul><li><a href="https://developer.wordpress.org/block-editor/reference-guides/richtext/" target="_blank" rel="noreferrer">https://developer.wordpress.org/block-editor/reference-guides/richtext/</a></li><li><a href="https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/rich-text/README.md" target="_blank" rel="noreferrer">https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/rich-text/README.md</a></li></ul><h2 id="dans-block-json" tabindex="-1">Dans block.json : <a class="header-anchor" href="#dans-block-json" aria-label="Permalink to &quot;Dans block.json :&quot;">​</a></h2><p>On déclare <code>content</code> dans les attributs du bloc</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;attributes&quot;: {</span></span>
<span class="line"><span>		&quot;content&quot;: {</span></span>
<span class="line"><span>			&quot;type&quot;: &quot;string&quot;,</span></span>
<span class="line"><span>			&quot;source&quot;: &quot;html&quot;,</span></span>
<span class="line"><span>			&quot;selector&quot;: &quot;p&quot; // on donne la provenance de notre texte , ça pourrait être aussi un sélecteur CSS  par exemple selector: &#39;.content&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	},</span></span></code></pre></div><h2 id="dans-edit-js" tabindex="-1">Dans edit.js <a class="header-anchor" href="#dans-edit-js" aria-label="Permalink to &quot;Dans edit.js&quot;">​</a></h2><ul><li>On importe bien les composants nécessaires :</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { useBlockProps, RichText } from &#39;@wordpress/block-editor&#39;;</span></span></code></pre></div><ul><li>Dans la fonction edit() :</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const Edit = ( props ) =&gt; {</span></span>
<span class="line"><span>	const {</span></span>
<span class="line"><span>		attributes: { content }, // équivaut à props.attributes.content = content ;</span></span>
<span class="line"><span>		setAttributes, // et props.setAttributes = setAttributes() ;</span></span>
<span class="line"><span>	} = props; </span></span>
<span class="line"><span></span></span>
<span class="line"><span>	const blockProps = useBlockProps(); // Propriétés du bloc</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	const onChangeContent = ( newContent ) =&gt; {</span></span>
<span class="line"><span>		setAttributes( { content: newContent } ); // les composants gut récupèrent directement la bonne &#39;value&#39;</span></span>
<span class="line"><span>	}; </span></span>
<span class="line"><span>	return (</span></span>
<span class="line"><span>		&lt;RichText</span></span>
<span class="line"><span>			{ ...blockProps }</span></span>
<span class="line"><span>			tagName=&quot;p&quot; // élément HTML du rendu</span></span>
<span class="line"><span>			onChange={ onChangeContent }</span></span>
<span class="line"><span>			value={ content }</span></span>
<span class="line"><span>		/&gt;</span></span>
<span class="line"><span>	);</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>export default Edit;</span></span></code></pre></div><h2 id="dans-save-js" tabindex="-1">Dans save.js <a class="header-anchor" href="#dans-save-js" aria-label="Permalink to &quot;Dans save.js&quot;">​</a></h2><ul><li>On importe bien les deux comosants précédents.</li><li>On fait comme pour edit() dans save() :</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default function save(props) {</span></span>
<span class="line"><span>    const {</span></span>
<span class="line"><span>		attributes: { content },</span></span>
<span class="line"><span>	} = props; // on attribue la valeur de content à props.content</span></span>
<span class="line"><span>    return &lt;RichText.Content { ...useBlockProps.save() } // on sauve</span></span>
<span class="line"><span>    tagName=&quot;p&quot; </span></span>
<span class="line"><span>    value={content} </span></span>
<span class="line"><span>    /&gt;;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="bloc-multiligne" tabindex="-1">Bloc multiligne <a class="header-anchor" href="#bloc-multiligne" aria-label="Permalink to &quot;Bloc multiligne&quot;">​</a></h2>`,16),d=a("code",null,"tagName",-1),h=a("code",null,"multiline",-1),b=l(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;RichText</span></span>
<span class="line"><span>    tagName=&quot;div&quot; // Le bloc sera une &lt;div&gt;</span></span>
<span class="line"><span>    multiline=&quot;p&quot; // Qui contiendra des &lt;p&gt;</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>Ou </span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;RichText</span></span>
<span class="line"><span>    tagName=&quot;ul&quot; // Là une liste</span></span>
<span class="line"><span>    multiline=&quot;li&quot; // Et ses éléments</span></span>
<span class="line"><span></span></span>
<span class="line"><span>etc...</span></span></code></pre></div><h2 id="configuration-de-la-toolbar" tabindex="-1">Configuration de la Toolbar <a class="header-anchor" href="#configuration-de-la-toolbar" aria-label="Permalink to &quot;Configuration de la Toolbar&quot;">​</a></h2>`,2),g=a("li",null,[s("Par défaut l'attribut "),a("code",null,"allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }"),s(" affiche ces 3 options dans la Toolbar.")],-1),m=a("a",{href:"https://capitainewp.io/formations/wordpress-creer-blocs-gutenberg/ajouter-reglages-toolbar/",target:"_blank",rel:"noreferrer"},"https://capitainewp.io/formations/wordpress-creer-blocs-gutenberg/ajouter-reglages-toolbar/",-1);function _(f,v,k,C,q,T){const e=t("RichText"),o=t("BlockControls");return c(),i("div",null,[u,a("p",null,[s("Pour être multiligne, il faut changer le "),d,s(" du "),n(e),s(" et rajouter l'attribut "),h,s("en précisant quel élément va être créé à chaque retour à la ligne. NB : le faire dans le edit() et dans le save() aussi !")]),b,a("ul",null,[a("li",null,[s("Pour un "),n(e),s(" il vaut mieux gérer les options de style via la Toolbar que par les supports.")]),g,a("li",null,[s("Pour customiser la Toolbar, on peut importer "),n(o),s(" et l'utiliser dans un fragment. Il faudra gérer les changements en rajoutant des attributs. cf exemple "),m,s(" pour approfondir")])])])}const R=p(r,[["render",_]]);export{E as __pageData,R as default};
