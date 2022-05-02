# Task Manager

- user

  - POST /user/signup
  - POST /user/signin
  - GET /user/profile
  - PUT /user/profile
  - DELETE /user/close

- task (per user)

  - POST /task/
  - GET /task/?search=task1&status=OPEN
  - PATCH /task/:id/:status
  - DELETE /task/:id

# NestJS

- AppModule
  - UserModule
    - UserController
    - UserService
  - TaskModule
    - TaskController
    - TaskService

# database changes

- remove the local array
- typeORM

# user related APIs

- JWT, Passport
