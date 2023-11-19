#!/bin/bash

# Initialize the Elastic Beanstalk environment 
eb init "AWS-Testumgebung" -p "Node.js 18" -r us-east-1

# Create and deploy a new application release
eb deploy "AWS-Testumgebung-env"