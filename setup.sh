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

echo "Node.js installation completed."
node -v  # Display the version of Node.js installed
npm -v   # Display the version of npm installed



