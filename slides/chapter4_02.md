---
type: slides
---

# Computing the Robust Wavelet Variance

---

The `gmwm` also implements the robust estimator of the WV proposed in Guerrier et al. (2020). One can use this estimator through the option `robust = TRUE`. The efficiency of the estimator compared the standard estimator can be adjusted using the option `eff`, which is set to 60% by default (for more information `?wvar`). Here is a simple example:

```r
# Compute Haar WV
wv_Xt_rob = wvar(Xt, robust = TRUE)
wv_Xt_rob
```


```out
##         Variance       Low CI   High CI
## 2    0.515238726 0.4899144189 0.5421042
## 4    0.262567309 0.2445311487 0.2821755
## 8    0.139618090 0.1262771329 0.1546334
## 16   0.087129747 0.0756225204 0.1007333
## 32   0.073588145 0.0602710564 0.0904683
## 64   0.087787932 0.0662681439 0.1179158
## 128  0.105241834 0.0708133823 0.1608385
## 256  0.104331527 0.0596277266 0.1932440
## 512  0.059396954 0.0268035821 0.1481584
## 1024 0.044185739 0.0139157042 0.1812424
## 2048 0.032901822 0.0055030092 0.3581136
## 4096 0.042991616 0.0005229214 7.5443749
## 8192 0.002721697 0.0005229214 3.5770576
```

---

```r
plot(wv_Xt_rob)
```

<div style="text-align:center"><img src="gmwm2-1.png" alt=" " width="90%">

---

It is possible to compare the two estimators using the function `compare_wvar()`:

```r
compare_wvar(wv_Xt, wv_Xt_rob)
```

<div style="text-align:center"><img src="gmwm3-1.png" alt=" " width="100%">

---


```r
compare_wvar(wv_Xt, wv_Xt_rob, split = FALSE)
```

<div style="text-align:center"><img src="gmwm4-1.png" alt=" " width="100%">

---

In this example, the classical and robust WV are very close. To illustrate the difference between the two estimators, we can consider a "contaminated" version of `Xt` where outliers are randomly added:

```r
# Copy Xt
Yt = Xt

# Adding 1% of outliers
m = round(0.01*n)
Yt[sample(1:n, m)] = rnorm(m, 0, 12)

# Compute standard and robust WV of Yt
wv_Yt = wvar(Yt)
wv_Yt_rob = wvar(Yt, robust = TRUE)
```

---

We can now compare the differences between estimators:

```r
compare_wvar(wv_Xt, wv_Xt_rob, wv_Yt, wv_Yt_rob)
```

<div style="text-align:center"><img src="gmwm5-1.png" alt=" " width="100%">

---

```r
compare_wvar(wv_Xt, wv_Xt_rob, wv_Yt, wv_Yt_rob, split = FALSE)
```

<div style="text-align:center"><img src="gmwm6-1.png" alt=" " width="100%">

---

Clearly, the standard WV estimation is heavily impacted by the presence of outliers while the robust remains more or less stable.

---