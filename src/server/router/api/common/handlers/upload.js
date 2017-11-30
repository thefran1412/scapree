module.exports = function (req, res) {
  if (!req.files) {
    return res.send({success: false, msg: 'No files were uploaded.'})
  } else {
    let image = req.files.image
    console.log(image)
    const fileName = imgName()

    image.mv(`./public/uploads/${fileName}`, (err) => {
      if (err) {
        return res.json({success: false, msg: err})
      }
      res.json({success: true, msg: fileName})
    })
  }
}

function imgName () {
  const date = new Date()
  return `${+date}.png`
}
