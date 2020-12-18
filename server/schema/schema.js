const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;




// const authors = [
//     { id: '1', name: 'J. K. Rowling' },
//     { id: '2', name: 'J. R. R. Tolkien' },
//     { id: '3', name: 'Brent Weeks' }
// ]

// const books = [
//     { genre: 'fantasy', id: '1', name: 'Harry Potter and the Chamber of Secrets', authorId: '1' },
//     { genre: 'fantasy', id: '2', name: 'Harry Potter and the Prisoner of Azkaban', authorId: '1' },
//     { genre: 'fantasy', id: '3', name: 'Harry Potter and the Goblet of Fire', authorId: '1' },
//     { genre: 'fantasy', id: '4', name: 'The Fellowship of the Ring', authorId: '2' },
//     { genre: 'fantasy', id: '5', name: 'The Two Towers', authorId: '2' },
//     { genre: 'fantasy', id: '6', name: 'The Return of the King', authorId: '2' },
//     { genre: 'fantasy', id: '7', name: 'The Way of Shadows', authorId: '3' },
//     { genre: 'fantasy', id: '8', name: 'Beyond the Shadows', authorId: '3' }
// ]


const BookType = new GraphQLObjectType({
    name: 'Book',
    //fields is function as it will call each other 
    // so we make it a function to not be exectued unitll it be called
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                //return authors.find(author => author.id === parent.authorId);
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        books: {
            // each author will have list of books
            type: new GraphQLList(BookType),
            resolve: (parent, args) => {
                //  return books.filter(book => book.authorId === parent.id)
                return Book.find({ authorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from DB / other source
                // return books.find(book => book.id === args.id);
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                //return authors.find(author => author.id === args.id)
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: (parent, args) => {
                //return books;
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve: (parent, args) => {
                // return authors;
                return Author.find({});
            }
        }
    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                // to add you need to send the name of the author
                name: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                // Author is our mongo model/collection
                let author = new Author({
                    name: args.name
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                // to add you need to send the name , genre , author id
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                // Book is our mongo model/collection
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});