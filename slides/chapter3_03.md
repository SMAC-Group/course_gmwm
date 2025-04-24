---
type: slides
---

# Allan Variance-based Regression for Time Series Model Estimation

---

# Fitting Allan Variance-based Linear Regression Method (1/6)

The Allan Variance-based Linear Regression or AVLR is a technique to estimate the parameters of latent (or composite) stochastic processes. This method is implemented in the `avar` package in the `avlr` function (for more infomation `?avlr`). We will use the data presented previously as well as simulated data to illustrate how the method works. 

Let us start with a simple simulated example where the true data generating process is a white noise together with a random walk (i.e. `WN() + RW()`). 

```r
# Sample size
N = 100000

# Model
mod = WN(sigma2 = 1) + RW(gamma2 = 1e-4)

# Simulate time series
set.seed(12)
Xt = gen_gts(n = n, model = mod)
```

---

# Fitting Allan Variance-based Linear Regression Method (2/6)

```r
av = avar(Xt)   # Compute AV
plot(av)        # Plot av
```

<div style="text-align:center"><img src="av8-1.png" alt=" " width="75%">

---

# Fitting Allan Variance-based Linear Regression Method (3/6)

Based on this graph, we will use the first 6 scales to estimate the WN process and the last 5 for the RW component:

```r
# Fit AVLR
fit = avlr(av, wn = 1:6, rw = 8:12)
fit
```

```out
## 
##  Estimates: 
##         Value
## WN 1.01332723
## RW 0.01067604
```

Note that you can also `fit = avlr(Xt, wn = 1:8, rw = 11:15)` but this is slower as the AV is recomputed

---

# Fitting Allan Variance-based Linear Regression Method (4/6)

To assess whether the fitted model appears reasonable using the function `plot()`:

```r
plot(fit)
```

<div style="text-align:center"><img src="av9-1.png" alt=" " width="75%">

---

# Fitting Allan Variance-based Linear Regression Method (5/6)

It is possible to visualize the contribution of each process as follows:

```r
plot(fit, decomp = TRUE)
```

<div style="text-align:center"><img src="av10-1.png" alt=" " width="75%">

---

# Fitting Allan Variance-based Linear Regression Method (6/6)

Additionally, one can also visualize the scales that were used for the different processes:

```r
plot(fit, decomp = TRUE, show_scales = TRUE)
```

<div style="text-align:center"><img src="av11-1.png" alt=" " width="75%">

---

# Example: IMAR Data-Set (1/5)

The same approach can be employed with one of the gyroscope (say X-axis) of the IMAR data-set:

```r
imar_gyro_x = imar_av$avar$`Gyro. X`
plot(imar_gyro_x)
```

<div style="text-align:center"><img src="av12-1.png" alt=" " width="75%">

---

# Example: IMAR Data-Set (2/5)

A WN appears to be a reasonable initial model and we will use the first 14 scales of the AV to estimate its parameter:

```r
imar_gyro_x_mod = avlr(imar_gyro_x, wn = 1:14)
imar_gyro_x_mod
```

```out
## 
##  Estimates: 
##           Value
## WN 2.576436e-05
```

---

# Example: IMAR Data-Set (3/5)

```r
plot(imar_gyro_x_mod)
```

<div style="text-align:center"><img src="av13-1.png" alt=" " width="75%">

---

# Example: IMAR Data-Set (4/5)

Similarly, we can fit a WN using the first 14 scales of all three axes:

```r
fit_imar = avlr(imar_av, wn_gyro = 1:14)
fit_imar
```

```out
## 
##  Estimates for gyroscopes: 
##           Value
## WN 3.010817e-05
```

---

# Example: IMAR Data-Set (5/5)

```r
plot(fit_imar)
```

<div style="text-align:center"><img src="av14-1.png" alt=" " width="100%">

---

# Example: LN-200 Data-Set (1/7)

Next, we consider an example with the ln200 IMU. Let us start with a gyroscope, say Y-axis:

```r
ln200_gyro_y = ln200_av$avar$`Gyro. Y`
plot(ln200_gyro_y)
```

<div style="text-align:center"><img src="av15-1.png" alt=" " width="75%">

---

# Example: LN-200 Data-Set (2/7)

A WN appears reasonable in this case and we use the first 18 scales to estimate its parameter:

```r
ln200_gyro_y_mod = avlr(ln200_gyro_y, wn = 1:18)
plot(ln200_gyro_y_mod, show_scales = TRUE)
```

<div style="text-align:center"><img src="av16-1.png" alt=" " width="75%">

---

# Example: LN-200 Data-Set (3/7)

We can also consider an accelerometer (Y-axis again):

```r
ln200_acc_y = ln200_av$avar$`Accel. Y`
plot(ln200_acc_y)
```

<div style="text-align:center"><img src="av17-1.png" alt=" " width="75%">

---

# Example: LN-200 Data-Set (4/7)

In this case, the AV is decreasing at a faster rate than in the previous example. This may indicate the presence of a quantization noise process or QN(). Therefore, we consider a QN together with a RW. Let’s use the first 16 scales of the QN and the last 5 for the RW component:

---

# Example: LN-200 Data-Set (5/7)
```r
ln200_acc_y_mod = avlr(ln200_acc_y, qn = 1:16, rw = 18:22)
plot(ln200_acc_y_mod, decomp = TRUE, show_scales = TRUE)
```

<div style="text-align:center"><img src="av18-1.png" alt=" " width="75%">

---

# Example: LN-200 Data-Set (6/7)

We can now fit the same model to all axes as follows:

```r
fit_ln200 = avlr(ln200_av, wn_gyro = 1:18, qn_acc = 1:16, rw_acc = 18:22)
fit_ln200
```

```out
## 
##  Estimates for gyroscopes: 
##           Value
## WN 1.152655e-05
## 
##  Estimates for accelerometers: 
##           Value
## QN 6.121685e-04
## RW 7.227744e-07
```

---

# Example: LN-200 Data-Set (7/7)

```r
plot(fit_ln200)
```

<div style="text-align:center"><img src="av19-1.png" alt=" " width="100%">

---

# Example: NAVCHIP Data-Set (1/3)

Finally, we consider a more difficult example with the gyroscope on the Z-axis of the navchip sensor:

```r
navchip_gyro_z = navchip_av$avar$`Gyro. Z`
plot(navchip_gyro_z)
```

<div style="text-align:center"><img src="av20-1.png" alt=" " width="75%">

---

# Example: NAVCHIP Data-Set (2/3)

A possible model is `QN + WN + RW`:

```r
navchip_gyro_z_mod = avlr(navchip_gyro_z, qn = 1:4, wn = 5:7, rw = 12:20)
plot(navchip_gyro_z_mod, decomp = TRUE)
```

<div style="text-align:center"><img src="av21-1.png" alt=" " width="75%">

---

# Example: NAVCHIP Data-Set (3/3)

However, the fit is quite poor in this case. This example illustrates the limit of the AVLR method and, in the next chapter, we will revisit this example the **Generalized Method of Wavelet Moments (GMWM)**.

