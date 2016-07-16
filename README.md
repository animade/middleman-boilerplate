# Middleman Boilerplate

Repo for the Animade Middleman Boilerplate.

It uses Haml, Sass, and Bourbon

## Setup

The project runs on middleman, so you'll want to get that set up:

    sudo gem install middleman

Then run the bundler to ensure the necessary gems are installed:

    bundle install

Bower is used for package management:

    bower install
    
To get running, start the middleman server:
  
    middleman

The site is now running at `http://0.0.0.0:4567/`

## Building

Middleman builds to a static `build` folder in the root of the project. To create/update this simply run:

    middleman build

## Deploying

Builds the site as described above and then deploys it via rsync, ftp, sftp, or git. By default this will 
push to Github Pages if you have a gh-pages branch setup for your repository.

    middleman deploy