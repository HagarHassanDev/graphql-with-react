import { gql } from 'apollo-boost';
// to query books
const getAuthorsQuery = gql `
{
    authors{
        name
        id
    }
}`

// to query books
const getBooksQuery = gql `
{
    books{
        name
        id
    }
}`


const addBookMutation = gql `
mutation($name:String!, $genre:String!, $authorId:ID!){
    addBook(name:$name , genre:$genre, authorId:$authorId){
        name
        id
    }
}
`

const getBookQuery = gql `
query($id:ID){
    book(id:$id){
        id 
        name
        genre
        author {
            id 
            name
            books{
                name 
                id
                genre
            }
        }
    }
}`

export { getBookQuery, getAuthorsQuery, getBooksQuery, addBookMutation };