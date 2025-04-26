---
type: slides
---

# Computing the Allan Variance of Inertial Sensor Noise

---

# Data-sets

The `avar` package contains example data-sets of the AV of various inertial sensors:

- `adis_av`: Allan variance of gyroscope and accelerometer data from an ADIS 16405 sensor (data were collected by the Department of Geomatics Engineering, University of Calgary, Canada).
- `imar_av`: Allan variance of IMU Data from IMAR Gyroscopes (data were collected by the Geodetic Engineering Laboratory (TOPO), Swiss Federal Institute of Technology Lausanne (EPFL), Switzerland).
- `kvh1750_av`: Allan variance of gyroscope and accelerometer data from an KVH1750 sensor (data were collected by the Department of Geomatics Engineering, University of Calgary, Canada).
- `ln200_av`: Allan variance of LN200 gyroscope and accelerometer data (data were collected by the Geodetic Engineering Laboratory (TOPO), Swiss Federal Institute of Technology Lausanne (EPFL), Switzerland)).
- `navchip_av`:Allan variance of gyroscope and accelerometer data from a navchip sensor (data were collected by the Geodetic Engineering Laboratory (TOPO), Swiss Federal Institute of Technology Lausanne (EPFL), Switzerland).

If you are interested in having more information on these data-sets, simply type `?SENSOR_NAME_AV`. For example, you can obtain additional information on the adis data-set using `?adis_av`. In the next slides, are some examples on how to plot the AV of these sensors.

---

# Allan Variance for ADIS Data-Set

```r
data("adis_av")
plot(adis_av)
```

<div style="text-align:center"><img src="av3-1.png" alt=" " width="100%">

---

# Allan Variance for IMAR Data-Set

```r
data("imar_av")
plot(imar_av)
```

<div style="text-align:center"><img src="av4-1.png" alt=" " width="100%">

---

# Allan Variance for KVH-1750 Data-Set

```r
data("kvh1750_av")
plot(kvh1750_av)
```

<div style="text-align:center"><img src="av5-1.png" alt=" " width="100%">

---

# Allan Variance for LN-200 Data-Set

```r
data("ln200_av")
plot(ln200_av)
```

<div style="text-align:center"><img src="av6-1.png" alt=" " width="100%">

---

# Allan Variance for NAVCHIP Data-Set

```r
data("navchip_av")
plot(navchip_av)
```

<div style="text-align:center"><img src="av7-1.png" alt=" " width="100%">

---

# Creating and Importing your Own Data (1/3)

Naturally, it is also possible to load your own data and create your data-set. Here is a simple example using simulated data:

```r
# Sample size (3 min @400Hz)
n = 3*60*400

# Simulate Gyro noise
gyro_x = gen_gts(n = n, WN(sigma2 = 3e-5))
gyro_y = gen_gts(n = n, WN(sigma2 = 3e-5))
gyro_z = gen_gts(n = n, WN(sigma2 = 3e-5))

# Simulate Accel noise
accel_x = gen_gts(n = n, WN(sigma2 = 2e-4) + RW(gamma2 = 3e-9))
accel_y = gen_gts(n = n, WN(sigma2 = 2e-4) + RW(gamma2 = 3e-9))
accel_z = gen_gts(n = n, WN(sigma2 = 2e-4) + RW(gamma2 = 3e-9))
```

---

# Creating and Importing your Own Data (2/3)

```r
# Construct IMU object
my_imu = imu(cbind(gyro_x, gyro_y, gyro_z, accel_x, accel_y, accel_z), 
             gyros = 1:3, accels = 4:6, 
             axis = c('X', 'Y', 'Z', 'X', 'Y', 'Z'),
             freq = 400, name = "My new sensor")

# Compute AV
my_imu_av = avar(my_imu)
```

---

# Creating and Importing your Own Data (3/3)

We can use the data-set we have just created similarly to the ones presented before:

```r
plot(my_imu_av)
```

<div style="text-align:center"><img src="av7_2-1.png" alt=" " width="90%">

---