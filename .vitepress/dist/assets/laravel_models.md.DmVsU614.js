import{_ as a,c as s,o as n,a2 as e}from"./chunks/framework.CEgrwLex.js";const h=JSON.parse('{"title":"MODELS - BDD- SEEDERS","description":"","frontmatter":{},"headers":[],"relativePath":"laravel/models.md","filePath":"laravel/models.md"}'),p={name:"laravel/models.md"},l=e(`<h1 id="models-bdd-seeders" tabindex="-1">MODELS - BDD- SEEDERS <a class="header-anchor" href="#models-bdd-seeders" aria-label="Permalink to &quot;MODELS - BDD- SEEDERS&quot;">​</a></h1><h2 id="creation-de-models-a-partir-d-une-migration" tabindex="-1">Création de models à partir d&#39;une migration <a class="header-anchor" href="#creation-de-models-a-partir-d-une-migration" aria-label="Permalink to &quot;Création de models à partir d&#39;une migration&quot;">​</a></h2><ul><li>On peut créer la migration avec ou sans modèle, mais ça va plus vite avec le modèle 😉 : <code> php artisan make:model Category -m</code> ou <code>-mcf</code> pour créer le controller et le factory dans la foulée.</li><li>Une fois les deux fichiers de migration et du Model créés, on peut revenir dessus, avant de lancer la migration. On va notamment :</li></ul><ol><li>dans la migration, rajouter les champs des colonnes, les types et contraintes de ces dernières, les clés étrangères</li><li>dans le modèle, sếcifier les champs qui sont fillable, c&#39;est à dire qu&#39;on peut saisir (pas le created_at par exemple mais attention, j&#39;ai eu le tour avec la FK, il fallait bien la préciser)</li></ol><ul><li>Exemple de migration :</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public function up()</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        Schema::create(&#39;item_resources&#39;, function (Blueprint $table) {</span></span>
<span class="line"><span>            $table-&gt;id();</span></span>
<span class="line"><span>            $table-&gt;string(&#39;title&#39;);</span></span>
<span class="line"><span>            $table-&gt;string(&#39;slug&#39;)-&gt;unique();</span></span>
<span class="line"><span>            $table-&gt;integer(&#39;module_order&#39;);</span></span>
<span class="line"><span>            $table-&gt;unsignedBigInteger(&#39;candidacy_id&#39;);</span></span>
<span class="line"><span>            $table-&gt;string(&#39;role&#39;)-&gt;nullable();</span></span>
<span class="line"><span>            $table-&gt;unique([&#39;team_id&#39;, &#39;user_id&#39;]);</span></span>
<span class="line"><span>            $table-&gt;string(&#39;uuid&#39;)-&gt;unique();</span></span>
<span class="line"><span>            $table-&gt;longText(&#39;exception&#39;);</span></span>
<span class="line"><span>            $table-&gt;foreignId(&#39;module_item_id&#39;)-&gt;references(&#39;id&#39;)-&gt;on(&#39;module_items&#39;)-&gt;onDelete(&#39;cascade&#39;);       </span></span>
<span class="line"><span>            $table-&gt;timestamps();</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * Reverse the migrations.</span></span>
<span class="line"><span>     *</span></span>
<span class="line"><span>     * @return void</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public function down()</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        Schema::dropIfExists(&#39;item_resources&#39;);</span></span>
<span class="line"><span>    }</span></span></code></pre></div><ul><li>Exemple de model :</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class TrainingModule extends Model</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    protected $fillable = [</span></span>
<span class="line"><span>        &#39;title&#39;,&#39;slug&#39;,&#39;description&#39;,&#39;module_order&#39;,&#39;training_course_id&#39;,</span></span>
<span class="line"><span>    ];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public function trainingCourse()</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        return $this-&gt;belongsTo(TrainingCourse::class);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public function moduleItems()</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        return $this-&gt;hasMany(ModuleItem::class)-&gt;orderBy(&#39;item_order&#39;, &#39;asc&#39;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    use HasFactory;</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li>NB : je ne sais pas ce que c&#39;est que les Factory mais ça a l&#39;air d&#39;être un concept phare de Laravel mais j&#39;ai pas eu à creuser ?</li></ul><h2 id="mise-en-place-des-relations" tabindex="-1">Mise en place des relations <a class="header-anchor" href="#mise-en-place-des-relations" aria-label="Permalink to &quot;Mise en place des relations&quot;">​</a></h2><p>Pour mettre en place les relations, on va rajouter des méthodes dans les Models :</p><h3 id="cas-d-une-many-to-many-le-plus-simple" tabindex="-1">Cas d&#39;une many-to-many (le plus simple ) <a class="header-anchor" href="#cas-d-une-many-to-many-le-plus-simple" aria-label="Permalink to &quot;Cas d&#39;une many-to-many (le plus simple )&quot;">​</a></h3><p>Mon exemple concerne un cours qui peut appartenir à plusieurs catégorie et une catégorie qui peut concerner plusieurs cours.</p><ol><li>Créer la table 1 via la migration et éditer cette dernière</li><li>Idem pour la table 2</li><li>Créer la table pivot “table1_table2” et éditer la migration en ajoutant les clés étrangères. Exemple :</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> public function up()</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        Schema::create(&#39;training_category_training_course&#39;, function (Blueprint $table) {</span></span>
<span class="line"><span>            $table-&gt;id();</span></span>
<span class="line"><span>            $table-&gt;foreignId(&#39;training_category_id&#39;)-&gt;constrained()-&gt;onDelete(&#39;cascade&#39;);</span></span>
<span class="line"><span>            $table-&gt;foreignId(&#39;training_course_id&#39;)-&gt;constrained()-&gt;onDelete(&#39;cascade&#39;);</span></span>
<span class="line"><span>            $table-&gt;timestamps();</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * Reverse the migrations.</span></span>
<span class="line"><span>     *</span></span>
<span class="line"><span>     * @return void</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public function down()</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        Schema::dropIfExists(&#39;training_category_training_course&#39;);</span></span>
<span class="line"><span>    }</span></span></code></pre></div><ol start="4"><li>Dans les Models, on pourra récupérer les relations ainsi : <code>public function table1() { return $this-&gt;belongsToMany(table1::class, table1_table2&#39;); }</code>. Exemple :</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> public function trainingCategories(){</span></span>
<span class="line"><span>        return $this-&gt;belongsToMany(TrainingCategory::class, &#39;training_category_training_course&#39;);</span></span>
<span class="line"><span>    }</span></span></code></pre></div><h3 id="cas-d-une-manytoone-onetomany" tabindex="-1">Cas d&#39;une ManyToOne / OneToMany <a class="header-anchor" href="#cas-d-une-manytoone-onetomany" aria-label="Permalink to &quot;Cas d&#39;une ManyToOne / OneToMany&quot;">​</a></h3><p>Ici on va prendre l&#39;exemple d&#39;un cours (TrainingCourse) qui a plusieurs modules (TrainingModules) mais ce module ne peut appartenir qu&#39;à un seul cours. 1.Créer la migration et le modele pour les deux entités. 2. Dans les models, bien distinguer celui qui a la FK ou pas. Dans notre exemple,c &#39;est le module qui porte la FK. 3. Celui qui a la FK est celui qui aura le (dans notre exemple, c&#39;est le module) 4. L’autre le HasMany. 5. On aura donc ces méthodes dans les models :</p><p>Dans le model du module :</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public function trainingCourse()</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        return $this-&gt;belongsTo(TrainingCourse::class);</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>Dans le model du cours :</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public function trainingModules()</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        return $this-&gt;hasMany(TrainingModule::class)-&gt;orderBy(&#39;module_order&#39;, &#39;asc&#39;);</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>En fait c&#39;est pas compliqué dit comme ça !</p><h3 id="recuperer-une-many-to-many-avec-laravel-et-enregistrer-changements" tabindex="-1">RECUPERER UNE MANY TO MANY AVEC LARAVEL ET ENREGISTRER CHANGEMENTS <a class="header-anchor" href="#recuperer-une-many-to-many-avec-laravel-et-enregistrer-changements" aria-label="Permalink to &quot;RECUPERER UNE MANY TO MANY AVEC LARAVEL ET ENREGISTRER CHANGEMENTS&quot;">​</a></h3><p>Dans le controleur, il faut synchroniser :</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public function update(Request $request, Module $module) { // Utilise sync pour mettre à jour les relations dans la table pivot         $trainingCourse-&gt;trainingCategories()-&gt;sync($request-&gt;input(&#39;categories&#39;, []));</span></span>
<span class="line"><span>return redirect()-&gt;route(&#39;modules.index&#39;)-&gt;with(&#39;success&#39;, &#39;Module mis à jour avec succès.&#39;); }</span></span></code></pre></div><h2 id="creer-des-seeders" tabindex="-1">Créer des seeders <a class="header-anchor" href="#creer-des-seeders" aria-label="Permalink to &quot;Créer des seeders&quot;">​</a></h2><ol><li>Créer le seeder <code>php artisan make:seeder MonSeeder</code></li><li>Modifier le Seeder en rajoutant les champs et les valeurs qu&#39;on veut. On va créer un tableau contenant des tableaux associatifs avec les données sur lesquels on va itérer avec un foreach pour remplir la table. Exemple condensé :</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$users = [</span></span>
<span class="line"><span>            [</span></span>
<span class="line"><span>                &#39;name&#39; =&gt; &#39;Jean&#39;,</span></span>
<span class="line"><span>                &#39;nickname&#39; =&gt; &#39;JJ&#39;,</span></span>
<span class="line"><span>                &#39;team_id&#39; =&gt; 1,</span></span>
<span class="line"><span>            ],</span></span>
<span class="line"><span>            [</span></span>
<span class="line"><span>                &#39;name&#39; =&gt; &#39;Bob&#39;,</span></span>
<span class="line"><span>                &#39;nickname&#39; =&gt; &#39;BB&#39;,</span></span>
<span class="line"><span>                &#39;team_id&#39; =&gt; 1,</span></span>
<span class="line"><span>            ],</span></span>
<span class="line"><span>            etc...</span></span>
<span class="line"><span>            ]</span></span>
<span class="line"><span>            Puis on remplit la table :</span></span>
<span class="line"><span>            foreach ($users as $user){</span></span>
<span class="line"><span>                DB::table(&#39;users&#39;)-&gt;insert([[</span></span>
<span class="line"><span>                    &#39;name&#39;=&gt; $user[&#39;name&#39;],</span></span>
<span class="line"><span>                    &#39;nickname&#39;=&gt; $user[&#39;nickname&#39;],</span></span>
<span class="line"><span>                    &#39;team_id&#39;=&gt; $user[&#39;team_id&#39;], </span></span>
<span class="line"><span>                ]]);</span></span>
<span class="line"><span>            }</span></span></code></pre></div><ol start="3"><li>On rajoute le Seeder dans DatabaseSeeder.php <code>$this-&gt;call([UsersTableSeeder::class]);</code></li><li>Le lancer ou relancer tous les seeders <code>php artisan db:seed --class=MaTablesSeeder</code> ou <code>php artisan migrate:refresh --seed</code> 5.Au cas où on veut réinitialiser les id des enregistrements, on doit utiliser truncate() de SQL. Exemple à mettre en début du seeder :</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    public function run()</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        // Desactivate foreign key checking</span></span>
<span class="line"><span>        DB::statement(&#39;SET FOREIGN_KEY_CHECKS = 0;&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Empty the table</span></span>
<span class="line"><span>        DB::table(&#39;module_items&#39;)-&gt;truncate();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Reactivate foreign key checking</span></span>
<span class="line"><span>        DB::statement(&#39;SET FOREIGN_KEY_CHECKS = 1;&#39;);</span></span>
<span class="line"><span>    ...</span></span></code></pre></div><h2 id="commandes-en-rapport-avec-la-bdd-et-plus-to-be-completed" tabindex="-1">Commandes en rapport avec la BDD et plus (to be completed) <a class="header-anchor" href="#commandes-en-rapport-avec-la-bdd-et-plus-to-be-completed" aria-label="Permalink to &quot;Commandes en rapport avec la BDD et plus (to be completed)&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Action</th><th>Commande</th></tr></thead><tbody><tr><td>apply migrations</td><td>php artisan migrate</td></tr><tr><td>drop BD</td><td>php artisan migrate:reset</td></tr><tr><td>drop et recréer</td><td>php artisan migrate:fresh</td></tr><tr><td>lancer un seeder</td><td>php artisan db:seed --class=MaTablesSeeder</td></tr><tr><td>relancer tous les seeders</td><td>php artisan migrate:refresh --seed</td></tr><tr><td>version</td><td>php artisan --version</td></tr></tbody></table>`,34),t=[l];function i(r,c,o,d,u,m){return n(),s("div",null,t)}const b=a(p,[["render",i]]);export{h as __pageData,b as default};
