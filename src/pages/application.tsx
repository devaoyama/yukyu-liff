import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

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

const Application = () => {
    const [date, setDate] = useState('');

    const [days, setDays] = useState(null);

    const [reason, setReason] = useState('');

    const [isSubmitted, setSubmitted] = useState(false);

    const classes = useStyles();

    const handleClick = () => {
        if (window.confirm('有給申請しますか？')) {
            console.log('ok');
            setSubmitted(true);
        }
    }

    if (isSubmitted) {
        return (
            <div>送信完了</div>
        )
    }

    return (
        <Container maxWidth="sm">
            <div className={classes.paper}>
                <TextField
                    label="有給日"
                    type="date"
                    value={date}
                    onChange={event => setDate(event.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
                <FormControl className={classes.form} fullWidth>
                    <InputLabel id="demo-simple-select-label">日数</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={days}
                        onChange={event => setDays(event.target.value)}
                    >
                        <MenuItem value={1}>半日</MenuItem>
                        <MenuItem value={2}>1日</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    type="text"
                    label="理由"
                    value={reason}
                    onChange={event => setReason(event.target.value)}
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
