//find instance(s) of a word
function search($,instance,current_page)
{
    let count = 0;
    $('p').each(function(index,item) {
        const str =  $(this).text();
        const list = str.split(' ');
        for(let word of list)
        {
            if(word==instance)
            {
                ++count;
                console.log(`Found ${count} instances in ${current_page}`);
            }
        }
    });
}

//custom made link filters, for modularity, you could add to your likings
function filter_link(element)
{
    if( element.parent().parent().prop("nodeName")==='OL' )
    {
        return element.attr("href");  
    }   
}

function filter_link2(element)
{
    const attr = element.attr("href");
    if(attr!==undefined && !attr.isIn("#") )
    {
        return attr;
    }
    return undefined;
}

module.exports.search = search;
module.exports.filter_link = filter_link2;