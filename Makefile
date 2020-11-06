install: 
	npm install

start: 
	install && systemctl start api_ganatrade.service

release:
	./scripts/release.sh
