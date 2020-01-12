# Beuth-Rasa

#### Projekt mittels Docker:

Container starten: docker-compose up --build<br>
Container stoppen und löschen (inkl. Volumes): docker-compose down --v<br>

### Rasa NLU – Anleitung für die Entwicklung:

#### Modell erzeugen
Auf dem Rechner Rasa installieren:
Grundvoraussetzungen:
-	Pip
-	Python (meine Version 3.6.8)
-	Tensorflow
Weitere Installationen vornehmen:
https://rasa.com/docs/rasa/user-guide/installation/ 
-	Ggf. weitere Installation über pip vornehmen. (je nach Meldung des Compilers)<br>
- Befehle:<br>
Rasa-Projekt anlegen: rasa init<br>
Modell erzeugen: rasa train nlu<br>
Auf der Kommandozeile mit Rasa NLU kommunizieren: rasa shell nlu –m models/name-des-modells.tar.gz<br>
Die wichtigsten Dateien und Ordner im Projekt:<br>
-	config.yml (beinhaltet die Konfiguration der NLU z.B. Angabe der Pipeline, wie das trainierte Modell erzeugt wird)
-	Pfad: „data/“ enthält Trainingsdaten in Form von Markdown (JSON wäre auch möglich).
-	Pfad: „models/“ enthält das trainierte Modell in Form von tar.gz.Dateien. Das Modell wird benötigt, damit Entitäten bzw. die Nutzerabsicht einer Nachricht erfasst wird.

#### Rasa in einem Docker-Container ausführen:
- Erzeugtes Modell unter dem Pfad „rasa-app-data\models“ einfügen<br>
Container starten: docker-compose up --build<br>
Container stoppen und löschen (inkl. Volumes): docker-compose down --v<br>
