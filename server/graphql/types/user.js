const GraphQLObjectType = require('graphql').GraphQLObjectType
const GraphQLNonNull = require('graphql').GraphQLNonNull
const GraphQLID = require('graphql').GraphQLID
const GraphQLString = require('graphql').GraphQLString

exports.userType = new GraphQLObjectType({
  name: 'user',
  fields: function() {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      Name: {
        type: GraphQLString
      },
      Phone: {
        type: GraphQLString
      }
    }
  }
})