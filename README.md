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

- Réussir a enregistrer des images reçu et définir les bonnes routes pour les paths
- Faire des middlewares qui check les permissions
- Faire les permissions pour savoir si l'utilisateur peut crud ou non (role ou propre) (et la vérification se ferra dans le token ?)
- Définir les contraintes de caractères etc pour la création de chaques entités ex: addresse mail (@ . etc), mdp de x caractères + majuscule...

- Faire le système de reset de mot de pass par email + token mais aussi le relier à un mailer (mail trap)
- Faire le refresh du token en back-end (optionnel)

- Pour envoyer une image il faut res.sendFile(filepath);

# Sources

- Video about creation of standard CRUD and routing with Express : [Link](https://youtu.be/l8WPWK9mS5M?list=PLzBCdvbn0AZWnKk55ezv82IwNm7lJcu_N)
- Video manipulation and creation of tables with ORM Sequelize with MySQL : [Link](https://youtu.be/ExTZYpyAn6s?list=PLzBCdvbn0AZWnKk55ezv82IwNm7lJcu_N)
- Tutorial about the utilisation of a CRUD with Sequelize models : [Link](https://www.bezkoder.com/node-js-express-sequelize-mysql/)
