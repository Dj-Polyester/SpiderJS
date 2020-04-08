const Spider = require("./spider");
const Parser = require("./parser");
const FILEFORMAT = require("./fileformat.js");
const LINK = require("./link");
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



function Search(word)
{
    const spider= new Spider(LINK,DEPTH,parser);
    spider.start(word);
    
}
//doesnt work
function assert()
{
    
    const total = parser.totalWords;
    if(total)
        console.log(`Found ${total} total`) ;
    else
        console.log("Could not find any.");
}

//input();

// fs.writeFile(process.argv[2]+FILEFORMAT,'', (err) => {
//     if (err) throw err;
// });
Search(process.argv.slice(2).join(" "));




