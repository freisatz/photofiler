function PhotoFiler_load_settings() {
    wd_ajax({
        url: "/apps/photofiler/cgi_api.php?cgi_name=photofiler_mgr",
        type: "POST",
        async: false,
        cache: false,
        data:{cmd:'read_settings'},	
        dataType:"xml",
        success: function(xml){
            var source_dir = $(xml).find("photofiler").find("source_dir").text();          
            $("#i_source_dir").val(source_dir);
            $("#i_source_dir").flexReload();
            var target_dir = $(xml).find("photofiler").find("target_dir").text();          
            $("#i_target_dir").val(target_dir);
            $("#i_target_dir").flexReload();
            var exif_pattern = $(xml).find("photofiler").find("exif_pattern").text();          
            $("#i_exif_pattern").val(exif_pattern);
            $("#i_exif_pattern").flexReload();
		}
	});
}

function PhotoFiler_hour_mapping(hour) {
    var hour_array = new Array(
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00'
    );
    return hour_array[hour];
}

function PhotoFiler_load_schedule_settings() {
    wd_ajax({
        url: "/apps/photofiler/cgi_api.php?cgi_name=photofiler_mgr",
        type: "POST",
        async: false,
        cache: false,
        data:{cmd:'read_schedule_settings'},	
        dataType:"xml",
        success: function(xml){
            var active = $(xml).find("photofiler").find("active").text();     
            setSwitch('#i_activate_schedule', active);           
            $("#i_activate_schedule").flexReload();
            var hour = $(xml).find("photofiler").find("hour").text();  
			reset_sel_item("#hour_schedule_select",PhotoFiler_hour_mapping(hour),hour);
		}
	});
}

function PhotoFiler_save_settings() {
    wd_ajax({
        url: "/apps/photofiler/cgi_api.php?cgi_name=photofiler_mgr",
        type: "POST",
        async: true,
        cache: false,
        data:{cmd:'write_settings',source_dir:$("#i_source_dir").val(),target_dir:$("#i_target_dir").val(),exif_pattern:$("#i_exif_pattern").val()},	
        dataType:"xml",
        success: function(xml){
            //
		}
	});
}

function PhotoFiler_edit_schedule(hours) {
    wd_ajax({
        url: "/apps/photofiler/cgi_api.php?cgi_name=photofiler_mgr",
        type: "POST",
        async: true,
        cache: false,
        data:{cmd:'edit_schedule',active:getSwitch("#i_activate_schedule"),hour:hours},	
        dataType:"xml",
        success: function(xml){
            //
		}
	});
}

function PhotoFiler_execute_main() {
    jLoading(apps_T('_PhotoFiler','msg_execute'), 'loading' ,'s', "");
    wd_ajax({
        url: "/apps/photofiler/cgi_api.php?cgi_name=photofiler_mgr",
        type: "POST",
        async: true,
        cache: false,
        data:{cmd:'execute_main'},	
        dataType:"xml",
        success: function(xml){
            jLoadingClose();
		}
	});
}

function PhotoFiler_select_source_dir() {
    open_folder_selecter({
        title: apps_T('_PhotoFiler', 'title_select_source_dir'),
        device: "HDD", //HDD, USB, ..., ALL
        root: '/mnt/HD',
        cmd: 'cgi_read_open_tree',
        script: '/apps/photofiler/folder_tree.php',
        effect: 'no_son',
        formname: 'generic',
        textname: null,
        filetype: 'all',
        checkbox_all: 2,
        showfile: 0,
        chkflag: 1, //for show check box, 1:show, 0:not
        chk:1,
        callback: null,
        single_select: true,
        over_select_msg: apps_T("_PhotoFiler", "msg_over_select"),
        afterOK: function() {
                var sel_source_ele = $("#folder_selector input:checkbox:checked[name=folder_name]");				
                sel_source_ele.each(function(k){					
                var _path = translate_path_to_display($(this).val());
                $("#i_source_dir").val(_path);
            });
        },
        afterCancel: function() {
        }
    });
}

function PhotoFiler_select_target_dir() {
    open_folder_selecter({
        title: apps_T('_PhotoFiler', 'title_select_target_dir'),
        device: "HDD", //HDD, USB, ..., ALL
        root: '/mnt/HD',
        cmd: 'cgi_read_open_tree',
        script: '/apps/photofiler/folder_tree.php',
        effect: 'no_son',
        formname: 'generic',
        textname: null,
        filetype: 'all',
        checkbox_all: 2,
        showfile: 0,
        chkflag: 1, //for show check box, 1:show, 0:not
        chk:1,
        callback: null,
        single_select: true,
        over_select_msg: apps_T("_PhotoFiler", "msg_over_select"),
        afterOK: function() {
                var sel_source_ele = $("#folder_selector input:checkbox:checked[name=folder_name]");				
                sel_source_ele.each(function(k){					
                var _path = translate_path_to_display($(this).val());
                $("#i_target_dir").val(_path);
            });
        },
        afterCancel: function() {
        }
    });
}