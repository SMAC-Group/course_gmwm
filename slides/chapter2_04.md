---
type: slides
---

# Autocorrelation and Partial Autocorrection

---

It is possible to plot the theoretical ACF of most time series with `simts`. For example, for an AR(1) we have:

```r
par(mfrow=c(2,2))
plot(theo_acf(ar = 0.9, ma = NULL), 
     main = expression(paste("Theoretical ACF plot of AR(1) with ",
     phi, " = 0.9")))
plot(theo_acf(ar = 0.5, ma = NULL),
     main = expression(paste("Theoretical ACF plot of AR(1) with ",
     phi, " = 0.5")))
plot(theo_acf(ar = -0.9, ma = NULL), 
     main = expression(paste("Theoretical ACF plot of AR(1) with ",
     phi, " = -0.9")))
plot(theo_acf(ar = 0.1, ma = NULL), 
     main = expression(paste("Theoretical ACF plot of AR(1) with ",
     phi, " = 0.1")))
```

---

<div style="text-align:center"><img src="chap2_7-1.png" alt=" " width="90%">

---

The theoretical ACF of a process can also be compared with the empirical ACF. For example:

```r
set.seed(182)          # seed for reproducibility

par(mfrow=c(2,2))
plot(theo_acf(ar = 0.9, ma = NULL), 
     main = expression(paste("Theoretical ACF plot of AR(1) with ",
     phi, " = 0.9")))

Xt = gen_gts(n = 50, model = AR1(phi = 0.9, sigma2 = 1))
plot(auto_corr(Xt, lag.max = 20), main = "Simulated AR(1) with n = 50")

Xt = gen_gts(n = 500, model = AR1(phi = 0.9, sigma2 = 1))
plot(auto_corr(Xt, lag.max = 20), main = "Simulated AR(1) with n = 500")

Xt = gen_gts(n = 5000, model = AR1(phi = 0.9, sigma2 = 1))
plot(auto_corr(Xt, lag.max = 20), main = "Simulated AR(1) with n = 5000")
```

---

<div style="text-align:center"><img src="chap2_8-1.png" alt=" " width="90%">

---

The `simts` also allows to compute the theoretical ACF and PACF. Below are examples for an AR(1) as well as an AR(3):

```r
par(mfrow = c(1, 2))
plot(theo_acf(ar = 0.95, ma = NULL))
plot(theo_pacf(ar = 0.95, ma = NULL))
```

<div style="text-align:center"><img src="chap2_9-1.png" alt=" " width="100%">

---

```r
par(mfrow = c(1, 2))
plot(theo_acf(ar = c(0.5, 0.125, 0.25), ma = NULL))
plot(theo_pacf(ar = c(0.5, 0.125, 0.25), ma = NULL))
```

<div style="text-align:center"><img src="chap2_10-1.png" alt=" " width="100%">

---

In practice, we can simply use the function `corr_analysis()` to directly compute the empirical ACF and PACF. We can compare our previous (theoretical) graph with an empirical version computed on simulated data:

```r
# Simulate AR(3)
Xt = gen_gts(n = 300, model = AR(phi = c(0.5, 0.125, 0.25), sigma2 = 1))

# Plot empirical ACF/PACF
corr_analysis(Xt)

```
<div style="text-align:center"><img src="chap2_11-1.png" alt=" " width="90%">

---

Therefore, these examples give us further insight as to how to interpret the empirical (or estimated) versions of these functions. For this reason, let us study the empirical ACF and PACF of some real time series, the first of which is the data representing the natural logarithm of the annual number of Lynx trappings in Canada between 1821 and 1934. The time series is represented below.

```r
lynx_gts = gts(log(lynx), start = 1821, data_name = "Lynx Trappings",
unit_time = "year", name_ts = "Trappings")
plot(lynx_gts)
```

<div style="text-align:center"><img src="chap2_12-1.png" alt=" " width="70%">

---

We can see that there appears to be a seasonal trend within the data but let us ignore this for the moment and check the ACF and PACF plots below.

```r
corr_analysis(lynx_gts)
```

<div style="text-align:center"><img src="chap2_13-1.png" alt=" " width="100%">

---

The seasonal behavior also appears in the ACF plot but we see that it decreases in a sinusoidal fashion as the lag increases hinting that an AR(p) model could be a potential candidate for the time series. Looking at the PACF plot on the right we can see that a few partial autocorrelations appear to be significant up to lag `h=11`. Therefore an AR(11) model could be a possibly good candidate to explain (and predict) this time series. We will revisit this example in the next section.

