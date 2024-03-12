# LunchDecisionApp

### Prerequisites
1. 3 User accounts have been created in the backend. Use these email address to login. You may create more accounts in UserConfiguration.java file in the Springboot app.
    1. james@tech.gov.sg
    2. bob@tech.gov.sg
    3. jane@tech.gov.sg
2. MySQL has been configured as the database in the Springboot application. In the Springboot application.properties, change the username and password to your own credentials if it is not the same.
   Create a schema called lunchapp in the database before starting the Springboot application.
3. Mailtrap is used to test the sending of emails by the Springboot application when a user session is initiated to notify all other users about the session code.
   Steps to login to Mailtrap:
   1. Login to https://mailtrap.io/ using the google account (email: lunchapp.springboot@gmail.com, password: lunchap2024)
   2. Once Logged in, navigate to Email Testing -> My Inbox. In My Inbox, you may view the emails that is being sent from the Springboot application.
   






### Installation
##Frontend Setup for Angular
Clone the project and change into the project directory
1. cd to \lunch_app\app-frontend
2. run <npm install>
4. run <ng serve> to start the front end application
5. On the browser, go to http://localhost:4200 to start using the application

##Backend Setup for SpringBoot



This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
