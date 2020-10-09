function PhotoFiler_load_data() {
    // TODO
    $("#i_source_dir").val("/From/Database/Source/");
    $("#i_target_dir").val("/From/Database/Target/");
    $("#i_exif_pattern").val("Default");

    wd_ajax({
        url: "/cgi-bin/photofiler_mgr.cgi",
        type: "POST",
        async: false,
        cache: false,
        data:{cmd:'read_data'},	
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

function PhotoFiler_save_data() {
    // TODO
}

function PhotoFiler_select_source_dir() {
    open_folder_selecter({
        title: apps_T('_PhotoFiler', 'title_select_source_dir'),
        device: "HDD", //HDD, USB, ..., ALL
        root: '/mnt/HD',
        cmd: 'cgi_read_open_tree',
        script: '/cgi-bin/folder_tree.cgi',
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
        script: '/cgi-bin/folder_tree.cgi',
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