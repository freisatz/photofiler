#!/usr/bin/perl -w

use strict;
use warnings;

use CGI;
use XML::Mini;
use XML::Mini::Document;

my $c = CGI->new;

if ('POST' eq $c->request_method && $c->param('cmd')) {

    my $filename = '/etc/photofiler/config.xml';

    if ('read_data' eq $c->param('cmd')) {

        print $c->header(
            -type=>'text/plain',
            -status=>'200 Success'
        );

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

        my $hashref = { 
            'photofiler' => {
                'source_dir' => $c->param('source_dir'), 
                'target_dir' => $c->param('target_dir'), 
                'exif_pattern' => $c->param('exif_pattern'),
            },
        };
        
        my $xml = XML::Mini::Document->new();
        
        $xml->fromHash($hashref);
        $xml->toFile($filename);
        exit 0
    }
}

print $c->header(
   -type=>'text/plain',
   -status=>'405 Method Not Allowed'
);

exit 1