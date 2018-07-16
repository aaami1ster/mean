# Using PM2
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

# Using Docker
