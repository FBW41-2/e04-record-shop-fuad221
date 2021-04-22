// first step with task2
// setCors is a const 
exports.setCors = (req, res, next) => {
    //when you want sent data to server .... for scuricty
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, x-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};

// 2 step : i must go to app.js