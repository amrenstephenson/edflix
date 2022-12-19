import requests
import json
import dpath
import os
from dataclasses import dataclass, field

@dataclass(frozen=True)
class LearningArtifact:
	title: str
	desc: str = field(compare=False)
	links: list[str] = field(compare=False)
	cardType: str = field(compare=False)
	topic: str = field(compare=False)

def build_uri(pageid):
	return f"https://content-eu-7.content-cms.com/api/b73a5759-c6a6-4033-ab6b-d9d4f9a6d65b/dxsites/151914d1-03d2-48fe-97d9-d21166848e65/delivery/v1/rendering/context/{pageid}"

def scrape_page(pageid, topic):
	# Build URI of JSON to particular page
	uri = build_uri(pageid)
	resp = requests.get(uri).json()

	# Cards are in the `technology` element in `sectionOne`
	cards = dpath.get(resp, "elements/sectionOne/values/*/elements/technology/value/elements/cards/values")

	cardInfos = set()
	for card in cards:
		# Get the title:
		title = dpath.get(card, "elements/title/value")

		if not title:
			print(f"[ERR] Artifact has no title!")
			continue

		# Skip "View All" cards:
		if title == "View All":
			continue

		# Get the description:
		desc = None
		try:
			descs = dpath.search(card, "**/desc/value", yielded=True)
			# keep the description with the longest length:
			desc = max(descs, key=lambda d: len(d[1]))[1]
		except KeyError:
			pass
		
		# Get the card type:
		cardType = None
		try:
			cardType = dpath.get(card, "elements/card_type/value/selection")
			cardType = dpath.get(card, "elements/card_type/value/label")
		except KeyError:
			pass
		if cardType:
			cardType = cardType[0].upper() + cardType[1:].lower()

		# Get all links in the card:
		links = []
		for x in dpath.search(card, "**/linkURL", yielded=True):
			linkURL = x[1]
			linkText = dpath.get(card, f"{os.path.dirname(x[0])}/linkText")

			# filter out invalid links
			if not linkURL.startswith("http"):
				continue

			links.append({"linkText": linkText, "linkURL": linkURL})

		if not cardType:
			print(f"[WARN] Artifact \"{title}\" has no type")
		if not desc:
			print(f"[WARN] Artifact \"{title}\" has no description")
		if len(links) == 0:
			print(f"[WARN] Artifact \"{title}\" has no links")

		info = LearningArtifact(title=title, desc=desc, links=links, cardType=cardType, topic=topic)
		cardInfos.add(info)

	return cardInfos

def main():
	topics = {
		"Artificial Intelligence" : "bb82683e-1969-4794-9d2c-515615f7d25b",
		"Capstone" : "5fa76346-c492-489d-b67f-dccccb110dd5",
		"Data Science" : "9b3be54f-e417-441c-ba49-892795ba5040",
		"IBM Automation" : "cc45e3f7-978d-4cb3-8f8b-de29cd2a69a5",
		"IBM Cloud" : "891e1d46-661a-4283-9d32-6d3ef41b4eed",
		"IBM Engineering" : "81c6be0c-235f-4ba0-9c5d-cd58c878e6d6",
		"IBM Security" : "bdaa89b0-38be-4254-9199-26d5c7c8cf2d",
		"IBM Z" : "9dfd699d-7769-4daa-8203-c70ff983abb1",
		"Power Systems" : "20fa61f1-051a-4825-8e87-e8821a2ccb20",
		"Red Hat Academy" : "f45f9648-01e7-48b5-aabd-cf657c4c1a6a",
		"IBM Quantum" : "b8abdcde-7d23-45a0-ac27-5f8fa73fd3e3"
	}

	artifacts = set()
	for topic, pageid in topics.items():
		artifacts |= scrape_page(pageid, topic)

	with open("learning_artifacts.json", "w") as f:
		f.write(json.dumps([a.__dict__ for a in artifacts], indent=2))
	
	print(f"*** Successfully found {len(artifacts)} artifacts! ***")

if __name__ == "__main__":
	main()
