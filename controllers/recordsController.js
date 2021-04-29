const {Schema, model} = require('mongoose')
//record schema
const recordSchema = new Schema({
    artist: String,
    album_name: String,
    year: Number,
    price: Number
})

//record template , i need that when i need data
const Record = model('Record', recordSchema)

exports.getOrders = (req, res, next) => {
    req.app.locals.db
    .collection("orders")   // inter 
    .find()                  //  method to get 
    .toArray((err, docs) => {
      res.json(docs);
    });
}

// get all records
exports.getRecords = (req, res, next) => {
  // access db from global object   // select all records
  req.app.locals.db
    .collection("records")   // inter 
    .find()                  //  method to get 
    .toArray((err, docs) => {
      res.json(docs);
    });
};
// get specific record
exports.getRecord = (req, res, next) => {
  const { id } = req.params;    //why we use the params
  req.app.locals.db
    .collection("records")
    .findOne({ _id: new mongodb.ObjectID(id) }, (err, result) => {
      res.json(result);
    });
};
// delete one record
exports.deleteRecord = (req, res, next) => {
  const { id } = req.params;  
  req.app.locals.db
    .collection("records")
    .deleteOne({ _id: new mongodb.ObjectID(id) }, (err, result) => {
      if (err) console.error(err);
      console.log("del result", result);
      res.json({ deleted: result.deletedCount });
    });
};
// update one record
exports.updateRecord = (req, res, next) => {
  const { id } = req.params;
  req.app.locals.db.collection("records").updateOne(
    // filter
    { _id: new mongodb.ObjectID(id) },
    // new data
    {
      $set: req.body,
    },
    // callback function
    (err, entry) => {
      res.json(entry);
    }
  );
};
// create new record
exports.addRecord = (req, res, next) => {
  const record = req.body;
  // create new record
  const newRecord = new Record(req.body)
  newRecord.save((err, netry) => {
    if(err) return console.error(err);
    res.json(entry)
  })
};