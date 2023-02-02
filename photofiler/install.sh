#!/bin/sh

UPLOAD_PATH=$1
INSTALL_PATH=$2

mkdir -p $UPLOAD_PATH/share/python

unzip -d $UPLOAD_PATH/share/python $UPLOAD_PATH/exif-1.6.0-py3-none-any.whl
unzip -d $UPLOAD_PATH/share/python $UPLOAD_PATH/plum_py-0.8.5-py3-none-any.whl

rm -f $UPLOAD_PATH/exif-1.6.0-py3-none-any.whl
rm -f $UPLOAD_PATH/plum_py-0.8.5-py3-none-any.whl

mv $UPLOAD_PATH $INSTALL_PATH

if [ -d /mnt/HD/HD_a2/.systemfile/photofiler ]; then
	cp -R /mnt/HD/HD_a2/.systemfile/photofiler/etc "${INSTALL_PATH}/photofiler/"
	rm -rf /mnt/HD/HD_a2/.systemfile/photofiler
fi