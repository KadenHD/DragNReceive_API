<p align="center">
    <img src="https://www.promeo-formation.fr/themes/custom/promeo/img/logos/logo_promeo_white.svg" alt="Logo" height="50px"><br>
    <h3 align="center">Projet Personnel Encadré DragNReceive - API </h3>
</p>  

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
      <ul>
        <li>
          <a href="#Softwares">Softwares</a>
        </li>
        <li>
          <a href="#Languages">Languages</a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#To-do">To-do</a>
    </li>
    <li>
      <a href="#Sources">Sources</a>
    </li>
</details> 
    
# Introduction
    
The DragN'Receive company wishes to create a click & collect system across the entire Compiègne conurbation, having as partners markets and businesses mainly focused on the sale of foodstuffs and consumer products. They are therefore considering the creation of a website allowing the management of partner shops, thus allowing them to offer their products and thus add new products and their stocks while managing customer orders.
    
# Installation

## Prerequisites

### Install Laragon

> You can install Laragon, following the [Installation Tutorial](https://laragon.org/) on the official website.

### Install Node and NPM

> You can also easily install them, downloading [Node LTS version](https://nodejs.org/en/) on the official website.

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

## Softwares

> Laragon,
> Node,
> NPM,
> PhpMyAdmin,
> Postman,
> Visual Studio Code

## Languages

> It's a "Full JavaScript" project, using JSON format and Sequelize, sending SQL requests to MySQL database.

# To-do

## Fonctionnel
- Créer un dossier dans le store seulement aux utilisateurs de role client ?
- une fois la boutique supprimée, supprimer tous les utilisateurs de la boutique ? ainsi que delete.true leurs produits? 
- Mot de passe oublié + Reset de mot de passe par email + token et le relier à un mailer (mail trap...)
- La création d'un utilisateur génère un mot de passe aléatoire qui s'envoie par mail à l'utilisateur concerné (l'admin ne rentre plus de mdp)
- Génération de fausses factures pdf quand statut de la commande passe en préparation (envoi par mail ou alors savoir comment faire télécharger uniquement pour le bon user)
    
## A la fin
- Faire des couleurs pour les console.log (visuel pour se repérer)
- Mettre un uuivid à la génération du secret token (inconnu)
- Faire le refresh du token en back-end (optionnel)

# Sources

- Video about store images and set path for accessing with front : [Link](https://youtu.be/srPXMt1Q0nY)
- Video about permissions to access differents datas inside controllers : [Link](https://youtu.be/jI4K7L-LI58)
- Video about creation of standard CRUD and routing with Express : [Link](https://youtu.be/l8WPWK9mS5M)
- Video manipulation and creation of tables with ORM Sequelize with MySQL : [Link](https://youtu.be/ExTZYpyAn6s)
- Tutorial about the utilisation of a CRUD with Sequelize models : [Link](https://www.bezkoder.com/node-js-express-sequelize-mysql/)
