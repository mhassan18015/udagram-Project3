Back-end API Environment:
	AWS Elastic Beanstalk Node.js 16 running on 64bit Amazon Linux 2/5.4.1
		URL - http://udagram-dev.eba-mznjt2zt.us-east-1.elasticbeanstalk.com/ 
		
		Environment includes Postgres database - endpoint: https://us-east-1.console.aws.amazon.com/rds/home?region=us-east-1#database:id=database-2;is-cluster=false
		
		App name: udagram-api
		S3 bucket for uploading udagram-api app - elasticbeanstalk-us-east-1

Front-End 
	AWS S3 bucket udacity-fullstackhosted
		Configured for static website hosting: http://udagram-api-mh.s3-website-us-east-1.amazonaws.com

Deployment Pipeline

	CircleCI connected to main branch of GitHub project - https://github.com/mhassan18015/udagram-Project3

