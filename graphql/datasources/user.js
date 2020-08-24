/* eslint-disable func-names */
/* eslint-disable class-methods-use-this */
const { DataSource } = require("apollo-datasource");
const bcrypt = require("bcryptjs");

class UserAPI extends DataSource {
  constructor(User) {
    super();
    this.User = User;
    console.log("UserAPI -> constructor -> User", User);
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

  createUser({ email, password }) {
    console.log("createUser -> email, password", email, password);
    return bcrypt.genSalt(10, function (errSalt, salt) {
      return bcrypt.hash(password, salt, function (errHash, hash) {
        console.log("createUser -> hash", hash);
        console.log("createUser -> newUser", this);

        return null;
        const newUser = new this.User({ email, password: hash });

        return newUser
          .save()
          .then((res) => {
            // eslint-disable-next-line no-underscore-dangle
            return { ...res._doc };
          })
          .catch((err) => {
            throw err;
          });
      });
    });
  }
}

module.exports = UserAPI;
