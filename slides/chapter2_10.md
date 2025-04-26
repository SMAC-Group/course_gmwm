---
type: slides
---

# Case Study: Water Levels of Lake Erie

---

Let us consider the monthly water levels of Lake Erie from 1921 to 1970. 

Then, we can simply run:

```r
library(tsdl)
Xt = gts(as.numeric(subset(tsdl, description = "Erie")[[1]]),
    start = 1921, freq = 12, name_ts = "Water Levels",
    data_name = "Monthly Lake Erie Levels", name_time = "")
plot(Xt)
```
<div style="text-align:center"><img src="chap2_23-1.png" alt=" " width="70%">
---

The time series clear appears to be non-stationary. Therefore, it take its first difference:

```r
d_Xt = gts(diff(Xt))
plot(d_Xt)
```
<div style="text-align:center"><img src="chap2_24-1.png" alt=" " width="85%">
---

We also consider using a seasonal difference: 

```{r chap2_25, cache=TRUE, fig.align='center', fig.width=6.5, fig.height=4.5}
d_s = gts(diff(Xt, lag = 12))
plot(d_s)  
```
<div style="text-align:center"><img src="chap2_25-1.png" alt=" " width="85%">
---

We can see how both differencing approaches appear to make the resulting time series (reasonably) stationary. If we take a look at the ACF and PACF plots of the seasonal differencing, we can see how the ACF does not show clear seasonality anymore while some residual seasonality can be observed in the PACF plot.

```r
corr_analysis(d_s)
```
<div style="text-align:center"><img src="chap2_26-1.png" alt=" " width="85%">
---

Since both differencings appear to do a good job in making the time series stationary, let us consider a SARIMA model with d=1, D=1 and s=12. Moreover, considering the structure of the ACF we could envisage using an `AR(p)` component in additional to some seasonal components to address the residual seasonality in the PACF. Hence, let us estimate a SARIMA model defined as `ARIMA(2,1,0)×(1,1,1)12`.

```{r, cache = TRUE}
mod = estimate(SARIMA(ar = 2, i = 1, sar = 1, sma = 1, s = 12, si = 1), Xt, method = "mle")
check(mod)
```
<div style="text-align:center"><img src="chap2_27_1-1.png" alt=" " width="70%">

---

Based on the diagnostic plots, we can see that this model does a reasonably good job and could therefore be considered as a candidate model for explaining/predicting this time series. 

Supposing we were hydrologists who intend to plan the management of water resources over the next two years: we may therefore be interested in understanding/predicting the future behavior of the lake’s water levels over the next 24 months. As for ARMA models, we can also predict using SARIMA models and, for this particular data and model, we obtain the following forecast.

---

```r
predict(mod, n.ahead = 24)
```
<div style="text-align:center"><img src="chap2_27_2-1.png" alt=" " width="95%">

---

As you can see, the forecasted values (and confidence intervals) appear to reasonably follow the pattern of the observed time series confirming that the fitted model could be a possible candidate to consider for the considered time series data.

---