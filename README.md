# Ensolvers challenge, by Matías Gluck

Here is the [live deployed version](https://ensolvers-matiasurielgluck.netlify.app/) to the application.

## Requirements

- [MySQL Community Server >= 8.0.30](https://dev.mysql.com/downloads/mysql/)
- [Node.js 16.16.0](https://nodejs.org/)
- [Vue CLI >= 5.0.8](https://cli.vuejs.org/)

## Installation

Run this command in a shell to run the application.

```bash
./run.sh
```

The command above should install all the frontend and backend dependencies, create a database using a default username and password, and start both the client and server.

## Issues

Note that depending on your MySQL installation, the script may fail. In this case, try running the same command specifying the MySQL binary as shown below:

```bash
./run.sh /path/to/mysql/bin/mysql
```

Example:

Let's say the path to the MySQL binary is:
```bash
/usr/local/mysql-8.0.30-macos12-x86_64/bin/mysql
```

Then, the command to run would be:
```bash
./run.sh /usr/local/mysql-8.0.30-macos12-x86_64/bin/mysql
```

## Usage

Once the application is running both the client and server, enter the [localhost:8080](http://localhost:8080) url in your browser (or the port shown in the console).