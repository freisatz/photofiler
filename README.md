# Simple Photo Filer
A simple tool to file photos into a folder structure based on exif data.

This is an implementation of an App Package to be used with a WD My Cloud OS3 NAS device.

https://developer.westerndigital.com/develop/wd/sdk.html

This tool is based on exiftool, see http://www.exiftool.org.

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

To configure this tool, you can use the web interface. All the configuration data is stored in `/etc/photofiler/config.xml`.

You find the variables that determine the behaviour of the filer, namely

| Name            | Description                                                                       |
|:----------------|:----------------------------------------------------------------------------------|
| source_dir      | The source directory for photos to be filed in the folder structure.              |
| target_dir      | Base folder of the folder structure.                                              |
| exif_pattern    | String that determines the folder structure. See `man exiftool` for more details. |
