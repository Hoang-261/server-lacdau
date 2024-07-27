const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://lacdau:lacdauPass@cluster0.kn5t0t0.mongodb.net/lacdau_server?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("connect successfully !");
  } catch (error) {
    console.log("connect failure!");
  }
}

module.exports = { connect };
