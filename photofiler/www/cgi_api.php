<?php
session_start();

require_once ("../../web/lib/login_checker.php");

if (login_check() != 1)
{
	echo json_encode($r);
	exit;
}

class cgiAPI
{
	private $curl_http_code = 0;

	private $default_options = array (
		CURLOPT_HEADER => 1,
		CURLOPT_VERBOSE => 0,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_SSL_VERIFYHOST => false
	);

	private function send_curl($options, $toURL)
	{
		$toURL = "http://127.0.0.1:8000" . $toURL;
		$curl = curl_init();
		$options[CURLOPT_URL] = $toURL;

		curl_setopt_array($curl, $options);
		$r = curl_exec($curl);

		$this->curl_http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);

		if(!curl_errno($curl))
		{
			//echo "ret = ", $r;
		}
		else
		{
			$info = curl_getinfo($curl);
			$r = null;
		}

		curl_close($curl);
		return $r;
	}

	public function cgiAPI_POST($toURL, $send_data = null, $custom_header = null)
	{
		$options = $this->default_options;
		$options[CURLOPT_POST] = true;
		$options[CURLOPT_POSTFIELDS] = http_build_query($send_data, '', '&');

		return $this->send_curl($options, $toURL);
	}

	public function cgiAPI_GET($toURL, $send_data = null, $custom_header = null)
	{
		$options = $this->default_options;
		$toURL = sprintf("%s?%s", $toURL, ($send_data) ? http_build_query($send_data, '', '&') : "");
		$options[CURLOPT_POST] = false;

		return $this->send_curl($options, $toURL);
	}

	public function cgiAPI_SEND($toURL, $send_data = null, $custom_header = null)
	{
		$REQUEST_METHOD = $_SERVER['REQUEST_METHOD'];
		
		switch($REQUEST_METHOD)
		{
			case "GET":
			{
				return $this->cgiAPI_GET($toURL, $send_data, $custom_header);
			}
				break;

			case "POST":
			default:
			{
				return $this->cgiAPI_POST($toURL, $send_data, $custom_header);
			}
				break;
		}
	}

	public function get_query_data()
	{
		$REQUEST_METHOD = $_SERVER['REQUEST_METHOD'];
		$send_data = array();

		switch($REQUEST_METHOD)
		{
			case "GET":
				$request_aggs = array_slice($_GET, 1); //first is 'cgi_name', skip
				foreach($request_aggs as $k => $v)
					$send_data[$k] = $v;
				break;

			case "POST":
				$request_aggs = $_POST;
				foreach($request_aggs as $k => $v)
					$send_data[$k] = $v;
				break;

			default:
				$request_aggs = $_POST;
				foreach($request_aggs as $k => $v)
					$send_data[$k] = $v;
		}
		
		return $send_data;
	}
	
	public function get_response_header($response_data)
	{
		$headers = array();
		list($header_text, $body) = explode("\r\n\r\n", $response_data, 2);

		foreach (explode("\r\n", $header_text) as $i => $line)
		{
			if ($i === 0)
				$headers['http_code'] = $line;
			else
			{
				list ($key, $value) = explode(': ', $line);
				$headers[$key] = $value;
			}
		}

		return $headers;
	}
	
	public function get_response_body($response_data)
	{
		$headers = array();
		list($header_text, $body) = explode("\r\n\r\n", $response_data, 2);

		return $body;
	}
	
	public function get_http_code()
	{
		return $this->curl_http_code;
	}
}

$function_list = array(
	"photofiler_mgr" => array(
		"read_settings",
		"read_schedule_settings",
		"write_settings",
		"edit_schedule",
		"execute_main"
	),
	"folder_tree" => array(
		"cgi_read_open_tree",
		"cgi_generic_open_tree"
	)
);

function check_function_permission($cgi_name, $fn_name)
{
	global $function_list;
	if (@in_array($fn_name, $function_list[$cgi_name], true) === true)
		return $permission_level;
	else
		return 0;
}

function default_curl($ca, $cgi_name, $send_data = null)
{
	if (!$send_data)
		$send_data = $ca->get_query_data();

	if (check_function_permission($cgi_name, $send_data['cmd']) === 0)
	{
		http_response_code(406); //Not Acceptable
	}
	else
	{
		$toURL = sprintf("/cgi-bin/%s.cgi", $cgi_name);
		$result = $ca->cgiAPI_SEND($toURL, $send_data); // POST yields empty result for some unknown reason
		$res = $ca->get_response_body($result);
		$http_code = $ca->get_http_code();
		$headers = $ca->get_response_header($result);

		if ($http_code === 200)
		{
			if (isset($headers['Content-Type']))
				header('Content-Type: ' . $headers['Content-Type']);

				echo ($res) ? $res : "";
		}
		else
			http_response_code($http_code);
	}
}

$cgi_name = $_GET['cgi_name'];
$ca = new cgiAPI;

$send_data = $ca->get_query_data();
default_curl($ca, $cgi_name);
?>