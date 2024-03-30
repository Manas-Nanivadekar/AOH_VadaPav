provider "aws" {
  region     = "ap-south-1"
  access_key = var.access_key
  secret_key = var.secret_key
}

variable "access_key" {
  description = "AWS access key"
}

variable "secret_key" {
  description = "AWS secret key"
}

variable "git_repo" {
  type = string
}

variable "project_name" {
  type = string
}

resource "aws_instance" "ubuntu_nginx" {
  ami             = "ami-03f4878755434977f"
  instance_type   = "t2.micro"
  security_groups = ["open-security-group"]

  user_data = <<-EOF
                #!/bin/bash
                START=$(date +%s)
                
                # Update and install Nginx
                sudo apt-get update -y
                sudo apt-get install -y nginx
                sudo systemctl start nginx
                sudo systemctl enable nginx
                
                END=$(date +%s)
                DURATION=$((END-START))
                LOG_FILE="/var/log/user-data-execution.log"
                echo "User-data script execution duration: $DURATION seconds" >> $LOG_FILE
                sudo apt install git -y

                sudo git clone ${var.git_repo}

                sudo cp -R /${var.project_name}/* /var/www/html

                sudo nginx -t

                sudo systemctl reload nginx
                
                # Install the CloudWatch Logs agent
                sudo apt-get install -y awscli
                
                # Replace 'your-log-group-name' with your desired log group name
                aws logs create-log-group --log-group-name /ec2/user-data-logs --region ap-south-1
                
                # Create a log stream and write the log
                LOG_STREAM_NAME=$(hostname)
                aws logs create-log-stream --log-group-name /ec2/user-data-logs --log-stream-name "$LOG_STREAM_NAME" --region ap-south-1
                aws logs put-log-events --log-group-name /ec2/user-data-logs --log-stream-name "$LOG_STREAM_NAME" --log-events timestamp=$(date +%s%3N),message="$(cat $LOG_FILE)" --region ap-south-1
                EOF

  tags = {
    Name = "UbuntuNginxInstance"
  }
}

output "instace_public_dns" {
  value = aws_instance.ubuntu_nginx.public_dns
}