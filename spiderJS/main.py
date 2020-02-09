import os

def getIn():
    data = input("Please input the word you would like to search for. CTRL+C to exit.\n")
    command= "node scrape.js {}".format(data)
    print("Searching for main...")
    os.system(command)
    print("Done!")

def getTotal():
    fileNameContents=open("filename.js")
    rawName=fileNameContents.readline().split("=")[1]
    fileName=rawName.strip()
    fileName=fileName.strip("\"")
    fileNameContents.close()

    f=open(fileName,"r+")
    sum=0
    for line in f:
        alist=line.split(" ")
        if len(alist) > 4:
            num = int(alist[4])
            sum+=num
    f.write("\nFound {} total".format(sum))
    print("\nFound {} total".format(sum))
    f.close()

if __name__ == "__main__":
    getIn()
    getTotal()