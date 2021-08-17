const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLList = require("graphql").GraphQLList;
const services = require("../../services");
const userType = require("../types/user").userType;

exports.queryType = new GraphQLObjectType({
  name: "Query",
  fields: function () {
    return {
      users: {
        type: new GraphQLList(userType),
        resolve: services.getUsers,
      },
    };
  },
});
