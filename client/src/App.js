import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider  } from 'react-apollo';
  //components 
  import BookList from './components/BookList';
  import AddBook from './components/AddBook';

// the graphql client 
const client = new ApolloClient({
   // uri:"http://localhost:5000/graphql"
    uri : https://graphql-react-books.herokuapp.com/
});

class App extends Component {
  render (){
    return (
      <ApolloProvider client={client}>

    <div className="main">
      <h1>Hagar readingList</h1>
      <BookList/>
      <AddBook/>
    </div>
    </ApolloProvider>
  );
}
}

export default App;
