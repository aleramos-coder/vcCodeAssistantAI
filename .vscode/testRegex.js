let text = "```python\nimport random\n\nheads = 0\ntails = 0\n\nfor _ in range(100000):\n  coin = random.choice([\"heads\", \"tails\"])\n  if coin == \"heads\":\n    heads += 1\n  else:\n    tails += 1\n\nheads_percentage = (heads / 100000) * 100\ntails_percentage = (tails / 100000) * 100\n\nprint(f\"Heads: {heads_percentage:.2f}%\")\nprint(f\"Tails: {tails_percentage:.2f}%\")\n``` \n"

const regex = /(.+?)(\n)/gs

matches = text.match(regex)
text = text.replace(matches[0], '')
text = text.replace(matches[matches.length-1], '')
console.log(text)