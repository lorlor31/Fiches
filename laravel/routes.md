# ROUTES - Exemples

- Dans routes.php : 

```
// related to trainings
    Route::get('/admin/trainings/show', [AdminController::class, 'trainingShow'])->name('admin.trainings.show'); // show all courses
    Route::get('/admin/trainings/create', [AdminController::class, 'trainingCreate'])->name('admin.trainings.create'); // create a course
    Route::post('/admin/trainings/store', [AdminController::class, 'trainingSave'])->name('admin.trainings.store'); // store a course
    Route::post('/admin/trainings/storeFirstTime', [AdminController::class, 'trainingSaveWithModules'])->name('admin.trainings.storeFirstTime'); // store a course, first time
    Route::get('/admin/trainings/{id}/edit', [AdminController::class, 'trainingEdit'])->name('admin.trainings.edit'); // edit a course
    Route::post('/admin/trainings/{id}/update', [AdminController::class, 'trainingSave'])->name('admin.trainings.update'); // update a course
    Route::get('/admin/trainings/{id}/delete', [AdminController::class, 'trainingDelete'])->name('admin.trainings.delete'); // delete a course
    
```

- Exemples de redirection dans les méthodes des controllers :

Redirection :
```
        return redirect(route('user.trainings', $slug))->with('success', 'La ressource"' .  $request->input('title') . '" a été ajoutée avec succès ! ');

```
Affichage d'un template avec variable récupérée grâce à compact()
```
        return view('admin.trainings.modules.create', compact('trainingCourses') );

```
- Exemple de liens dans les templates (utilise le nom de la route et les paramètres dans un tableau):
```
href="{{ route('user.trainings', ['slug'=>$trainingCourse->slug]) }}"
```
