# MODELS - BDD- SEEDERS

## Création de models à partir d'une migration

- On peut créer la migration avec ou sans modèle, mais ça va plus vite avec le modèle &#x1F609; : 
` php artisan make:model Category -m` ou `-mcf` pour créer le controller et le factory dans la foulée.
- Une fois les deux fichiers de migration et du Model créés, on peut revenir dessus, avant de lancer la migration. On va notamment :
1. dans la migration, rajouter les champs des colonnes, les types et contraintes de ces dernières, les clés étrangères
2. dans le modèle, sếcifier les champs qui sont fillable, c'est à dire qu'on peut saisir (pas le created_at par exemple mais attention, j'ai eu le tour avec la FK, il fallait bien la préciser)
- Exemple de migration : 

```
public function up()
    {
        Schema::create('item_resources', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->integer('module_order');
            $table->unsignedBigInteger('candidacy_id');
            $table->string('role')->nullable();
            $table->unique(['team_id', 'user_id']);
            $table->string('uuid')->unique();
            $table->longText('exception');
            $table->foreignId('module_item_id')->references('id')->on('module_items')->onDelete('cascade');       
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item_resources');
    }
```
- Exemple de model : 
```
class TrainingModule extends Model
{
    protected $fillable = [
        'title','slug','description','module_order','training_course_id',
    ];

    public function trainingCourse()
    {
        return $this->belongsTo(TrainingCourse::class);
    }


    public function moduleItems()
    {
        return $this->hasMany(ModuleItem::class)->orderBy('item_order', 'asc');
    }

    use HasFactory;
}
```
- NB :  je ne sais pas ce que c'est que les Factory mais ça a l'air d'être un concept phare de Laravel mais j'ai pas eu à creuser ?

## Mise en place des relations 

Pour mettre en place les relations, on va rajouter des méthodes dans les Models :

### Cas d'une many-to-many (le plus simple )

Mon exemple concerne un cours qui peut appartenir à plusieurs catégorie et une catégorie qui peut concerner plusieurs cours.
1. Créer la table 1 via la migration et éditer cette dernière
2. Idem pour la table 2
3. Créer la table pivot “table1_table2” et éditer la migration en ajoutant les clés étrangères.
Exemple  :
```
 public function up()
    {
        Schema::create('training_category_training_course', function (Blueprint $table) {
            $table->id();
            $table->foreignId('training_category_id')->constrained()->onDelete('cascade');
            $table->foreignId('training_course_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('training_category_training_course');
    }
```
4. Dans les Models, on pourra récupérer les relations ainsi : 
`public function table1() { return $this->belongsToMany(table1::class, table1_table2'); }`.
Exemple : 
```
 public function trainingCategories(){
        return $this->belongsToMany(TrainingCategory::class, 'training_category_training_course');
    }
```

### Cas d'une ManyToOne / OneToMany
Ici on va prendre l'exemple d'un cours (TrainingCourse) qui a plusieurs modules (TrainingModules) mais ce module ne peut appartenir qu'à un seul cours.
1.Créer la migration et le modele pour les deux entités.
2. Dans les models, bien distinguer celui qui a la FK ou pas. Dans notre exemple,c 'est le module qui porte la FK.
3. Celui qui a la FK est celui qui aura le  (dans notre exemple, c'est le module)
4. L’autre le HasMany.
5. On aura donc ces méthodes dans les models :

Dans le model du module : 
```
public function trainingCourse()
    {
        return $this->belongsTo(TrainingCourse::class);
    }
```

Dans le model du cours : 
```
public function trainingModules()
    {
        return $this->hasMany(TrainingModule::class)->orderBy('module_order', 'asc');
    }
```

En fait c'est pas compliqué dit comme ça !

### RECUPERER UNE MANY TO MANY AVEC LARAVEL ET ENREGISTRER CHANGEMENTS

Dans le controleur, il faut synchroniser :
```
public function update(Request $request, Module $module) { // Utilise sync pour mettre à jour les relations dans la table pivot         $trainingCourse->trainingCategories()->sync($request->input('categories', []));
return redirect()->route('modules.index')->with('success', 'Module mis à jour avec succès.'); }
```



## Créer des seeders 
1. Créer le seeder
` php artisan make:seeder MonSeeder `
2. Modifier le Seeder en rajoutant les champs et les valeurs qu'on veut. On va créer un tableau contenant des tableaux associatifs avec les données sur lesquels on va itérer avec un foreach pour remplir la table.
Exemple condensé : 
```
$users = [
            [
                'name' => 'Jean',
                'nickname' => 'JJ',
                'team_id' => 1,
            ],
            [
                'name' => 'Bob',
                'nickname' => 'BB',
                'team_id' => 1,
            ],
            etc...
            ]
            Puis on remplit la table :
            foreach ($users as $user){
                DB::table('users')->insert([[
                    'name'=> $user['name'],
                    'nickname'=> $user['nickname'],
                    'team_id'=> $user['team_id'], 
                ]]);
            }

```

3. On rajoute le Seeder dans DatabaseSeeder.php
`$this->call([UsersTableSeeder::class]);`
4. Le lancer ou relancer tous les seeders
`php artisan db:seed --class=MaTablesSeeder`
ou
`php artisan migrate:refresh --seed`
5.Au cas où on veut réinitialiser les id des enregistrements, on doit utiliser truncate() de SQL. 
Exemple à mettre en début du seeder :

```
    public function run()
    {
        // Desactivate foreign key checking
        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');

        // Empty the table
        DB::table('module_items')->truncate();

        // Reactivate foreign key checking
        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');
    ...
```

## Commandes en rapport avec la BDD et plus (to be completed)

| Action | Commande |
|--|--|
|apply migrations|php artisan migrate|
|drop BD|php artisan migrate:reset|
|drop et recréer|php artisan migrate:fresh|
|lancer un seeder |php artisan db:seed --class=MaTablesSeeder|
|relancer tous les seeders|php artisan migrate:refresh --seed|
|version|php artisan --version|