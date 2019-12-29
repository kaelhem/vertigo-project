const size = 32
const colors = 255

const zeros = require('zeros')
const savePixels = require('save-pixels')
const fs = require('fs')

//Create an image
const x = zeros([size, size])
for (let i = 0; i < size; ++i) {
  for (let j = 0; j < size; ++j) {
    const color = Math.round(Math.random() * colors)
    console.log(color * i * j)
    x.set(i, j, color)
  }
}
 
//Save to a file
const out = fs.createWriteStream('generated.png')
savePixels(x, 'png').pipe(out)