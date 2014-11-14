mops.io
=======
WIP Docker Registry and Mesosphere/Marathon API Server which works also with mopsicli. 

mopsi.io provides a GUI for a private docker registry with the capabilites to deploy a docker image tag to mesosphere/marathon.


Quick Start
=======

```docker run -it -e “APP_NAME=server.js” -e “GIT=https://github.com/mmbash/mops.io” -p 0:3000 mikemichel/node-easy /bin/sh /tmp/gitmon.sh ```

node-easy can clone git repos, does a npm install and starts server.js with nodemon



