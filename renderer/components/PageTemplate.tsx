import React from 'react';
import Head from 'next/head';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
    },
  })
);

function PageTemplate (props) {
  const classes = useStyles({});
  const [open, setOpen] = React.useState(false);
  // const handleClose = () => setOpen(false);
  // const handleClick = () => setOpen(true);

  return (
    <React.Fragment>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div className={classes.root}>
        <AppBar color="primary" position="static">
          <h1>{props.H1Title}</h1>
        </AppBar>
        
        <Typography variant="h4" gutterBottom>
          {props.H4Title}
        </Typography>

        <img src="/images/COVID-19.png"  width="280" height="140" />
      </div>
    </React.Fragment>
  );
};

export default PageTemplate;