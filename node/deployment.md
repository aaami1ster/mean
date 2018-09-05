# What is in this page
1. [Deploying nodejs with PM2]()
    1. [Installation]()
    1. [Usage]()
    1. [Folder structure]()
    1. [Cheatsheet]()
    1. [Starts]()
    1. [How to update PM2]()
1. [Deploying nodejs with Docker]()
1. [Using nginx]()
    1. [Nginx Location Directive Examples]()
    1. [Nginx Rewrite Rule Examples]()
        1. [syntax of nginx rewrite]()
        1. [Examples]()
# Deploying nodejs with PM2
## Installation
```bash
npm install pm2@latest -g
```

## Usage
```bash
pm2 start app.js
```

## Folder Structure
Once PM2 is started, it will automatically create these folders:

* `$HOME/.pm2` will contain all PM2 related files
* `$HOME/.pm2/logs` will contain all applications logs
* `$HOME/.pm2/pids` will contain all applications pids
* `$HOME/.pm2/pm2.log` PM2 logs
* `$HOME/.pm2/pm2.pid` PM2 pid
* `$HOME/.pm2/rpc.sock` Socket file for remote commands
* `$HOME/.pm2/pub.sock` Socket file for publishable events
* `$HOME/.pm2/conf.js` PM2 Configuration

In Windows, the $HOME environment variable can be $HOMEDRIVE + $HOMEPATH (link)

## CheatSheet

Here are some commands that are worth knowing. Just try them with a sample application or with your current web application on your development machine:
```bash
# Fork mode
pm2 start app.js --name my-api  # Name process

# Cluster mode
pm2 start app.js -i 0           # Will start maximum processes with LB depending on available CPUs
pm2 start app.js -i max         # Same as above, but deprecated.
pm2 scale app +3                # Scales `app` up by 3 workers
pm2 scale app 2                 # Scales `app` up or down to 2 workers total

# Listing

pm2 list                        # Display all processes status
pm2 jlist                       # Print process list in raw JSON
pm2 prettylist                  # Print process list in beautified JSON

pm2 describe 0                  # Display all informations about a specific process

pm2 monit                       # Monitor all processes

# Logs

pm2 logs [--raw]                # Display all processes logs in streaming
pm2 flush                       # Empty all log files
pm2 reloadLogs                  # Reload all logs

# Actions

pm2 stop all                    # Stop all processes
pm2 restart all                 # Restart all processes

pm2 reload all                  # Will 0s downtime reload (for NETWORKED apps)

pm2 stop 0                      # Stop specific process id
pm2 restart 0                   # Restart specific process id

pm2 delete 0                    # Will remove process from pm2 list
pm2 delete all                  # Will remove all processes from pm2 list

# Misc

pm2 reset <process>             # Reset meta data (restarted time...)
pm2 updatePM2                   # Update in memory pm2
pm2 ping                        # Ensure pm2 daemon has been launched
pm2 sendSignal SIGUSR2 my-app   # Send system signal to script
pm2 start app.js --no-daemon
pm2 start app.js --no-vizion
pm2 start app.js --no-autorestart
```

## 42 starts

ndlr; 42 is the answer to life, the universe and everything.
```bash
pm2 start app.js                        # Start app.js

pm2 start app.js -- -a 23               # Pass arguments '-a 23' argument to app.js script

pm2 start app.js --name serverone       # Start a process and name it as serverone
                                        # you can now stop the process by doing
                                        # pm2 stop serverone

pm2 start app.js --node-args=" --debug=7001"    # --node-args to pass options to node V8

pm2 start app.js -i 0                   # Start maximum processes depending on available CPUs (cluster mode)

pm2 start app.js --log-date-format "YYYY-MM-DD HH:mm Z"    # Log will be prefixed with custom time format

pm2 start app.json                      # Start processes with options declared in app.json
                                        # Go to chapter Multi process JSON declaration for more

pm2 start app.js -e err.log -o out.log  # Start and specify error and out log
```

## How to update PM2

Install the latest pm2 version:
```bash
npm install pm2@latest -g

```
Then update the in-memory PM2 :
```bash
pm2 update
```

# Deploying nodejs with Docker

# Using nginx
## Nginx Location Directive Examples
- Nginx uses location directive to decide what configuration it should apply based on prefix or the pattern in the incoming URL.
- The context for the location block is “server”
- You can have as many location directives as you want for your website.
### syntax for the location directive in the nginx configuration file
```
location [modifier] match {

}
```
    - `Modifier` is optional
    - `Match` defines what in the URL should be matched to execute the configuration mentioned inside this particular location block.
    - When there is no modifier, the match acts just as a prefix string for the incoming URL
    - If we use ~ or ~* in the modifier, then the match can be a regular expression.

