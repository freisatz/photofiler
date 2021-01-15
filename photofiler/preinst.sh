#!/bin/sh

path_des=$1

mkdir -p /shares/Volume_1/.systemfile/photofiler/
cp -R $path_des/etc /shares/Volume_1/.systemfile/photofiler/
