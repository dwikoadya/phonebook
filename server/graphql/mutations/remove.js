const GraphQLNonNull = require("graphql").GraphQLNonNull;
const GraphQLID = require("graphql").GraphQLID;
const ContactType = require("../types/contact");
const services = require("../../services");

exports.remove = {
  type: ContactType.contactType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(root, params) {
    return services.deleteContact(params);
  },
};
