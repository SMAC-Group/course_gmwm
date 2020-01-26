---
type: slides
---

# Prediction

---

The function `predict()` can directly be used with `simts` objects. For example, we can predict the lynx trappings for the next years as follows:

```r
# Estimate parameters (MLE)
fit = estimate(AR(11), lynx_gts, demean = TRUE)
predict(fit)
```
<div style="text-align:center"><img src="chap2_20-1.png" alt=" " width="85%">
---

It is also possible to "zoom" further to the end of time series using the option `show_last`:

```r
predict(fit, show_last = 30)
```
<div style="text-align:center"><img src="chap2_21-1.png" alt=" " width="95%">
---

We can change the prediction horizon using the option `n.ahead`:

```r
predict(fit, show_last = 30, n.ahead = 100)
```

<div style="text-align:center"><img src="chap2_22-1.png" alt=" " width="95%">

---
