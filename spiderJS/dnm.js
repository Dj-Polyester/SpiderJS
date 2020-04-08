const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

//taken from https://stackoverflow.com/a/19709846/10713877
function is_absolute(url)
{
    var r = new RegExp('^(?:[a-z]+:)?//', 'i');
    return r.test(url);
}

function is_local(url)
{
    var r = new RegExp('^(?:file:)?//', 'i');
    return (r.test(url) || !is_absolute(url));
}

function send_request(URL)
{
    if(is_local(URL))
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
        var options = {
            url: URL,
            headers: {
              'User-Agent': 'Your-User-Agent'
            }
          };

        request(options, function(error, response, html) {
            //no error
            if(!error && response.statusCode == 200)
            {
                console.log("Success");

                const $ = cheerio.load(html);


                return Promise.resolve().then(()=> {
                    //Do something
                    console.log($.text())
                });
            }
            else
            {
                console.log(`Failure: ${error}`);
            }
        });
    }
}

function Search(url, word)
{
    fs.readFile('var.json', (err, data) => {
        console.log(err);
        console.log("in 1");
        if (err) throw err;
        let variables = JSON.parse(data);
        
        if (!isIn(variables["LINK"],url)) 
        {
            variables["LINK"][variables["LINK"].length] = url;
            fs.writeFileSync('var.json', JSON.stringify(variables));
        }
        console.log("in 2");
    });
}

function isIn(alist,val)
{
    for(let item of alist)
    {
        if(item==val) 
            return true;
    }
    return false;
}
//Search("dasfasfafsafs")

fs.readFile('var.json', (err, data) => {
    if (err) throw err;
    let variables = JSON.parse(data);
    console.log(`${variables["FILEFORMAT"]} here !!!!!!!!!!`);
    let FILEFORMAT = variables["FILEFORMAT"];
    console.log(FILEFORMAT);
});

//send_request("https://www.stackoverflow.com")