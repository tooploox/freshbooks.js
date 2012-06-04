test:
	@./node_modules/.bin/mocha -t 10000 -R list

.PHONY: test
