---
type: slides
---

# Model Diagnostic

---

It is possible to assess if the assumptions we consider are valid after estimating a given time series model using the function `check()`. For example, suppose that we simulate an AR(3) but estimate an AR(1). In this case, we are able to detect that our model is incorrect. Here is an example: 

---

```r
# Simulate AR(3)
Xt = gen_gts(n = 300, model = AR(phi = c(0.5, 0.125, 0.25), sigma2 = 1))

# Estimate parameters (MLE)
(fit = estimate(AR(1), Xt, demean = FALSE))
```

```out
## Fitted model: AR(1)
## 
## Estimated parameters:
## 
## Call:
## arima(x = as.numeric(Xt), order = c(p, intergrated, q), seasonal = list(order = c(P, 
##     seasonal_intergrated, Q), period = s), include.mean = demean, method = meth)
## 
## Coefficients:
##          ar1
##       0.7506
## s.e.  0.0381
## 
## sigma^2 estimated as 1.13:  log likelihood = -444.49,  aic = 892.98

```
---

```r
# Check model
check(fit)
```

<div style="text-align:center"><img src="chap2_14-1.png" alt=" " width="95%">

---

Clearly, this illustrates that the model is incorrect. What happens if we consider the correct model?

```r
# Estimate parameters (MLE)
(fit = estimate(AR(3), Xt, demean = FALSE))

# Check model
check(fit)
```

<div style="text-align:center"><img src="chap2_15-1.png" alt=" " width="85%">


---


The model appears to fit the data well. One of the problems of this approach is that it doesn't provide any guarantee against over-fitting as if we consider an AR(4) we should reach the same conclusion:

```r
# Estimate parameters (MLE)
(fit = estimate(AR(4), Xt, demean = FALSE))

# Check model
check(fit)
```

<div style="text-align:center"><img src="chap2_16-1.png" alt=" " width="75%">
---

In the next section, we will consider a more appropriate approach. Finally, let's revisit the "lynx" data-set and try to assess if an AR(11) appears to be reasonable:

```{r chap2_17, cache=TRUE, fig.align='center', fig.width=8, fig.height=5}
# Estimate parameters (MLE)
(fit = estimate(AR(11), lynx_gts, demean = TRUE))

# Check model
check(fit)
```
<div style="text-align:center"><img src="chap2_17-1.png" alt=" " width="75%">

---
