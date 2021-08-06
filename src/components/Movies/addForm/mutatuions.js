import { gql } from "@apollo/client";

export const ADD_MOVIE = gql`
    mutation addMovie($name: String! ){
        addMovie(name: $name){
        name
        }
    }
`

export const DELETE_MOVIE = gql`
    mutation deleteMovie($id: ID! ){
        deleteMovie(id: $id){
        id
        }
    }
`
export const UPDATE_MOVIE = gql`
    mutation updateMovie($id: ID, $name: String!) {
        updateMovie(id: $id, name: $name) {
            id
        name
        }
    }
`