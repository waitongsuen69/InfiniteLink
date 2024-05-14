#!/bin/bash

# Installing NVM (Node Version Manager)
install_nvm() {
    echo "Installing NVM..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
    echo "NVM installed."
}

# Install Node.js using NVM
install_node() {
    echo "Installing Node.js..."
    nvm install node  # This installs the latest version of Node.js
    nvm use node
}



# Load NVM or install it if it's not found
if [ -s "$HOME/.nvm/nvm.sh" ]; then
    echo "Loading NVM..."
    . "$HOME/.nvm/nvm.sh"
else
    install_nvm
fi

# Load Node or install it if it's not found
if command -v node > /dev/null 2>&1; then
    echo "Node.js is already installed. Version: $(node -v)"
else
    echo "Node.js is not installed. Installing Node.js..."
    install_node
fi

# Check if MongoDB is installed
if command -v mongod >/dev/null 2>&1; then
    echo "MongoDB is already installed."
else
    # Install MongoDB
    echo "MongoDB is not installed. Installing..."
    sudo apt-get update
    sudo apt-get install gnupg curl
    curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
    # echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | 
    # sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -sc)/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list

    sudo apt-get update
    sudo apt-get install -y mongodb-org
fi



mongod -v
node -v  # Display the version of Node.js installed
npm install
npm -v   # Display the version of npm installed

# Check if mongod service is active
if systemctl is-active --quiet mongod; then
    echo "MongoDB is already running."
else
    # Start mongod service
    sudo systemctl start mongod
    echo "MongoDB started."
fi

#if fail mongod permission
# sudo chown -R mongodb:mongodb /var/lib/mongodb
# sudo chmod 700 /var/lib/mongodb

# or in /etc/mongod.conf
# processManagement:
#    fork: true

# environment setup
# git config --global user.email "waitongsuen@outlook.com"
#   git config --global user.name "stargazer"