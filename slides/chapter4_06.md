---
type: slides
---

# Case Study: Saving rates

---


The following example is from economy. The goal is to analyse the evolution of saving rates over last 60 years and see if this could be represented by a stochastic model. First, we load the data from the `simts` package and plot it. 

```r
# Load savingrt dataset
library(gmwm)
data(savingrt, package = "simts")

# Simulate based on data
savingrt = gts(as.vector(savingrt), start = 1959, freq = 12)
```

---

```r
# Plot savingrt
plot(savingrt)
```

<div style="text-align:center"><img src="sav1-1.png" alt=" " width="85%">

---

Then we calculate the WV with the standard and robust estimators.

```r
# Plot wv
wv = wvar(savingrt)
wv_rob = wvar(savingrt, robust = TRUE)
compare_wvar(wv, wv_rob, split = FALSE)
```

<div style="text-align:center"><img src="sav2-1.png" alt=" " width="90%">

---

We observe significant differences on the first two smallest scales. As such *extreme variations* may affect the model in consideration we base the parameter matching on the robust version of the estimator and suggest `AR1 + RW1` as a model structure. 

```r
mod = gmwm(RW() + AR1(), savingrt, robust = TRUE)
plot(mod)
```

<div style="text-align:center"><img src="sav3-1.png" alt=" " width="90%">

---

Although the implied WV stays within the confidence region of the empirical WV, the general trend is not very well followed by this model. However, this maybe well be due to the initialasation of parameters that converged to a local minimum. Hence, we initiate the parameters with fixed values and run the again the estimation. 

```r
mod = gmwm(RW(gamma2 = 0.1) + AR1(phi = 0.8, sigma2 = 0.1), savingrt, robust = TRUE)
plot(mod)
```

<div style="text-align:center"><img src="sav4-1.png" alt=" " width="90%">

---

Now the resulting correspondences between the empirical and implied WV are in a good agreement over large number of scales, especially in the region where the confidence of WV is high. Hence, we consider the resulting value of parameters to be plausible for modelling. 