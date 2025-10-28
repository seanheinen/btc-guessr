## Showcase

https://github.com/user-attachments/assets/36841a65-bd6c-47d8-90b1-eb763c8a18d3

## Install

Install all dependencies for web and api.

```bash
pnpm install
```

## Development server

To start the local web and api servers, run:

```bash
pnpm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Future considerations and TODO's


### Infrastructure
1. Create Dockerfile for API
2. Host API in AWS ECS
3. Host webapp in Cloudfront and s3
4. Provision database in RDS
5. Install ORM in API

### Product
1. Persist user daat in database
2. Display leaderboard of all users and their scores
3. Add more gamified feedback on successful and unsuccessful guesses
4. Change UI to make it more obvious whether the user is on track for a win or loss i.e. more green and red colors

### General
1. Write tests
2. Seperate state from global to feature
3. Add CI/CD for automated builds and deployments
