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

- gitignore le .env
- Faire un système de login pour avoir une session stocké sur le webserver permettant les requetes de certaines routes
- Faire un système de permissions en fonction du rôle de l'utilisateur en session
- changer les choses disponibles dans le crud en fonction du role (retourner tout ou seulement celui de l'user, être admin ou sadmin pour delete, update certaines valeurs que si admin ou sadmin etc...)

# Sources

- Vidéo sur la création de base du CRUD et routing avec Express : https://youtu.be/l8WPWK9mS5M?list=PLzBCdvbn0AZWnKk55ezv82IwNm7lJcu_N
- Vidéo sur la manipulation et création de tables avec l'ORM Sequelize en MySQL : https://youtu.be/ExTZYpyAn6s?list=PLzBCdvbn0AZWnKk55ezv82IwNm7lJcu_N
- https://www.bezkoder.com/node-js-express-sequelize-mysql/
