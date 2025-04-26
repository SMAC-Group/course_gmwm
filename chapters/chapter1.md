---
title: '1 - Introduction to Modelling and Estimation in Linear Dynamic Systems'
description:
 'This chapter reviews the fundamentals of modelling and estimation techniques used in linear dynamic systems with several examples that highlight the importance of correct stochastic models (structure and value of parameters) in sensor fusion. '
prev: null
next: /chapter2
type: chapter
id: 1
---

<exercise id="1" title="General Information">

The sildes for chapter one can be downloaded [here](https://github.com/SMAC-Group/course_smac_epfl/raw/master/pdf_slides/slides_chap1.pdf). 

Main reference:

1. Gelb, A. (1988). Applied Optimal Estimation. Cambridge, MA: The M.I.T. Press.


</exercise>



<exercise id="2" title="Required softwares">


## Installing R

This course will make use of `R`, which is a programming language for statistical computing and graphics supported by the R Core Team and the [R Foundation for Statistical Computing](https://www.r-project.org/). `R` is widely used by data scientists, data miners and statisticians for data analysis and for developing statistical software. 

### Installing R on macOS

To install `R` on macOS, download the `.pkg` installer on the [CRAN website](https://cran.r-project.org/bin/macosx/) and execute it once downloaded.

### Installing R on Windows

To install `R` on Windows, download the `.exe` installer on the [CRAN website](https://cran.r-project.org/bin/windows/base/) and execute it once downloaded.

### Installing R on Ubuntu Linux

To install `R` on Ubuntu Linux, follow the procedure detailed [here](https://cran.r-project.org/).


## Installing RStudio

`RStudio` is an Integrated Development Environment (IDE) for `R`. An IDE is a software application that provides comprehensive facilities to computer programmers for software development. An IDE usually consists of at least a source code editor, build automation tools and a debugger. We will be using `RStudio` throughout the semester. Please install it from the [RStudio’s official webpage](https://www.rstudio.com/).

⚠ Note that you should install `R` first before installing `RStudio`.

### Installing RStudio on macOS

To install `RStudio` on macOS, download the macOS `.dmg` installer on the [RStudio’s products page](https://posit.co/downloads/) and execute it once downloaded.

### Installing RStudio on Windows

To install `RStudio` on Windows, download the Windows `.exe` installer on the [RStudio’s products page](https://posit.co/downloads/) and execute it once downloaded.

### Installing RStudio on Ubuntu Linux

To install `RStudio` on Ubuntu Linux, download the Ubuntu/Debian `.deb` installer on the [RStudio’s products page](https://posit.co/downloads/). You can then install the `.deb` file.

## Installing a `C++` compiler

In this class, you will need to install some packages that will require a `C++` compiler. For Windows we recommend to install `Rtools` and for macOS, we recommend `Xcode`.

### Installing `Rtools` on Windows

If you are on Windows, go to the [R for Windows Build Tools Archive](https://cran.r-project.org/bin/windows/Rtools/history.html) and install the correct `Rtools` version depending on your `R` version by downloading the `.exe` file and executing it.


### Installing `Xcode` on macOS

If you are on macOS, go to the [Mac Apple Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12) and install the latest `Xcode` application. 

## Installing required softwares

Most of the required packages are available directly from [Comprehensive R Archive Network (CRAN)](https://cran.r-project.org/).

To install them, you can run the following command:

```R
install.packages(c("avar","simts", "wv", "navigation", "gmwmx2"))
``` 

The package `gmwm` is currently only available on GitHub. To install it, first install the `devtools` package by running the following command in `R`: 

```R
install.packages("devtools")
``` 

Make sure that the installation succeeded by checking the installation logs. You should see something like:

```out
...
** testing if installed package can be loaded from final location
** testing if installed package keeps a record of temporary installation path
* DONE (devtools)
```

Once this is done, you can install the required packages with:

```r
devtools::install_github("https://github.com/SMAC-Group/gmwm")
```

You should see something like:


```out
...
** testing if installed package can be loaded from final location
** testing if installed package keeps a record of temporary installation path
* DONE (gmwm)
```

To test if the package is correctly installed you can simply run:

```r
library(gmwm)
```


Then you have successfully installed and loaded all required softwares! Congratulations!


</exercise>
