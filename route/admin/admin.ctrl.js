import rejectPost from '../../database/models/rejectPost';
import waitPost from '../../database/models/waitPost';
import allowPost from '../../database/models/allowPost';

exports.count = async (req, res) => {
  const {
    type,
  } = req.params;
  try {
    switch (type) {
      case '0':
        res.status(200).json({
          stats: 200,
          count: await waitPost.find({}).count(),
        });
        break;
      case '1':
        res.status(200).json({
          stats: 200,
          count: await rejectPost.find({}).count(),
        });
        break;
      case '2':
        res.status(200).json({
          stats: 200,
          count: await allowPost.find({}).count(),
        });
        break;
      default:
        res.status(200).json({
          stats: 401,
          desc: '타입이 잘못됐어요',
        });
        break;
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

exports.reject = async (req, res) => {
  const {
    idx,
    reason,
    admin,
  } = req.body;
  try {
    const post = await waitPost.findOne({ idx });
    if (!post || post.inChange === true) {
      const result = {
        status: 404,
        desc: '해당 idx의 대기 글이 없어요',
      };
      res.status(200).json(result);
      return;
    }
    const {
      content,
      writeDate,
      type,
      personalString,
      writerName,
      writerPicture,
      writerUrl,
      images,
    } = post;

    await rejectPost.create({
      idx,
      content,
      writeDate,
      personalString,
      writerName,
      writerPicture,
      writerUrl,
      type,
      reason,
      admin,
      images,
    });
    await waitPost.update({ idx }, { $set: { isChange: true } });
    const result = {
      status: 200,
      desc: 'successful request',
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

exports.allow = async (req, res) => {
  const {
    idx: id,
    admin,
  } = req.body;
  console.log(id);
  try {
    const post = await waitPost.findOne({ idx: id });
    if (!post || post.inChange === true) {
      const result = {
        status: 404,
        desc: '해당 idx의 대기 글이 없어요',
      };
      res.status(200).json(result);
      return;
    }

    const lastPost = await allowPost.findOne().sort({ idx: -1 }).limit(1);
    let idx;
    // eslint-disable-next-line no-unused-expressions
    if (lastPost === null) {
      idx = 1;
    } else {
      console.log(lastPost);
      idx = lastPost.idx + 1;
    }
    const {
      content,
      writeDate,
      type,
      writerName,
      writerPicture,
      writerUrl,
      images,
    } = post;

    await allowPost.create({
      idx,
      content,
      admin,
      images,
      writeDate,
      type,
      writerName,
      writerPicture,
      writerUrl,
    });
    await waitPost.update({ idx: id }, { $set: { isChange: true } });
    const result = {
      status: 200,
      desc: 'successful request',
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
    type,
  } = req.body;
  try {
    switch (type) {
      case '0':
        res.status(200).json({
          stats: 200,
          count: await waitPost
            .find({ isChange: false })
            .sort({ idx: -1 })
            .limit(5)
            .skip(parseInt(count, 10)),
        });
        break;
      case '1':
        res.status(200).json({
          stats: 200,
          count: await rejectPost
            .find({})
            .sort({ idx: -1 })
            .limit(5)
            .skip(parseInt(count, 10)),
        });
        break;
      case '2':
        res.status(200).json({
          stats: 200,
          count: await allowPost
            .find({})
            .sort({ idx: -1 })
            .limit(5)
            .skip(parseInt(count, 10)),
        });
        break;
      default:
        res.status(200).json({
          stats: 401,
          desc: '타입이 잘못됐어요',
        });
        break;
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
