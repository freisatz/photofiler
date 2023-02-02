#!/bin/sh

BIN_PATH="/usr/bin"
SETTINGS_PATH="/etc/photofiler"
WEB_PATH="/var/www/apps/photofiler"
XML_PATH="/var/www/xml"

rm -f $BIN_PATH/photofiler
rm -f $BIN_PATH/photofiler-runner
rm -f $BIN_PATH/photofiler-scheduler

rm -rf $SETTINGS_PATH

rm -rf $WEB_PATH

rm -f $XML_PATH/photofiler_config.xml
rm -f $XML_PATH/photofiler_schedule.xml
