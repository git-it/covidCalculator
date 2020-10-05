import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

import Link from '../components/Link';
import PageTemplate from '../components/PageTemplate'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const Next = () => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleClick = () => setOpen(true);
    const classes = useStyles({});

    // const today = moment();
    const tenDaysFromNow = moment().add(10, 'days');
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [isolationType, setIsolationType] = React.useState('');

    const [quarantineResultText, setquarantineResultText] = React.useState('');

    const handleDateChange = (date) => {
      // 14 days from last contact (quarantine)
      // https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/quarantine.html
      // https://www.cdc.gov/coronavirus/2019-ncov/hcp/duration-isolation.html
      // 10 days from posative test or begin of symptom (isolation)
      //  and resolution of fever for at least 24 hours, without the use of fever-reducing medications, and with improvement of other symptoms. 
      setSelectedDate(date);
      if (date!= null){
        const output = moment(date).add(14, 'd').format("MMMM Do YYYY")
        setquarantineResultText(`Quarantine period: ${date.format("MMMM Do YYYY")} - ${output}
       \nYou may leave quarantine and resume normal activites on ${output} as long as you have not developed any symptoms`)
      }
      console.log('date',date);
    };
  
  return (
    <React.Fragment>
        <PageTemplate
          title="Quarantine"
          H1Title="Quarantine"
          H4Title="How to Calculate Quarantine"
        />

        <div className={classes.root}>
          {/* Last contact:   */}
          <FormControl className={classes.formControl}>
          
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              autoOk
              id="date-picker-inline"
              // label="Date of Last Contact"
              label="Date of Last Contact"
              clearable
              value={selectedDate}
              onChange={handleDateChange}
          />
          </MuiPickersUtilsProvider>
          </FormControl>
        <div className={classes.root} id="result">
        {/* <Typography  h5 alignCenter> */}
          {quarantineResultText.split("\n").map((i,key) => {
            return <div key={key}>{i}</div>;
            })}
        {/* </Typography> */}
          <br/>
          <br/>
<div>
      More information available at <a href="https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/quarantine.html">CDC Quarantine Information</a>
</div>

          <br/>
        </div>

          <Typography gutterBottom>
            <Link href="/home">Go to the home page</Link>
          </Typography>
        </div>
      </React.Fragment>
    );
  };

export default Next;
