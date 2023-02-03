# Photo Filer
A simple tool to file photos into a folder structure based on exif data.

This is an implementation of an App Package to be used with a WD My Cloud OS5 NAS device.

https://developer.westerndigital.com/develop/wd/sdk.html

## Build
To create a binary, use the toolchain provided by Western Digital

```
cd photofiler
%path%/%to%/MyCloudOS5_mksapkg -E -s -m WDMyCloudEX2
```

This process generates a `.bin` file which can be installed on a WD My Cloud OS5 NAS device using 
that device's web interface.

You can get the SDK at https://developer.westerndigital.com/develop/wd/sdk/downloads.html. 

## Configuration

To configure this tool, you can use the dedicated settings page in the Apps section of the WD My Cloud web interface.

The following variables can be set in order to determine the behaviour of the filer:

| Name             | Description                                                          |
|:-----------------|:---------------------------------------------------------------------|
| Source directory | The source directory for images to be filed in the folder structure. |
| Target directory | Base folder of the folder structure.                                 |
| File pattern     | String that determines the target file name.                         |
| Time of day      | Scheduled time for execution of the script.                          |
| Activate service | Activates the scheduled execution of the script.                     |

The file pattern uses format codes to resolve an individual target file path for every image file in the source directory. Those format codes are derived from `exiftool`. 

To refer to the `datetime_original` field in the exif data, you can use the format codes of the function `datetime.strptime` in Python 3. The major directives are listed below

| Directive | Description                                     |
|:----------|:------------------------------------------------|
| `%Y`      | The year in the exif date in the format `YYYY`. |
| `%m`      | The month in the exif date in the format `mm`.  |
| `%d`      | The day in the exif date in the format `dd`.    |
| `%H`      | The hour in the exif date in the format `HH`.   |
| `%M`      | The minute in the exif date in the format `MM`. |
| `%S`      | The second in the exif date in the format `SS`. |

see the [docs](https://docs.python.org/3/library/datetime.html#strftime-strptime-behavior) for more information.

Furthermore, you can use format codes referring to the properties of the source file.

| Directive | Description                                     |
|:----------|:------------------------------------------------|
| `%%f`     | The file name of the source.                    |
| `%%m`     | The directory name of the source.               |
| `%%e`     | The extension (without the `.`) of the source.  |

You can use the modifiers `l` or `u` to use lower case or upper case for replacing these codes. For instance, use the directive `%%le` for a lowercase extension.

Finally, you can determine the behaviour of the script when the resolved target file name collides with an existing file. By default, moving the file is prevented in this case. Alternatively, you can add the format code `%%c` to add a counter. Use `%%-c` to use a hyphen as a prefix. No counter is added if there is no file name collision.

The configuration data is stored in the config files located at `/etc/photofiler/config.xml` and `/etc/photofiler/schedule.xml`, respectively.

## Usage

The app, if activated, can run the script to file photos using a schedule, or by manual request. In the web interface, you find a switch to activate the service, which after activation will run the script every day at a specified time of day.

You can also execute the script manually from within the web interface.

When executed, a log is created in `/var/log/photofiler.log`.