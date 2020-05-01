import os
import sys

def getIn():
    try:
        url = input("Please input the url you would like to search for. CTRL+C to exit.\n")
        data = input("Please input the word you would like to search for. CTRL+C to exit.\n")
        command= "node scrape.js {} {}".format(url,data)
        print("Searching for {}...".format(data))

        os.system(command)
    except KeyboardInterrupt:
        print("Exiting...")
        sys.exit(0)

if __name__ == "__main__":
    getIn()
