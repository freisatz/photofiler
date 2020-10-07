#!/bin/sh

echo "0 * * * * photofiler" >> /var/spool/cron/crontabs/root

killall crond
crond
