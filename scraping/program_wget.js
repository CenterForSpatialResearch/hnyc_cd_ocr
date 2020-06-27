const fs = require('fs');
const path = require('path');
const glob = require('glob');
const folder = 'source';
const folder_store = path.resolve(__dirname, folder);
// const folder_store = __dirname;


//Get Files and Generate JSON
glob(folder_store + '**/*.json', {}, (err, files)=> {
  //How many JSON files?
  console.log('printing')
  console.log('>>>>Found '+ files.length + ' JSON files<<<<')
  //Loop through JSON files in folder
  for (var i = 0; i < files.length; i++) {
    fs.readFile(files[i], (err, data) => {
      if (err) throw err;
      //Parse JSON of each file
      var output = JSON.parse(data);
      links = []
      imageIDs = []
      //Loop through every element of file, find every highResLink
      for (var e = 0; e < output.length; e++) {
        var obj = {
          highResLink : output[e]['highResLink']
        }
        links.push(obj);
      }
      // console.log('Preparing to write ' + links.length + ' links into' + output[i]['uuid'] + '.txt')
      var to_write = JSON.stringify(links);
      // console.log(links)
      var text_to_write = links.map(({ highResLink }) => highResLink).join('\n');
      // console.log(text_to_write);
      fs.writeFile('./output/WGET'+ output[i]['uuid'] + '.txt', text_to_write, 'ascii', (err) => {
        if (err) throw err;
        console.log('completed ' + output[i]['uuid'] + '.txt');
    })
  })
}
});
