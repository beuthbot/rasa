#!/bin/env bash

RASA_ENDPOINT="http://localhost:5005"

if [ $# -eq 0 ] ; then
  THE_QUESTION="Wie wird das Wetter morgen?"
else
  THE_QUESTION="$@"
fi

ask_rasa() {
  local A_MESSAGE="$@"
  local A_ENDPOINT="${RASA_ENDPOINT}/model/parse"
  echo "A_ENDPOINT: ${A_ENDPOINT}"
  curl "${A_ENDPOINT}" \
    -H "Content-Type: application/json" \
    -X POST \
    --data "{\"text\":\"${A_MESSAGE}\"}"
}

ask_rasa "${THE_QUESTION}"
