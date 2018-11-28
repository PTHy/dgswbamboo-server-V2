const gm = require('gm');
const path = require('path');

exports.UploadImg = async (req, res) => {
  console.log(req.files);
  const imgs = [];
  const tumb = [];
  req.files.map((e) => {
    imgs.push(e.filename);
    const filePath = path.join('public', e.filename);
    gm(filePath).resize(480, 480, '!')
      .write(`public/480_480_${e.filename}`, (err) => {
        if (err) console.log(err);
      });
    tumb.push(`480_480_${e.filename}`);
  });
  const result = {
    status: 200,
    desc: 'success',
    imgs,
    tumb,
  };
  return res.status(200).json(result);
};
