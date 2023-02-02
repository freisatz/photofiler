#!/bin/sh

INSTALL_PATH=$1

BIN_PATH="/usr/bin"

chmod +x $INSTALL_PATH/bin/photofiler
chmod +x $INSTALL_PATH/bin/photofiler-runner
chmod +x $INSTALL_PATH/bin/photofiler-scheduler
chmod +x $INSTALL_PATH/bin/photofiler_mgr.cgi

ln -s $INSTALL_PATH/bin/photofiler $BIN_PATH
ln -s $INSTALL_PATH/bin/photofiler-runner $BIN_PATH
ln -s $INSTALL_PATH/bin/photofiler-scheduler $BIN_PATH

WEB_PATH="/var/www/apps/photofiler"

mkdir -p $WEB_PATH

ln -s $INSTALL_PATH/share/images/photofiler.png $WEB_PATH
ln -s $INSTALL_PATH/www/index.html $WEB_PATH
ln -s $INSTALL_PATH/www/lang/*.xml $WEB_PATH
ln -s $INSTALL_PATH/www/js/*.js $WEB_PATH
ln -s $INSTALL_PATH/www/desc.xml $WEB_PATH
ln -s $INSTALL_PATH/www/photofiler.php $WEB_PATH

XML_PATH="/var/www/xml"

ln -s $INSTALL_PATH/etc/photofiler/config.xml $XML_PATH/photofiler_config.xml
ln -s $INSTALL_PATH/etc/photofiler/schedule.xml $XML_PATH/photofiler_schedule.xml

SETTINGS_PATH="/etc/photofiler"

mkdir -p $SETTINGS_PATH

ln -s $INSTALL_PATH/etc/photofiler/config.xml $SETTINGS_PATH
ln -s $INSTALL_PATH/etc/photofiler/schedule.xml $SETTINGS_PATH
