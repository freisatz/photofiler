<?php

require_once ("/var/www/web/lib/login_checker.php");

session_start();           

if (login_check() != 1) {    
    print("Not authorized.");                 
    exit;
}

function execute_main() {
    # Execute photofiler main script
    shell_exec('photofiler-runner');
}

function unknown_action() {
    # Default action
}

function edit_config($file) {
    # Write photofiler settings to config file
    
    $doc = new DOMDocument();

    $root = $doc->createElement('photofiler');
    $source_dir = $doc->createElement('source_dir');
    $source_dir->nodeValue = $_REQUEST['source_dir'];
    $root->appendChild($source_dir);

    $target_dir = $doc->createElement('target_dir');
    $target_dir->nodeValue = $_REQUEST['target_dir'];
    $root->appendChild($target_dir);

    $exif_pattern = $doc->createElement('exif_pattern');
    $exif_pattern->nodeValue = $_REQUEST['exif_pattern'];
    $root->appendChild($exif_pattern);

    $doc->appendChild($root);
    $doc->save($file);

}

function edit_schedule($file) {
   
    $doc = new DOMDocument();

    $root = $doc->createElement('photofiler');
    $active = $doc->createElement('active');
    $active->nodeValue = $_REQUEST['active'];
    $root->appendChild($active);

    $hour = $doc->createElement('hour');
    $hour->nodeValue = $_REQUEST['hour'];
    $root->appendChild($hour);

    $doc->appendChild($root);
    $doc->save($file);

    shell_exec('photofiler-scheduler restart');

}

# Set config file locations
$config_file = '/etc/photofiler/config.xml';
$schedule_file = '/etc/photofiler/schedule.xml';

# Check if request has been send
switch($_REQUEST['cmd']) {
    case 'execute_main':
        execute_main();
        break;
    case 'edit_config':
        edit_config($config_file);
        break;
    case 'edit_schedule':
        edit_schedule($schedule_file);
        break;
    default:
        print("do nothing");
        break;
}

?>