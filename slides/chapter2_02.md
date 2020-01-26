---
type: slides
---

# Plotting Time Series

---

The `simts` has plenty of data-sets. For example, we consider here a data-set coming from the domain of hydrology. The data concerns monthly precipitation (in mm) over a certain period of time (1907 to 1972) and is interesting for scientists in order to study water cycles. The data are presented in the graph below:

```r
# Loading simts
library(simts)

# Load hydro dataset
data("hydro")

# Simulate based on data
hydro = gts(as.vector(hydro), start = 1907, freq = 12, unit_ts = "in.", 
            name_ts = "Precipitation", data_name = "Hydrology data")
            
```

---

```r
# Plot time series
plot(hydro)
```

---

Let us consider the limitations of a direct graphical representation of a time series when the sample size is large. Indeed, due to visual limitations, a direct plotting of the data will probably result in an uninformative aggregation of points between which it is unable to distinguish anything. For example, we consider here the data coming from the calibration procedure of an Inertial Measurement Unit (IMU) which, in general terms, is used to enhance navigation precision or reconstruct three dimensional movements. These sensors are used in a very wide range of applications such as robotics, virtual reality, vehicle stability control, human and animal motion capture and so forth. The signals coming from these instruments are measured at high frequencies over a long time and are often characterized by linear trends and numerous underlying stochastic processes. The code below retrieves some data from an IMU and plots it directly. First, we install the imudata which is hosted on GitHub:

```r
# Install imudata R package (this may take a few minutes)
devtools::install_github("SMAC-Group/imudata")
```

---

Next, we plot the time series:

```r
# Load IMU data
data(imu6, package = "imudata")

# Construct gst object
Xt = gts(imu6[,1], data_name = "Gyroscope data", unit_time = "hour", 
         freq = 100*60*60, name_ts = "Angular rate", 
         unit_ts = bquote(rad^2/s^2))
         
         
```

---

```r
# Plot time series
plot(Xt)
```
