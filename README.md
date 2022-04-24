# FoolsCompass Frontend
(Built with React + Ionic)
 - https://github.com/ionic-team/tutorial-photo-gallery-react
 - https://www.youtube.com/watch?v=lddJkkZebpU

Note: gui project depends on svc project for 'build' and 'develop'
Note: using yarn rather than npm

## Git Repo
https://github.com/darrendb/fools-compass-gui
## GitHub Wiki
https://github.com/darrendb/fools-compass-gui/wiki

## Getting Started
### Install
https://forum.ionicframework.com/t/livereload-problem-referenceerror-process-is-not-defined/184091/6

$ ionic cap add ios
$ ionic cap add android
$ yarn upgrade react-scripts --latest
$ yarn install
$ ionic build
$ ionic serve

### (First-time, or when changing to un-watched files)
$ yarn build 

### (Daily Dev, assumes build has been called at least once)
$ yarn develop

### (Production)
$ yarn start

## Heroku
### logs
heroku logs -n 200 -a fools-compass-gui
heroku logs --tail -a fools-compass-gui
heroku addons:open papertrail -a fools-compass-gui

## Default Dev access uri
http://localhost:8100/

## Deploying on Mobile
https://ionicframework.com/docs/react/your-first-app/deploying-mobile
1. ionic - general
   $ ionic cap copy
   $ ionic cap sync

2. ionic - ios
   $ ionic cap open ios
   https://stackoverflow.com/questions/61865231/invalid-code-signature-due-to-inadequate-entitlements
3.

### ios Trust the App/Developer
On launch of initial build from local Mac XCode, will get this error:
   "Untrusted Developer"
   "Your device management settings do not allow using apps from developer 
   "Apple Development: accounts@darrendb.com (SVT24H4M6D)" on this iPhone. 
   You can allow using these apps in Settings."

To resolve: on iPhone:
   Settings > General > Device Management > Developer App > Trust

