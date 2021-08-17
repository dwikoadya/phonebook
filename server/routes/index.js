var express = require("express");
var router = express.Router();
var firebase = require("firebase");

//Fetch Instances
router.get("/", function (req, res) {
  const userReference = firebase.database().ref("/Phones");
  //Attach an asynchronous callback to read the data
  userReference.on(
    "value",
    function (snapshot) {
      console.log(snapshot.val());
      res.json(snapshot.val());
      userReference.off("value");
    },
    function (errorObject) {
      console.log(`The read failed: ${errorObject.code}`)
      res.send(`The read failed: ${errorObject.code}`)
    }
  );
});

//Create new instance
router.post("/", function (req, res) {
  const id = Date.now();
  const { name, phone } = req.body;

  const referencePath = "/Phones/" + id + "/";
  const userReference = firebase.database().ref(referencePath);
  userReference.set({ Name: name, Phone: phone }, function (error) {
    if (error) {
      res.send(`Data could not be saved. ${error}`)
    } else {
      res.send("Data saved successfully");
    }
  });
});

router.put("/:id", function (req, res) {
  var id = req.params.id;
  var name = req.body.name;
  var phone = req.body.phone;

  var referencePath = `/Phones/${id}/`;
  var userReference = firebase.database().ref(referencePath);
  userReference.update({ Name: name, Phone: phone }, function (error) {
    if (error) {
      res.send(`Data could not be updated. ${error}`);
    } else {
      res.send("Data updated successfully.");
    }
  });
});

router.delete("/:id", function (req, res) {
  var id = req.params.id;
  var referencePath = `/Phones/${id}/`;
  var userReference = firebase.database().ref(referencePath)
  userReference.remove((error) => {
    if (error) {
      res.send(`Data could not be deleted. ${error}`)
    } else {
      res.send("Data deleted successfully")
    }
  })
});

module.exports = router;
