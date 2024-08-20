# SECURISER SON SERVEUR

## CONFIGURER SSH CLE PUBLIQUE

Pour vous connecter à votre serveur via SSH en utilisant un utilisateur classique et une clé publique, vous devez suivre les étapes suivantes :

1. **Créer un utilisateur classique** :
    ```bash
    sudo adduser nom_utilisateur
    ```

2. **Se connecter en tant que cet utilisateur** :
    ```bash
    su - nom_utilisateur
    ```

3. **Créer un répertoire `.ssh` et configurer les permissions** :
    ```bash
    mkdir ~/.ssh
    chmod 700 ~/.ssh
    ```

4. **Créer un fichier `authorized_keys` dans le répertoire `.ssh`** :
    ```bash
    touch ~/.ssh/authorized_keys
    chmod 600 ~/.ssh/authorized_keys
    ```

5. **Générer une paire de clés sur votre machine locale (si ce n'est pas déjà fait)** :
    ```bash
    ssh-keygen -t rsa -b 4096 -C "votre_email@example.com"
    ```
    **Note** : Vous pouvez utiliser d'autres types de clés comme `ed25519` au lieu de `rsa`.

6. **Ajouter la clé publique générée au fichier `authorized_keys` sur le serveur** :
    Sur votre machine locale, vous pouvez copier la clé publique (habituellement située dans `~/.ssh/id_rsa.pub` ou `~/.ssh/id_ed25519.pub`) sur le serveur avec la commande suivante :
    ```bash
    ssh-copy-id nom_utilisateur@adresse_du_serveur
    ```
    **ou** manuellement :
    ```bash
    cat ~/.ssh/id_rsa.pub | ssh nom_utilisateur@adresse_du_serveur "cat >> ~/.ssh/authorized_keys"
    ```

7. **Configurer le serveur SSH pour accepter l'authentification par clé publique** :
    Éditez le fichier de configuration SSH :
    ```bash
    sudo nano /etc/ssh/sshd_config
    ```
    Assurez-vous que les lignes suivantes sont présentes et non commentées :
    ```plaintext
    PubkeyAuthentication yes
    AuthorizedKeysFile      .ssh/authorized_keys
    ```
    Désactivez éventuellement l'authentification par mot de passe pour plus de sécurité :
    ```plaintext
    PasswordAuthentication no
    ```

8. **Redémarrer le service SSH pour appliquer les modifications** :
    ```bash
    sudo systemctl restart sshd
    ```

Après avoir suivi ces étapes, vous devriez être en mesure de vous connecter à votre serveur en utilisant le nouvel utilisateur et la clé publique. Testez la connexion avec la commande suivante depuis votre machine locale :
```bash
ssh nom_utilisateur@adresse_du_serveur
```

Si tout est configuré correctement, vous devriez être connecté sans avoir besoin de taper un mot de passe.

Si problème de non-utilisation de la clé publique, c’est peut-être qu’il y a des droits mal configurés sur les dossiers contenant la clé publique donc faire 
`sudo chmod 755 /home/user`
puis
```
sudo chown -R user:user /home/user/.ssh
sudo chmod 700 /home/user/.ssh
sudo chmod 600 /home/user/.ssh/authorized_keys
sudo chmod 600 /home/user/.ssh/id_rsa
sudo chmod 644 /home/user/.ssh/id_rsa.pub
```
Pour empecher connexion en root : 
ds le fichier /etc/ssh/sshd_config
- `PermitRootLogin no` =>pas de connexion possible
- `PermitRootLogin prohibit-password` => que avec cle pub


## Changer le port ssh 

Pour changer le port de connexion SSH sur votre serveur, vous devez suivre ces étapes :

1. **Éditez le fichier de configuration SSH** :
    ```bash
    sudo nano /etc/ssh/sshd_config
    ```

2. **Modifiez ou ajoutez la ligne `Port`** :
    Recherchez la ligne contenant `#Port 22` et modifiez-la (ou ajoutez une nouvelle ligne si elle n'existe pas) pour spécifier le nouveau port que vous souhaitez utiliser. Par exemple, pour changer le port en 2222 :
    ```plaintext
    Port 2222
    ```

3. **Enregistrez et fermez le fichier** :
    - Pour enregistrer, appuyez sur `Ctrl+O`, puis `Enter`.
    - Pour quitter l'éditeur, appuyez sur `Ctrl+X`.

4. **Ouvrir le nouveau port dans le pare-feu** :
    Si vous utilisez `ufw` (Uncomplicated Firewall), ajoutez une règle pour le nouveau port et supprimez l'ancienne règle (si nécessaire) :
    ```bash
    sudo ufw allow 2222/tcp
    sudo ufw delete allow 22/tcp
    ```

    Pour `iptables`, utilisez les commandes suivantes :
    ```bash
    sudo iptables -A INPUT -p tcp --dport 2222 -j ACCEPT
    sudo iptables -D INPUT -p tcp --dport 22 -j ACCEPT
    ```

5. **Redémarrez le service SSH pour appliquer les modifications** :
    ```bash
    sudo systemctl restart sshd
    ```

6. **Se connecter avec le nouveau port** :
    Depuis votre machine locale, vous pouvez maintenant vous connecter en spécifiant le nouveau port avec l'option `-p`. Par exemple, si vous avez changé le port en 2222 :
    ```bash
    ssh -p 2222 nom_utilisateur@adresse_du_serveur
    ```

**Note de Sécurité** : Assurez-vous que vous n'êtes pas déconnecté avant de redémarrer le service SSH. Il est judicieux de maintenir votre session SSH ouverte et d'en ouvrir une nouvelle avec le nouveau port pour vérifier que tout fonctionne correctement avant de fermer l'ancienne.

## SYNTHESE MAIL SAV IONOS

Ce qu'il faut retenir pour sécuriser un VPS :

- Changer le port SSH par défaut.
- Privilégier la connexion par clé SSH et non par mot de passe
- Désactiver l'utilisateur root et créer un autre utilisateur admin.
- Ajouter des programmes tels que Fail2ban.

Veuillez noter que manipuler UFW pour les stratégies de pare-feu peut être délicat et une erreur de manipulation peu causer la perte d'accès au serveur et nous ne serons pas responsable de cela tout de même.

Dans votre cas je vous conseille personnellement de déjà seulement installer Fail2Ban, Garder votre règle de pare-feu sur l'espace client, changer le port par défaut du SSH et changer le mot de passe root de votre serveur.

Ceci suffira amplement déjà à sécuriser votre serveur contre plus de 95% des attaques classiques (Crackage de mot de passe, attaque de bot, etc...).

### CHANGER PORT SSH PAR DEFAUT 
https://www.ionos.com/help/server-cloud-infrastructure/getting-started/important-security-information-for-your-server/changing-the-default-ssh-port/

### DOC GENEREE VIA CHATGPT
https://chatgpt.com/share/05baf1f1-8291-4408-b50e-2b653d2c78de

### Mises à jour automatiques
sudo apt install unattended-upgrades
Vérifier dans 
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
```
Unattended-Upgrade::Allowed-Origins {
    "${distro_id}:${distro_codename}";
    "${distro_id}:${distro_codename}-security";
    "${distro_id}ESMApps:${distro_codename}-apps-security";
    "${distro_id}ESM:${distro_codename}-infra-security";
    "${distro_id}:${distro_codename}-updates";
};
```
et

`Unattended-Upgrade::Remove-Unused-Dependencies "true";`

Puis, pour màjour tous les jours, dans : sudo nano /etc/apt/apt.conf.d/20auto-upgrades
```
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
```