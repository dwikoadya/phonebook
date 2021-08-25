const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLList = require("graphql").GraphQLList;
const services = require("../../services");
const contactType = require("../types/contact").contactType;

exports.queryType = new GraphQLObjectType({
  name: "Query",
  fields: function () {
    return {
      phones: {
        type: new GraphQLList(contactType),
        resolve: services.getContacts,
      },
    };
  },
});
