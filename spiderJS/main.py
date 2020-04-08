import os
import sys
import json
from urllib.parse import urlparse

def getIn():
    try:
        url = input("Please input the url you would like to search for. CTRL+C to exit.\n")
        data = input("Please input the word you would like to search for. CTRL+C to exit.\n")
        command= "node scrape.js {} {}".format(url,data)
        print("Searching for {}...".format(data))
        
        formatName=getFileFormat()
        parsed_uri = urlparse(url)
        domain = parsed_uri.netloc.split(".")[0]
        dirName = "logs/"+domain
        filePath = dirName+"/"+data+formatName
        
        if not os.path.exists(dirName):
            os.mkdir(dirName)
        #clean the file
        f=open(filePath,"w+")
        f.close()

        os.system(command)
        print("\nDone!")
        return filePath
    except KeyboardInterrupt:
        print("Exiting...")
        sys.exit(0)

def getFileFormat():
    f=open("var.json","+r")
    variables=json.loads(f.read())
    f.close()
    return variables["FILEFORMAT"]

def getTotal(filePath):

    f=open(filePath,"r+")
    sum=0
    for line in f:
        alist=line.split(" ")
        
        if len(alist) > 4:
            if len(alist) > 8:
                sum+=int(alist[8])
            sum+=int(alist[4])
    f.write("\nFound {} total".format(sum))
    print("\nFound {} total".format(sum))
    f.close()

if __name__ == "__main__":
    getTotal(getIn())
