#!/usr/bin/perl -w

use strict;
use warnings;

use CGI;

my $c = CGI->new;


if ('POST' eq $c->request_method && $c->param('cmd')) {
    if ('read_data' eq $c->param('cmd')) {

        print $c->header(
            -type=>'text/plain',
            -status=>'200 Success'
        );

        my $filename = '/etc/photofiler/config.xml';

        open(FH, '<', $filename) or die $!;

        my $record;

        while($record = <FH>){
            print $record;
        }

        close(FH);

        exit 0

    } elsif ('write_data' eq $c->param('cmd')) {

        print $c->header(
            -type=>'text/plain',
            -status=>'200 Success'
        );
        exit 0
    }
}

print $c->header(
   -type=>'text/plain',
   -status=>'405 Method Not Allowed'
);

exit 1