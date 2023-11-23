#!/bin/bash

# Initialize the Elastic Beanstalk environment 
eb init "ethermancer-dashboard" -p "Node.js 18" -r us-east-1

# Create and deploy a new application release
eb deploy "Ethermancer-dashboard-env"