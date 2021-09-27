// Revised version

const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')
const csvtojson = require('csvtojson')

const jsonPath = "asndata.csv"

async function downloadFile (url) {

  // const url = ""; url is passed in as a parameter
  const path = Path.resolve(__dirname, 'data','asndata.csv')
  const writer = Fs.createWriteStream(path)

  const response = await Axios({
        url,
	method: 'GET',
	responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
	writer.on('finish', resolve)
	writer.on('error', reject)
  })
}

function toJson_(){
	csvtojson()
           .fromFile(jsonPath)
           .then((json) =>{
           console.log("Conversion done.")

           Fs.writeFileSync("asndata.json", JSON.stringify(json), "utf-8",(err) => {
                 if(err) console.log(err)
            })
        })
}

downloadFile()
toJson_()
