import os

data = input("Please input the word you would like to search for. CTRL+C to exit.\n")
command= "node scrape.js {}".format(data)
print("Searching for main...")
os.system(command)
print("Done!")

with open("filename.js") as fileNameContents:
    sum=0
    rawName=fileNameContents.readline().split("=")[1]
    
    fileName=rawName.strip()
    fileName=fileName.strip("\"")
    
    with open(fileName) as f:
        for line in f:
            alist=line.split(" ")
            if len(alist) > 4:
                num = int(alist[4])
                sum+=num
    print("\nFound {} total".format(sum))