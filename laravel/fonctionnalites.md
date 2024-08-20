# FONCTIONNALITES PARTICULIERES 

## GESTION DE L'INPUT DATE

1.Dans le template qui affiche, rajouter ce snippet qui récupère le datetime de la BDD et le reformate pour l'afficher.
A modifier selon ses besoins !

```php{4}
<!--This code snippet is setting the locale to French (France) and
UTF-8 encoding. Then, it is creating a new DateTime object using the `->news_date` value,
formatting the date in the format of the full month name followed by the year (e.g., "January
2022"), and finally converting the formatted date to uppercase. -->
@php
setlocale(LC_TIME, 'fr_FR.UTF-8');
$date = new DateTime($membersNew->news_date);
$formattedDate = strftime('%B %Y', $date->getTimestamp());
$formattedDate = ucfirst($formattedDate); 
@endphp   

```
2. Dans le template du formulaire, mettre un input type="date"
3. Dans le controller, convertir l'input en datetime pour la BDD. 

```php{4}
// Create and insert data into the database
// Convert the date input in datetime format
$date=new DateTime($request->input('publication_date')) ;
$datetime = $date->format('Y-m-d H:i:s');
```

## AFFICHER LA MINIATURE D'UNE IMAGE QUAND ON LA LOADE DANS UN FORMULAIRE 

1.Dans le formulaire, on va rajouter un élément`figure` qu'on va récupérer en JS. 
On met l'event onchange sur l'input pour déclencher la fonction previewMiniature().
Exemple :

```html{4}
<div class="form-group">
    <label for="image_name">Image :</label>
    <figure>
        <img id="miniature" src="" alt="Image actuelle" style="max-width: 200px;" />
        <figcaption> Pour un edit, on mettra ici l'image récupérée </figcaption>
    </figure>
    <input id="image_name" type="file" class="form-control" name="image_name" onchange="previewMiniature(event)">
</div>
```

2. Dans un script JS en bas du template blade, on déclare la fonction :

```js{4}

 function previewMiniature(event) {
        // Get the selected image 
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Sets the preview image source to the base64 of the selected image.
                document.getElementById('miniature').src = e.target.result;
            };
            // Reads the file and triggers the onload event.
            reader.readAsDataURL(file);
        }
    }

```



## RECUPERER UNE VARIABLE DE PHP POUR LA MANIPULER EN JS

J'en ai eu besoin par exemple pour exécuter une fonction qui récupère l'id d'un enregistrement,puis le serveur recherche l'enregistrement correspondant dans la table et regénère le partiel PHP qu'on va réinjecter dans le HTML dans un container.

Il va falloir passer par AJAX.

1. Sur l'élement concerné, on va lancer la fonction saveSelectedItemId() qui récupère la valeur désirée qu'on va stocker dans une variable en JS :

```html{4}
<div>
    <input type="radio" id="{!!$item->title!!}" name="{!!$module->slug!!}" value="{!!$item->id!!} checked " onclick="saveSelectedItemId() " />
    <label for="{!!$item->title!!}">{!!$item->title!!}
    </label>
</div>
```

2. Cette fonction va envoyer la variable via une route créée pour cet effet `/myspace/training/save-selected-item`. On aura créé au préalable les routes nécessaires, une pour que le JS envoie l'info au serveur, l'autre pour que le serveur renvoie le TPL généré. 
Exemple :
```php{4}
 // related to items 
    // routes needed to display the right ItemResource in the ItemResource partial
    Route::post('/myspace/training/save-selected-item', [ItemController::class, 'saveSelectedItem'])->name('save-selected-item');
    Route::post('/myspace/training/show-selected-item', [ItemController::class, 'showSelectedItem'])->name('show-selected-item');
```  
NB: je comprends pas car finalement j'ai pas eu besoin de ma deuxième route ?

