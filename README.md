# Application de gestion de stock

## Pré-requis

* Docker desktop dans un environnement window ou docker cli dans un environnement Unix( Ubuntu,MacOs,etc..)
* Kit de développement dotnet (dotnet-sdk-8.*)
* Runtime dotnet (dotnet-runtime-8.*)
* Creation d'un volume docker nommé `data` pour faire persister les données même après la suppression du containeur de la base de donnée

        docker volume create data

* Creation du containeur de base de donnée

        docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Rems#2001" -p 1433:1433 --name database -v data:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2022-latest

## Technologies

* Asp .Net Core pour le backend
* SGBD image docker de sql-server
* Angular pour le front-end à venir  
