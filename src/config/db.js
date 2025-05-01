const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB bağlantısı başarılı");
  } catch (error) {
    console.error("❌ MongoDB bağlantı hatası:", error.message);
    process.exit(1); // Uygulama dursun
  }
};

module.exports = connectDB;
