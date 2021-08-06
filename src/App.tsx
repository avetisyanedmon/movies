import React from 'react';
import AddForm from './components/Movies/addForm/AddForm';
import MoviesTable from './components/Movies/MoviesTable/MoviesTable';
import { BrowserRouter as Router, Route} from 'react-router-dom'




const App:React.FC=()=> {
  return (
    <Router>
      <div className="App">
         <Route path='/' exact component={MoviesTable}/>
         <Route path='/addmovie' component={AddForm}/>
      </div>
    </Router>
  );
}

export default App;
