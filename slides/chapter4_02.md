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
##          Variance       Low CI    High CI
## 2    0.5074099851 0.4824704653 0.53386729
## 4    0.2534714625 0.2360601100 0.27240037
## 8    0.1417519898 0.1282071322 0.15699683
## 16   0.0868376715 0.0753690196 0.10039561
## 32   0.0790059290 0.0647083957 0.09712885
## 64   0.0822687883 0.0621019287 0.11050257
## 128  0.0854327628 0.0574845825 0.13056479
## 256  0.1042345979 0.0595723297 0.19306450
## 512  0.0823776187 0.0371738802 0.20548086
## 1024 0.0323390821 0.0101847590 0.13264939
## 2048 0.0134053538 0.0022421185 0.14590802
## 4096 0.0066652443 0.0000810716 1.16964903
## 8192 0.0002444508 0.0000810716 0.32127549
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