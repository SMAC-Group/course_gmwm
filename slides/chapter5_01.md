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

```out
    Gyro. X   Gyro. Y   Gyro. Z Accel. X Accel. Y Accel. Z
1 -0.011138 -0.017646 -0.009531 1.083731 0.023897 9.638113
2 -0.006765 -0.013657 -0.021974 1.059858 0.042061 9.646901
3 -0.002779 -0.010913 -0.024058 1.060207 0.023655 9.665417
4 -0.006934 -0.021248 -0.018351 1.059921 0.027322 9.633001
5 -0.008164 -0.015213 -0.026140 1.069064 0.032950 9.643449
6 -0.004907 -0.026742 -0.011087 1.049330 0.012485 9.658759
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
attributes(wv_imu6)
```

```out
$names
[1] "dataobj" "axis"    "sensor"  "stype"   "freq"   

$class
[1] "wvar.imu"
```
---

To plot the WV (and confidence intervals) for all gyroscopes and accelerometers, we can use the following function:

```r
plot(wv_imu6)
```

<div style="text-align:center"><img src="gmwm7-1.png" alt=" " width="75%">

---

To plot the WV for each sensor type together, we can use the following:

```r
plot(wv_imu6, split = F)
```
<div style="text-align:center"><img src="gmwm8-1.png" alt=" " width="75%">

---

It is also possible to compute the robust WV on `imu` object:

```r
wv_imu6_rob = wvar(sensor, robust = TRUE)
plot(wv_imu6_rob)
```

<div style="text-align:center"><img src="gmwm9-1.png" alt=" " width="85%">
---

The comparison between the two estimator can also be done using the function `compare_wvar()`:

```r
compare_wvar(wv_imu6, wv_imu6_rob) 
```

<div style="text-align:center"><img src="gmwm10-1.png" alt=" " width="100%">

---


Next, we present a few additional examples based on datasets we presented in the previous chapters. 

```r
data("navchip")
plot(wvar(navchip))
```

<div style="text-align:center"><img src="gmwm11-1.png" alt=" " width="75%">
---

```r
data("imar.gyro")
plot(wvar(imar.gyro))
```

<div style="text-align:center"><img src="gmwm12-1.png" alt=" " width="75%">

---

```r
data("ln200.gyro")
plot(wvar(ln200.gyro))
```

<div style="text-align:center"><img src="gmwm13-1.png" alt=" " width="75%">
---

```r
data("ln200.accel")
plot(wvar(ln200.accel))
```
<div style="text-align:center"><img src="gmwm14-1.png" alt=" " width="75%">

---
