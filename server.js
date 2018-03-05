console.log("Keep it up boii");

//ingebouwde manier om http op te halen
var http = require('http')
var fs = require('fs')

//dit is erg handig hieronder
http.createServer(onRequest).listen(8000)

//request en response kunnen alle woorden zijn
function onRequest(request, response){
    console.log("Iemand wil iets")
    var route = request.url

    console.log(request.url)
//uitgezet begin
    // response.statusCode = 418
    // response.setHeader('content-type', 'text/html')
    // response.end("<h1>Titeltekst</h1><p>Tekstbericht</p>")
//uitgezet eind

//aangezet begin

if (request.url =='/'){
  response.writeHead(200,{'Content-Type': 'text/html'})
  fs.createReadStream("./files/index.html").pipe(response);
  console.log("/");
}

if (request.url =='/about'){
  response.writeHead(200,{'Content-Type': 'text/html'})
  fs.createReadStream("./files/about.html").pipe(response);
  console.log("/about");
}

if (request.url =='/avatar'){
  response.writeHead(200,{'Content-Type': 'image/png'})
  fs.createReadStream("./images/avatar.png").pipe(response);
  console.log("/avatar");
}

if (request.url =='/index'){
  response.writeHead(200,{'Content-Type': 'text/html'})
  fs.createReadStream("./files/index.html").pipe(response);
  console.log("/index");
}

// als image aangeroepen wordt en index niet bestaat, dan...
if ((request.url =='/images')&&(!fs.existsSync("./images/index.html"))){
  response.writeHead(200,{'Content-Type': 'text/html'})
  console.log("/images && !");
  // uitleg gevonden over readFile op : https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback
  fs.readFile("./images", (err, data) => {
  if (err) throw err;
  console.log(data);
  //Waarom kan ik die data niet laten zien in mn html?
  // ik zie dit alleen als console.log in mn BASH
  // response.end(data);
  //   response.end("<p> fs.readFile("./images", (err, data) => {
  // if (err) throw err;
  // console.log(data); </p>")
});
}
//404
else{
  response.writeHead(404,{'Content-Type': 'text/html'})
  fs.createReadStream("./nonexistent-file.html").pipe(response);
}

// else{
//   response.statusCode = 200
//   response.setHeader('content-type', 'text/html')
//   response.end("<h1>Titeltekst</h1><p>Tekstbericht</p>")
// }
//aangezet eind

}
