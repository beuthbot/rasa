model_dir = app/models
model_dir_training = training/app/models
new_file := $$(ls -Art "$(model_dir_training)" | tail -n 1)

install: $(eval .SILENT:)
	echo "commands:" && echo ""
	echo "  train               Starts the Rasa training container"
	echo "  update-model        Copies the newest model file in the '/app/models' directory"
	echo "  train-and-update    Shorthand for 'train' and 'update-model'"
	echo ""

train:
	# starts the Rasa training container
	cd training; docker-compose up --build

update-model:
	# remove any existing model file
	rm -rf app/models/nlu-*.tar.gz

	# copy newly generated model file
	cp $(model_dir_training)/$(new_file) $(model_dir)

train-and-update:
	train
	update-model
