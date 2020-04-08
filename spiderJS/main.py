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
        #clean the file
        formatName=getFileFormat()
        parsed_uri = urlparse(url)
        domain = parsed_uri.netloc.split(".")[0]
        f=open("logs/"+domain+"/"+data+formatName,"w+")
        f.close()
        os.system(command)
        print("\nDone!")
        return (data,domain)
    except KeyboardInterrupt:
        print("Exiting...")
        sys.exit(0)

def getFileFormat():
    f=open("var.json","+r")
    variables=json.loads(f.read())
    f.close()
    return variables["FILEFORMAT"]

def getTotal(atuple):
    formatName=getFileFormat()
    data=atuple[0]
    domain=atuple[1]

    f=open("logs/"+domain+"/"+data+formatName,"r+")
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
