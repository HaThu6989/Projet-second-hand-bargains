# Second Hand Bargains
Une application pour faciliter l’échange entre les personnes qui souhaitent vendre ou acheter des anciens produits déjà utilisés.

## À propos
 
Ce référentiel implémente l'API backend REST (construite dans NodeJs/ExpressJs + MongoDB).
 
## Exigences
 
Pour le développement, vous aurez besoin de Node.js, npm et Mongodb installé dans votre environnement. 

### Node
 
Vous devez installer [nodejs et npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Si l'installation a réussi, vous devriez pouvoir exécuter la commande suivante.
 
    node --version
    npm --version
 
### Mongodb
 
Exécutez MongoDB avec [MongoDB Compass](https://www.mongodb.com/docs/compass/master/install/).\
   Dans ce dépôt, le port 27017 est utilisé pour se connecter à la base de données MongoDB. 
  
  mongodb://localhost:27017/second-hand-bargains
  
 
Le serveur est défini sur le port 5006 : [http://localhost:5006](http://localhost:5006).\
Si vous souhaitez un autre port, vous changerez la variable.


## Environments
- Mongodb link : `MONGODB_URL` (ex : mongodb://localhost:27017/second-hand-bargains)
- Server side : `PORT` (ex: 5006)
- Client side : `FRONT_END_URL` (ex: http://localhost:3000)
- JWT token secret : `TOKEN_SECRET` (ex: yoursecret)
 

## Instructions
 
Pour exécuter sur votre ordinateur, suivez ces étapes :
 
### Cloning pour le serveur
 
    git clone https://github.com/HaThu6989/Projet-second-hand-bargains 
    cd server/
 
### Configuration d'environment variables
 
Après avoir téléchargé le référentiel, certaines choses doivent être configurées si nécessaire avant de pouvoir exécuter l'application dans le fichier `.env` de votre environnement local.
 
### Installation des dépendances
 
    npm install
 
Cela téléchargera et installera toutes les dépendances nécessaires pour exécuter correctement l'application.
 
## Exécuter le serveur local
 
    npm start
 