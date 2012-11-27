<?php

$dirPath = 'htmltemplates/';
if(is_dir($dirPath)) {
	if($dh = opendir($dirPath)) {
		while($file = readdir($dh)) {
			if($file == '.' || $file == '..') { continue; }
			//echo "filename: " . $file . " : filetype: " . filetype($dirPath . $file) . "<br />";
			$templates[basename($dirPath . $file, ".html")] = file_get_contents($dirPath . $file);
		}
		closedir($dh);
	}

	echo json_encode($templates);

}
else{
    throw new Exception("Templates directory not found");
}

?>
