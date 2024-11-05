import mongoose from "mongoose";

const DBCon = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected with MONGODB");
  } catch (error) {
    console.log(`Error + ${error.message}`);
  }
};

export default DBCon;
