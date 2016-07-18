source 'http://rubygems.org'

# We need to use the 3.2.0 branch as middleman depends on
# SASS 3.2, whereas bourbon master needs SASS 3.3
# Also relative paths mean we can't install via bundler
gem 'bourbon', :git => 'https://github.com/animade/bourbon.git', :branch => 'bourbon-3.2.0'

gem 'haml'

gem "middleman", "~> 4"

gem "middleman-livereload", "~> 3.4.3"

# Get latest middleman-deploy build, version 1 doesn't support Middleman 4
gem 'middleman-deploy', github: 'middleman-contrib/middleman-deploy', branch: 'master'