
# Health Data Analytics Frontend

# Note about termMed's fork:
- This is a form from original IHTSDO'S health-data-analytics-frontend project. See: https://github.com/IHTSDO/health-data-analytics-frontend
- "spanish-translation" branch contains not just GUI translation, but also major changes to make it work with Snowstorm.
- Comments finished with 'PG' were added by Patricio Gayol (termMed) to show modifications from original IHTSDO's code.
- In this file you can find the actual configuration of NGINX, with some changes from original project's configuration. Accept-Language is set to 'es-URU' since Snowstorm requires the Language Header to fetch concepts in spanish.

# Installation:
    npm install -g ember-cli@2.11
    clone project
    cd to project
    ember install ember-cli-mirage
    npm update
    bower install

Project can then be run with: 'ember server' and built wiith 'ember build'.

# Example ngnix config:


```
user 'details here';
worker_processes  1;
 
events {
    worker_connections  1024;
}
 
http {
	include    mime.types;
	server {
        listen      XXXPortNumber;
        server_name localhost;

        location / {
            proxy_pass http://127.0.0.1:49153;
        }
        location /health-analytics-api {
                proxy_pass http://localhost:8080/health-analytics-api/;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
                client_max_body_size 0;
        }

       location /mrcm {
               proxy_pass http://YOUR-SNOWSTORM-URL.com/mrcm/;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Accept-Language 'es-URU;q=0.8,en-US;q=0.6';
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
                client_max_body_size 0;
       }

       location /browser {
                proxy_pass http://YOUR-SNOWSTORM-URL.com/browser/;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
 #               proxy_set_header Accept-Language 'es-URU;q=0.8,en-US;q=0.6';
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
                client_max_body_size 0;
       }

        location /find {
                proxy_pass http://YOUR-SNOWSTORM-URL.com/;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Accept-Language 'es-URU;q=0.8,en-US;q=0.6';
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
                client_max_body_size 0;
       }
    }
}
```