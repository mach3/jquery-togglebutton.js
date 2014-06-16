
# jQuery-ToggleButton

Toggle button library based on `button` elements

## Usage

HTML:

	<button class="button-toggle active" data-toggle-group="my-group" value="foo">Foo</button>
	<button class="button-toggle" data-toggle-group="my-group" value="bar">Bar</button>
	<button class="button-toggle" data-toggle-group="my-group" value="baz">Baz</button>


CSS:
	
	.button-toggle.active {
		background-color: red;
	}

JavaScript:

	$(".button-toggle").toggleButton()
	.on("toggle.change", function(e, active){
		var data = $(this).serializeGroup();
		console.log(data); // returns ["foo"] or something selected, as array
	});

If `radio` option is `TRUE`, this behave like input[type=radio], otherwise, like input[type=checkbox].

## Options

Default settings are in `$.toggleButtonDefaults`.

- **name** :String ... CSS class name for activated button
- **group** :String ... data-* attribute's key for toggle button group
- **eventChange** :String ... Event name triggered when changed
- **eventActive** :String ... Event name triggered when activated
- **radio** :Boolean ... Radio mode

## Methods

### $.fn.toggleButton(options) :jQueryObject

Initialize toggle button

- **options** :Object

### $.fn.getGroup(options) :jQueryObject

Get grouped toggle button elements by jQuery object

- **options** :Object

### $.fn.serializeGroup(options) :Array

Get serialized array data from grouped toggle buttons

- **options** :Object

### $.getToggleGroup(name, nodeName, options) :jQueryObject

Get grouped toggle button elements by group name

- **name** :String ... Group name
- **nodeName** :String ("button") ... Node Name like "button"
- **options** :Object

