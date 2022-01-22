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


