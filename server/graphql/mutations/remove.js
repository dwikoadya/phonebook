const GraphQLNonNull = require("graphql").GraphQLNonNull;
const GraphQLID = require("graphql").GraphQLID;
const UserType = require("../types/user");
const services = require("../../services");

exports.remove = {
  type: UserType.userType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(root, params) {
    return services.deleteUser(params);
  },
};
