import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Alert from "@material-ui/lab/Alert";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {Controller, useForm} from "react-hook-form";
import {useRouter} from "next/router";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(13),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    alert: {
        marginBottom: theme.spacing(5)
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

const Index = () => {
    const [error, setError] = useState(false);

    const { register, errors, handleSubmit, formState, control } = useForm<TInput>();

    const router = useRouter();

    const classes = useStyles();

    const handleClick = handleSubmit(async ({ date, days, reason }) => {
        if (window.confirm('有給申請しますか？')) {
            const body = {
                idToken: liff.getIDToken(),
                date,
                days,
                reason,
            };
            const response = await fetch(process.env.GAS_URL, {
                method: "post",
                body: JSON.stringify(body)
            });
            if (await response.text() !== 'ok') {
                setError(true);
                return;
            }
            await router.push('/application/complete');
        }
    });

    return (
        <Container maxWidth="sm">
            <div className={classes.paper}>
                {error && (
                    <Alert severity="error" className={classes.alert}>
                        エラーが発生しました。もう一度やり直してください
                    </Alert>
                )}

                <TextField
                    label="有給日"
                    name="date"
                    type="date"
                    inputRef={register({
                        required: { value: true, message: "日付を選択してください" },
                    })}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    error={!!errors.date}
                    helperText={errors.date?.message}
                />
                <FormControl className={classes.form} fullWidth>
                    <InputLabel id="demo-simple-select-label">日数</InputLabel>
                    <Controller
                        control={control}
                        name="days"
                        defaultValue={"半日"}
                        as={
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                            >
                                <MenuItem value="半日">半日</MenuItem>
                                <MenuItem value="1日">1日</MenuItem>
                            </Select>
                        }
                    />
                </FormControl>
                <TextField
                    label="理由"
                    name="reason"
                    type="text"
                    inputRef={register({
                        required: { value: true, message: "理由を入力してください" },
                    })}
                    className={classes.form}
                    fullWidth
                    multiline
                    rows={4}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={!!errors.reason}
                    helperText={errors.reason?.message}
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

export default Index;
