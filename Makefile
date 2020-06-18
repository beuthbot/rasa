
install:
	mkdir -p $(DESTDIR)/usr/local/bin/
	# install -m 755 telegrambot-cli $(DESTDIR)/usr/local/bin/telegrambot-cli

run:
	if [ ! -f ".env" ] ; then echo "no .env file found"; exit 1; fi
	# docker-compose up -d --build

train:
	# git reset HEAD --hard
	# git pull

fetch:
	# git reset HEAD --hard
	# git pull
