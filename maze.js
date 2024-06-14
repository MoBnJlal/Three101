var canvas = document.createElement("canvas");
canvas.width = 50
canvas.height = 50
let maze = []
let angle = 0
var ctx = canvas.getContext("2d");
var img1 = new Image();
img1.onload = start;
img1.onerror = function() { alert(img1.src + ' failed to load.'); };
img1.src = "Maze.png";
function g(p) {
  // Tab to edit
  angle = p
}
function start() {
  ctx.drawImage(img1, 0, 0);
  var width = canvas.width;
  var height = canvas.height;
  let dta = []
  var imageData = ctx.getImageData(0, 0, 50, 50);
  var pDA = imageData.data;
  for (var i = 0; i < 10000; i += 4) {
    dta.push(pDA[i])
  }
  maze = dta.reduce((acc, _, i) => {
        const row = Math.floor(i / 50);
        const col = i % 50;
        if (!acc[row]) {
          acc[row] = [];
        }
        acc[row][col] = dta[i];
        return acc;
     },[])
     img1 = undefined
     canvas = undefined

}
