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
##Frontend Setup for Angular version 16.2.7.
This Angular application was developed in Visual Studio Code, Angular version 16.2.7

Clone the project and change into the project directory : URL to clone: https://github.com/jamesfrh/lunchApp_FE.git
1. cd to \lunch_app\app-frontend
2. run "npm install"
4. run "ng serve" to start the front end application
5. On the browser, go to http://localhost:4200 to start using the application

##Backend Setup for SpringBoot
This Springboot application was developed in Spring Tool Suite IDE(STS), you may use eclispe and the process to setup is similar

Cloning the project in the IDE : URL to clone: https://github.com/jamesfrh/lunchApp_BE.git
1. In STS, go to the "File" menu and select "Import."
2. In the "Import" dialog, choose "Git" > "Projects from Git" and click "Next."
3.Select "Clone URI" and click "Next."
4. Enter the repository URI in the "URI" field. It should look like https://github.com/your-username/your-repository.git. Replace your-username and your-repository with your GitHub username and repository name.
5. Click "Next" and follow the wizard to complete the cloning process.

Once the cloning process is complete, follow these steps to import the project into STS:
1. In STS, go to the "File" menu and select "Import."
2. Choose "Maven" > "Existing Maven Projects" and click "Next."
3. Browse to the location where you cloned your GitHub repository and select the project folder.
4. Click "Finish" to import the Maven project.

After importing the project, you can run the Spring Boot application:
1.Locate the main class with the main method (usually annotated with @SpringBootApplication).
2.Right-click on the main class and select "Run As" > "Spring Boot App."

