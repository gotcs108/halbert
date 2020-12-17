const jsdom = require('jsdom');
const { JSDOM } = jsdom;
JSDOM.fromURL('http://www.thegaryhalbertletter.com/newsletter-archives.htm',
{includeNodeLocations: true}).then(dom => {
    //Find the anchor node and record the line number
    let potentialAnchorList = [...dom.window.document.querySelectorAll('h2')]
    const anchorReg = new RegExp('All-Star Audio Part #3 Series<')
    let anchorNode = potentialAnchorList.filter(a=>(anchorReg.test(a.innerHTML)))[0]
    const anchorLin = dom.nodeLocation(anchorNode).startLine;
    //select tables after the anchor node
    let nodeList = [...dom.window.document.querySelectorAll('td')]
    nodeList = nodeList.filter(a => dom.nodeLocation(a).startLine > anchorLin)

    
    // //expand the DOM tree
    // let temp = []
    // nodeList.forEach(nodes=>{
    //     nodes.firstElementChild.childNodes.forEach((node)=> {temp.push(node)   
    //     })   
    // })
    // temp = temp.filter(node=>node.nodeType!=3)
    // let filtered = []
    // temp.forEach((node,bigI)=>{
    //     node.childNodes.forEach((element) => {filtered.push(element)
    //     })
    // })
    // filtered = filtered.filter(node=>node.nodeType!=3)

    let filtered = nodeList
    
    // filter the tables that I want
    const correctTdRegAuthor = new RegExp('background="images/envelope-new-gary.gif"')
    const correctTdRegLink = new RegExp('newsletters/')
    // filter out higher level tables
    const noTable = new RegExp('<td>')
    filtered = filtered.filter(node=>correctTdRegAuthor.test(node.outerHTML)&correctTdRegLink.test(node.outerHTML)&!noTable.test(node.innerHTML))
    // make a list of contents and links
    let contents = []
    let links = []
    const matchRegex = RegExp('href=".+" target');
    filtered.forEach((content, index)=>{console.log(content.textContent.replace(/(?:\r\n|\r|\n)/g, ' ').trim())})
    // replace multiple spaces into single space
    contents.forEach((content)=>)
    filtered.forEach((content, index)=>{links[index] = content.innerHTML.match(matchRegex)})
});