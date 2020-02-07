// const csv = require('csv')
const csv = require('csv-parser');
const ejs = require('ejs')
const fs = require('fs')

const inputFile = 'data.csv'
const templateFile = './src/template.ejs'
const outputDir = './publish/'

var template = ejs.compile(fs.readFileSync(templateFile, 'utf8'))


fs.createReadStream(__dirname+'/'+inputFile)
  .pipe(csv())
  .on('data',function(data){
    const html = template(data)
    console.log(html)
    console.log("--------------------")
    fs.writeFileSync(outputDir + data.page + '.html', html, 'utf8')
  })