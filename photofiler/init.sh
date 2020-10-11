#!/bin/sh

path=$1

mkdir -p /usr/local/lib/perl/5.10.1

ln -s $path/share/Image-ExifTool-12.07/lib/Image /usr/local/lib/perl/5.10.1/
ln -s $path/share/Image-ExifTool-12.07/lib/File /usr/local/lib/perl/5.10.1/
ln -s $path/share/XML-Mini-1.38/lib/XML /usr/local/lib/perl/5.10.1/

ln -s $path/share/Image-ExifTool-12.07/exiftool /usr/bin/
ln -s $path/bin/photofiler /usr/bin/

mkdir -p /var/www/photofiler/

ln -s $path/share/images/photofiler.png /var/www/photofiler/
ln -s $path/www/index.html /var/www/photofiler/
ln -s $path/www/lang/*.xml /var/www/photofiler/
ln -s $path/www/js/*.js /var/www/photofiler/

ln -s $path/bin/photofiler_mgr.cgi /var/www/cgi-bin/

mkdir -p /etc/photofiler/

ln -s $path/etc/photofiler/config.xml /etc/photofiler/
