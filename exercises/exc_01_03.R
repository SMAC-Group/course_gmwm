# Load library
library(simts)

# Sample size
n = 10^3

# Define model
model = __(sigma2 = 1)

# Simulate time series
Xt = gen_gts(n = n, model = _____)