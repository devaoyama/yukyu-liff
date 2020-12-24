import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {Controller, useForm} from "react-hook-form";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(13),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        margin: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

type TInput = {
    date: string
    days: string | undefined
    reason: string
}

const Application = () => {
    const { register, handleSubmit, formState, control } = useForm<TInput>();

    const classes = useStyles();

    const handleClick = handleSubmit(async (input) => {
        console.log(input)
        if (window.confirm('有給申請しますか？')) {
            console.log('ok');
        }
    });

    return (
        <Container maxWidth="sm">
            <div className={classes.paper}>
                <TextField
                    label="有給日"
                    name="date"
                    type="date"
                    inputRef={register}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
                <FormControl className={classes.form} fullWidth>
                    <InputLabel id="demo-simple-select-label">日数</InputLabel>
                    <Controller
                        control={control}
                        name="days"
                        defaultValue={"all"}
                        as={
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                            >
                                <MenuItem value="half">半日</MenuItem>
                                <MenuItem value="all">1日</MenuItem>
                            </Select>
                        }
                    />
                </FormControl>
                <TextField
                    label="理由"
                    name="reason"
                    type="text"
                    inputRef={register}
                    className={classes.form}
                    fullWidth
                    multiline
                    rows={4}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button
                    type="button"
                    className={classes.submit}
                    onClick={handleClick}
                    disabled={formState.isSubmitting}
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    申請
                </Button>
            </div>
        </Container>
    )
}

export default Application;
