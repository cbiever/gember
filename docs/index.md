# Welcome to Gember

Gember is a web application for controlling a model railroad. It needs [srcp-rs](http://cbiever.github.io/srcp-rs) as a provider of a REST backend.

## Installation

 - clone the project: git clone https://github.com/cbiever/gember
 - run: npm install
 - run: bower install
 - type: ember serve

One other thing is needed, a reverse proxy to bring Gember and Srcp-rs together:

 - install Nginx
 - in the servers directory of the Nginx installation create a file with the name gember and the following content:

```
server {
  listen 80 default_server;
  listen 127.0.0.1:80 default_server;

  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; 
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
    proxy_pass http://127.0.0.1:4200;
    proxy_redirect off;
  }

  location /api/v1/ws {
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_http_version 1.1;
    proxy_read_timeout 60m;
    rewrite ^/api/v1/ws/?(.*) /$1 break;
    proxy_pass http://127.0.0.1:4201;
  }

  location /api/v1/rs {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; 
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
    rewrite ^/api/v1/rs/?(.*) /$1 break;
    proxy_pass http://127.0.0.1:4202;
    proxy_redirect off;
  }
}
```

 - finally start Nginx with the command: nginx -c nginx.conf

If al went well Gember should be available at localhost in a browser.

In the upper right corner a yaml configuration file can be uploaded. The docs directory contains an example: [gember.yaml](https://github.com/cbiever/gember/blob/master/docs/gember.yaml).
