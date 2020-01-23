---
type: slides
---


# Computing the Wavelet Variance of an IMU

---

The `gmwm` package contains several functions that are spefically adapted to work with inertial sensor data. The first step to take in order to make use of these features is, of course, to load the IMU calibration dataset using either the function `read.imu()` (specifically  tailored to loading certain IMU  measurements) or the general `R` function `read.table()`. 

Below we provide several examples with real inertial data from the `imudata` package. Our first example is based on the signal issued from a MEMS IMU (XSens MTi-G) which is simply saved in a matrix format: 

```r
library(imudata)
data("imu6")
head(imu6)
```

---

To use the data within the `gmwm` package it is preferable to first wrap the data within an objecto of type imu:

```r
sensor = imu(imu6, 
             gyros = 1:3,
             accels = 4:6, 
             axis = c('X','Y','Z','X','Y','Z'),
             freq = 100)
```

We can then simply compute the WV as follows:

```r
wv_imu6 = wvar(sensor)
wv_imu6
```
---

To plot the WV (and confidence intervals) for all gyroscopes and accelerometers, we can use the following function:

```r
plot(wv_imu6)
```

---

To plot the WV for each sensor type together, we can use the following:

```r
plot(wv_imu6, split = F)
```

---

It is also possible to compute the robust WV on `imu` object:

```r
wv_imu6_rob = wvar(sensor, robust = TRUE)
plot(wv_imu6_rob)
```

---

The comparison between the two estimator can also be done using the function `compare_wvar()`:

```r
compare_wvar(wv_imu6, wv_imu6_rob) 
```

---


Next, we present a few additional examples based on datasets we presented in the previous chapters. 

```r
data("navchip")
plot(wvar(navchip))
```

---

```r
data("imar.gyro")
plot(wvar(imar.gyro))
```

---

```r
data("ln200.gyro")
plot(wvar(ln200.gyro))
```

---

```r
data("ln200.accel")
plot(wvar(ln200.accel))
```

---
