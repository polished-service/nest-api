# NestJS REST API

## Completed steps
1. init project
2. cleanup project from test files and useless controllers and services
3. added nestjs/config
4. added prisma and its module with service
5. added prettier config mjs with edited config
6. added all .ignore files
7. added prisma schema for User
8. created dev dockerfile
9. created dev docker-compose
10. created users module
11. created users service
12. created methods in users service for creating user, getting user and checking password
13. created dtos with validation through class-validator, class-transformer and @nestjs/mapped-types
14. enabled global validation pipe
15. added cors handler and app config to config module
16. added routes and controllers for auth
17. added register and login routes
18. added cookie-parser library for working with cookies
19. created jwt access and refresh token strategies
20. created methods for creating tokens and sending them in cookies
21. implemented methods for registration and login
22. created guards for checking access and refresh tokens
23. created route for updating tokens through refresh token
24. created route for logout with access token check through guard

## Next steps
1. add blacklist service with redis
2. add token to blacklist in logout route
3. add blacklist check in refresh token route
4. add csrf token to cookies
5. add csrf token check for access and refresh guards
6. add user roles handling
7. add user active sessions control in user service/controller
8. add unique nickname in schema (route for register)
9. add ban system
10. add images upload, storage and making blurhash for them
11. add Content Security Policy
