import allowPost from '../../database/models/allowPost';
import waitPost from '../../database/models/waitPost';

exports.sendPost=async (req,res)=>{
    try{
        const idx = await waitPost.find().sort({ "idx":-1 }).limit(1);
        const {
            images,
            ...data
        } = req.body;
        console.log(idx);
        console.log(idx==false);
        idx == false ? data.idx = 1 : data.idx = idx[0].idx + 1;
        await waitPost.create(data); 
        const result = {
            "status":200,
        }
        return res.status(200).json(result);
    }catch(error){
        const result={
            "status":500,
            "code":0,
            "desc":"unknown error 서지녁에게 문의할 것",
            "error":error.message
        };
        console.log(error.message);
        res.status(200).json(result);
    }
}