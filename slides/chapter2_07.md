---
type: slides
---

# Model Selection

---

It is also possible to automatically select using the AIC, BIC and/or HQ criterion a time series model using the function `select()`. For example:

```r
set.seed(19)

# Simulate AR(3)
Xt = gen_gts(n = 300, model = AR(phi = c(0.5, 0.125, 0.25), sigma2 = 1))

# Select model
best_model = select(AR(10), Xt, include.mean = FALSE)
```

---

For the "lynx" data-set, we obtain:

```r
lynx_select = select(AR(16), lynx_gts, include.mean = TRUE)
```

This suggests that an AR(2) or an AR(11) are interesting models.

