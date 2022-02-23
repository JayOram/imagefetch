var express = require('express'),
app = express(),
Canvas = require('canvas'),
canvas, ctx;

var defaults = {
    format: 'png'
},
max_age = 31536000, // How long to cache, via max-age, in seconds.
exp = new Date(0); // Expire date.

app.get('/ip', function(req, res, next) {
w = 300;
h = 100;
fg = '#000';
bg = '#fff'
ext = 'png'

res.setHeader("Content-Type", 'image/' + ext);
res.setHeader("Cache-Control", "public, max-age=" + max_age);
res.setHeader("Expires", exp);
res.setHeader("Last-Modified", exp);

canvas = new Canvas.createCanvas(w, h);
ctx = canvas.getContext('2d');
switch(ext) {
    case 'jpg':
    case 'jpeg':
    case 'gif':
    default: ext = 'png'; 
        stream = canvas.createPNGStream();
}

stream.on('data', function(chunk) {
    res.write(chunk);
});
stream.on('end', function() {
    res.end();
});

ctx.fillStyle = bg;
ctx.fillRect(0, 0, w, h);

// var ip = req.ip;
// var ipstring = ip.substring(7);

var ipstring = (req.headers['x-forwarded-for'])


ctx.font = "bold 30px arial, sans-serif";
ctx.fillStyle = fg;
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText(`${ipstring}`, w/2, h/2);

return 1;
});



/**
* Start app
*/
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });