# Simple Photo Filer
A simple tool to file photos into a folder structure based on exif data.

This is an implementation of an App Package to be used with a WD My Cloud OS3 NAS device.

https://developer.westerndigital.com/develop/wd/sdk.html

This tool is based on exiftool, see www.exiftool.org.

## Build
To create a binary, use the toolchain provided by Western Digital

```
cd photofiler
mksapkg-64b -E -s -m WDMyCloudEX2
```

This process generates a `.bin` file which can be installed on a WD My Cloud OS3 NAS device using 
that device's web interface.

You can get the SDK at https://developer.westerndigital.com/develop/wd/sdk/downloads.html. 

## Configuration

Currently, the required configuration can be found in a bash script `photofiler/etc/photofiler.conf`.
You find the variables that determine the behaviour of the filer, namely

| Name       | Description                                                                       |
|:-----------|:----------------------------------------------------------------------------------|
| SOURCE_DIR | The source directory for photos to be filed in the folder structure.              |
| TARGET_DIR | Base folder of the folder structure.                                              |
| PATTERN    | String that determines the folder structure. See `man exiftool` for more details. |
