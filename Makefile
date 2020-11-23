install-beta:
	npm install && cp ../config/serviceAccount-beta.json ./

install-prod:
	npm install && cp ../config/serviceAccount.json ./

# Start the prod server
start: 
	npm install && systemctl start api_ganatrade.service

# from develop to master
release:
	./scripts/release.sh