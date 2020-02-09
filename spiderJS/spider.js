const request = require("request");
const cheerio = require("cheerio");
const FILENAME = require("./filename.js");
const fs = require("fs");
const http = require("http");
const set_queue = require("./set_queue");

class Spider
{
    constructor(url,depth,parser)
    {
        //this creates ambiguity
        this.total=0;
        this.depth=depth;
        this.url=url;
        this.set_q=new set_queue;
        this.parser=parser;
        
    }
    start(search_word)
    {
        this.search_word=search_word;
        this.send_request(this.url,this.depth);
    }
    send_request(URL,depth_level)
    {
        var self=this;
        
        var options = {
            url: URL,
            headers: {
              'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0'
            }
          };
        
        request(options, function(error, response, html) {
            //no error
            if(!error && response.statusCode == 200)
            {
                fs.appendFile(FILENAME, `\nSuccess: ${options["url"]}`, (err) => {
                    if (err) throw err;
                });
                process.stdout.write(`\nSuccess: ${options["url"]}`);
                const $ = cheerio.load(html);
                
                return Promise.resolve().then(()=> {
                    self.crawl($,options["url"],depth_level);
                });
            }
            else
            {
                fs.appendFile(FILENAME, `\nFailure: ${options["url"]}`, (err) => {
                    if (err) throw err;
                });
                process.stdout.write(`\nFailure: ${options["url"]}`);
            }
        });
        
        
    }
    crawl($,current_page,depth_level)
    {
        var self=this;
        if(depth_level)
        {
            
            //get links
            if($('a').length)
            {
                
                
                $('a').each(function(index) {

                    //get href
                    const href = self.parser.filter_link($(this));
                    //console.log(href);
                    if(href!==undefined)
                    {
                        //get the full link
                        const link = self.parser.form_link(self.url,href);

                        self.set_q.enqueue(link);
                    }
                });
                
                self.parser.search($,self.search_word,current_page);
                while( !(self.set_q.isEmpty) )
                {
                    let link = self.set_q.dequeue();
                    self.send_request(link,depth_level-1);
                }

            }
            else
            {
                console.log("no links in this page");
            }
        }
    }
};

module.exports = Spider;