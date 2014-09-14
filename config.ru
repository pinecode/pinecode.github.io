require 'rubygems'

run Rack::Jekyll.new

set :public_folder, Proc.new { File.join(root, "_site") }

