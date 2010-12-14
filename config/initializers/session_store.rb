# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_laame_session',
  :secret      => '9e179bb84bec80f3df1ffcf80e45067ae8c5c6b513a6d90784c0a8fc4f9fc6ae11bf9bdcd3020ebb78c2a802e775604bdbf141ef02687276098332ebdb90ec52'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
