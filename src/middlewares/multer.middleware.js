import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/public/temp')
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, raw) {
      if (err) return cb(err)
        //have to lookup on this part like what name can we give to our file
      cb(null, file.fieldname + '-' + raw.toString('hex'))
    })
  }
})

export const upload = multer({ storage, }) 

