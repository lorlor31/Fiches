# CONTROLLERS

## Quelques méthodes pour récupérer les data dans les controllers

- Tous les enregistrements : 
`$trucs = Truc::all(); `
- Classés par ordre alpha : 
`$trucs = Truc::orderBy('name', 'asc')->get();`
- Tous les utilisateurs dont le nom est John :
$users = User::where('name', 'John')->get();
- Le premier utilisateur dont le nom est John :
`$user = User::where('name', 'John')->first();`
- Un enregistrement depuis son id : 
`$truc = Truc::find($id);`
- Un enregistrement depuis son id : 
`$truc = Truc::findOrFail($id);`
- Un enregistrement depuis un paramètre donné: 
`$truc = Truc::find($id);`
- On peut utiliser le queryBuilder mais je n'ai pas exploité cette méthode. Apparemment il faut créer une instance du query Builder et l'utiliser dans le controller.

## Exemple d'un save () d'un controller 

Save() va être une méthode qu'on va utiliser pour les deux cas, création d'un nouvel enregistrement ou update. A écrémer selon votre cas !

```
public function moduleSave(Request $request, $id = null)
    {
        // Data validation 
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'description' => 'required|string',
            'module_order' => 'required|integer',
            'training_course_id' => 'required|integer',
        ]);

        // Get the id of the current TrainingModule

        // Create and insert data into the database
        // Convert the date input in datetime format
        $date = new DateTime($request->input('publication_date'));
        $datetime = $date->format('Y-m-d H:i:s');
        // Create a new instance of TrainingModule if $is is null
        if ($id === null) {
            // Create an instance of TrainingModule with the inputs'values
            $trainingModule = trainingModule::create([
                'title' => $request->input('title'),
                'slug' => $request->input('slug'),
                'description' => $request->input('description'),
                'module_order' => $request->input('module_order'),
                'training_course_id' => $request->input('training_course_id'),
            ]);
        }
        //If the id is not null, get the right TrainingModule to update
        else {
            $trainingModule = TrainingModule::findOrFail($id);
            // Update it
            $trainingModule->title = $request->input('title');
            $trainingModule->slug = $request->input('slug');
            $trainingModule->description = $request->input('description');
            $trainingModule->module_order = $request->input('module_order');
            $trainingModule->training_course_id = $request->input('training_course_id');
        }
        // Get the module slug 
        $moduleSlug = $request->input('slug');
        $trainingModuleToLinkId = TrainingModule::where('slug', $moduleSlug)->first()->id;
        // Store the TrainingModule into the database
        $trainingModule->save();
        // if items' forms was filled
        if ($request->input('items')) {
            $items = $request->input('items');
            foreach ($items as $item) {
                // Data validation for item 
                $request->validate([
                    'title' => 'required|string|max:255',
                    'slug' => 'required|string|max:255',
                    'description' => 'string',
                    'youtube_video_code' => 'string',
                    'item_order' => 'integer',
                ]);
                // Create an instance of ModuleItem with the inputs'values
                $ModuleItem = ModuleItem::create([
                    'title' => $item['title'],
                    'slug' => $item['slug'],
                    'description' => $item['description'],
                    'youtube_video_code' => $item['youtube_video_code'],
                    'item_order' => $item['item_order'],
                    'training_module_id' => $trainingModuleToLinkId,
                ]);
                // Store the ModuleItem into the database
                $ModuleItem->save();
            };
            // Get the course slug for redirection
            $courseSlug = TrainingCourse::find($trainingModule->training_course_id)->slug;
            // Redirection to the news list page
            return redirect(route('user.trainings', $courseSlug))->with('success', 'Le cours "' .  $request->input('title') . '" a été sauvé avec succès ! ');
        }
    }
```

Un autre exemple dont on peut s'inspirer qui est plus complexe, il récupère un tableau depuis le formulaire dans le Request.

```
public function resourceSave(Request $request, $id = null)
    {   
        $resources = $request->input('resources');
            foreach ($resources as $key => $resource) {
                // Validation des sous-champs dans chaque élément du tableau resources
                $validator = Validator::make($resource, [
                    'title' => 'required|string|max:255',
                    'slug' => 'required|string|max:255',
                    'description' => 'nullable|string',
                    'file_name' => 'nullable|string',
                    'ext_name' => 'nullable|string',
                    'resource_order' => 'nullable|integer',
                ]);
            
                // Si la validation échoue, retourne les erreurs
                if ($validator->fails()) {
                    return redirect()->back()->withErrors($validator)->withInput();
                }
            
                // Processus de téléchargement du fichier si tout est valide
                if ($request->hasFile('resources.' . $key . '.file_name')) {
                    $file = $request->file('resources.' . $key . '.file_name');
            
                    if ($file->isValid()) {
                        $originalFileName = $file->getClientOriginalName();
                        $fileExtension = $file->getClientOriginalExtension();
            
                        // Chemin du répertoire de destination
                        $uploadDirectory = public_path('img');
            
                        // Déplacer le fichier téléchargé vers le répertoire de destination
                        $file->move($uploadDirectory, $originalFileName);
            
                        // Créer une instance de ItemResource avec les valeurs des inputs
                        $itemResource = ItemResource::create([
                            'title' => $resource['title'],
                            'slug' => $resource['slug'],
                            'description' => $resource['description'],
                            'file_name' => $originalFileName,
                            'ext_name' => $fileExtension,
                            'resource_order' => $resource['resource_order'],
                            'module_item_id' => $request->input('training_module_id'),
                        ]);
            
                        // Enregistrer l'ItemResource dans la base de données
                        $itemResource->save();
                    }
                }
            }
               
        // Get the course slug for redirection
        $itemParentId = $request->input('training_module_id') ;
        $moduleParentId = TrainingModule::find(ModuleItem::find($itemParentId )->training_module_id);
        $courseParent = TrainingCourse::find($moduleParentId->training_course_id) ;
        $slug = $courseParent->slug ;
        //Redirection to the concerned trainingCourse page
        return redirect(route('user.trainings', $slug))->with('success', 'La ressource"' .  $request->input('title') . '" a été ajoutée avec succès ! ');
       
    }
```

Exemple d'un delete avec gestion des erreurs  :
```
    public function trainingDelete($id)
    {
        // Get the trainingCourse
        $trainingCourse = trainingCourse::find($id);
        //Check if there is a trainingCourse matching with $id
        if (!$trainingCourse) {
            return redirect(route('admin.trainings.show'))->with('error','Pas de formation à cet id');
        } 
        // Delete the trainingCourse
        try {
            $trainingCourse->delete();
            $message = "Formation effacée !";
            $status = "success" ;
        } catch (\Exception $e) {
        // Manage errors
            $message = "Erreur survenue" ;
            $status = "error" ;
        }
            return redirect(route('admin.trainings.show'))->with($status,$message);
    }
```