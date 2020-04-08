import json

f=open("var.json","+r")
yoman=json.loads(f.read())
print(yoman["LINK"][0])
f.close()

