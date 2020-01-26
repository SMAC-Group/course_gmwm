---
type: slides
---

# Parameter Estimation

---

The `simts` allows to simply estimate the parameters of various time series models using the functions `estimate()`. Here is a simple example:

```r
# Simulate AR(3)
Xt = gen_gts(n = 300, model = AR(phi = c(0.5, 0.125, 0.25), sigma2 = 1))

# Estimate parameters (MLE)
(fit = estimate(AR(3), Xt, demean = FALSE))
```

---

Note that we use the option `demean = FALSE` as the process we simulated is a zero-mean process and force the method not to estimate an intercept. In the previous section, we discuss the "lynx" data and found that an AR(11) model could be a suitable candidate. In the code, we estimate this model:

```r
# Estimate parameters (MLE)
(fit = estimate(AR(11), lynx_gts, demean = TRUE))
```

---
