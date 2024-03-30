provider "aws" {
  region     = "ap-south-1"
  access_key = var.access_key
  secret_key = var.secret_key
}

variable "github_link" {
  description = "users github link"
}

variable "project-name" {
  description = "name of the project"
}

variable "access_key" {
  description = "AWS access key"
}

variable "secret_key" {
  description = "AWS secret key"
}

# create a key pair

resource "tls_private_key" "mern-key" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

resource "local_file" "mern-public_key" {
  content  = tls_private_key.mern-key.public_key_openssh
  filename = "${path.module}/generated_key.pub"
}

resource "local_file" "mern-private_key" {
  content  = tls_private_key.mern-key.private_key_pem
  filename = "${path.module}/generated_key"

}

resource "aws_key_pair" "mern-key" {
  key_name   = "mern-key"
  public_key = tls_private_key.mern-key.public_key_openssh
}

# create a security group called open-sg
resource "aws_security_group" "open-sg" {
  name        = "open-sg"
  description = "Allow all traffic"

  # Inbound rules
  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Outbound rules
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "open-sg"
  }
}

# provision an ec2 instance with mern stack installed
resource "aws_instance" "mern" {
  ami             = "ami-0a1b648e2cd533174"
  instance_type   = "t2.micro"
  key_name        = aws_key_pair.mern-key.key_name
  security_groups = [aws_security_group.open-sg.name]


  connection {
  type        = "ssh"
  user        = "ubuntu"
  private_key = tls_private_key.mern-key.private_key_pem
  host        = self.public_ip 
}

  provisioner "remote-exec" {
    inline = [
      "sudo apt update",
      "sudo apt upgrade -y",
      "sudo apt install git -y",
      "sudo apt-get install -y curl",
      "sudo apt-get install -y nginx",
      "sudo systemctl start nginx",
      "sudo systemctl enable nginx",
      "curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -",
      "sudo apt-get install -y nodejs",
      "sudo npm install pm2 -g",
      "sudo apt-get install -y gnupg wget",
      "wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -",
      "echo 'deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse' | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list",
      "sudo apt-get update",
      "sudo apt-get install -y mongodb-org",
      "sudo systemctl start mongod",
      "sudo systemctl enable mongod",
      "git clone ${var.github_link}",
      "cd ${var.project-name}",
      "cd frontend",
      "npm install",
      "npm install",
      "cd ..",
      "cd backend",
      "npm install",
      "cd ..",
      "cd backend",
      "> .env",
      "echo 'MONGODB_URI'='mongodb://localhost:27017' > .env",
      "echo 'PORT'='5000' >> .env",
      # Run the backend server
      "pm2 start server.js",
      # Run the frontend server on nginx
      "cd ../frontend",
      "npm run build",
      "sudo cp -r build/* /var/www/html",
      "sudo systemctl restart nginx"
    ]
  }

  tags = {
    Name = "mern"
  }
}

output "instace_public_dns" {
  value = aws_instance.mern.public_dns
}