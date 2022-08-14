Pipeline process: Circle CI/CD connected to github repo: https://github.com/mhassan18015/udagram-Project3

Process: 
	Run Front-end install and Back-end install scripts to install dependencies.
		Front-End script: `cd udagram-frontend && npm install`
		Back-End script: `cd udagram-api && npm install`

	Run Front-end and Back-end build scripts to build app.
		Front-End script: `cd udagram-frontend && npm run build`
		Back-End script: `cd udagram-api && npm run build`

	Run Front-end and Back-end deployment scripts to deploy Back-end to AWS Elastic Beanstalk and Front-end to AWS S3 bucket.
		Front-End Script: `cd udagram-frontend && chmod +x ./bin/deploy.sh && ./bin/deploy.sh`
			Front-End deploy.sh contents: `aws s3 cp --recursive --acl public-read ./www s3://udagram-api-mh/`
		Back-End Script: `cd udagram-api && eb init --region us-east-1 --platform Node.js udagram-api && eb deploy udagram-dev`