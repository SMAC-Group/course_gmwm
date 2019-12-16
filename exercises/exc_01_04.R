# Load library
library(simts)

# Sample size
n = ______

# Parameter value
sigma2     = ______
gamma2     = ______
phi        = ______
sigma2_ar1 = ______

# Define model
model = WN(sigma2 = 1) + 
  __(gamma2 = gamma2) + 
  __(phi = phi, sigma2 = sigma2_ar1)

# Simulate time series
Xt = ______(n = n, model = model)

# Plot time series
plot(Xt)