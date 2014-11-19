mops.io
=======
Docker Registry and Mesosphere/Marathon API Server which will also work with [mopsicli](https://github.com/mmbash/mopsicli) (in development). 

mopsi.io provides a GUI for a private docker registry with the capabilites to deploy a docker image tag to mesosphere/marathon. If you don't use marathon you can use it as a docker registry GUI only.

The master branch is the development branch so you should use the latest release. When you are using [node-easy](https://registry.hub.docker.com/u/mikemichel/node-easy/) for mopsi.io you can choose the release with the  ```GIT_TAG``` ENV.


### Start with node-easy

```bash
docker run -it -e "APP_NAME=server.js" -e "GIT=https://github.com/mmbash/mops.io" -e "GIT_TAG=v0.5" -p 3000:3000 mikemichel/node-easy /bin/sh /tmp/gitmon.sh
```

[node-easy](https://registry.hub.docker.com/u/mikemichel/node-easy/) can clone git repos, does a npm install and starts server.js with nodemon

mopsi.io is then available at http://yourIP:3000/

#### Change the Settings

![user-interface-settings](https://cloud.githubusercontent.com/assets/8025931/5108233/b3e08a46-7008-11e4-88a2-50fe87e1cda7.PNG)

#### And you are set

![user-interface-repos](https://cloud.githubusercontent.com/assets/8025931/5088659/d7620c52-6f35-11e4-967d-0a4c6d1af897.PNG)