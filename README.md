## README

The Social Mechanism 3 is the third(ish)  iteration of a social media aggregation tool conceived by Dave Fletcher at [The Mechanism](https://github.com/theMechanism). This iteration is developed by [Avi Fox-Rosen](https://github.com/avifoxi) building on the prototypes of previous devs at this agency. 

### WHATSITDO?

A user inputs search terms and/or public entities, the social_mech queries multiple social media outlets and wraps all results to present in styles that prioritize a client's brand identity above the respective social media outlets' brand id. For use in quick demos for clients, or embedding via iframe within 3rd party sites, or sites with contained backends that need not be extended with the social_mech's api.

### DEPENDENCIES

This is a Rails App, 4.2.3, running on Ruby 2.2.1. 
To get it running locally - clone, cd into the repo, and bundle install. 
Chase the bugs, til all dependencies are installed. 

You'll need a local instance of PostgreSql. If not installed, google and I recommend intallation via homebrew. 

Accessing social media via 3rd party gems -- [Koala](https://github.com/arsduo/koala) for facebook, [Instagram](https://github.com/Instagram/instagram-ruby-gem), and [Twitter](https://github.com/sferik/twitter).
Devs will need to get API keys from each of these social media providers, and save them to a '.env' file you will need to manually create in the root of the directory. It's .gitignore'd, per convention. For deployment, you'll need to ensure that global ENV variabls are initialized somewhere -- depending where you deploy, you can figure this out. We're up on Heroku currently. 

### DOCUMENTATION - AND HOW TO NAVIGATE FILE STRUCTURE FOR DEVS
#### Backend
Very simple, quick and dirty. 
3 custom classes I've added to a conventional Rails structure. 

####

