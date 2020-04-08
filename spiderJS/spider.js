const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const http = require("http");
const set_queue = require("./set_queue");
const url = require("url");
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
        this.parser.setup(this.url)
        this.search_word=search_word;
        this.domain = url.parse(this.url).host.split(".")[0];
        this.dir = 'logs/'+this.domain;
        if (!fs.existsSync(this.dir)){
            fs.mkdirSync(this.dir);
        }

        fs.readFile('var.json', (err, data) => {
            if (err) throw err;
            let variables = JSON.parse(data);
            this.fileformat = variables["FILEFORMAT"];
        });
 
        this.send_request(this.url,this.depth);
    }
    assert(URL, word)
    {
        fs.appendFile(this.dir+"/"+this.search_word+this.fileformat, `\n${word}: ${URL}`, (err) => {
            if (err) throw err;
        });
        process.stdout.write(`\n${word}: ${URL}`);
    }

    send_request(URL,depth_level)
    {
        if(this.parser.is_local(URL))
        {
            if(URL.slice(0,7)==="file://")
                url_tmp = URL.slice(7,URL.length);
            else
                url_tmp = URL;

           //taken from https://stackoverflow.com/a/20665078/10713877
           const $ = cheerio.load(fs.readFileSync(url_tmp));
           //Do something
           console.log($.text())
        }
        else
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
                    self.assert(URL,"Success");

                    const $ = cheerio.load(html);


                    return Promise.resolve().then(()=> {
                        self.crawl($,URL,depth_level);
                    });
                }
                else
                {

                    self.assert(URL,"Failure");
                }
            });
        }
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
                
                self.parser.search($,self.search_word,current_page,self.search_word);
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