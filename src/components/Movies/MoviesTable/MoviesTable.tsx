import { useState, useEffect, FC } from "react";
import { useQuery } from "@apollo/client";
import { moviesQuery } from "./queries";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { DELETE_MOVIE, UPDATE_MOVIE } from "../addForm/mutatuions";
import { Link } from "react-router-dom";
import  {Button, Modal} from '@material-ui/core';
import { ButtonGroup } from "@material-ui/core";


interface MovieType {
    id: string;
    name: string;
    genre?: string
}

const MoviesTable: FC = () => {

    const {error, loading, data} = useQuery(moviesQuery);
    const [updateMovie, { loading: updating, error: updateError}] = useMutation(UPDATE_MOVIE)
    const [deleteMovie, { loading: deleting, error: deleteError }] = useMutation(DELETE_MOVIE); 
    const [input, setInput] = useState(false);
    const [open, setOpen] = useState(false);
    const [movie, setMovie] = useState <MovieType | null>  (null);
    const [modalInput, setModalInput] = useState <string | null>('');
    const [sureModal, setSureModal] = useState(false);
  

    const addModal = () => {
        return(
        <ModalDiv>
            <input onChange={(e) => setModalInput(e.target.value)} defaultValue={movie?.name} />
            <Button variant="contained" color="primary"
                onClick={() => {
                    setSureModal(true)

                    }
                }>
                    Save
            </Button>
            <Button color='secondary' variant='contained' onClick={() => setOpen(false)}>X</Button>
        </ModalDiv>
        )
    };

    const saveModal = () => {
        return(
            <SaveModalDiv>
                <h2>Are you sure?</h2>
               <div>
                <Button color='primary' variant='contained'
                    onClick={() => {
                        updateMovie({
                            variables: { id: movie?.id, name: modalInput},
                            refetchQueries: [{ query: moviesQuery}]
                        })
                        setOpen(false)
                        setSureModal(false)
                    }}
                    >Yes</Button>
                    <Button color='secondary' variant='contained'
                        onClick={() => {
                            setOpen(false)
                            setSureModal(false)
                        }}
                    >Cancel</Button>
               </div>
            </SaveModalDiv>
        )
    };
  

    return (
        <Content>
            <Inner>
                {data?.movies.map((movie: MovieType) => {
                    return (
                    <InnerDiv>
                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                            <Button onClick={() => {
                                setOpen(true)
                                setMovie({
                                    id: movie.id,
                                    name: movie.name
                                })
                            } 
                            }>Edit</Button>
                            <Button onClick={(e) => {
                                deleteMovie({
                                    variables: { id: movie.id},
                                    refetchQueries: [{ query: moviesQuery}]
                                                })
                            }}>X</Button>
                        </ButtonGroup>
                        <NameDiv>
                            {movie.name}
                        </NameDiv>
                    </InnerDiv>
                    )
                })}
            </Inner>
           <Link to='/addmovie'>
            <Button color='primary' variant='contained'>
                Add movie
            </Button>
           </Link>
           <Modal open={open} >
                <div>
                    {
                        !sureModal ? addModal() : saveModal()
                    }
                </div>
           </Modal>
        </Content>
    )
}

const NameDiv = styled.div`
font-size: 22px;
font-weight: 500;
`

const Content = styled.div`
display : block;
justify-content : center;
text-align: center;
`

const InnerDiv = styled.div`
justify-content : center;
margin: 10px;
padding: 10px;
border: 1px solid black;
border-radius: 3px;
`

const Inner = styled.div`
display: flex;
justify-content: center;

`
const ModalDiv = styled.div`
width: 33vh;
background-color: whitesmoke;
padding: 25px;
margin: 25% auto;
border: 2px solid black;
border-radius: 3px;
display: flex;
text-align: center;
justify-content: space-between;
`
const SaveModalDiv = styled.div`
width: 20%;
background-color: whitesmoke;
padding: 10px;
margin: 25% auto;
border: 2px solid black;
border-radius: 3px;
display: block;
text-align: center;
`
export default MoviesTable;