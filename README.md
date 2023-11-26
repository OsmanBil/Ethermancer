# Ethermancer - Crypto Trading Bot
This project is a learning project only and is not intended for public use

Overview:
Ethermancer is a state-of-the-art crypto trading bot designed to provide users with a seamless trading experience. 
The project consists of three main parts:

- Corporate Website: Built using Angular, it showcases the project's features, benefits, and other relevant information.
- Bot Dashboard with Shop: An Angular-based dashboard where users can manage their bot settings, view trading analytics, and purchase additional features or services.
- Backend: Powered by Node.js, it handles the core logic, trading algorithms, and integrates with various crypto exchanges.


Website-Link: http://ethermancer-website.s3-website-us-east-1.amazonaws.com/

Dashboard-Frontend-Link: http://ethermancer-dashboard.s3-website-us-east-1.amazonaws.com/

Dashboard-Backend-Link: http://ethermancer-dashboard-env.eba-7mhmes8r.us-east-1.elasticbeanstalk.com/


Infrastructure

The entire ecosystem is hosted and managed on the following platforms:
- AWS RDS: Database services for persistent storage of user data, trading histories, and other relevant information.
- AWS S3: Storage for static assets, logs, and other files.
- AWS Elastic Beanstalk: Hosting and scaling the Angular front-end and Node.js backend.
- CircleCI: Continuous integration and deployment to ensure smooth updates and releases.
- GitHub: Code repository and version control.


### Dependencies

- Node 18.16.1 or more recent. While older versions can work it is advisable to keep node to latest LTS version

- npm 9.8.1 or more recent, Yarn can work but was not tested for this project

- AWS CLI v2

- A RDS database running Postgres.

- A S3 bucket for hosting frontend

- A Elastic Beanstalk Environment


### Installation

Provision the necessary AWS services needed for running the application:

1. In AWS, provision a publicly available RDS database running Postgres.
2. In AWS, provision a s3 bucket for hosting the uploaded files.
3. In AWS, provision a Elastic Beanstalk Environment for hosting the server.
4. From the root of the repo, navigate to the Ethermancer-Website folder `cd ethermancer-website` to intall the node_modules `npm install`. After installation is done start the api with `npm run build` and `npm run start`
5. From the root of the repo, navigate to the Ethermancer-backend folder `cd ethermancer-dashboard/ethermancer-dashboard-backend` to install the node_modules `npm install`. After installation is done start the server with `npm run start`.
6. From the root of the repo, navigate to the Ethermancer-frontend folder `cd ethermancer-dashboard/ethermancer-dashboard-frontend` to intall the node_modules `npm install`. After installation is done start the api with `npm run build` and `npm run start`


## Testing

Follow these steps to run the tests.

Ethermancer-Website: `cd ethermancer-website && npm run test`

Ethermancer-Dashboard-Frontend: `cd ethermancer-dashboard/ethermancer-dashboard-frontend && npm run test`

Ethermancer-Dashboard-Backend: `cd ethermancer-dashboard/ethermancer-dashboard-backend && npm run test`

## Built With

- [Angular](https://angular.io/) - Single Page Application Framework
- [Node](https://nodejs.org) - Javascript Runtime
- [Express](https://expressjs.com/) - Javascript API Framework

[(Back to top)](#Ethermancer - Crypto Trading Bot)