### Default Location Directive Setup
- The main configuration file is: ````/etc/nginx/nginx.conf````.
- But, the server and location directive will be in the ````default.conf```` file that is located under ````/etc/nginx/conf.d/default.conf```` file as shown below.
    ```bash
    vi /etc/nginx/conf.d/default.conf
    ```
    - default.conf contents
    ```
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
    
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
    ```
    - The default.conf file defines the following two location directives
        - ````/```` for the default location
        - ````/50x.html```` for all server errors
## Nginx Rewrite Rule Examples
Ability to change (rewrite) incoming URL into a different URL based on your criteria is an essential feature for any webserver.
### syntax of nginx rewrite
```
rewrite reg-ex replacement [flag];
```
- ````rewrite```` directive is part of the `ngx_http_rewrite_module` module.
- ````reg-ex```` – This is a PCRE regular expression that you’ll specify here. This will be used to match the incoming request URI.
- ````replacement```` – If the reqeust URI matches the reg-ex, then Nginx will use this replacement string to change the request URI accordingly
- ````flag```` – This will decide whether further process of the rewrite directives is required or not. This is explained in details in one of the examples below.

### Examples
1. Nginx Rewrite Example Using $1, $2, ..
    - rewrite `url/data/distro/geek/test.php` to `url/data/distro/linux/test.html`
        ```
        rewrite ^(/data/.*)/geek/(\w+)\.?.*$ $1/linux/$2.html last;
        ```
        - ````$1```` and ````$2```` will capture the appropriate strings from the original URL that doesn’t change
        - ````$1```` in the replacement string will match whatever is inside the 1st parenthesis ( ) in the reg-ex. In our example, $1 is `/data/`
        - Similarly ````$2```` will match whatever is inside the 2nd parenthesis ( ) in the reg-ex. So, $2 is (\w+), which is any word that comes after the /geek/ in the original URL. In our example, $2 is `test`
        - ````last```` – This flag will make sure to stop the search of rewrite directive in the current location or block and use the changed URI (i.e rewritten URI) and look for new location for any further rewrite directives that matches.
        - ````*$```` – This indicates the extension in the original URL. Please note that here, the extension from the original URL will be replaced by .html in the replaced URL by rewrite. So, even though you call .php in the original URL, it will only serve the `.html` file in the rewritten URL.
1. Creating Controller File Using Nginx Rewrite
    - when you call ````thegeekstuff.com/linux/centos```` URL, it will get rewritten using the bellow rule and it will serve the page with this rewritten URL: ````thegeekstuff.com/linux.php?distro=centos````
        ```javascript
        rewrite ^/linux/(.*)$ /linux.php?distro=$1 last;
        ```
    - As you see above, any URL that has matches the pattern here (i.e /linux/ in the URL) will be served by linux.php, but the last portion in the original incoming URL will be used as an value for the distro argument in the linux.php controller.
    - So, the above rewrite rule will transform the incoming URL like this:
      - linux/centos becomes linux.php?distro=centos
      - linux/debian becomes linux.php?distro=debian
      - linux/redhat becomes linux.php?distro=redhat
      - etc.
1. Rewrite Break Flag in Location Context

### References
1. [Nginx Rewrite Rule Examples with Reg-Ex and Flags](https://www.thegeekstuff.com/2017/08/nginx-rewrite-examples/)
1. [Nginx Vs Apache: Nginx Basic Architecture and Scalability](https://www.thegeekstuff.com/2013/11/nginx-vs-apache/)
1. [Nginx Location Directive Examples including Regular Expression Modifiers](https://www.thegeekstuff.com/2017/05/nginx-location-examples/)

# zsh
## References
1. [Oh-My-Zsh! A Work of CLI Magic — Tutorial for Ubuntu](https://medium.com/wearetheledger/oh-my-zsh-made-for-cli-lovers-installation-guide-3131ca5491fb)
1. [How to Install ZSH, Oh My Zsh and themes in Ubuntu on Windows](https://medium.com/@danielgodigna/how-to-install-zsh-oh-my-zsh-and-themes-in-ubuntu-on-windows-933489b6d6e0)
1. [robbyrussell/oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes)
1. [solve perl: warning: Setting locale failed.](https://gist.github.com/panchicore/1269109)