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

- faire une route /user dans auth qui récup le token dans le header (s'il est là) et qui vient ensuite retourner le user    
    
- test unitaire de chaques fonctionnalitées de chaques entités (avec front)
- Commenter en balle tout le code en anglais uniquement

- Génération de fausses factures pdf quand statut de la commande passe en préparation (envoi par mail ou alors savoir comment faire télécharger uniquement pour le bon user)
- Reset de mot de passe par email + token et le relier à un mailer (mail trap...)
    
- Mettre un uuivid à la génération du secret token (inconnu)
- Faire le refresh du token en back-end (optionnel)

# Sources

- Video about store images and set path for accessing with front : [Link](https://youtu.be/srPXMt1Q0nY)
- Video about permissions to access differents datas inside controllers : [Link](https://youtu.be/jI4K7L-LI58)
- Video about creation of standard CRUD and routing with Express : [Link](https://youtu.be/l8WPWK9mS5M)
- Video manipulation and creation of tables with ORM Sequelize with MySQL : [Link](https://youtu.be/ExTZYpyAn6s)
- Tutorial about the utilisation of a CRUD with Sequelize models : [Link](https://www.bezkoder.com/node-js-express-sequelize-mysql/)
