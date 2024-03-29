# Rasa NLU

![Icon](.documentation/Icon100.png "Icon")

> Rasa NLU processor to capture entities from text-messages and determine user-intentions.

## Contents

- [Introduction](#Introduction)
- [Getting Started](#Getting-Started)
- [Usage REST API](#Usage-REST-API)
	- [Interpretate a message (NLU Processing)](#Interpretate-a-message-(NLU-Processing))
- [Overview](#Overview)
  - [Project Structure](#Project-Structure)
  - [Functionality](#Functionality)
- [New Training Model](#New-Training-Model)
- [References / Further Readings](#References-Further-Readings)
- [Authors](#Authors)

## Introduction

Rasa is an open source solution for developing "AI assistants" or chatbots. Rasa provides a stack consisting of the modules "Rasa NLU" and "Rasa Core". With the help of "Rasa NLU" the user intention is determined from the received text message (Intent Recognition) and afterwards the NLU returns all intentions of the message sorted according to the "Confidence Score". Training data is required to record the user's intentions. Furthermore, Rasa NLU allows "Entity Recognition" to extract relevant terms from the text. The Rasa Core is a dialog engine that uses machine-learning trained models to decide which response to send to the user, such as greet the user. Furthermore, the Core allows "Session Management" as well as "Context-Handling". Within the project only the component "Rasa NLU" will be used, because only the functionality is needed to capture entities from a text message and to determine the user intention.

As part of the chatbot-project, microservices are supposed to run in Docker-Containers. In order to start several different services in containers at the same time, a Docker-Compose-File should be created. A Docker-Image is used for the Rasa NLU. Duckling has also been added as an Docker-Image for capturing date entries and allows to parse dates in a structured text.

Rasa NLU allows the processing of natural language to classify user intentions and extract entities from text.

## Getting Started

The following instructions help you to install Rasa for the BeuthBot.

### 0 Requirements

#### Development & Release

- `Docker` version 19.03.8
- `docker-compose `version 1.25.0

Lower versions of `Docker` and `docker-compose `may work but are not tested.

#### Create Training Data

- `Docker` version 19.03.8
- `docker-compose `version 1.25.0

### 1 Clone Repository

```shell
# clone project
$ git clone https://github.com/beuthbot/Rasa.git

# change into project directory
$ cd Rasa
```

### 2 Run with `docker-compose`

```bash
# build and start containers defined in the `docker-compose.yml`
$ docker-compose up -d
```

Click [here](docker-compose.yml) to see the contents of the `docker-compose.yml` file.

#### 2.1. Portmapping

| Service | Internal Port | External Port |
| ------- | ------------- | ------------- |
| [rasa](https://hub.docker.com/r/rasa/rasa) | 500**5** | 500**5** |
| [duckling](https://hub.docker.com/r/rasa/duckling) | 8000 | - |

See also [here](https://github.com/beuthbot/beuthbot#default-ports-of-services) for a table displaying the default ports and portmapping of the components of the [BeuthBot](https://github.com/beuthbot).

### 3 Confirm the container is running

```shell
# check Rasa service running
$ curl http://localhost:5005          # prints "Hello from Rasa: 2.1.3"
```

#### Local Rasa installation

The following installations must be made:

 - `pip`
 - `python` (Version 3.6.8)
 - `tensorflow`
 - Making further installations (https://Rasa.com/docs/Rasa/user-guide/installation/)

> If necessary, make further installation via `pip` (depending on the message of the compiler)

## Usage REST API

Rasa offers a Rest API. This section lists the most important resources of the Rasa Rest API. For further information and full documentation check the next links:

- [HTTP-API](https://Rasa.com/docs/Rasa/api/http-api/) (Retrieved 12.12.2019)
- [OpenAPI-specification](https://Rasa.com/docs/Rasa/_static/spec/Rasa.yml) (Retrieved 12.12.2019)

### Interpretate a message (NLU Processing)

```http
POST   http://localhost:5005/model/parse
```

Use this [link](https://rasa.com/docs/rasa/api/http-api/#operation/parseModelMessage) for further information about this endpoint.

#### Request Schema - `Message`

```json
{ "text": "Wie wird das Wetter morgen?" }
```

#### Response Schema - `Answer`

The response for a successfully processed request to the deconcentrator contains the following information.

```json
{
  "intent": {
    "name": "wetter",
    "confidence": 0.9518181086
  },
  "entities": [
    {
      "start": 20,
      "end": 26,
      "text": "morgen",
      "value": "2020-01-20T00:00:00.000+01:00",
      "confidence": 1.0,
      "additional_info": {
          "values": [
              {
                  "value": "2020-01-20T00:00:00.000+01:00",
                  "grain": "day",
                  "type": "value"
              }
          ],
          "value": "2020-01-20T00:00:00.000+01:00",
          "grain": "day",
          "type": "value"
      },
      "entity": "time",
      "extractor": "DucklingHTTPExtractor"
    }
  ],
  "intent_ranking": [
    {
    	"name": "wetter",
      "confidence": 0.9518181086
    },
    {
      "name": "oeffnungszeiten",
      "confidence": 0.036207471
    },
    {
      "name": "mensa",
      "confidence": 0.0119743915
    }
  ],
  "text": "Wie wird das Wetter morgen?"
}
```

### Server Information

| Method | Endpoint                      | About                                                        |
| ------ | ----------------------------- | ------------------------------------------------------------ |
| `GET`  | `/` | This URL can be used as an endpoint to run health checks against. When the server is running this will return 200 |
| `GET`  | `/version` | Returns the version of Rasa |
| `GET`  | `/status` | Information about the server and the currently loaded Rasa model |

Use this [link](https://rasa.com/docs/rasa/api/http-api/#tag/Server-Information) for further information about these endpoints.

### Model

| Method | Endpoint       | About                              |
| ------ | -------------- | ---------------------------------- |
| `GET`  | `/model/train` | Train a Rasa model                 |
| `PUT`  | `/model`       | Replace the currently loaded model |
| `DEL`  | `/model`       | Unload the trained model           |
| `GET`  | `/domain`      | Retrieve the loaded domain         |

Use this [link](https://rasa.com/docs/rasa/api/http-api/#tag/Model) for further information about these endpoints.

## Overview

### Project structure

| **Files** | **About** |
| :------- | ----- |
| `docker-compose.yml` | Defines the rasa and duckling containers |
| `README.md` | This document |

| **Directories** | **About** |
| :------- | ----- |
| `.documentation/` | Contains files for documentation |
| | |
| `app/` | Volume mounted by the productive Rasa Docker container |
| `app/model/` | Contains the trained model (`.tar.gz`) |
| | |
| `tests/` | Contains tests |
| `tests/Dockerfile` | Defines the Rasa test container |
| `tests/docker-compose.yml` | Defines the Rasa test service |
| `tests/package.json` | Node.js |
| `tests/test.js` | File which is executed by Node.js |
| `tests/test.txt` | Defines the test questions for the bot |
| | |
| `training/` | Contains files realted to training |
| `training/docker-compose.yml` | Defines the Rasa training container |
| `training/docker-compose.generate-data.yml` | Defines a container to generate Rasa training data from input `*.chatito` files |
| `training/docker-compose.train-model.yml` | Defines a container to train a model suitable for Rasa from the training data |
| `training/docker-compose.yml` | Combines the two containers defined with the `docker-compose.generate-data.yml` and `docker-compose.train-model.yml` |
| `training/app/` | Volume mounted by the training Rasa Docker container |
| `training/app/config.yml` | Configuration for Rasa training |
| `training/app/domain.yml` | Domain related stuff for Rasa training |
| `training/app/endpoints.yml` | Define endpoints e.g. for webhooks or event brokers |
| `training/app/data/` | Contains training data for Rasa in the form of `JSON` (or `Markdown`) files. This is the place for new learning data, e.g. when you are adding a new microservice. |
| `training/app/input/` | Contains `*.chatito` files which are used to generate training data for Rasa. |
| `training/app/model/` | Contains the trained model generated by Rasa (`.tar.gz`) |
| `Makefile` | Defines convenient training commands |

## New Training Model

For more information about creating new training data and a new model see this [link](./.documentation/TRAINING.md).

## References / Further Readings

- https://Rasa.com/ (Retrieved 12.12.2019)
- https://botfriends.de/botwiki/Rasa (Retrieved 12.12.2019)
- https://www.artificial-solutions.com/wp-content/uploads/chatbots-ebook-deutsche.pdf (Retrieved 12.12.2019) 
- https://docs.docker.com/ (Retrieved 12.12.2019)
- [Docker-Compose](https://docs.docker.com/compose/) (Retrieved 12.12.2019)
- [Docker Hub Rasa](https://hub.docker.com/r/Rasa/Rasa) (Retrieved 12.12.2019)
- [Rasa Documentation](https://Rasa.com/docs/Rasa/) (Retrieved 12.12.2019)
- [Running Rasa with Docker](https://Rasa.com/docs/Rasa/user-guide/running-Rasa-with-docker/) (Retrieved 12.12.2019)

## Authors

- **Abirathan Yogarajah**
- **Lukas Danckwerth** - [GitHub](https://github.com/lukasdanckwerth)

