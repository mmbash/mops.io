mops.io
=======
Docker Registry and Mesosphere/Marathon API Server which will work also with mopsicli (WIP). 

mopsi.io provides a GUI for a private docker registry with the capabilites to deploy a docker image tag to mesosphere/marathon. If you don't use marathon you can use it as a docker registry GUI only.


### Start with pure docker

```docker run -it -e “APP_NAME=server.js” -e “GIT=https://github.com/mmbash/mops.io” -p 3000:3000 mikemichel/node-easy /bin/sh /tmp/gitmon.sh ```

node-easy can clone git repos, does a npm install and starts server.js with nodemon

mopsi.io is then available at http://dockerhost:3000/

![user-interface-repos](https://cloud.githubusercontent.com/assets/8025931/5088659/d7620c52-6f35-11e4-967d-0a4c6d1af897.PNG)






