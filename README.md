# pb_home_assignment

## Run The Service Using `docker-compose`

1. Copy the `.env` file from the email to the base directory of the services (the `.env` file is the same for all services for simplicity).
2. Navigate to the directory that contains the `docker-compose.yml` file in your terminal.
3. Run `docker-compose build` to build the service.
4. Run `docker-compose up` to start the services. Add `-d` to the end of the command to run the services in detached mode.

## Run The Service Locally

1. Copy the `.env` file from the email to the base directory of the services.
2. Install all the dependencies by running `yarn install` for each service.
3. Start `MongoDB` databases by running `docker-compose up -d mongodb-user mongodb-transaction mongodb-group`.
4. Start the service by running `yarn start` for each service.

## System Design

- The system is divided into four microservices: `group-service`, `notification-service`, `transaction-service`, and `user-service`. Please refer to the diagram provided in the email.
- `user-service` handles creating, updating, and querying user data.
- `group-service` handles creating, updating, and querying group data.
- `notification-service` is responsible for notifying relevant parties about transactions.
- `transaction-service` manages the creation of new transactions and stores them and their status in the database. Overall, the system uses three `MongoDB` databases.

## Areas for Improvement

- There is some code repetition between the microservices. In future versions, we can create an `npm package` with shared components between the services.
- Moving some direct `HTTPS` calls to queue-based services such as `kafka`. For example, there is no need to run the `notification-service` using a direct `HTTPS` call. We can use a queue-based system, so if there are any errors in the process, it will not kill the entire process but will retry the message at a later time.
- Identify and secure endpoints that are intended for internal use only. Some endpoints should not be directly reachable by external processes for security reasons.
