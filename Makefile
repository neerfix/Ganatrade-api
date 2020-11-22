# Script to install prod
install:
	npm install
# Mode cmd... ?

# Start the prod server
start: 
	install && systemctl start api_ganatrade.service

# from develop to master
release:
	./scripts/release.sh