const firebase = require("firebase");

const getUsers = () => {
  const userReference = firebase.database().ref("/Phones");
  return new Promise((resolve, reject) => {
    userReference.on(
      "value",
      function (snapshot) {
        const folders = snapshot.val();
        if (folders === null) {
          resolve([]);
        } else {
          const data = Object.keys(folders).map((item) =>
            Object.assign({ id: item }, folders[item])
          );
          resolve(data);
        }
        userReference.off("value");
      },
      (errorObject) => {
        console.log(`The read failed: ${errorObject.code}`);
        reject(`The read failed: ${errorObject.code}`);
      }
    );
  });
};

const createUser = (user) => {
  const referencePath = `/Phones/${user.id}`;
  const userReference = firebase.database().ref(referencePath);
  return new Promise((resolve, reject) => {
    userReference.set({ Name: user.Name, Phone: user.Phone }, (error) => {
      if (error) {
        reject(`Data could not be created ${error}`);
      } else {
        resolve(user);
      }
    });
  });
};

const updateUser = (user) => {
  const referencePath = `/Phones/${user.id}`;
  const userReference = firebase.database().ref(referencePath);
  return new Promise((resolve, reject) => {
    userReference.update(
      { Name: user.Name, Phone: user.Phone },
      (error) => {
        if (error) {
          reject(`Data could not be updated ${error}`);
        } else {
          resolve(user);
        }
      }
    );
  });
};

const deleteUser = (user) => {
  const referencePath = `/Phones/${user.id}`;
  const userReference = firebase.database().ref(referencePath);
  return new Promise((resolve, reject) => {
    userReference.remove((error) => {
      if (error) {
        reject(`Data could not be deleted ${error}`);
      } else {
        resolve(user);
      }
    });
  });
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
