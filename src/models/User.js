const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // parolayı gizle
    },
    refresh_token: {
      type: String,
      default: null,
      select: false, // refresh token'ı gizle
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password; // parolayı JSON çıktısından çıkar
        delete ret.refresh_token; // refresh token'ı JSON çıktısından çıkar
        delete ret.__v; // __v'yi JSON çıktısından çıkar
        return ret;
      },
    },
  }
);

// Parolayı hashle
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Parola karşılaştırma
userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = await this.constructor.findById(this._id).select("+password");
  if (!user?.password) {
    throw new Error("Parola yüklenemedi.");
  }
  return await bcrypt.compare(candidatePassword, user.password);
};

// Parolayı güncelle
userSchema.methods.updatePassword = async function (newPassword) {
  const user = await this.constructor.findById(this._id).select("+password");
  if (!user) throw new Error("Kullanıcı bulunamadı");
  user.password = newPassword;
  return await user.save();
};

// refresh_token'ı getir
userSchema.methods.getRefreshToken = async function () {
  const user = await this.constructor
    .findById(this._id)
    .select("+refresh_token");
  return user.refresh_token;
};

// refresh_token'ı güncelle
userSchema.methods.updateRefreshToken = async function (
  newRefreshToken = null
) {
  const user = await this.constructor
    .findById(this._id)
    .select("+refresh_token");
  user.refresh_token = newRefreshToken;
  return await user.save();
};

module.exports = mongoose.model("User", userSchema);
