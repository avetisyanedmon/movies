import React, { FC } from 'react';
import { useState } from 'react'
import { useMutation } from '@apollo/client';
import { ADD_MOVIE } from './mutatuions';
import styled from 'styled-components';
import { moviesQuery } from '../MoviesTable/queries';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';






const AddForm: FC = () => {

    
    const [addMovie, { data, loading, error }] = useMutation(ADD_MOVIE);   

    const [inputTitle,setInputTitle] = useState('');


    return (
        <Div>
            <input value={inputTitle}
             onChange={(e) => {
                 setInputTitle(e.target.value)
             }}/>
            <Button variant="contained" color="primary" 
                onClick={(e) =>{
                    e.preventDefault()
                    addMovie({
                        variables: {name: inputTitle},
                        refetchQueries: [{ query: moviesQuery }]
                    })
                    setInputTitle('')
            }}>Add</Button>
            <Link to='/'>
                <Button variant="contained" color="secondary" >
                    Return
                </Button>
            </Link>
        </Div>
    )
};


const Button1 = styled.button`
border-radius: 5px;
margin-left: 15px;

`
const Div = styled.div`
width: 30%;
padding-top: 25px;
display: flex;
justify-content: center;
margin: 0 auto;

` 

export default AddForm;