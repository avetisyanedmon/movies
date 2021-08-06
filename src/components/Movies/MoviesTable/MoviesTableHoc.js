import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { moviesQuery } from './queries'



export default compose(graphql(moviesQuery));