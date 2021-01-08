import { forwardRef, ReactElement, Ref, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import _ from "lodash";
import {
  Dialog,
  AppBar,
  Toolbar,
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  makeStyles,
  Radio,
  RadioGroup,
  FormControlLabel,
  Theme,
  Slide,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import CloseIcon from "@material-ui/icons/Close";
import * as colors from "@material-ui/core/colors";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { toast } from "react-toastify";

import { Colors, Icons, Weekdays, ActionTypes } from "../../../utils/config";
import { errorText, getErrorData, timeout } from "../../../utils/helper";
import { Action, State, Weekday } from "../../../redux/redux";
import useMobile from "../../../hooks/useMobile";
import * as actionActions from "../../../redux/actions/action";
import ColorButton from "./ColorButton";
import ActionIconButton from "./IconButton";
import WeekdayButton from "./WeekdayButton";
import ToastMsg from "../../../components/ui/ToastMsg";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    position: "relative",
    transition: "background-color 500ms",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  colorBtnGrid: {
    display: "grid",
    gridGap: 10,
    gridTemplateColumns: "repeat(auto-fill, minmax(40px, 1fr))",
    marginTop: 12,
  },
  iconBtnGrid: {
    display: "grid",
    gridGap: 10,
    gridTemplateColumns: "repeat(auto-fill, minmax(50px, 1fr))",
    marginTop: 12,
  },
  weekdayBtnGrid: {
    display: "grid",
    gridGap: 10,
    gridTemplateColumns: "repeat(auto-fill, minmax(55px, 1fr))",
    marginTop: 12,
    marginBottom: 10,
  },
}));

const getSchema = (actionType: string) => {
  return yup.object().shape({
    name: yup.string().required(),
    ...(actionType === "number"
      ? {
          target: yup.number().required().positive().integer(),
          increment: yup.number().required().positive().integer(),
          unit: yup.string().required(),
        }
      : null),
  });
};

const getDefaultValues = (action: Action) => {
  return {
    type: action?.type || "yesNo",
    color: action?.color || Colors[0],
    icon: action?.icon || Icons[0],
    startDate: moment(action?.startDate).startOf("day"),
    endDate: action?.endDate ? moment(action.endDate).startOf("day") : null,
    weekdays: action?.weekdays || ["mon", "tue", "wed", "thu", "fri"],
  };
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  isOpen: boolean;
  selectedId?: string;
  onClose: Function;
};

