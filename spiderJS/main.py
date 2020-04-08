import os
import sys
def getIn():
    try:
        data = input("Please input the word you would like to search for. CTRL+C to exit.\n")
        command= "node scrape.js {}".format(data)
        print("Searching for {}...".format(data))
        #clean the file
        formatName=getFileFormat()
        f=open("logs/"+data+formatName,"w+")
        f.close
        os.system(command)
        print("\nDone!")
        return data
    except KeyboardInterrupt:
        print("Exiting...")
        sys.exit(0)

def getFileFormat():
    fileNameContents=open("fileformat.js","r")
    rawName=fileNameContents.readline().split("=")[1]
    formatName=rawName.strip()
    formatName=formatName.strip("\"")
    fileNameContents.close()

    return formatName

def getTotal(data):
    formatName=getFileFormat()

    f=open("logs/"+data+formatName,"r+")
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
    getTotal(getIn())
