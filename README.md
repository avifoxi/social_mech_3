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
#### BACKEND
Very simple, quick and dirty. 
3 custom classes I've added to a conventional Rails structure. 

#### Aggregator
Custom class - not backed by Active Record. In fact - Aggregator does not write to the database directly ever. It just aggregates social media content. Hence its fancy name. 
Aggregator defines it's interface with the 3rd party API's in its modules. Aggregator::Facebook, Aggregator::Instagram, Aggregator::Twitter. Each module is defined in 2 places => config/initializers wraps the external api connections within each  Aggregator namespace, and then the fuller functionality is defined in app/models/aggregator

#### PublicFigure
This class is backed by ActiveRecord -- and leverages Postgres' awesome json field capability to avoid multiple tables for the time being. Quick and dirty....</br>
Here we save a public figure, ala 'Beyonce' and save all the query terms we would like to use for searching various social media. We have the option of saving query results to json fields. If this app grows, and we want to persist queries in a smarter way, we will need to revisit this class. 

#### User
This app is a taste to hopefully attract new clients -- so on the front end, after a user plays with the queries a few times, we ask for their contact info. This info is saved to the DB, hence we get a class. 

#### FRONTEND
Thank you bootstrap, lodash, and jquery. 
When the user navigates to a new public_figure page, or navigates to an embedded iframe on a 3rd party site (which serves the same content for the time being) -- \n
The page is managed by a
