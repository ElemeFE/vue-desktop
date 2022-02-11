install:
	@if [ ! -f "$$(which istanbul)" ]; then npm install --registry=https://registry.npmmirror.com -g browserify watchify mocha istanbul; fi
	@npm install --registry=https://registry.npmmirror.com

dev: install
	@npm run dev

test: install
	@npm run test

coverage: install
	@npm run coverage
