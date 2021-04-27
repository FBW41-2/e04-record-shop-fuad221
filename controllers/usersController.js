const mongodb = require("mongodb");

exports.getUsers = (req, res, next) => {
    req.app.locals.db
    .collection("users")   // inter 
    .find()                  //  method to get 
    .toArray((err, docs) => {
      res.json(docs);
    });
}

exports.getUser = (req, res, next) => {
    const { id } = req.params;
    req.app.locals.db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectID(id) }, (err, result) => {
        res.json(result);
      });
}

exports.deleteUser = (req, res, next) => {
    const { id } = req.params;
  req.app.locals.db
    .collection("users")
    .deleteOne({ _id: new mongodb.ObjectID(id) }, (err, result) => {
      if (err) console.error(err);
      console.log("del result", result);
      res.json({ deleted: result.deletedCount });
    });
}

exports.updateUser = (req, res, next) => {
    const { id } = req.params;
    const user = req.body
  req.app.locals.db.collection("users").updateOne(
    // filter
    { _id: new mongodb.ObjectID(id) },
    // new data
    {
      $set: user,
    },
    // callback function
    (err, entry) => {
      res.json(entry);
    }
  );
}

exports.addUser = (req, res, next) => {
    const user = req.body;
  // access db from global object
  req.app.locals.db.collection("users").insertOne(user, (err, entry) => {
    res.json(entry);
  });

}