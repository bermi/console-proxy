test:
	@NODE_ENV=test \
		./node_modules/.bin/mocha \
		--reporter spec \
		$(TESTFLAGS)

test-watch:
	@TESTFLAGS=--watch $(MAKE) test

test-browser:
	open test/browser.html

dev:
	./node_modules/.bin/grunt watch

dev-test:
	make dev & \
	make test-watch

all:
	./node_modules/.bin/grunt

lint:
	./node_modules/.bin/grunt lint

build:
	./node_modules/.bin/grunt build

docclean:
	rm -f docs/*.{1,html}


clean: docclean test-clean-instrument test-watch test

.PHONY: test build lint test-cov docclean dev