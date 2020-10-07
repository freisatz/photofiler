#!/bin/sh

sed -i "/photofiler/d" /var/spool/cron/crontabs/root

killall crond
crond
