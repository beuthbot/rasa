model_dir = ../app/models
model_dir_training = app/models
new_file := $$(ls -Art "$(model_dir_training)" | tail -n 1)

install: $(eval .SILENT:)
	echo "commands:" && echo ""
	echo "  train               Shorthand for 'train-model' and 'generate-data' and 'update-model'"
	echo "  train-model         Starts the Rasa training container to create a model file"
	echo "  generate-data       Generated JSON file from the .chatito file in the '/app/input' directory"
	echo "  update-model        Copies the newest model file in the '/app/models' directory"
	echo ""

generate-data:
	# starts the training data generation container
	docker-compose -f docker-compose.generate-data.yml up

train-model:
	# starts the Rasa trainings container
	docker-compose -f docker-compose.train-model.yml up

update-model:
	# remove any existing model file
	rm -rf ../app/models/nlu-*.tar.gz

	# copy newly generated model file
	cp $(model_dir_training)/$(new_file) $(model_dir)

train:
	docker-compose -f docker-compose.yml up

	# remove any existing model file
	rm -rf ../app/models/nlu-*.tar.gz

    # copy newly generated model file
	cp $(model_dir_training)/$(new_file) $(model_dir)
