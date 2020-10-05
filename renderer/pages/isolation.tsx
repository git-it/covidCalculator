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
    infoDiv:{
      backgroundColor: "#e1e0e5"
    }
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

    const [isolationResultText, setIsolationResultText] = React.useState('');

    const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      // 14 days from last contact (quarantine)
      // 10 days from posative test or begin of symptom (isolation)
      //  and resolution of fever for at least 24 hours, without the use of fever-reducing medications, and with improvement of other symptoms. 
      // date_label = isoType;
      setIsolationType(event.target.value as string);
      console.log('isoType',event);
    };

    const handleDateChange = (date) => {
      // 14 days from last contact (quarantine)
      // https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/quarantine.html
      // https://www.cdc.gov/coronavirus/2019-ncov/hcp/duration-isolation.html
      // 10 days from posative test or begin of symptom (isolation)
      //  and resolution of fever for at least 24 hours, without the use of fever-reducing medications, and with improvement of other symptoms. 
      setSelectedDate(date);
      if (date!= null){
        const output = moment(date).add(10, 'd').format("MMMM Do YYYY")
        setIsolationResultText(`Infectious period: ${date.format("MMMM Do YYYY")} - ${output}
       \nYou may leave isolation and resume normal activites on ${output} `)
      }
      console.log('date',date);
      
    };

    return (
      <React.Fragment>
        <PageTemplate
          title="Isolation"
          H1Title="Isolation"
          H4Title="Isolation estimate"
        />
        <div className={classes.root}>
          {/* Last contact:   */}
          <FormControl className={classes.formControl}>
            <InputLabel id="isolation-select-label">Isolation type</InputLabel>
            <Select
              labelId="isolation-select-label"
              id="isolation-select"
              value={isolationType}
              onChange={handleSelectChange}
            >
              <MenuItem value={"date of positive test"}>Asymptomatic</MenuItem>
              <MenuItem value={"first day of symptoms"}>Symptomatic</MenuItem>
            </Select>
          
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              autoOk
              id="date-picker-inline"
              // label="Date of Last Contact"
              label={isolationType}
              clearable
              value={selectedDate}
              onChange={handleDateChange}
          />
          </MuiPickersUtilsProvider>
          </FormControl>
        <div className={classes.root} id="result">
        {/* <Typography  h5 alignCenter> */}
          {isolationResultText.split("\n").map((i,key) => {
            return <div key={key}>{i}</div>;
            })}
        {/* </Typography> */}
          <br/>
          <br/>
<div className={classes.infoDiv} >
  <p><strong>Stay home except to get medical care</strong></p>
  <ul>
  <li>Monitor your symptoms. If you have an <a href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html#seek-medical-attention">emergency warning sign</a>&nbsp;(including trouble breathing), seek emergency medical care immediately</li>
  <li>Stay in a separate room from other household members, if possible</li>
  <li>Use a separate bathroom, if possible</li>
  <li>Avoid contact with other members of the household and pets</li>
  <li>Don’t share personal household items, like cups, towels, and utensils</li>
  <li>Wear a mask when around other people, if you are able to</li>
  </ul>
  <p><a href="https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html">Learn more about what to do if you are sick.</a></p>
</div>

          <br/>
        </div>

          <Typography gutterBottom>
            * date is valid ONLY if there has NOT been a fever for at least 24 hours, without the use of fever-reducing medications, and with improvement of other symptoms. Data is calculated using information from https://www.cdc.gov
            <br/>
            <Link href="/home">Go to the home page</Link>
          </Typography>
        </div>
      </React.Fragment>
    );
  };

export default Next;
