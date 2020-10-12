#!/usr/bin/perl -w

use strict;
use warnings;
use Switch;

use CGI;
use XML::Mini;
use XML::Mini::Document;

my $c = CGI->new;

if ('POST' eq $c->request_method) {

    my $config_file = '/etc/photofiler/config.xml';
    my $schedule_config_file = '/etc/photofiler/schedule.xml';

    switch($c->param('cmd')) {
        case 'read_settings' {

            print $c->header(
                -type=>'text/plain',
                -status=>'200 Success'
            );

            open(FH, '<', $config_file) or die $!;

            my $record;

            while($record = <FH>){
                print $record;
            }

            close(FH);

            exit 0;

        }
        case 'read_schedule_settings' {

            print $c->header(
                -type=>'text/plain',
                -status=>'200 Success'
            );

            open(FH, '<', $schedule_config_file) or die $!;

            my $record;

            while($record = <FH>){
                print $record;
            }

            close(FH);

            exit 0;

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
            $xml->toFile($config_file);
            exit 0;

        }
        case 'execute_main' {

            print $c->header(
                -type=>'text/plain',
                -status=>'200 Success'
            );

            system('photofiler');
            exit 0;
        }
        case 'activate_schedule' {

            print $c->header(
                -type=>'text/plain',
                -status=>'200 Success'
            );

            my $hashref = { 
                'photofiler' => {
                    'active' => $c->param('active'),
                },
            };
            
            my $xml = XML::Mini::Document->new();
            
            $xml->fromHash($hashref);
            $xml->toFile($schedule_config_file);

            system('photofiler-scheduler restart');
            
            exit 0;
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