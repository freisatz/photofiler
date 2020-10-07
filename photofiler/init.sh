#!/bin/sh

path=$1

mkdir -p /usr/local/lib/perl/5.10.1

ln -s $path/../Image-ExifTool-12.07/lib/Image /usr/local/lib/perl/5.10.1/
ln -s $path/../Image-ExifTool-12.07/lib/File /usr/local/lib/perl/5.10.1/

ln -s $path/../Image-ExifTool-12.07/exiftool /usr/bin/
ln -s $path/bin/photofiler /usr/bin/
