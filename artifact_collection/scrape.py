import requests
import json
import dpath
import os

def build_uri(pageid):
	return f"https://content-eu-7.content-cms.com/api/b73a5759-c6a6-4033-ab6b-d9d4f9a6d65b/dxsites/151914d1-03d2-48fe-97d9-d21166848e65/delivery/v1/rendering/context/{pageid}"

def scrape_page(pageid, topic):
	# Build URI of JSON to particular page
	uri = build_uri(pageid)
	resp = requests.get(uri).json()

	# Cards are in the `technology` element in `sectionOne`
	cards = dpath.get(resp, "elements/sectionOne/values/*/elements/technology/value/elements/cards/values")

	cardInfos = []
	for card in cards:
		# Get the title:
		title = None
		try:
			title = dpath.get(card, "elements/title/value")
		except KeyError:
			pass

		# Skip "View All" cards:
		if title == None or title == "View All":
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
			cardType = dpath.get(card, "elements/card_type/value/label")
		except KeyError:
			pass

		# Get all links in the card:
		links = []
		for x in dpath.search(card, "**/linkURL", yielded=True):
			linkURL = x[1]
			linkText = dpath.get(card, f"{os.path.dirname(x[0])}/linkText")

			# filter out invalid links
			if not linkURL.startswith("http"):
				continue

			links.append({"linkText": linkText, "linkURL": linkURL})

		info = {"title":title, "desc":desc, "links":links, "cardType":cardType, "topic":topic}
		cardInfos.append(info)

	return cardInfos

def main():
	#TODO: get IDs of other topics
	#Topics pageid: 8eb42ca6-0ff0-406b-83fd-4feb2606a1d4
	topics = {
		"Artificial Intelligence" : "bb82683e-1969-4794-9d2c-515615f7d25b",
		"Power Systems" : "20fa61f1-051a-4825-8e87-e8821a2ccb20"
	}

	artifacts = []
	for topic, pageid in topics.items():
		artifacts += scrape_page(pageid, topic)

	with open("learning_artifacts.json", "w") as f:
		f.write(json.dumps(artifacts, indent=2))
	
	print(f"*** Successfully found {len(artifacts)} artifacts! ***")

if __name__ == "__main__":
	main()
