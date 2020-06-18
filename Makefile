install:
	mkdir -p $(DESTDIR)/usr/local/bin/
	# install -m 755 telegrambot-cli $(DESTDIR)/usr/local/bin/telegrambot-cli

run:
	if [ ! -f ".env" ] ; then echo "no .env file found"; exit 1; fi
	# docker-compose up -d --build

update:
	# git reset HEAD --hard
	# git pull
