import sqlite3
import json

con = sqlite3.connect("../server/db/Edflix.db")
cur = con.cursor()

with open('learning_artifacts.json', 'r') as artifacts_file, open('image_collection/unsplash_images.json', 'r') as images_file:
	artifacts = json.load(artifacts_file)
	images = json.load(images_file)

	def create_artifact_row(artifact, image):
		name = artifact["title"]
		# TODO: handle no links?
		url = artifact["links"][0]["linkURL"] if len(artifact["links"]) > 0 else None
		description = artifact["desc"]
		topic = artifact["topic"]
		cardType = artifact["cardType"]
		imgURL = image["urls"]["regular"]
		thumbURL = image["urls"]["thumb"]
		return name, url, description, topic, cardType, imgURL, thumbURL

	artifact_rows = map(create_artifact_row, artifacts, images)
	sql = "INSERT OR REPLACE INTO Artifact(Artifact_Name,ArtifactURL,Description,Topic,Type,ImageURL,ThumbnailURL) VALUES(?,?,?,?,?,?,?)"
	cur.executemany(sql, artifact_rows)

con.commit()
con.close()
