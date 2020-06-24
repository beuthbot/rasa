## New Training Data

Training data is needed so that Rasa can identify the intention of a text. Training data can be created in the form of Markdown or JSON. You can define this data in a single file or in multiple files in a directory. 

To create a trained model for Rasa from the Markdown or JSON, Rasa offers a REST API. An alternative to creating trained models is to install Rasa on your local machine and then create the model using the command "Rasa train nlu". Rasa creates the training model (tar.gz) from the Markdown or JSON.

> For further development, it is important that the existing training data be expanded and improved.

### Step-by-Step Guide

![alternative text](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/beuthbot/rasa/master/.documentation/uml/training.txt)

#### 1 -  Provide new training data

Modify or add files in the `training/app/data/` directory to provide new training data for Rasa. Have a look at the existing `.json` files and how they define the training data. For convenient training data checkout the `Tracy` tool on either the [GitHub Project](https://github.com/YuukanOO/tracy) or the [Tracy section](#tracy) in this document. For more information about the format of the training data file you can have a look at the [Training Data Format section](#Training-Data-Format).

Furthermore Rasa NLU is configurable and is defined by pipelines. These pipelines define how the models are generated with the training data and which entities are extracted. For this, a preconfigured pipeline with "supervised_embeddings" is used. "supervised_embeddings" allows to tokenize any languages.

#### 2 - Create  model with Rasa

There are two ways of generating models from training data. Either with a local Rasa installation or with withing a Docker container. The preferred way is to use the Docker container.

> Check the `config.yml` for configuration of Rasa pipeline (how the trained model is generated).

Change into the `training` directory.

```bash
$ cd training
```

##### 2.1 - Create model with local Rasa installation

Create training model with local `Rasa` command.

```bash
$ Rasa train nlu
```

##### 2.2 - Create model with Docker

Build and run the training Docker container which generates the model file.

```bash
$ docker-compose up --build
```

#### 3 - Check generated file

Both way will create a new training model in the `/training/app/models` directory. The name of the  model file will have a format like `nlu-YYYYMMDD-HHMMSS.tar.gz`.

```bash
# check file existence
$ ls -la app/models
```

#### 4 - Replace existing models file

The model file which is used by Rasa in production is placed in the `app/models` directory. Replace this file with the newly generated model file.

```bash
# delete existing model (if you are still in `training` directory)
$ rm -rf ../app/models/*

# .. or from `Rasa` directory
$ rm -rf app/models/*
```

#### 5 - Restart Rasa container or complete BeuthBot container

For development:

```bash
# assuming you are in the `Rasa` main directory
$ docker-compose up -d --build
```

### Training Data Format

> TBD

### Tracy

> Tracy helps you creating training data. This data can be used by Rasa to create the model.

In this project we write training data in the form of JSON, because Markdown does not offer the possibility to extract entities from a text message. For this purpose the data was generated with the tool "Tracy" (Link: https://github.com/YuukanOO/tracy ). In the image below, Tracy is shown with "Öffnungszeiten". Entities are added as "slots", such as "Ort". Training data follows in the lower part of the picture. As training data, you can specify messages, which the user can send to the "chatbot". Currently the three user intentions "Mensa", "Wetter" and "Öffnungszeiten" are supported.

![Icon](.documentation/TracyExample.png "Icon")

> Problem: The training data can be exported as JSON, but the entered values on the "Tracy" application cannot be exported.
