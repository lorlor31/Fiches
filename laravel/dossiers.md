# STRUCTURE DES DOSSIERS 

- Les Models sont dans **app/Models** .
- Les Views sont dans **resources/views/** et on rajoute nos sous dossiers par controller/models si on veut.
- Les Controllers sont dans **app/Http/Controllers** .
- Les Seeders (fixtures) sont dans **database/seeders**.
- Les migrations sont dans **database/migrations**.
- Les routes sont dans routes, pour un projet FS ./web.php
- Dans le projet, on avait les dossiers public/img qui contenait les images du projet et public/storage qui contenait les documents uploadés.

## Conventions de nommage
- Les tables sont au pluriel, en snake_case. Les champs sont en snake_case aussi.
- Les seeders sont avec des majuscules et le moTable par exemple  `TrucTableSeeder.php`.