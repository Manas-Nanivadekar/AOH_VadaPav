provider "aws" {
  region     = "ap-south-1"
  access_key = var.access_key
  secret_key = var.secret_key
}

variable "github_link" {
  description = "User's GitHub link for project source"
}

variable "project_name" {
  description = "Name of the project"
}

variable "access_key" {
  description = "AWS access key"
}

variable "secret_key" {
  description = "AWS secret key"
}

# Create a key pair
resource "tls_private_key" "lamp_key" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

resource "local_file" "lamp_public_key" {
  content  = tls_private_key.lamp_key.public_key_openssh
  filename = "${path.module}/generated_key.pub"
}

resource "local_file" "lamp_private_key" {
  content  = tls_private_key.lamp_key.private_key_pem
  filename = "${path.module}/generated_key"
}

resource "aws_key_pair" "lamp_key" {
  key_name   = "lamp_key"
  public_key = tls_private_key.lamp_key.public_key_openssh
}

# Create a security group called open-sg
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

# Provision an EC2 instance with LAMP stack installed
resource "aws_instance" "lamp" {
  ami             = "ami-0a1b648e2cd533174"
  instance_type   = "t2.micro"
  key_name        = aws_key_pair.lamp_key.key_name
  security_groups = [aws_security_group.open-sg.name]

  connection {
    type        = "ssh"
    user        = "ubuntu"
    private_key = tls_private_key.lamp_key.private_key_pem
    host        = self.public_ip 
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt update",
      "sudo apt update",
      "sudo apt upgrade -y",
      "sudo apt install apache2 -y",
      "sudo systemctl start apache2",
      "sudo systemctl enable apache2",
      "sudo apt install mysql-server -y",
      "sudo mysql_secure_installation -y",
      "sudo apt install --no-install-recommends php8.1",
      "sudo systemctl restart apache2",
    ]
  }

  tags = {
    Name = "lamp"
  }
}

output "instance_public_dns" {
  value = aws_instance.lamp.public_dns
}