const ActionForm = ({ isOpen, selectedId, onClose }: Props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isMobile = useMobile();

  const { actionList } = useSelector((state: State) => state.action);
  const action = actionList.find((a) => a.id === selectedId);
  const defaultValues = getDefaultValues(action);

  const [actionType, setActionType] = useState(defaultValues.type);
  const [actionColor, setActionColor] = useState(defaultValues.color);
  const [actionIcon, setActionIcon] = useState(defaultValues.icon);
  const [startDate, setStartDate] = useState(defaultValues.startDate);
  const [endDate, setEndDate] = useState(defaultValues.endDate);
  const [actionWeekdays, setActionWeekdays] = useState(defaultValues.weekdays);

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(getSchema(actionType)),
  });

  const toggleWeekday = (weekday: Weekday) => {
    let newWeekdays: Weekday[];
    const index = actionWeekdays.indexOf(weekday);
    if (index === -1) {
      newWeekdays = [...actionWeekdays, weekday];
    } else {
      newWeekdays = actionWeekdays.filter((w) => w !== weekday);
    }
    setActionWeekdays(newWeekdays);
  };

  const resetValues = () => {
    setActionType(defaultValues.type);
    setActionColor(defaultValues.color);
    setActionIcon(defaultValues.icon);
    setStartDate(defaultValues.startDate);
    setEndDate(defaultValues.endDate);
    setActionWeekdays(defaultValues.weekdays);
  };

  const onSubmit = async (data) => {
    const newAction: Action = _.cloneDeep(data);
    newAction.type = actionType;
    newAction.color = actionColor;
    newAction.icon = actionIcon;
    newAction.startDate = startDate.format("yyyy-MM-DD");
    newAction.endDate = endDate ? endDate.format("yyyy-MM-DD") : null;
    newAction.weekdays = actionWeekdays;

    if (newAction.type === "yesNo") {
      newAction.target = 1;
      newAction.increment = 1;
      newAction.unit = "unit";
    }

    if (action) newAction.id = action.id;

    const result: any = await dispatch(actionActions.updateAction(newAction));
    if (result.error) {
      const body = getErrorData(result.data);
      toast.error(<ToastMsg title={result.message} body={body} />);
    } else {
      toast.success(<ToastMsg title={result} />);
      await timeout();
      onClose();
    }
  };

  useEffect(() => {
    resetValues();
  }, [isOpen]);

  return (
    <Dialog
      fullScreen={isMobile}
      open={isOpen}
      onClose={() => onClose()}
      TransitionComponent={Transition}
    >
      {isOpen && (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <AppBar
            className={classes.appBar}
            style={{ backgroundColor: colors[actionColor][800] }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => onClose()}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {`${!!action ? "Edit" : "Add"} Action`}
              </Typography>
              <Button autoFocus color="inherit" type="submit">
                Save
              </Button>
            </Toolbar>
          </AppBar>
          <Box px={4} pt={3} pb={6}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Controller
                  as={TextField}
                  name="name"
                  label="Action Name"
                  control={control}
                  defaultValue={action?.name || ""}
                  required
                  fullWidth
                  error={!!errors?.name}
                  helperText={errorText(errors, "name")}
                />
              </Grid>

              <Grid item xs={12}>
                <Box mb={-1}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Action Type *</FormLabel>

                    <RadioGroup
                      aria-label="promoting"
                      style={{ flexDirection: "row" }}
                      value={actionType}
                      onChange={(e) => setActionType(e.target.value as any)}
                    >
                      {Object.keys(ActionTypes).map((key) => (
                        <FormControlLabel
                          value={key}
                          control={<Radio />}
                          label={ActionTypes[key]}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Grid>

              {actionType === "number" && (
                <>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      as={TextField}
                      type="number"
                      name="target"
                      label="Quantity Target"
                      control={control}
                      defaultValue={action?.target || 1}
                      required
                      fullWidth
                      variant="outlined"
                      error={!!errors?.target}
                      helperText={errorText(errors, "target")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      as={TextField}
                      type="number"
                      name="increment"
                      label="Quantity Increment"
                      control={control}
                      defaultValue={action?.increment || 1}
                      required
                      fullWidth
                      variant="outlined"
                      error={!!errors?.increment}
                      helperText={errorText(errors, "increment")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      as={TextField}
                      name="unit"
                      label="Quantity Unit"
                      control={control}
                      defaultValue={action?.unit || "unit"}
                      required
                      fullWidth
                      variant="outlined"
                      error={!!errors?.unit}
                      helperText={errorText(errors, "unit")}
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <FormControl component="fieldset" style={{ width: "100%" }}>
                  <FormLabel component="legend">Action Color *</FormLabel>
                  <Box className={classes.colorBtnGrid}>
                    {Colors.map((color) => (
                      <ColorButton
                        key={`color-btn-${color}`}
                        color={color}
                        selected={actionColor}
                        onSelect={(selected) => setActionColor(selected)}
                      />
                    ))}
                  </Box>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset" style={{ width: "100%" }}>
                  <FormLabel component="legend">Action Icon *</FormLabel>
                  <Box className={classes.iconBtnGrid}>
                    {Icons.map((icon) => (
                      <ActionIconButton
                        key={`icon-btn-${icon}`}
                        icon={icon}
                        color={actionColor}
                        selected={actionIcon}
                        onSelect={(selected) => setActionIcon(selected)}
                      />
                    ))}
                  </Box>
                </FormControl>
              </Grid>

              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    fullWidth
                    autoOk
                    required
                    label="Starting Date"
                    format="DD/MM/yyyy"
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    maxDate={endDate || undefined}
                    error={!!errors?.startDate}
                    helperText={errorText(errors, "startDate")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    clearable
                    fullWidth
                    autoOk
                    label="Ending Date"
                    format="DD/MM/yyyy"
                    value={endDate}
                    onChange={(date) => setEndDate(date as any)}
                    minDate={startDate}
                    error={!!errors?.endDate}
                    helperText={errorText(errors, "endDate")}
                  />
                </Grid>
              </MuiPickersUtilsProvider>

              <Grid item xs={12}>
                <FormControl component="fieldset" style={{ width: "100%" }}>
                  <FormLabel component="legend">Action Weekdays *</FormLabel>
                  <Box className={classes.weekdayBtnGrid}>
                    {Weekdays.map((weekday) => (
                      <WeekdayButton
                        key={`weekday-btn-${weekday}`}
                        weekday={weekday}
                        active={actionWeekdays.includes(weekday)}
                        onSelect={() => toggleWeekday(weekday)}
                      />
                    ))}
                  </Box>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  color="primary"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      )}
    </Dialog>
  );
};

export default ActionForm;
