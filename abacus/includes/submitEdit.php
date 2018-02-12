<?php
$json = fopen("../other/faq.json");
$backup_json = file_get_contents("../other/faqbackup.json");
$data = json_decode($json, true);
$backup_data = json_decode($backup_json, true);

$reset = $_POST["reset"];
$editedText = $_POST["editedText"];
$currentID = $_POST["currentID"];
$currentCategory = $_POST["currentCategory"];

if ($reset == "true") {
//Reset text to that found in the default file
$data[$currentCategory][$currentID]['answer'] = $backup_data[$currentCategory][$currentID]['answer'];
$newJson = json_encode($data, JSON_PRETTY_PRINT);
file_put_contents("../other/faq.json", $newJson);

//To refresh content on the fly
echo $data[$currentCategory][$currentID]['answer'];

} else if ($reset == "false") {
//New Edit

$data[$currentCategory][$currentID]['answer'] = $editedText;

$newJson = json_encode($data, JSON_PRETTY_PRINT);
fwrite("../other/faq.json", "wHAT");

$returnArray = array($editedText, $currentID, $currentCategory);
print_r($returnArray);
}
?>