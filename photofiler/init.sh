#!/bin/sh

path=$1

PERL_LIB_PATH='/usr/local/lib/perl/5.10.1/'

mkdir -p $PERL_LIB_PATH

ln -s $path/share/Image-ExifTool-12.07/lib/Image $PERL_LIB_PATH
ln -s $path/share/Image-ExifTool-12.07/lib/File $PERL_LIB_PATH
ln -s $path/share/XML-Mini-1.38/lib/XML $PERL_LIB_PATH

BIN_PATH="/usr/bin/"

ln -s $path/share/Image-ExifTool-12.07/exiftool $BIN_PATH
ln -s $path/bin/photofiler $BIN_PATH
ln -s $path/bin/photofiler-scheduler $BIN_PATH

WEB_PATH="/var/www/photofiler/"

mkdir -p $WEB_PATH

ln -s $path/share/images/photofiler.png $WEB_PATH
ln -s $path/www/index.html $WEB_PATH
ln -s $path/www/lang/*.xml $WEB_PATH
ln -s $path/www/js/*.js $WEB_PATH
ln -s $path/www/desc.xml $WEB_PATH

CGI_PATH="/var/www/cgi-bin/"

ln -s $path/bin/photofiler_mgr.cgi $CGI_PATH

SETTINGS_PATH="/etc/photofiler/"

mkdir -p $SETTINGS_PATH

ln -s $path/etc/photofiler/config.xml $SETTINGS_PATH
ln -s $path/etc/photofiler/schedule.xml $SETTINGS_PATH