Exemple de script d'envoi/réception des données : 
```js{4}

<script>
    function saveSelectedItemId() {
        // Sélectionner l'option cochée
        const selectedOption = document.querySelector('input[type="radio"]:checked');

        if (!selectedOption) {
            console.error('No item selected');
            return;
        }

        const currentItemId = selectedOption.value;

        // Envoyer l'ID au serveur pour l'enregistrer
        fetch('/myspace/training/save-selected-item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': '{{ csrf_token() }}'
                },
                body: JSON.stringify({
                    currentItemId: currentItemId
                })
            })
            .then(response => {
                console.log('Save response:', response);
                return response.json();
            })
            .then(data => {
                //alert('Save response JSON:', data);
// Partie où on récupère le HTML contenu dans le JSON pour le réinjecter dans la balise "conteneur"
                if (data.success) {
                    console.log('ID saved successfully:', data.currentItemId);
                    console.log('Les ressourcs sont:', data.resources);
                    console.log('Les  html:', data.html);
                    if (data.html) {
                        // Injecter le HTML dans le conteneur
                        document.getElementById('resources-container').innerHTML = data.html;
                    } else {
                        console.error('HTML not found in response');
                    }
                    
                } else {
                    throw new Error('Failed to save ID');
            .then(data => {
                console.log('Show response JSON:', data);

                if (data.html) {
                    // Injecter le HTML dans le conteneur
                    document.getElementById('resources-container').innerHTML = data.html;
                } else {
                    console.error('HTML not found in response');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
</script>
```

3. On crée un controller si nécessaire `php artisan make:controller ItemController` et on traite l'info, ici, on récupère la valeur de la variable et on génère le TPL qui sera renvoyé dans la réponse au format JSON, avec notamment le statut de la réponse.


```php{4}
class ItemController extends Controller
{
    public function saveSelectedItem(Request $request)
    {
        // Get the variable 'currentItemId' sent through the fetch
        $currentItemId = $request->input('currentItemId');
        $resources = ItemResource::where('module_item_id', $currentItemId) ->get();
        $html = view('training.partials.itemResource', compact('resources'))->render();
        // Return a JSON 
        return response()->json([
            'success' => true,
            'currentItemId' => $currentItemId,
            'resources' => $resources,
            'html' => $html,
        ]);
    }

}
```

4. Si la récupération de l'id a réussi, on poursuit avec la réinjection de l'HTML dans la fonction JS.



## SOUMETTRE UN FORMULAIRE DANS UN FORMULAIRE

1. On va créer un formulaire `<form> `principal qui sera soumis et à l’intérieur les sous parties.
On sauve les enregistrements indépendamment les uns des autres mais dans la même fonction du controller.
Dans le cas par exemple des modules, qui peuvent être créés en même temps que le cours, on va créer des champs dynamiques pour le for, name et id qu’on récupérera dans un grand tableau.
On va prendre l'exemple d'un cours créé avec un module.
Exemple d'un input qui sera dynamisé avec JS
```html{4}
<div class="form-group">
    <label for={{'moduleTitle_'.$moduleOrder}}> Titre du module <span class="text-danger">*</span> :</label>
    <input type="text" class="form-control" name="modules[0][title]" id="{{'moduleTitle'.$moduleOrder}}" value="" required>
</div>
```
2. Si on rajoute un deuxième module, on va incrémenter le [0] via JS: 
3. Lors de la création des instances des objets pour les enregistrements en BDD, on va itérer sur le tableau récupéré pour valider les données, instancier l’objet et sauver l’enregistrement.

```php{4}

 $modules = $request->input('modules');
foreach ($modules as $moduleData) {
    // Form validation for trainingModule 
    $request->validate([
        'title' => 'required|string|max:255',
        'slug' => 'required|string|max:255',
        'description' => 'null|string',
        // 'module_order' => 'required|integer',
    ]);
    $trainingModule = TrainingModule::create([
        'title' => $moduleData['title'],
        'slug' => $moduleData['slug'],
        'description' => $moduleData['description'],
        'module_order' => $moduleData['moduleOrder'],
        'training_course_id' => $trainingCourseToLinkId,
    ]);
    $trainingModule->save();
    }

```

## UPLOADER DES FICHIERS VIA UN FORMULAIRE 

1. Mettre `enctype="multipart/form-data"`dans la balise `<form >`
2. mettre type=”file”
3. Récupérer les data ds le controller

```php{4}

if ($request->hasFile('idDeinputDemonfichier’)) {
    $file = $request->file('idDeinputDemonfichier’);

    if ($file->isValid()) {
        // Obtenir le nom original du fichier
        $originalFileName = $file->getClientOriginalName();

        // Récupérer l'extension du fichier
        $fileExtension = $file->getClientOriginalExtension();

        // Définir le dossier de stockage (ici public/img)
        $uploadDirectory = public_path('img');
        // Move the downloaded file to the directory
        $file->move($uploadDirectory, $originalFileName);
    }
}
```


## TRUCS QUE J'AI PAS COMPRIS / CREUSE
- C'est quoi le factory ?
- Comment utiliser le query Builder ?
- Utiliser old() pour afficher les valeurs saisies dans un formulaire malgré un rechargement ?
- Les flash messages : success error sont des propriétés de l'objet Message ?
 	
