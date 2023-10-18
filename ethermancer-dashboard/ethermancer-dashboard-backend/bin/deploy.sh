#!/bin/bash

# Initialize the Elastic Beanstalk environment 
eb init "testumgebung" -p "Node.js 18" -r us-east-1

# Set environment variables
eb setenv POSTGRES_DB=$POSTGRES_DB POSTGRES_HOST=$POSTGRES_HOST POSTGRES_PASSWORD=$POSTGRES_PASSWORD POSTGRES_USER=$POSTGRES_USER

# Create and deploy a new application release
eb deploy "Testumgebung-env"