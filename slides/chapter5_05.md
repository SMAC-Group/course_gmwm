---
type: slides
---

# Example: Navchip Accelerometer

---

This example is based on data obtained from navchip accelerometer. The data can be loaded from the `imudata` R package as follows:

```r
# Load NAVCHIP
data(navchip, package = "imudata")

# Let's pick Accel X
Xt = navchip[,4]
```

---

First, we compute and plot the WV:

```r
# Plot wv 
plot(wvar(Xt))
```

<div style="text-align:center"><img src="gmwm42-1.png" alt=" " width="80%"></div>

---

Based on the previous graph, we consider the initial model: `WN() + AR1() + RW()`:

```r
mod1 = gmwm(WN() + AR1() + RW(), Xt)
plot(mod1)
```

<div style="text-align:center"><img src="gmwm43-1.png" alt=" " width="90%"></div>

---

It can be observed that at the first scale the fit is poor and that the slope is steeper than what can be obtained using a `WN()`. Therefore, we add a `QN()` to our model:

```r
mod2 = gmwm(QN() + WN() + AR1() + RW(), Xt)
plot(mod2)
```

<div style="text-align:center"><img src="gmwm44-1.png" alt=" " width="90%"></div>

---

The fit now appears to be reasonable at the first and last scales but could be further improved in the "middle" of the WV. To improve the adequation between empirical and model-based variance, we added several `AR1()` processes:

```r
mod3 = gmwm(QN() + WN() + 2*AR1() + RW(), Xt)
plot(mod3)
```

<div style="text-align:center"><img src="gmwm45-1.png" alt=" " width="90%"></div>

---

```r
mod4 = gmwm(QN() + WN() + 3*AR1() + RW(), Xt)
plot(mod4)
```

<div style="text-align:center"><img src="gmwm46-1.png" alt=" " width="90%"></div>

---

```r
mod5 = gmwm(QN() + WN() + 4*AR1() + RW(), Xt)
plot(mod5) 
```

<div style="text-align:center"><img src="gmwm47-1.png" alt=" " width="90%"></div>

---

```{r}
summary(mod5, inference = TRUE) 
```

```out
Model Information: 
          Estimates       CI Low      CI High           SE
QN     2.434922e-05 2.424532e-05 2.445313e-05 6.317056e-08
WN     2.648948e-06 2.573922e-06 2.723975e-06 4.561291e-08
AR1    3.770626e-02 3.770626e-02 3.770626e-02 6.910358e-12
SIGMA2 4.476306e-05 4.467886e-05 4.484727e-05 5.119311e-08
AR1    9.967419e-01 9.967419e-01 9.967419e-01 6.333673e-12
SIGMA2 3.469905e-09 3.314916e-09 3.624893e-09 9.422629e-11
AR1    9.997291e-01 9.997291e-01 9.997291e-01 9.630046e-12
SIGMA2 1.939652e-10 1.696633e-10 2.182672e-10 1.477454e-11
AR1    9.275985e-01 9.275985e-01 9.275985e-01 2.587910e-12
SIGMA2 2.193860e-07 2.150303e-07 2.237418e-07 2.648117e-09
RW     1.997182e-11 1.589969e-11 2.404395e-11 2.475679e-12

...

Objective Function: 20.8784
...
```

---

This last model appears to provide an excellent fit but it can be observed that the `WN()` process is probably redundant. Therefore, in our last model we remove this process:

```r
mod6 = gmwm(QN() + 4*AR1() + RW(), Xt)
plot(mod6) 
```

<div style="text-align:center"><img src="gmwm48-1.png" alt=" " width="90%"></div>

---

```{r}
summary(mod6, inference = TRUE) 
```

```out
Model Information: 
          Estimates       CI Low      CI High           SE
QN     2.756927e-05 2.748609e-05 2.765246e-05 5.057324e-08
AR1    1.226815e-01 1.226815e-01 1.226815e-01 7.208629e-12
SIGMA2 4.070276e-05 4.058349e-05 4.082203e-05 7.251262e-08
AR1    9.517713e-01 9.517713e-01 9.517713e-01 3.240894e-12
SIGMA2 1.306384e-07 1.282989e-07 1.329779e-07 1.422329e-09
AR1    9.980561e-01 9.980561e-01 9.980561e-01 6.633111e-12
SIGMA2 1.932877e-09 1.826135e-09 2.039620e-09 6.489494e-11
AR1    9.997916e-01 9.997916e-01 9.997916e-01 6.913992e-12
SIGMA2 1.233008e-10 9.987914e-11 1.467224e-10 1.423933e-11
RW     1.984454e-11 1.551008e-11 2.417899e-11 2.635162e-12

....

Objective Function: 28.4606
....
```

This final model `QN() + 4*AR1() + RW()` appears to fit the data quite well.
