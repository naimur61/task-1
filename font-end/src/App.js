import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button, Checkbox, FormControlLabel, Paper, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [sectors, setSectors] = React.useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();


  React.useEffect(() => {
    fetch('https://back-end-ashy.vercel.app/allSectors')
      .then(res => res.json())
      .then(data => setSectors(data))
  }, [sectors])

  const onSubmit = data => {

    fetch('https://back-end-ashy.vercel.app/users', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged === true) {
          successToast();
        }
      })
    // reset();
  };


  const successToast = () => {
    toast.success('User add successful !', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
  };


  return (
    <Box sx={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: 'center'
    }}>
      <Paper elevation={3} sx={{
        p: 10,
        borderRadius: 3,
        mx: { xs: 4, md: 0 }
      }}
        component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{
          fontSize: '20px',
          textAlign: 'center',
          mb: 8,
          fontWeight: 600,

        }}>Please enter your name and pick the Sectors <br /> you are currently involved in.</Box>
        <Box
          sx={{
            mb: 3,
          }}
        >
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            error={!!errors?.name}
            helperText={errors?.name?.message}
            {...register("name", {
              required: "Name is required",
            })}
          />
        </Box>

        <Autocomplete
          id="free-solo-demo"
          size='small'
          options={sectors.map((option, i) => option.title)}
          renderInput={(params) => <TextField {...params} label="Sectors"
            {...register("sector", { required: "Sector is required" })}
            error={!!errors?.sector}
            helperText={errors?.sector?.message}
          />}
          sx={{ mt: 3 }}
        />



        <Box
          sx={{
            mt: 1,
            color: "GrayText",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox size="small" {...register("terms", { required: "You must agree to terms." })} />
            }
            label="Agree to terms"
          />

          {errors?.terms && (
            <Typography
              sx={{
                display: "block",
                fontSize: "12px",
                ml: 2,
              }}
              color="error"
              component="small"
            >
              {errors?.terms?.message}
            </Typography>
          )}
        </Box>


        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button size="small" type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </Paper>
      <ToastContainer />
    </Box>
  );
}

export default App;
