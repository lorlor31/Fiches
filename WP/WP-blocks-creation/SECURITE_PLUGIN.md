# QUELQUES REGLES DE SECURITE LORS DE LA CREATION D'UN PLUGIN

## Permissions des utilisateurs 

1. **Fichiers** : Lecture et écriture uniquement au propriétaire et lecture seule pour les autres utilisateurs :

``` shell
 chmod 644 /chemin/vers/mon-plugin/*.php 
```

2. **Dossiers** : Lecture, écriture et exécution au propriétaire et en lecture/exécution pour les autres utilisateurs
``` shell
chmod 755 /chemin/vers/mon-plugin/
```

Pour aller plus vite, ça équivaut à :

```shell
find /chemin/vers/mon-plugin -type d -exec chmod 755 {} \;
find /chemin/vers/mon-plugin -type f -exec chmod 644 {} \;

```

3. Cas du plugin de bloc : 

- Le dossier /build doit ê accessible en lecture,
- Le dossier /src n'a pas besoin d'ê accessible publiquement.
- Le dossier /node_modules idem.

En résumé : 

```shell
Pour les dossiers
find /chemin/vers/mon-plugin -type d -exec chmod 755 {} \;
Pour les fichiers
find /chemin/vers/mon-plugin/build -type f -exec chmod 644 {} \;
find /chemin/vers/mon-plugin/src -type f -exec chmod 640 {} \;
find /chemin/vers/mon-plugin/node_modules -type f -exec chmod 640 {} \;

```

4. Rajouter un .htaccess

A rajouter ds les dossiers src et node_modules
```
<IfModule mod_rewrite.c>
    RewriteEngine Off
</IfModule>

```
En plus on peut supprimer ces dossiers quand le site est en prod pour limiter encore plus les risques.
