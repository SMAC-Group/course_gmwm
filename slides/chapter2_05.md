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

```out
## Fitted model: AR(3)
## 
## Estimated parameters:
## 
## Call:
## arima(x = as.numeric(Xt), order = c(p, intergrated, q), seasonal = list(order = c(P, 
##     seasonal_intergrated, Q), period = s), include.mean = demean, method = meth)
## 
## Coefficients:
##          ar1     ar2     ar3
##       0.5238  0.1027  0.1929
## s.e.  0.0566  0.0639  0.0569
## 
## sigma^2 estimated as 0.9218:  log likelihood = -413.93,  aic = 835.86

```


---

Note that we use the option `demean = FALSE` as the process we simulated is a zero-mean process and force the method not to estimate an intercept. In the previous section, we discuss the "lynx" data and found that an AR(11) model could be a suitable candidate. In the code, we estimate this model:

```r
# Estimate parameters (MLE)
(fit = estimate(AR(11), lynx_gts, demean = TRUE))
```

```out
## Fitted model: AR(11)
## 
## Estimated parameters:
## 
## Call:
## arima(x = as.numeric(Xt), order = c(p, intergrated, q), seasonal = list(order = c(P, 
##     seasonal_intergrated, Q), period = s), include.mean = demean, method = meth)
## 
## Coefficients:
##          ar1      ar2     ar3      ar4     ar5      ar6     ar7      ar8
##       1.1676  -0.5446  0.2661  -0.3093  0.1541  -0.1463  0.0569  -0.0294
## s.e.  0.0877   0.1394  0.1474   0.1489  0.1509   0.1498  0.1511   0.1483
##          ar9    ar10     ar11  intercept
##       0.1346  0.2021  -0.3394     6.6678
## s.e.  0.1455  0.1383   0.0885     0.1086
## 
## sigma^2 estimated as 0.1915:  log likelihood = -70.07,  aic = 166.13

```

---
