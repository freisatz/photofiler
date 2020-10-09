#!/bin/sh

path_src=$1
path_des=$2

tar xzvf $path_src/Image-ExifTool-12.07.tar.gz --directory=$path_src/share/
tar xzvf $path_src/XML-Simple-2.25.tar.gz --directory=$path_src/share/

rm -f $path_src/Image-ExifTool-12.07.tar.gz
rm -f $path_src/XML-Simple-2.25.tar.gz

mv $path_src $path_des
