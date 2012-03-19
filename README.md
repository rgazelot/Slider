Slider JQuery
=============

This plugin is a simple slider plugin which use JQuery.

#### Install Theme

Insert this line in your `<head>` html :

`<link rel="stylesheet" href="js/libs/slider/themes/defaults/style.css" type="text/css" media="screen">` 

Where `js/libs` is the location of your javascript libraries and `defaults` is the name of the theme.

#### Install Javascript

Insert again in your `<head>` the javascript of the plugin :

`<script type="text/javascript" src="js/libs/slider/jquery.slider.js"></script>` 

#### Launch the plugin

Make a simple `<div>` with the id slider, like this :

`<div id="slider"></div>`

In your javascript file, just build a table with the repositories of your images like this :

`
var data = [
	'img/img1.png',
	'img/img2.png',
	'img/img3.png',
];
`

And call the slider plugin with your table like that :

`$('#slider').slider({imgs:data});`

#### Options

You can pass options to your plugin :

* Enable the loader : `.slider({imgs:data, loader:true })`.
* Define the color of the loader : `.slider({imgs:data, colorLoader:'#fff'})`.
* Enable the frame  : `.slider({imgs:data, frame:true })`.
* The speed display of the elements : `.slider({imgs:data, speedDisplay:300})`, in miliseconds.
* The speed of the animation : `.slider({imgs:data, speedAnimation:5000})`, in miliseconds.
* Enable the arrows on the sides : `.slider({imgs:data, arrows:true})`.

#### Example

You can see a simple example of usage in the folder `example`.

#### List of themes

* Defaults
* Grey

#### Enjoy !





