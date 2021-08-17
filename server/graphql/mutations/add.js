const GraphQLNonNull = require("graphql").GraphQLNonNull;
const GraphQLString = require("graphql").GraphQLString;
const GraphQLID = require("graphql").GraphQLID;
const ContactType = require("../types/contact");
const services = require("../../services");

exports.add = {
  type: ContactType.contactType,
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
    return services.createContact(params);
  },
};
