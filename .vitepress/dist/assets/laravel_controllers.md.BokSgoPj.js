import{_ as n,c as s,o as a,a2 as e}from"./chunks/framework.BXMoTSpH.js";const $=JSON.parse('{"title":"CONTROLLERS","description":"","frontmatter":{},"headers":[],"relativePath":"laravel/controllers.md","filePath":"laravel/controllers.md"}'),p={name:"laravel/controllers.md"},i=e(`<h1 id="controllers" tabindex="-1">CONTROLLERS <a class="header-anchor" href="#controllers" aria-label="Permalink to &quot;CONTROLLERS&quot;">​</a></h1><h2 id="quelques-methodes-pour-recuperer-les-data-dans-les-controllers" tabindex="-1">Quelques méthodes pour récupérer les data dans les controllers <a class="header-anchor" href="#quelques-methodes-pour-recuperer-les-data-dans-les-controllers" aria-label="Permalink to &quot;Quelques méthodes pour récupérer les data dans les controllers&quot;">​</a></h2><ul><li>Tous les enregistrements : <code>$trucs = Truc::all(); </code></li><li>Classés par ordre alpha : <code>$trucs = Truc::orderBy(&#39;name&#39;, &#39;asc&#39;)-&gt;get();</code></li><li>Tous les utilisateurs dont le nom est John : $users = User::where(&#39;name&#39;, &#39;John&#39;)-&gt;get();</li><li>Le premier utilisateur dont le nom est John : <code>$user = User::where(&#39;name&#39;, &#39;John&#39;)-&gt;first();</code></li><li>Un enregistrement depuis son id : <code>$truc = Truc::find($id);</code></li><li>Un enregistrement depuis son id : <code>$truc = Truc::findOrFail($id);</code></li><li>Un enregistrement depuis un paramètre donné: <code>$truc = Truc::find($id);</code></li><li>On peut utiliser le queryBuilder mais je n&#39;ai pas exploité cette méthode. Apparemment il faut créer une instance du query Builder et l&#39;utiliser dans le controller.</li></ul><h2 id="exemple-d-un-save-d-un-controller" tabindex="-1">Exemple d&#39;un save () d&#39;un controller <a class="header-anchor" href="#exemple-d-un-save-d-un-controller" aria-label="Permalink to &quot;Exemple d&#39;un save () d&#39;un controller&quot;">​</a></h2><p>Save() va être une méthode qu&#39;on va utiliser pour les deux cas, création d&#39;un nouvel enregistrement ou update. A écrémer selon votre cas !</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public function moduleSave(Request $request, $id = null)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        // Data validation </span></span>
<span class="line"><span>        $request-&gt;validate([</span></span>
<span class="line"><span>            &#39;title&#39; =&gt; &#39;required|string|max:255&#39;,</span></span>
<span class="line"><span>            &#39;slug&#39; =&gt; &#39;required|string|max:255&#39;,</span></span>
<span class="line"><span>            &#39;description&#39; =&gt; &#39;required|string&#39;,</span></span>
<span class="line"><span>            &#39;module_order&#39; =&gt; &#39;required|integer&#39;,</span></span>
<span class="line"><span>            &#39;training_course_id&#39; =&gt; &#39;required|integer&#39;,</span></span>
<span class="line"><span>        ]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Get the id of the current TrainingModule</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Create and insert data into the database</span></span>
<span class="line"><span>        // Convert the date input in datetime format</span></span>
<span class="line"><span>        $date = new DateTime($request-&gt;input(&#39;publication_date&#39;));</span></span>
<span class="line"><span>        $datetime = $date-&gt;format(&#39;Y-m-d H:i:s&#39;);</span></span>
<span class="line"><span>        // Create a new instance of TrainingModule if $is is null</span></span>
<span class="line"><span>        if ($id === null) {</span></span>
<span class="line"><span>            // Create an instance of TrainingModule with the inputs&#39;values</span></span>
<span class="line"><span>            $trainingModule = trainingModule::create([</span></span>
<span class="line"><span>                &#39;title&#39; =&gt; $request-&gt;input(&#39;title&#39;),</span></span>
<span class="line"><span>                &#39;slug&#39; =&gt; $request-&gt;input(&#39;slug&#39;),</span></span>
<span class="line"><span>                &#39;description&#39; =&gt; $request-&gt;input(&#39;description&#39;),</span></span>
<span class="line"><span>                &#39;module_order&#39; =&gt; $request-&gt;input(&#39;module_order&#39;),</span></span>
<span class="line"><span>                &#39;training_course_id&#39; =&gt; $request-&gt;input(&#39;training_course_id&#39;),</span></span>
<span class="line"><span>            ]);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        //If the id is not null, get the right TrainingModule to update</span></span>
<span class="line"><span>        else {</span></span>
<span class="line"><span>            $trainingModule = TrainingModule::findOrFail($id);</span></span>
<span class="line"><span>            // Update it</span></span>
<span class="line"><span>            $trainingModule-&gt;title = $request-&gt;input(&#39;title&#39;);</span></span>
<span class="line"><span>            $trainingModule-&gt;slug = $request-&gt;input(&#39;slug&#39;);</span></span>
<span class="line"><span>            $trainingModule-&gt;description = $request-&gt;input(&#39;description&#39;);</span></span>
<span class="line"><span>            $trainingModule-&gt;module_order = $request-&gt;input(&#39;module_order&#39;);</span></span>
<span class="line"><span>            $trainingModule-&gt;training_course_id = $request-&gt;input(&#39;training_course_id&#39;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // Get the module slug </span></span>
<span class="line"><span>        $moduleSlug = $request-&gt;input(&#39;slug&#39;);</span></span>
<span class="line"><span>        $trainingModuleToLinkId = TrainingModule::where(&#39;slug&#39;, $moduleSlug)-&gt;first()-&gt;id;</span></span>
<span class="line"><span>        // Store the TrainingModule into the database</span></span>
<span class="line"><span>        $trainingModule-&gt;save();</span></span>
<span class="line"><span>        // if items&#39; forms was filled</span></span>
<span class="line"><span>        if ($request-&gt;input(&#39;items&#39;)) {</span></span>
<span class="line"><span>            $items = $request-&gt;input(&#39;items&#39;);</span></span>
<span class="line"><span>            foreach ($items as $item) {</span></span>
<span class="line"><span>                // Data validation for item </span></span>
<span class="line"><span>                $request-&gt;validate([</span></span>
<span class="line"><span>                    &#39;title&#39; =&gt; &#39;required|string|max:255&#39;,</span></span>
<span class="line"><span>                    &#39;slug&#39; =&gt; &#39;required|string|max:255&#39;,</span></span>
<span class="line"><span>                    &#39;description&#39; =&gt; &#39;string&#39;,</span></span>
<span class="line"><span>                    &#39;youtube_video_code&#39; =&gt; &#39;string&#39;,</span></span>
<span class="line"><span>                    &#39;item_order&#39; =&gt; &#39;integer&#39;,</span></span>
<span class="line"><span>                ]);</span></span>
<span class="line"><span>                // Create an instance of ModuleItem with the inputs&#39;values</span></span>
<span class="line"><span>                $ModuleItem = ModuleItem::create([</span></span>
<span class="line"><span>                    &#39;title&#39; =&gt; $item[&#39;title&#39;],</span></span>
<span class="line"><span>                    &#39;slug&#39; =&gt; $item[&#39;slug&#39;],</span></span>
<span class="line"><span>                    &#39;description&#39; =&gt; $item[&#39;description&#39;],</span></span>
<span class="line"><span>                    &#39;youtube_video_code&#39; =&gt; $item[&#39;youtube_video_code&#39;],</span></span>
<span class="line"><span>                    &#39;item_order&#39; =&gt; $item[&#39;item_order&#39;],</span></span>
<span class="line"><span>                    &#39;training_module_id&#39; =&gt; $trainingModuleToLinkId,</span></span>
<span class="line"><span>                ]);</span></span>
<span class="line"><span>                // Store the ModuleItem into the database</span></span>
<span class="line"><span>                $ModuleItem-&gt;save();</span></span>
<span class="line"><span>            };</span></span>
<span class="line"><span>            // Get the course slug for redirection</span></span>
<span class="line"><span>            $courseSlug = TrainingCourse::find($trainingModule-&gt;training_course_id)-&gt;slug;</span></span>
<span class="line"><span>            // Redirection to the news list page</span></span>
<span class="line"><span>            return redirect(route(&#39;user.trainings&#39;, $courseSlug))-&gt;with(&#39;success&#39;, &#39;Le cours &quot;&#39; .  $request-&gt;input(&#39;title&#39;) . &#39;&quot; a été sauvé avec succès ! &#39;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>Un autre exemple dont on peut s&#39;inspirer qui est plus complexe, il récupère un tableau depuis le formulaire dans le Request.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>public function resourceSave(Request $request, $id = null)</span></span>
<span class="line"><span>    {   </span></span>
<span class="line"><span>        $resources = $request-&gt;input(&#39;resources&#39;);</span></span>
<span class="line"><span>            foreach ($resources as $key =&gt; $resource) {</span></span>
<span class="line"><span>                // Validation des sous-champs dans chaque élément du tableau resources</span></span>
<span class="line"><span>                $validator = Validator::make($resource, [</span></span>
<span class="line"><span>                    &#39;title&#39; =&gt; &#39;required|string|max:255&#39;,</span></span>
<span class="line"><span>                    &#39;slug&#39; =&gt; &#39;required|string|max:255&#39;,</span></span>
<span class="line"><span>                    &#39;description&#39; =&gt; &#39;nullable|string&#39;,</span></span>
<span class="line"><span>                    &#39;file_name&#39; =&gt; &#39;nullable|string&#39;,</span></span>
<span class="line"><span>                    &#39;ext_name&#39; =&gt; &#39;nullable|string&#39;,</span></span>
<span class="line"><span>                    &#39;resource_order&#39; =&gt; &#39;nullable|integer&#39;,</span></span>
<span class="line"><span>                ]);</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>                // Si la validation échoue, retourne les erreurs</span></span>
<span class="line"><span>                if ($validator-&gt;fails()) {</span></span>
<span class="line"><span>                    return redirect()-&gt;back()-&gt;withErrors($validator)-&gt;withInput();</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>                // Processus de téléchargement du fichier si tout est valide</span></span>
<span class="line"><span>                if ($request-&gt;hasFile(&#39;resources.&#39; . $key . &#39;.file_name&#39;)) {</span></span>
<span class="line"><span>                    $file = $request-&gt;file(&#39;resources.&#39; . $key . &#39;.file_name&#39;);</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>                    if ($file-&gt;isValid()) {</span></span>
<span class="line"><span>                        $originalFileName = $file-&gt;getClientOriginalName();</span></span>
<span class="line"><span>                        $fileExtension = $file-&gt;getClientOriginalExtension();</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>                        // Chemin du répertoire de destination</span></span>
<span class="line"><span>                        $uploadDirectory = public_path(&#39;img&#39;);</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>                        // Déplacer le fichier téléchargé vers le répertoire de destination</span></span>
<span class="line"><span>                        $file-&gt;move($uploadDirectory, $originalFileName);</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>                        // Créer une instance de ItemResource avec les valeurs des inputs</span></span>
<span class="line"><span>                        $itemResource = ItemResource::create([</span></span>
<span class="line"><span>                            &#39;title&#39; =&gt; $resource[&#39;title&#39;],</span></span>
<span class="line"><span>                            &#39;slug&#39; =&gt; $resource[&#39;slug&#39;],</span></span>
<span class="line"><span>                            &#39;description&#39; =&gt; $resource[&#39;description&#39;],</span></span>
<span class="line"><span>                            &#39;file_name&#39; =&gt; $originalFileName,</span></span>
<span class="line"><span>                            &#39;ext_name&#39; =&gt; $fileExtension,</span></span>
<span class="line"><span>                            &#39;resource_order&#39; =&gt; $resource[&#39;resource_order&#39;],</span></span>
<span class="line"><span>                            &#39;module_item_id&#39; =&gt; $request-&gt;input(&#39;training_module_id&#39;),</span></span>
<span class="line"><span>                        ]);</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>                        // Enregistrer l&#39;ItemResource dans la base de données</span></span>
<span class="line"><span>                        $itemResource-&gt;save();</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>               </span></span>
<span class="line"><span>        // Get the course slug for redirection</span></span>
<span class="line"><span>        $itemParentId = $request-&gt;input(&#39;training_module_id&#39;) ;</span></span>
<span class="line"><span>        $moduleParentId = TrainingModule::find(ModuleItem::find($itemParentId )-&gt;training_module_id);</span></span>
<span class="line"><span>        $courseParent = TrainingCourse::find($moduleParentId-&gt;training_course_id) ;</span></span>
<span class="line"><span>        $slug = $courseParent-&gt;slug ;</span></span>
<span class="line"><span>        //Redirection to the concerned trainingCourse page</span></span>
<span class="line"><span>        return redirect(route(&#39;user.trainings&#39;, $slug))-&gt;with(&#39;success&#39;, &#39;La ressource&quot;&#39; .  $request-&gt;input(&#39;title&#39;) . &#39;&quot; a été ajoutée avec succès ! &#39;);</span></span>
<span class="line"><span>       </span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>Exemple d&#39;un delete avec gestion des erreurs :</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    public function trainingDelete($id)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        // Get the trainingCourse</span></span>
<span class="line"><span>        $trainingCourse = trainingCourse::find($id);</span></span>
<span class="line"><span>        //Check if there is a trainingCourse matching with $id</span></span>
<span class="line"><span>        if (!$trainingCourse) {</span></span>
<span class="line"><span>            return redirect(route(&#39;admin.trainings.show&#39;))-&gt;with(&#39;error&#39;,&#39;Pas de formation à cet id&#39;);</span></span>
<span class="line"><span>        } </span></span>
<span class="line"><span>        // Delete the trainingCourse</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            $trainingCourse-&gt;delete();</span></span>
<span class="line"><span>            $message = &quot;Formation effacée !&quot;;</span></span>
<span class="line"><span>            $status = &quot;success&quot; ;</span></span>
<span class="line"><span>        } catch (\\Exception $e) {</span></span>
<span class="line"><span>        // Manage errors</span></span>
<span class="line"><span>            $message = &quot;Erreur survenue&quot; ;</span></span>
<span class="line"><span>            $status = &quot;error&quot; ;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>            return redirect(route(&#39;admin.trainings.show&#39;))-&gt;with($status,$message);</span></span>
<span class="line"><span>    }</span></span></code></pre></div>`,10),l=[i];function t(r,c,u,o,d,g){return a(),s("div",null,l)}const h=n(p,[["render",t]]);export{$ as __pageData,h as default};
