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

```r
plot(wv_Xt_rob)
```

---

It is possible to compare the two estimators using the function `compare_wvar()`:

```r
compare_wvar(wv_Xt, wv_Xt_rob)
```

```r
compare_wvar(wv_Xt, wv_Xt_rob, split = FALSE)
```
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

```r
compare_wvar(wv_Xt, wv_Xt_rob, wv_Yt, wv_Yt_rob, split = FALSE)
```

Clearly, the standard WV is heavily impacted by the outliers while the robust remains more or less stable.

---
