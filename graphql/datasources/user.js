/* eslint-disable func-names */
/* eslint-disable class-methods-use-this */
const { DataSource } = require("apollo-datasource");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserAPI extends DataSource {
  constructor(UserModel) {
    super();
    this.User = UserModel;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  async getUserByEmail({ email }) {
    return this.User.findOne({ email });
  }

  async getUserID({ _id }) {
    const user = await this.User.findById(_id);

    return user;
  }

  async addEventByUserID({ userID, event }) {
    const user = await this.getUserID({ _id: userID });

    if (user && event) {
      user.createdEvents.push(event);

      const res = await user.save();

      const {
        _doc: { password, ...rest },
      } = res;

      return rest;
    }

    throw new Error(`User ID not found`);
  }

  async createUser({ email, password: pwd }) {
    const alreadyExist = await this.getUserByEmail({ email });

    if (alreadyExist) {
      throw new Error("User exists already!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pwd, salt);

    const newUser = new this.User({ email, password: hashedPassword });

    const res = await newUser.save();

    const {
      _doc: { password, ...rest },
    } = res;

    return rest;
  }

  async login({ email, password }) {
    const user = await this.getUserByEmail({ email });

    if (!user) {
      throw new Error("User doesn't exist!");
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      throw new Error("Password is incorrect!");
    }

    const tokenExpiration = "1h";

    const { _id: userID, email: userEmail } = user;

    const token = jwt.sign(
      // eslint-disable-next-line no-underscore-dangle
      { userID: user._id, email: userEmail },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );

    return {
      userID,
      token,
      tokenExpiration,
    };
  }
}

module.exports = UserAPI;
