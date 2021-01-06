import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  createStyles,
  FormControl,
  FormLabel,
  IconButton,
  makeStyles,
  Radio,
  RadioGroup,
  Theme,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import ColorButton from "./ColorButton";
import ActionIconButton from "./IconButton";
import WeekdayButton from "./WeekdayButton";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const colorList = new Array(12).fill("abc");
const weekDayList = new Array(7).fill("abc");

export default function AddressForm() {
  const classes = useStyles();

  const selectedDate = moment();

  return (
    <Box px={4} pt={3} pb={6}>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Action Name"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Box mb={-2}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Action Type</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value="female"
                style={{ flexDirection: "row" }}
                onChange={() => {}}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Done / Undone"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Quantity Fullfill"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="number"
            id="city"
            name="city"
            label="Quantity Target"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="number"
            id="city"
            name="city"
            label="Increment"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />{" "}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Unit"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Action Color</FormLabel>
            <Box display="flex" flexWrap="wrap" mx={-1} mt={1}>
              {colorList.map((_, index) => (
                <ColorButton key={index} />
              ))}
            </Box>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Action Icon</FormLabel>
            <Box display="flex" flexWrap="wrap" mx={-1} mt={1}>
              {colorList.map((_, index) => (
                <ActionIconButton key={index} />
              ))}
            </Box>
          </FormControl>
        </Grid>

        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Grid item xs={12} sm={6}>
            <KeyboardDatePicker
              disableToolbar
              fullWidth
              variant="inline"
              format="DD/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Starting Date"
              value={selectedDate}
              onChange={() => {}}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <KeyboardDatePicker
              margin="normal"
              fullWidth
              id="date-picker-dialog"
              label="Ending Date"
              format="DD/MM/yyyy"
              value={null}
              onChange={() => {}}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <Grid item xs={12}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Action Weekdays</FormLabel>
            <Box
              display="flex"
              // justifyContent="space-evenly"
              flexWrap="wrap"
              mx={-1}
              mt={1}
            >
              {weekDayList.map((_, index) => (
                <WeekdayButton key={index} />
              ))}
            </Box>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
