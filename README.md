![Alt text](/frontend/public/project-img.png "Project my-forms route screenshot")

## About this Project
This is a web application developed in React + vite and Django and its main function is to build form and manager all form created by the user. I intend to allow the user to print their forms or even share via link to other people

<br/>

**Attention: This project is no yet finished**
<br/>
This project is part of my personal protfolio. If you have tips on how I can improve the code or have a job proposal for me, I'll be happy if you can contact me 🙂.

<br/>

## Funcionalites
- SignIn
- SignUp
- List user form
- Search form by title
- Retrieve form
- Build new form
- Set Theme
- Coming more...

<br/>

## Build With
### Front-end
- React
- Vite
- Typescript
- React Router Dom
- Styled Components
- React Spring
- Graphql hooks
- Mui Material

### Back-end
- Django
- Graphene Django
- Django Graphql Jwt

<br/>

## Get Started
### Prerequisites

To run this project you'll need have:
* npm
* pip
* virtualenv

### Installing

Cloning the repository
```
$ git clone https://github.com/VictorH74/Form-Builder.git

$ cd ./frontend
$ cp .env.example .env
$ npm install

$ cd ..

$ cd ./backend
$ virtualenv env
$ ./env/Scripts/activate

$ pip install --no-cache-dir -r requirements.txt

```

### Configuring backend
```
$ python manage.py makemigrations
$ python manage.py migrate

$ python manage.py createsuperuser
```

### Running Back-end
```
$ cd ./backend
$ ./env/Scripts/activate
$ python manage.py runserver
```
### Running Front-end
```
$ cd ./frontend
$ npm run dev
```

<!-- python -c "import secrets; print(secrets.token_urlsafe())" -->
