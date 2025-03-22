in gn,
new customer can from dashboard, and login
contact us or share interest fill form from dashboard and reviews


customer
after sign up => login, apply loan, loans, 
apply loan, enter pan, adhar, saleM id or null, upload docs ==>status checking>approved by manager for eligible loan>, eligible loan ds, select plan, submit,







              <div className="form-container" >
                <h2>New User Form</h2>
                <form onSubmit={handleSubmit}>
                  {/*  <form
                  action="https://zphs-school.vercel.app/new-enroll"
                  method="POST"
                >*/}
                  {/* Batch Year */}
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Role</InputLabel>
                    <Select
                      label="Rale"
                      name="role"
                      value={user.role}
                      onChange={handleChange}
                    >
                      {roles.map((role, index) => {
                        const year = new Date().getFullYear() - index;
                        return (
                          <MenuItem key={index} value={role}>
                            {role}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText error={Boolean(errors.role)}>
                      {errors.role}
                    </FormHelperText>
                  </FormControl>
                  {/* Name */}
                  <TextField
                    label="full Name"
                    name="fullName"
                    value={user.fullName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.fullName)}
                    helperText={errors.fullName}
                  />
                  {/* Father's Name */}
                  <TextField
                    label="Care Of Person"
                    name="father"
                    value={user.father}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.father)}
                    helperText={errors.father}
                  />
                  {/* Gender */}
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Gender</InputLabel>
                    <Select
                      label="Gender"
                      name="gender"
                      value={user.gender}
                      onChange={handleChange}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Email */}
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                  />
                  {/* Phone */}
                  <TextField
                    label="Phone"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.phone)}
                    helperText={errors.phone}
                  />

                  {/* Village */}
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Branch</InputLabel>
                    <Select
                      label="Branch"
                      name="Branch"
                      value={user.village}
                      onChange={handleChange}
                    >
                      {branches.map((branch) => (
                        <MenuItem key={branch?.code} value={branch?.code}>
                          {branch?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Button Actions */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    <Button
                      // onClick={() => window.history.back()}
                      onClick={() => setShowList(true)}
                      variant="outlined"
                      color="secondary"
                      style={{ flex: 1, marginRight: "10px" }} // Added margin for spacing
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ flex: 1 }} // Adjusted to take equal space
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            


            <Grid 
  container 
  spacing={2} 
  sx={{ 
    flexWrap: "nowrap", 
    overflowX: "auto", 
    display: "flex" 
  }}
>
  <Grid item xs="auto">
    <Item>Item 1 kjwhdkcsn skjh</Item>
  </Grid>
  <Grid item >
    <Item 
     sx={{width:'150px'}}>Item 2</Item>
  </Grid>
  <Grid item xs="auto">
    <Item>Item 3</Item>
  </Grid>
  <Grid item xs="auto">
    <Item>Item 2</Item>
  </Grid>
  <Grid item xs="auto">
    <Item>Item 3</Item>
  </Grid>
  <Grid item xs="auto">
    <Item>Item 2</Item>
  </Grid>
  <Grid item xs="auto">
    <Item>Item 3</Item>
  </Grid>
  <Grid item xs="auto">
    <Item>Item 2</Item>
  </Grid>
  <Grid item xs="auto">
    <Item>Item 3</Item>
  </Grid>
  <Grid item xs="auto">
    <Item>Item 4</Item>
  </Grid>
  <Grid item xs="auto">
    <Item>Item 5</Item>
  </Grid>
</Grid>
