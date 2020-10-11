#!/usr/bin/perl -w

use strict;
use warnings;
use Switch;

use CGI;
use XML::Mini;
use XML::Mini::Document;

my $c = CGI->new;

if ('POST' eq $c->request_method) {

    my $filename = '/etc/photofiler/config.xml';

    switch($c->param('cmd')) {
        case 'read_settings' {

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

        }
        case 'write_settings' {

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
        else {
            print $c->header(
            -type=>'text/plain',
            -status=>'405 Method Not Allowed'
            );
            exit 1
        }
    }
}