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
- create .env file and start to add the BD config and Server parameters
- npm run buildDB to create the tables and somes fakes entities
- npm start
    
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

- Faire le système de reset de mot de pass par email + token mais aussi le relier à un mail trap
- Faire le refresh du token en back-end
- Faire un système de permissions en fonction du rôle de l'utilisateur en session
- Définir les caractères etc pour la création de chaques entités ex: addresse mail (@ . etc), mdp de x caractères + majuscule....
- changer les choses disponibles dans le crud en fonction du role (retourner tout ou seulement celui de l'user, être admin ou sadmin pour delete, update certaines valeurs que si admin ou sadmin etc...)

# Sources

- Video about creation of standard CRUD and routing with Express : [Link](https://youtu.be/l8WPWK9mS5M?list=PLzBCdvbn0AZWnKk55ezv82IwNm7lJcu_N)
- Video manipulation and creation of tables with ORM Sequelize with MySQL : [Link](https://youtu.be/ExTZYpyAn6s?list=PLzBCdvbn0AZWnKk55ezv82IwNm7lJcu_N)
- Tutorial about the utilisation of a CRUD with Sequelize models : [Link](https://www.bezkoder.com/node-js-express-sequelize-mysql/)
