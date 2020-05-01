const Spider = require("./spider");
const Parser = require("./parser");
const async = require("async");
const fs = require("fs");
const DEPTH = 2;
const parser = new Parser();


/////////////
//get input//
/////////////

function input()
{
    // Get process.stdin as the standard input object.
    var standard_input = process.stdin;
    var word;
    
    // Set input character encoding.
    standard_input.setEncoding('utf-8');

    // Prompt user to input data in console.
    console.log("Please input the word you would like to search for. CTRL+C to exit.");

    // When user input data and click enter key.
    standard_input.on('data', function (data) {

        // Print user input in console.
        word = data.split(" ")[0];
        
        console.log(`searching for ${word}`);
        
        Search(word);
        process.exit();

    });

    process.on('SIGINT', function() {

        console.log();
        console.log("exited");
        process.exit();
    });
}

function isIn(alist,val)
{
    for(let item of alist)
    {
        if(item===val) 
            return true;
    }
    return false;
}

function Search(url, word)
{
    let variables = JSON.parse(fs.readFileSync('var.json'));
    if (!isIn(variables["LINKS"],url)) 
        variables["LINKS"].push(url);
    
    if (!isIn(variables["KEYS"],word)) 
        variables["KEYS"].push(word);
    
    fs.writeFileSync('var.json', JSON.stringify(variables));
    
    const spider= new Spider(url,DEPTH,parser);
    spider.start(word);
    
    
}


async function unmade()
{
    const srch = Search(process.argv[2],process.argv.slice(3).join(" "));


    const print = console.log(parser.total)
     
}

Search(process.argv[2],process.argv.slice(3).join(" "));

process.on('exit', function () {
    //process.stdout.write(`\n${parser.file}\n`);
    fs.appendFileSync(parser.file, `\nFound ${parser.total} total`, (err) => {
        if (err) throw err;
    });
    process.stdout.write(`\nDone!\nFound ${parser.total} total\n`);
  });








