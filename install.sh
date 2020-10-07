#!/bin/sh

path_src=$1
path_des=$2

tar xzvf $path_src/Image-ExifTool-12.07.tar.gz --directory=$path_des
rm -f $path_src/Image-ExifTool-12.07.tar.gz

mv $path_src $path_des
