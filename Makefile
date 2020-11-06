start: 
	npm install && systemctl start api_ganatrade.service

release:
	./scripts/release.sh
