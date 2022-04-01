import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  card: {
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '250px',
    position: 'relative',
    padding: '10px',
    margin: '10px',
    width: '25%'
  },
  search: {
      outline: 'none',
      padding: '20px 7%',
      borderRadius: '20px',
      border: 'none',
      marginBottom: '5%',
      background: 'rgba(250, 250, 250, 0.85)',
    }
  
});
