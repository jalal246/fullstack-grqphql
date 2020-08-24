/* eslint-disable func-names */
/* eslint-disable class-methods-use-this */
const { DataSource } = require("apollo-datasource");
const bcrypt = require("bcryptjs");

class UserAPI extends DataSource {
  constructor(User) {
    super();
    this.User = User;
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

  findOrCreateUser() {
    return "new user";
  }

  async createUser({ email, password: pwd }) {
    const alreadyExist = await this.User.findOne({ email });

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
}

module.exports = UserAPI;
