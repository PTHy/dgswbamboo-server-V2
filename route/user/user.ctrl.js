import allowPost from '../../database/models/allowPost';
import waitPost from '../../database/models/waitPost';

exports.count = async (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      count: await allowPost.find({}).count(),
    });
  } catch (error) {
    const result = {
      status: 500,
      desc: 'unknown error 서지녁에게 문의할 것',
      error: error.message,
    };
    console.log(error.message);
    res.status(200).json(result);
  }
};

exports.sendPost = async (req, res) => {
  try {
    const idx = await waitPost.find().sort({ idx: -1 }).limit(1);
    const {
      images,
      ...data
    } = req.body;
    console.log(idx);
    console.log(idx === false);
    // eslint-disable-next-line no-unused-expressions
    idx === false ? data.idx = 1 : data.idx = idx[0].idx + 1;
    await waitPost.create(data);
    const result = {
      status: 200,
    };
    res.status(200).json(result);
  } catch (error) {
    const result = {
      status: 500,
      error: error.message,
    };
    console.log(error.message);
    res.status(200).json(result);
  }
};

exports.getPost = async (req, res) => {
  const {
    count,
  } = req.params;
  try {
    const post = await allowPost.find({}).sort({ idx: -1 }).limit(5).skip(parseInt(count, 10));
    if (post.length) {
      res.status(200).json({
        status: 200,
        desc: 'goodddd',
        post,
      });
    } else {
      res.status(200).json({
        status: 404,
        desc: 'post not found',
      });
    }
  } catch (error) {
    const result = {
      status: 500,
      error: error.message,
    };
    console.log(error.message);
    res.status(200).json(result);
  }
};
