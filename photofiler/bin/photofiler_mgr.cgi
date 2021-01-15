#!/usr/bin/python3

# Import modules for CGI handling 
import cgi, cgitb 
import xml.etree.cElementTree as cET
import os

# Set config file locations
config_file = '/etc/photofiler/config.xml'
schedule_config_file = '/etc/photofiler/schedule.xml'

# Fetch request
c = cgi.FieldStorage()

# Define handlers
def read_settings_handler():
	f = open(config_file, "r")
	print("Status: 200 Success")
	print("Content-Type: text/html\n")
	print(f.read())

def write_settings_handler():
	
	print("Status: 200 Success")                                                                                                                          
	print("Content-Type: text/html\n")

	photofiler = cET.Element("photofiler")

	cET.SubElement(photofiler, "source_dir").text = c.getvalue("source_dir")
	cET.SubElement(photofiler, "target_dir").text = c.getvalue("target_dir")
	cET.SubElement(photofiler, "exif_pattern").text = c.getvalue("exif_pattern")

	tree = cET.ElementTree(photofiler)
	tree.write(config_file)

def read_schedule_settings_handler():
	f = open(schedule_config_file, "r")
	print("Status: 200 Success")
	print("Content-Type: text/html\n")
	print(f.read())

def edit_schedule_handler():
	
	print("Status: 200 Success")                                                                                                                          
	print("Content-Type: text/html\n")

	photofiler = cET.Element("photofiler")

	cET.SubElement(photofiler, "active").text = c.getvalue("active")
	cET.SubElement(photofiler, "hour").text = c.getvalue("hour")


	tree = cET.ElementTree(photofiler)
	tree.write(schedule_config_file)

def execute_main_handler():
	
	print("Status: 200 Success")                                                                                                                          
	print("Content-Type: text/html\n")

	os.system('photofiler')

def default_handler():

	print("Status: 405 Method Not Allowed")                                                                                                                          
	print("Content-Type: text/html\n")
	
# Define available commands
commands = {
	'read_settings': read_settings_handler,
	'write_settings': write_settings_handler,
	'read_schedule_settings': read_schedule_settings_handler,
	'edit_schedule': edit_schedule_handler,
	'execute_main': execute_main_handler 
}

# Fetch command
cmd = c.getvalue("cmd")

# Execute command
if cmd in commands:
	commands[cmd]()
	exit(0)
else:
	default_handler()
	exit(1)