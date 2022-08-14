
	AWS infrastructure requirements:
		AWS IAM user configured with permissions for deploying front and back-end applications
		An AWS S3 bucket configured for Static Website Hosting to host the front-end webpage
		AWS Elastic Beanstalk Environment running Node.js 16
		AWS RDS instance running a Postgres database

	Build & Deployment environment requirements:
		AWS CLI to deploy front-end
		AWS Elastic Beanstalk CLI to deploy the Back-end
		NodeJS ^ 12
		NPM 

	For CI/CD Pipeline
		CircleCI project  connected to a GitHub repo
		node, aws-cli, and aws-elastic-beanstalk orbs