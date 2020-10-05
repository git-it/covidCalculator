import React from 'react'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button'
import PageTemplate from '../components/PageTemplate'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
    },
  })
);

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClick = () => setOpen(true);
  const classes = useStyles({});

  return (
    <React.Fragment>
      <PageTemplate
        title="Isolation/Quarantine Calculator"
        H1Title="Home"
        H4Title="How were you associated with the virus?"
      />
      <div className={classes.root}>
        <p></p>
          <Button variant="contained" color="primary" href="/quarantine">
            In contact with an infected person (Quarantine)
          </Button>
        <p></p>
          <Button variant="contained" color="primary" href="/isolation">
            Infected (Isolation)
          </Button>
      </div>
    </React.Fragment>
  );
};

export default Home;
