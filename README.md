<br />
<p align="center">
    <img src="https://www.promeo-formation.fr/themes/custom/promeo/img/logos/logo_promeo_white.svg" alt="Logo" height="50px"><br>
    <h3 align="center">Projet Personnel Encadré DragNReceive - API </h3>
        
<details open="open">
  <summary>Sommaire</summary>
  <ol>
    <li>
      <a href="#Introduction">Introduction</a>
    </li>
    <li>
      <a href="#Installation">Installation</a>
    </li>
    <ul>
        <li>
            <a href="#prérequis">Prérequis</a>
        </li>
        <li>
            <a href="#mise-en-place-du-projet">Mise en place du projet</a>
        </li>
    </ul>
    <li>
      <a href="#Technologies">Technologies</a>
    </li>
    <li>
      <a href="#To-do">To-do</a>
    </li>
    <li>
      <a href="#Sources">Sources</a>
    </li>
</details> 
    
# Introduction
    

    
# Installation

### Prérequis

### Mise en place du projet

- create mysql database in phpmyadmin
- To create at the root of the project a .env file and create Store folders :
```
npm run Instance
```
- To create the tables, fk and constraints :
```
npm run BuildDB
```
- To create the Faker entities :
```
npm run FakeDB
```
- To start the API :
```
npm start
```
    
# Technologies

***Le projet a été créé en utilisant :***

***Les logiciels :***

> Visual Studio Code,
> Node,
> NPM

***Les langues :***

> JavaScript,
> SQL,
> JSON

# To-do

- Product (retourner que ceux deleted false et enlever la suppression des fs)
- Order (utiliser la boucle for du controller, vérifier stock etc...)

- Revoir les paths des produits et images pour les convertir en url, changer dans les fs le dir pour l'enregistrer directement dans le path si besoin
- Supprimer les endroits et fonctions liées au fait d'ajouter des images dans les requêtes

- test unitaire de chaques fonctionnalitées de chaques entités

- Commenter en balle les comments surtout au niveau des validations, permissions etc... (pour toute les entities)
- Génération de fausses factures pdf une fois commandé
- Faire le système de reset de mot de passe par email + token mais aussi le relier à un mailer (mail trap)
- Faire le refresh du token en back-end (optionnel)

- maj du MCD

# Sources

- Video about permissions to access differents datas inside controllers : [Link](https://youtu.be/jI4K7L-LI58)
- Video about creation of standard CRUD and routing with Express : [Link](https://youtu.be/l8WPWK9mS5M)
- Video manipulation and creation of tables with ORM Sequelize with MySQL : [Link](https://youtu.be/ExTZYpyAn6s)
- Tutorial about the utilisation of a CRUD with Sequelize models : [Link](https://www.bezkoder.com/node-js-express-sequelize-mysql/)
