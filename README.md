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

- create database in phpmyadmin
- create at the root of the project the folder 'Store' and inside it create 'Logo'
- create at the root of the project a .env file and edit it like that:
```
###> DataBase parameters ###
DB_NAME=dragnreceive
DB_USER=root
DB_PASS=
DB_DIAL=mysql
DB_HOST=localhost
###< DataBase parameters ###

###> API Server parameters ###
PORT=3000
BASE_URL=http://localhost
SECRET_TOKEN=T0k3nD3G4m3r
###< API Server parameters ###
```
- To create the tables, fk and constraints :
```
npm run BuildDB
```
- To create the Faker entities :
```
npm run FakeDB :
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

- Rajouter une image dans le model des produits
- Rajouter un dossier pour les images de produits, et changer la route vers un dossier avec un shopName
- Dans le user controller et Auth réadapter les fonctions en rajoutant par exemple dans la création de user le shopId etc...
- Optimiser et modifier les functions du controller
- Faire le controller de tous les models
- Définir les caractères etc pour la création de chaques entités ex: addresse mail (@ . etc), mdp de x caractères + majuscule.... (contraintes)

- Faire le système de reset de mot de pass par email + token mais aussi le relier à un mail trap
- Faire un système de permissions en fonction du rôle de l'utilisateur en session pour faire ou non certain crud et en fonction de ce qu'il veut modifier genre un admin ne modifie pas un sadmin (donc dans son token ?)
- Faire le refresh du token en back-end (optionnel)

- Pour envoyer une image il faut res.sendFile(filepath);

# Sources

- Video about creation of standard CRUD and routing with Express : [Link](https://youtu.be/l8WPWK9mS5M?list=PLzBCdvbn0AZWnKk55ezv82IwNm7lJcu_N)
- Video manipulation and creation of tables with ORM Sequelize with MySQL : [Link](https://youtu.be/ExTZYpyAn6s?list=PLzBCdvbn0AZWnKk55ezv82IwNm7lJcu_N)
- Tutorial about the utilisation of a CRUD with Sequelize models : [Link](https://www.bezkoder.com/node-js-express-sequelize-mysql/)
