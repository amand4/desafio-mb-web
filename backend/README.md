## Test MB Web - Registration users - API

## About the project:
This project is a back-end application that offers user registration functionalities. Receives the information and simulates registration according to the type of user. There are two types of users: **individual** or **legal entity**.


### Technologies
#### Client:

- [cors](https://www.npmjs.com/package/cors)
- [express](https://expressjs.com/)

## 🚀 Getting Started

### Prerequisites
- Node 16
- Git 2

### Install project

```bash
git git@github.com:amand4/desafio-mb-web.git
cd desafio-mb-web
cd backend
npm install
```

### Start project
To start the project, run the following command:

```bash
npm run start
```

## Access application

Visit **http://localhost:3000/registration** to access the form


## Endpoints

## [GET] /registration

Responsible for rendering a simple HTML page that will load the form components in the browser.

## [POST] /registration

Registration API responsible for receiving user-submitted data in JSON format and responding to the client with success. The goal is merely to simulate sending the form with filled data, receiving the response, and how the sending to the server will be done.
