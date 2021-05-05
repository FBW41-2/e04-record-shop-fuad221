const Record =require('../models/Record')
exports.getRecords = (req, res, next) => {
  const {recordsPerPage,pageNumber,sortOrder,sortField,search} = req.query
//access Db
  Record.find({title:{$regex:search,$options:"i"}},(err, records) => {
      if (err) return console.error(err);
      res.json(records)
  })
  .limit(Number(recordsPerPage))
  //Start from specific entry number
  .skip(pageNumber * recordsPerPage)
  .sort({[sortField]:sortOrder})
};
// get specific record
exports.getRecord = (req, res, next) => {
  const { id } = req.params;
    console.log("get record", req.id)
    Record.findById(id, (err, entry) => {
      if (err) return res.json({error: err});
      res.json(entry)
    })
  };
exports.deleteRecord = (req, res, next) => {
  const {id}= req.params;
  Record.findByIdAndRemove(id,(err,entry)=>{
    if(err) return res.json({error:err})
    res.json({deleted:entry})
  })
};
exports.updateRecord = (req, res, next) => {
  const {id} = req.params
  Record.findByIdAndUpdate(id,req.body,{new:true},(err,entry)=>{
    if(err) return res.json({error:err})
    res.json(entry)
  })
};
exports.addRecord = (req, res, next) => {
  record=req.body
  Record.create(record,(err,entry)=>{
    if (err) return res.json({error:err})
    res.json(entry)
  })
};