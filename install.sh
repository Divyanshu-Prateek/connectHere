#!/bin/bash

# Go into the backend directory
cwd=$(pwd)
cd $cwd/backend

# INSTALL nodejs and npm on ubuntu machine

curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -

sudo apt-get install -y nodejs


# Any configuration related commands
