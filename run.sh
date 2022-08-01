#!/bin/bash
shopt -s expand_aliases
CONFIGFILE=./backend/config/index.js
# alias mysql=/usr/local/mysql-8.0.30-macos12-x86_64/bin/mysql (my laptop needed this line to run mysql)

command_error () {
    echo ""
    echo "ERROR (404) --> MySQL command not found"
    echo "Rerun this script passing your mysql path. Example: ./run.sh mySqlInstallFolder/bin/mysql"
	echo "For more info, please, read the ISSUES section of my README.MD to solve this problem."
	exit 1
}

if [ -z "$1" ] 
then
    echo "Using normal mysql command..."
    echo ""
 
else
    echo "Using $1 as mysql command..."
    echo ""
    alias mysql=$1
fi

echo Running app...
if !(test -f "$CONFIGFILE"); then
    # Create config for the database
    echo ""
    echo "Running the application for the first time."
    echo ""
    echo "Please, enter the new database username and password":
    username="matiasurielgluck"
    userpass="12345"
    # =========================== 

    # Create database
    # If /root/.my.cnf exists then it won't ask for root password
    
    if [ -f /root/.my.cnf ]; then
        echo "Creating new MySQL database..."
        mysql -e "CREATE DATABASE challengematiasgluck /*\!40100 DEFAULT CHARACTER SET utf8 */;" 2> error.txt || command_error
        echo "Showing existing databases..."
        mysql -e "show databases;"
        echo ""
        echo "Creating new user..."
        mysql -e "CREATE USER ${username}@localhost IDENTIFIED BY '${userpass}';"
        echo ""
        echo "NOTE: If you get ERROR 1396, then the user already exists. No problem."
        echo ""
        echo "Granting ALL privileges on challengematiasgluck to ${username}!"
        mysql -e "GRANT ALL PRIVILEGES ON challengematiasgluck.* TO '${username}'@'localhost';"
        mysql -e "FLUSH PRIVILEGES;"
        
    # If /root/.my.cnf doesn't exist then it'll ask for root password	
    else
        echo "Please enter root user MySQL password"
        echo "Note: password will be hidden when typing"
        read -s rootpasswd
        mysql -uroot -p${rootpasswd} -e "CREATE DATABASE challengematiasgluck /*\!40100 DEFAULT CHARACTER SET utf8 */;" 2> error.txt || command_error
        echo "Database successfully created!"
        echo "Showing existing databases..."
        mysql -uroot -p${rootpasswd} -e "show databases;"
        echo ""
        echo "Creating new user..."
        mysql -uroot -p${rootpasswd} -e "CREATE USER ${username}@localhost IDENTIFIED BY '${userpass}';"
        echo ""
        echo "NOTE: If you get ERROR 1396, then the user already exists. No problem."
        echo ""
        echo "Granting ALL privileges on challengematiasgluck to ${username}!"
        mysql -uroot -p${rootpasswd} -e "GRANT ALL PRIVILEGES ON challengematiasgluck.* TO '${username}'@'localhost';"
        mysql -uroot -p${rootpasswd} -e "FLUSH PRIVILEGES;"
    fi

    mkdir ./backend/config
    echo "module.exports = {" > $CONFIGFILE
    echo "    port: process.env.PORT || 3000," >> $CONFIGFILE
    echo "" >> $CONFIGFILE
    echo "    database: {" >> $CONFIGFILE
    echo "        username: '"$username"',"  >> $CONFIGFILE
    echo "        password: '"$userpass"'," >> $CONFIGFILE
    echo '        database: "challengematiasgluck",' >> $CONFIGFILE
    echo '        host: "localhost",' >> $CONFIGFILE
    echo '        dialect: "mysql"' >> $CONFIGFILE
    echo '    }' >> $CONFIGFILE
    echo '}' >> $CONFIGFILE

    # Installing dependencies
    npm install
    cd frontend && npm install
    cd ../backend && npm install
    cd ..
    # ===========================
fi

npm start