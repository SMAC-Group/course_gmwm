---
type: slides
---

# Case Study: Copper Price

---

Let us consider a time series of the annual copper prices from 1800 to 1997 (with the long-term trend removed) which can be downloaded in R via the `tsdl` library. To obtain the data, we should first install the `tsdl` R package:

```r
devtools::install_github("FinYang/tsdl")
```

---

Then, we can run:

```r
copper_ts = as.numeric(subset(tsdl, description = "copper")[[3]])
time = 1:length(copper_ts)
detrend_copper_ts = lm(copper_ts ~ time)$residuals
Xt = gts(detrend_copper_ts,
    start = 1800, freq = 1,
    name_ts = "Copper prices (minus the long-term trend)",
    data_name = "Copper Price", name_time = "")
plot(Xt)
```

<div style="text-align:center"><img src="chap2_23_1-1.png" alt=" " width="60%">

---

It would appear that the process could be considered as being stationary and, given this, let us analyse the estimated ACF and PACF plots for the considered time series.

```r
corr_analysis(Xt)
```

<div style="text-align:center"><img src="chap2_23_2-1.png" alt=" " width="100%">


---

The ACF plot could eventually suggest an AR(p) model, however the PACF plot doesn't appear to deliver an exact cut-off and both appear to tail-off with no obvious behavior that would allow to assign them to an AR(p) model or MA(q) model. Let us therefore consider all possible models included in an ARMA(4,5) model (which therefore include all possible model in an AR(4) model and in an MA(3) model). 

---

```r
best_model = select(ARMA(4,5), Xt, include.mean = FALSE)
```

---

<div style="text-align:center"><img src="chap2_23_3-1.png" alt=" " width="60%">


---

The figure above shows the behavior (and minima) of the three selection criteria discussed earlier in this chapter where each plot fixes the value of q (for the MA(q) part of the model) and explores the value of these criteria for different orders p (for the AR(p) part of the model). From the selection procedure it would appear that the BIC criterion selects a simple AR(1) model for the annual copper time series while the AIC selects an ARMA(3,5) model. This reflects the properties of these two criteria since the BIC usually selects lower order models (e.g. it can under-fit the data) while the AIC usually does the opposite (e.g. it can over-fit the data). As expected, the HQ criterion lies somewhere in between the two previous criteria and selects an ARMA(3,2) model. To obtain further information to choose a final model, one could check the behavior of the residuals from these three models.

---

```r
model_copper_ar1 = estimate(AR(1), Xt)
check(model_copper_ar1)
```
<div style="text-align:center"><img src="chap2_23_4-1.png" alt=" " width="95%">


---

```r
model_copper_arma32 = estimate(ARMA(3,2), Xt)
check(model_copper_arma32)
```

<div style="text-align:center"><img src="chap2_23_5-1.png" alt=" " width="95%">

---

```r
model_copper_arma35 = estimate(ARMA(3,5), Xt)
check(model_copper_arma35)
```

<div style="text-align:center"><img src="chap2_23_6-1.png" alt=" " width="95%">

---

The residuals from the ARMA(3,2) and the ARMA(3,5) appear to have an overall better behavior than the ones of the AR(1). If one were to choose a unique model for this data, the ARMA(3,2) model would appear to be a good candidate. The predictions made from this model are given below:

```r
predict(model_copper_arma32, n.head = 90, show_last = 300)
```

<div style="text-align:center"><img src="chap2_23_7-1.png" alt=" " width="90%">

---