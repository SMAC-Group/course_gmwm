---
type: slides
---

# Computing the Robust Wavelet Variance

---

The `gmwm` also implement the robust estimator of the WV proposed in Guerrier et al. (2020). One can use this estimator through the option `robust = TRUE`. The efficiency of the estimator compared the standard estimator can be adjusted using the option `eff`, which is set to 60% by default (for more information `?wvar`). Here is a simple example:

```r
# Compute Haar WV
wv_Xt_rob = wvar(Xt, robust = TRUE)
wv_Xt_rob
```

```out
        Variance       Low CI    High CI
2    0.492734172 0.4685159779 0.51842625
4    0.242193326 0.2255566867 0.26028000
8    0.132102378 0.1194795720 0.14630945
16   0.080665882 0.0700123382 0.09326022
32   0.064699480 0.0529909544 0.07954069
64   0.073972326 0.0558392096 0.09935884
128  0.084571960 0.0569053800 0.12924925
256  0.062888547 0.0359421664 0.11648288
512  0.034537357 0.0155853933 0.08614920
1024 0.032194363 0.0101391816 0.13205578
2048 0.046158585 0.0077202750 0.50240431
4096 0.048824833 0.0005938728 8.56801573
8192 0.003907256 0.0005938728 5.13520799

```

---

It is also possible to create a standard "log-log" plot by simply using the function `plot()`:

```r
plot(wv_Xt_rob)
```

<div style="text-align:center"><img src="gmwm2-1.png" alt=" " width="75%">

---

It is possible to compare the two estimators using the function `compare_wvar()`:

```r
compare_wvar(wv_Xt, wv_Xt_rob)
```

<div style="text-align:center"><img src="gmwm3-1.png" alt=" " width="95%">

---

```r
compare_wvar(wv_Xt, wv_Xt_rob, split = FALSE)
```

<div style="text-align:center"><img src="gmwm4-1.png" alt=" " width="95%">
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

<div style="text-align:center"><img src="gmwm5-1.png" alt=" " width="95%">

---

```r
compare_wvar(wv_Xt, wv_Xt_rob, wv_Yt, wv_Yt_rob, split = FALSE)
```

<div style="text-align:center"><img src="gmwm6-1.png" alt=" " width="90%">

Clearly, the standard WV is heavily impacted by the outliers while the robust remains more or less stable.

---
