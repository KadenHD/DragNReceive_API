<br />
<p align="center">
    <img src="https://www.promeo-formation.fr/themes/custom/promeo/img/logos/logo_promeo_white.svg" alt="Logo" height="50px"><br>
    <h3 align="center">Projet Personnel Encadré DragNReceive - API </h3>
        
<details open="open">
  <summary>Summary</summary>
  <ol>
    <li>
      <a href="#Introduction">Introduction</a>
    </li>
    <li>
      <a href="#Installation">Installation</a>
    </li>
    <ul>
        <li>
            <a href="#Prerequisites">Prerequisites</a>
            <ul>
              <li>
                <a href="#Install-Laragon">Install Laragon</a>
              </li>
              <li>
                <a href="#Install-Node-and-NPM">Install Node and NPM</a>
              </li>
          </ul>
        </li>
        <li>
            <a href="#Implementation-of-the-project">Implementation of the project</a>
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

## Prerequisites

### Install Laragon

### Install Node and NPM

## Implementation of the project

- create mysql database in phpmyadmin called :
```
dragnreceive
```
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

***The project was created using :***

***Softwares :***

> Laragon,
> Node,
> NPM,
> PhpMyAdmin,
> Postman,
> Visual Studio Code

***Languages :***

> It's a "Full JavaScript" project, using JSON format and Sequelize, sending SQL requests to MySQL database.

# To-do

- poursuivre le doc word pour vérifier les entrées et sorties des controllers
- refaire les routes d'images / fs à la création de shop et product en faisant des vraies url valide
    
- Commenter en balle tout le code en anglais uniquement

- Génération de fausses factures pdf quand statut de la commande passe en préparation (envoi par mail ou alors savoir comment faire télécharger uniquement pour le bon user)
- Reset de mot de passe par email + token et le relier à un mailer (mail trap...)
    
- Faire des couleurs pour les console.log (visuel pour se repérer)
- Mettre un uuivid à la génération du secret token (inconnu)
- Faire le refresh du token en back-end (optionnel)

# Sources

- Video about store images and set path for accessing with front : [Link](https://youtu.be/srPXMt1Q0nY)
- Video about permissions to access differents datas inside controllers : [Link](https://youtu.be/jI4K7L-LI58)
- Video about creation of standard CRUD and routing with Express : [Link](https://youtu.be/l8WPWK9mS5M)
- Video manipulation and creation of tables with ORM Sequelize with MySQL : [Link](https://youtu.be/ExTZYpyAn6s)
- Tutorial about the utilisation of a CRUD with Sequelize models : [Link](https://www.bezkoder.com/node-js-express-sequelize-mysql/)
