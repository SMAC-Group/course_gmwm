---
type: slides
---

# KVH1750 - Accel

---

This example revisits the analysis of accelerometers noise observed in KVH1750 auto-motive IMU. We recall first the value of parameters with its confidence region. 

```r
summary(mod)
```

```out
## Model Information: 
##         Estimates     CI Low    CI High         SE
## RW     0.04803446 0.01172827 0.07362983 0.01881674
## AR1    0.87697832 0.77524463 0.96058746 0.05634022
## SIGMA2 0.13568898 0.10762573 0.17429890 0.02026720
## 
## > The parameter estimates shown are bootstrapped! To use these results, please save the summary object.
## * The initial values of the parameters used in the minimization of the GMWM objective function 
##   were given by YOU! 
## 
## Objective Function: 0.0122
## 
## Bootstrapped Goodness of Fit: 
## Test Statistic: 0.01
## P-Value: 1  CI: (1, 1)
## 
## 
## To replicate the results, use seed: 1337
```

---

We use the parameter values rounded to the first significant digit as a seed in `gmwm` least-square fitting with the standard estimator. 

```r
mod2 = gmwm(RW(gamma2 = 0.1) + AR1(phi = 0.8, sigma2 = 0.1), savingrt, robust = FALSE)
plot(mod2)
```

<div style="text-align:center"><img src="sav5-1.png" alt=" " width="85%">

---


```{r, cache=TRUE}
summary(mod2)
```

```out
## Model Information: 
##         Estimates     CI Low    CI High         SE
## RW     0.07320902 0.03937118 0.09847607 0.01796661
## AR1    0.43633956 0.33055804 0.55389839 0.06789065
## SIGMA2 0.32762851 0.28693299 0.38086334 0.02855280
## 
## > The parameter estimates shown are bootstrapped! To use these results, please save the summary object.
## * The initial values of the parameters used in the minimization of the GMWM objective function 
##   were given by YOU! 
## 
## Objective Function: 0.0526
## 
## Bootstrapped Goodness of Fit: 
## Test Statistic: 0.05
## P-Value: 0.98  CI: (0.95, 1)
## 
## 
## To replicate the results, use seed: 1337
```

---

The observe that the obtained parameters converged to slightly different values while the WV implied by the model remain within the confidence interval of the empirical WV accross all scales. Therefore we can conclude that this model is plausable to consider with respect to the observed input. 