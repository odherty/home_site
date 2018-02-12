<?php

/*
  load configuration of constants
  and ensure the user is authenticated
*/

$json = file_get_contents("other/faq.json");
$json = json_decode($json, true);

$admin = true;

?>
<!DOCTYPE html>
<html>
<head>
    <title>Abacus</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charset="utf-8" />
    <link href="css/style.css" rel="stylesheet" type="text/css" />
	<link href="css/faq.css" rel="stylesheet" type="text/css" />
    <link rel="icon" type="image/ico" href="/abacus/favicon.ico" />
    <!--<link href="plugins/ckeditor/contents.css" rel="stylesheet" type="text/css" />-->
    <script src="plugins/ckeditor/ckeditor.js" type="text/javascript"></script>
    <script src="js/jquery.min.js" type="text/javascript"></script>
	<script src="js/faq.js" type="text/javascript"></script>
    <script src="js/accordion1.js" type="text/javascript"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="https://use.fontawesome.com/dd4e649e93.js"></script>
    <style>
        .accordion_text{
            display:none;
        }
        .help {
            padding-left: 2em;
            padding-right: 2em;
            background:#ffe0aa;
            width:80%;
            margin:auto;
            border:solid black 1px;
        }
        .FAQ {
            text-align: left;
        }
        .text {

            color:black;
            font-size:13px;
        }
        .term:hover {
            cursor: pointer;
            text-decoration: underline;
        }
        .video_player {
            margin-left: 40px;
			text-align: center;
        }
    </style>
</head>
<body>

<!-- CONTAINER -->
<div id="container">
	<!-- HEADER -->
	<div id="header">
		<div id="navbar">
			<?php include('includes/header.php');?>
		</div>

	</div>
<!-- END OF CONTAINER -->
</div>
	<!-- CONTENT AREA -->
<div class="content_area">
	<!-- CONTENT HERE!!!! -->
	<?php include('logo.php');?>

	<div class="title_bar">Help</div><br/>

<!-- Here we have the area for the FAQ-->
	<div id="faq">
        <!-- This first box serves as information for browser support, doesn't really deserve it's own button -->
        <!--<div class="content-box">
            <div class="content">
                Abacus works best on Google Chrome, Firefox and Internet Explorer 10 or 11. If you are experiencing problems with Abacus, make sure your browser is up to date. 
            </div>
        </div>    -->
        <!-- This is a row of buttons to display topics in the faq -->
		<div class="topics">
            <div style="text-align: center;">
            <div class="row">
                <div class="faq_topic" id="getting_startedBtn" onclick="fillContent(this.id)"><p class="topicBtn">Getting Started</p></div>
                <div class="faq_topic" id="dorBtn" onclick="fillContent(this.id)"><p class="topicBtn">DOR / Consent Forms</p></div>
                <div class="faq_topic" id="notificationBtn" onclick="fillContent(this.id)"><p class="topicBtn">Abacus Notification System</p></div>
                <div class="faq_topic" id="school_wideBtn" onclick="fillContent(this.id)"><p class="topicBtn">School-Wide Assessment Data</p></div>
            </div>
            </div>

		</div>
        <!-- This is the content box which the buttons update the html of. By default it's just text for contacting us -->
        <div class="content-box">
            <div id="content" class="content">
                    <?php foreach ($json as $categories) { ?>
                    <div id="<?php echo $categories[0]['category']; ?>" style="<?php if ($categories[0]['category'] == 'getting_started') { echo 'display: block;'; } else { echo 'display: none;'; }  ?>">
                        <div id="title"><?php echo $categories[0]['title']; ?></div>
                            <ul>
                                <?php foreach ($categories as $content) { ?>
                                    <li id="<?php echo $content['category'] . $content['id'];?>">
                                        <?php if (count($categories) != 1) { ?>
                                            <input type="checkbox" checked>
                                            <i></i> 
                                        <?php }
                                        if ($content['category'] != "getting_started") { ?>
                                        <div class="question">
                                            <?php echo $content['question']; ?>
                                        </div>
                                        <?php } ?>
                                        <p id="<?php echo $content['category'] . 'answer' . $content['id']; ?>" class='answer'>
                                            <?php echo $content['answer']; ?>
                                        </p>
                                        <?php if (isset($admin) && $admin === true && $content['category'] != "getting_started") { ?>
                                            <a id="<?php echo 'edit' . $content['category'] . $content['id'];?>" class="fa fa-2x fa-pencil-square editBtn answer" title="Edit"></a>
                                            <a id="<?php echo 'reset' . $content['category'] . $content['id'];?>" class="fa fa-2x fa-refresh resetBtn answer" title="Reset To Default Text"></a>
                                        <?php } ?>
                                    </li>
                                <?php } ?>
                            </ul>
                    </div>
                    <?php } ?>
            </div>
        </div>

	</div>
</div>
<!-- FOOTER -->
<div id="footer">
		<?php include('footer.php');?>
	</div>
</body>
</html>