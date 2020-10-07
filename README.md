# Simple Photo Filer
A simple tool to file photos into a folder structure based on exif data.

This is an implementation of an App Package to be used with a WD My Cloud OS3 NAS device.

https://developer.westerndigital.com/develop/wd/sdk.html

## Compilation
To create a binary, use the toolchain provided by Western Digital


```
cd photofiler
mksapkg-64b -E -s -m WDMyCloudEX2
```

You can get the SDK at https://developer.westerndigital.com/develop/wd/sdk/downloads.html. 
