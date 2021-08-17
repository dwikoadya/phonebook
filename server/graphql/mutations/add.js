const GraphQLNonNull = require("graphql").GraphQLNonNull;
const GraphQLString = require("graphql").GraphQLString;
const GraphQLID = require("graphql").GraphQLID;
const UserType = require("../types/user");
const services = require("../../services");

exports.add = {
  type: UserType.userType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    Name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    Phone: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(root, params) {
    return services.createUser(params);
  },
};
