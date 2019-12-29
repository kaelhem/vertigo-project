const benfordValues = [
  0.301,  // 1
  0.176,  // 2
  0.125,  // 3
  0.097,  // 4
  0.079,  // 5
  0.067,  // 6
  0.058,  // 7
  0.051,  // 8
  0.046   // 9
]

const benfordAccuracy = (numbers) => {
  let numDigit = 0
  const digits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  
  for (let number of numbers) {
    if (number > 0) {
      const firstDigit = parseInt(number.toExponential(), 10)
      ++digits[firstDigit-1]
      ++numDigit
    }
  }

  let globalDiff = 0
  let lastValue = 1
  let respectOrder = true
  for (let i = 0; i < 9; ++i) {
    const benfordValue = digits[i] / numDigit
    console.log((i+1) + ' : ' + benfordValue)
    if (benfordValue > lastValue) {
      respectOrder = false
    }
    lastValue = benfordValue
    globalDiff += Math.abs(benfordValue - benfordValues[i])
  }
  console.log('respect benford order: ' + respectOrder)
  return globalDiff < 1 ? 1 - globalDiff : 0
}

/*
const uniform = (min, max) => Math.random() * (max - min) + min
const benford = (min, max) => Math.exp(uniform(Math.log(min), Math.log(max)))

const values = []
for(let i=0; i<10000; ++i) {
  values.push(benford(.00001, 10000))
}

console.log(benfordAccuracy(values))
*/

const getPixels = require('get-pixels')
const zeros = require('zeros')
const savePixels = require('save-pixels')
const fs = require('fs')
const rgba = require('rgba-convert')

const size = 128

getPixels('real-icons/sample4.png', function(err, pixels) {
  if(err) {
    console.log('Bad image path')
    return
  }
  //console.log('got pixels', pixels.data)
  const values = []

  const x = zeros([size, size, 4])
  for (let i = 0; i < size; ++i) {
    for (let j = 0; j < size; ++j) {
      const r = Math.round(Math.random() * 255)//pixels.get(i, j, 0);
      const g = Math.round(Math.random() * 255)//pixels.get(i, j, 1);
      const b = Math.round(Math.random() * 255)//pixels.get(i, j, 2);
      const a = Math.round(Math.random() * 255)//pixels.get(i, j, 3);
      const color = rgba.num({r, g, b, a})
      values.push(color * color * i * j)
      x.set(i, j, 0, r)
      x.set(i, j, 1, g)
      x.set(i, j, 2, b)
      x.set(i, j, 3, a)
    }
  }
  
  console.log(benfordAccuracy(values))

  const out = fs.createWriteStream('generated.png')
  savePixels(x, 'png').pipe(out)
})
/*
const size = 32
const colors = 255

const zeros = require('zeros')
const savePixels = require('save-pixels')
const fs = require('fs')

//Create an image
const values = []
const x = zeros([size, size])
for (let i = 0; i < size; ++i) {
  for (let j = 0; j < size; ++j) {
    const color = Math.round(Math.random() * colors)
    //console.log(color + i * j)
    values.push(color * i * j)
    x.set(i, j, color)
  }
}

console.log(benfordAccuracy(values))
 
//Save to a file
const out = fs.createWriteStream('generated.png')
savePixels(x, 'png').pipe(out)
*/