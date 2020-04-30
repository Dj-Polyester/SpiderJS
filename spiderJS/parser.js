const filter = require("./filter");
const fs = require("fs");
const url = require("url");

//overwrite string 
String.prototype.isIn = function(elem) {
    
    let index = this.indexOf(elem);
    if(index === -1)
    {
        return false;
    }
    return true;
}

class Parser
{
    constructor()
    {
        this.total=0;
        
    }
    setup(URL)
    {
        this.domain = url.parse(URL).host.split(".")[0];
        fs.readFile('var.json', (err, data) => {
            if (err) throw err;
            let variables = JSON.parse(data);
            this.fileformat = variables["FILEFORMAT"];
        });
    }
    //taken from https://stackoverflow.com/a/19709846/10713877
    is_absolute(url)
    {
        var r = new RegExp('^(?:[a-z]+:)?//', 'i');
        return r.test(url);
    }
    is_local(url)
    {
        var r = new RegExp('^(?:file:)?//', 'i');
        return (r.test(url) || !this.is_absolute(url));
    }
    //gives the full link given the current page as base_url, href element as page_url
    form_link(base_url,page_url)
    {
       
        let dom_list = base_url.split("/");
        //absolute path
        if(this.is_absolute(page_url))
        {
            return page_url;
        }
        //relative path
        while(dom_list.length > 3)
            dom_list.pop();

        base_url=dom_list.join("/");
        return base_url+"/"+page_url;
    }

    //find instance(s) of a word
    search($,key)
    {
        var domstr = $.text();
        var pattern = new RegExp(key,"gi");
        let count = ((domstr.match(pattern)) || []).length
        
        if(count)
        {
            fs.appendFile("logs/"+this.domain+"/"+key+this.fileformat, ` : Found ${count} instance(s)`, (err) => {
                if (err) throw err;
            });
            process.stdout.write(` : Found ${count} instance(s)`);
        }
            
        this.total+=count;
    }

    filter_link(element)
    {
        return filter(element);
    }

    get totalWords()
    {
        return this.total;
    }
}

module.exports = Parser;
