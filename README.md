# Photo Filer
A simple tool to file photos into a folder structure based on exif data.

This is an implementation of an App Package to be used with a WD My Cloud OS3 NAS device.

https://developer.westerndigital.com/develop/wd/sdk.html

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

To configure this tool, you can use the dedicated settings page in the Apps section of the WD My Cloud web interface.

The following variables can be set in order to determine the behaviour of the filer:

| Name             | Description                                                                       |
|:-----------------|:----------------------------------------------------------------------------------|
| Source directory | The source directory for photos to be filed in the folder structure.              |
| Target directory | Base folder of the folder structure.                                              |
| Pattern          | String that determines the folder structure. See `man exiftool` for more details. |

 All the configuration data is stored as XML following the scheme

 ```
 <photofiler>
  <source_dir>...</source_dir>
  <target_dir>...</target_dir>
  <exif_pattern>...</exif_pattern>
 </photofiler>
 ```

 in the config file located at `/etc/photofiler/config.xml`.

## Usage
The app, if activated, can run the script to file photos using a schedule, or by manual request. In the web interface, you find a switch to activate the service, which after activation will run the script every day at a specified time of day.

You can also execute the script manually in the web interface.

When executed, a log is created in `/var/log/photofiler.log`.