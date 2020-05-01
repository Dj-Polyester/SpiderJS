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
        //console.log(`attr: ${attr}`);
        return attr;
    }
    return undefined;


}

module.exports = filter_link2;