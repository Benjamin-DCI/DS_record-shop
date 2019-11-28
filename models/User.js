const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const superSecretKey = "superSecretKey";

const Address = require("./Address");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },

    tokens: [
      {
        access: {
          type: String,
          required: true
        },
        token: {
          type: String,
          required: true
        }
      }
    ],

    password: {
      type: String,
      required: true
    },

    address: Address
  },
  {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);

UserSchema.virtual("fullName").get(function() {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.methods.generateAuthToken = () => {
  const user = this;
  const access = "auth";

  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, superSecretKey)
    .toString();

  user.tokens.push({ access, token });

  return token;
};

UserSchema.statics.findByToken = () => {
  const User = this;

  let decoded;

  try {
    decoded = jwt.verify(token, superSecretKey);
  } catch (e) {
    return;
  }

  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  }).select("-password -__v");
};

module.exports = mongoose.model("User", UserSchema);
