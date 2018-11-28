import { camelKeys } from 'change-object-case';
import allowPost from '../../database/models/allowPost';
import waitPost from '../../database/models/waitPost';
import rejectPost from '../../database/models/rejectPost';

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
    const {
      ...data
    } = camelKeys(req.body);
    const overlapReject = await rejectPost.find({
      personalString: data.personalString,
      isRead: false,
    });
    const overlapWait = await waitPost.find({
      personalString: data.personalString,
      isChange: false,
    });
    const overlapCheck = Object.assign(
      overlapReject,
      overlapWait,
    );
    if (overlapCheck.length) {
      const result = {
        status: 401,
        error: '개인 확인 문자열 중복, 바꿔주세요',
      };
      res.status(200).json(result);
      return;
    }
    // eslint-disable-next-line no-unused-expressions
    const lastPost = await waitPost.findOne().sort({ idx: -1 });
    if (lastPost === null) {
      data.idx = 1;
    } else {
      data.idx = lastPost.idx + 1;
    }
    console.log(data.idx);
    await waitPost.create(data);
    console.log(data);
    const result = {
      status: 200,
      desc: '성공',
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
    const post = await allowPost.find({}, { __v: false, _id: false }).sort({ idx: -1 }).limit(5).skip(parseInt(count, 10));
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

exports.findRejectPost = async (req, res) => {
  const {
    personalString,
  } = camelKeys(req.params);
  try {
    const post = await rejectPost.findOne({ personalString, isRead: false }, { __v: false, _id: false });
    if (post) {
      res.status(200).json({
        status: 200,
        desc: '조회 성공',
        post,
      });
    } else {
      res.status(200).json({
        status: 404,
        desc: '조회 실패 없어요 그런거',
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

exports.changeIsRejectPostRead = async (req, res) => {
  const {
    personalString,
  } = camelKeys(req.params);
  try {
    const post = await rejectPost.findOne({ personalString });
    if (post) {
      await rejectPost.updateOne({ personalString, isRead: false }, { $set: { isRead: true } });
      res.status(200).json({
        status: 200,
        desc: '상태 변경됨',
      });
    } else {
      res.status(200).json({
        status: 404,
        desc: '그런건 없어',
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
