# Script to install prod
install:
	npm install

# Start the prod server
start:
	nodemon server.js && open http://localhost:8080

# from develop to master
release:
	./scripts/release.sh