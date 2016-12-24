$(function(){

	(function(){

		return {

			counter: 0,

			settings: {},

			images: {},

			link_image: "",

			container: $('<div class="container"><div class="title-bar"><h1 class="title"></h1></div><div class="content pad-all body"></div></div>'),

			init: function(){
				var plugin = proboards.plugin.get("kitchen_sink");

				this.settings = plugin.settings || {};
				this.images = plugin.images || {};

				if(this.images.link){
					this.link_image = '<img src="' + this.images.link + '" alt="API Link" title="API Link" style="position: relative; top: 3px;" />';
				}

				if(location.href.match(/\/\?kitchensink/i)){
					$("#content > *").hide();
					this.setup_examples();
					this.setup_console();
				} else {
					this.create_kitchen_sink_button();
				}
			},

			create_kitchen_sink_button: function(){
				var button = $("<button>Kitchen Sink</button>").click(function(){
					location.href = "/?kitchensink";
				});

				var container = $("<div />").append(button).css({

					"text-align": "center",
					"margin-bottom": "5px"

				});

				$("#content").prepend(container);
			},

			log: function(msg, notes, beautify, link){
				var date = new Date();
				var c = $("#kitchensink_console");
				var hrs = date.getHours();
				var mins =  date.getMinutes();
				var secs = date.getSeconds();

				mins = (mins < 10)? ("0" + mins) : mins;
				secs = (secs < 10)? ("0" + secs) : secs;

				var color = (this.counter % 2 == 0)? "#F9EAEA" : "#FCF9F9";
				var n = "";
				var l = "";

				if(notes){
					n = "<div style='margin-top: 10px; font-size: 70%; font-style: italic;'>" + notes + "</div>";
				}

				if(link){
					l = "<div style='margin-top: 5px; font-size: 70%; font-style: italic;'><a href='http://proboards.com/developer/js/class/" + link + "'>http://proboards.com/developer/js/class/" + link + "</a></div>";
				}

				var msg_container = $("<div style='padding: 10px; background-color: " + color + ";'>[" + hrs + ":" + mins + ":" + secs + "]<br /><br /><pre></pre>" + n + l + "</div>");

				msg_container.find("pre").text((beautify)? js_beautify(msg) : msg);
				c.prepend(msg_container);

				this.counter ++;
			},

			setup_examples: function(){
				this.create_window_api_examples();
				this.create_text_api_examples();
				this.create_data_api_examples();
				this.create_number_api_examples();
				this.create_date_api_examples();
			},

			setup_console: function(){
				var console = $("<div id='kitchensink_console'></div>");
				var console_container = this.container.clone();

				var clear_btn = $("<button id='clear_kitchensink_console'>Clear Console</button>")
					.css("margin-bottom", "10px")
					.click (function () {
						$("#kitchensink_console").empty();
					});

				console_container.find(".body").append(clear_btn);

				console_container.find(".title").html("Console");
				console_container.find(".body").append(console).css({

					height: "600px",
					overflow: "auto",
					"font-size": "90%"

				});

				$("#content").append(console_container);
			},

			dump: function(o){
				if(!o){
					return;
				}

				var str = "";

				if(typeof o == "object"){
					str += "{\n";

					for(var k in o){
						var key = (k.match(/\W/))? "\"" + k + "\"" : k;
						var val =  (typeof o[k] == "string")? "\"" + o[k] + "\"" : ((typeof o[k] == "boolean")? ((o[k])? "true" : "false") : this.dump(o[k]));

						str += key + ": " + val + ",\n";
					}

					str += "}";

					var i = str.lastIndexOf(",");
					str = str.slice(0, i) + str.slice(i + 1);
				} else {
					str = o.toString();
				}

				return str;
			},

			create_text_api_examples: function(){
				var self = this;
				var text_buttons = this.container.clone();

				text_buttons.find(".title").html("pb.text <a href='http://proboards.com/developer/js/class/text'>" + this.link_image + "</a>");

				var buttons = [

					{

						id: "capitalize",
						title: "Capitalize",
						link: "text#capitalize",
						listeners: {

							click: function(){
								var what = this;

								pb.window.dialog("dialog_" + this.id, {

									title: what.title,
									html: "<input type='text' value='hello' style='width: 99%' />",

									buttons: {

										Capitalize: function(){
											var dialog = $("#dialog_" + what.id);
											var input = dialog.find("input");

											self.log(pb.text.capitalize(input.attr("value")));
										},

										Close: function(){
											$(this).dialog("close");
										}

									}

								});
							}

						},

						source: function(){
							return 'pb.text.capitalize("hello world");';
						}
					},

					{

						id: "escape_html",
						title: "Escape HTML",
						link: "text#escape_html",
						listeners: {

							click: function(){
								var what = this;

								pb.window.dialog("dialog_" + this.id, {

									title: what.title,
									html: "<input type='text' value='hello <em>world</em>' style='width: 99%' />",

									buttons: {

										"Escape HTML": function(){
											var dialog = $("#dialog_" + what.id);
											var input = dialog.find("input");

											self.log(pb.text.escape_html(input.attr("value")));
										},

										Close: function(){
											$(this).dialog("close");
										}

									}

								});
							}

						},

						source: function(){
							return 'pb.text.escape_html("hello <em>world</em>");';
						}
					},

					{

						id: "mono",
						title: "Mono",
						link: "text#mono",
						listeners: {

							click: function(){
								var what = this;

								pb.window.dialog("dialog_" + this.id, {

									title: what.title,
									html: "<input type='text' value='hello \"world\" & Yo ' style='width: 99%' />",

									buttons: {

										"Mono": function(){
											var dialog = $("#dialog_" + what.id);
											var input = dialog.find("input");

											self.log(pb.text.mono(input.attr("value")));
										},

										Close: function(){
											$(this).dialog("close");
										}

									}

								});
							}

						},

						source: function(){
							return 'pb.text.mono("hello \"world\" & Yo ");';
						}
					},

					{

						id: "nbsp",
						title: "NBSP",
						link: "text#nbsp",
						listeners: {

							click: function(){
								var what = this;

								pb.window.dialog("dialog_" + this.id, {

									title: what.title,
									html: "<input type='text' value='hello     <em>world</em>' style='width: 99%' />",

									buttons: {

										"NBSP": function(){
											var dialog = $("#dialog_" + what.id);
											var input = dialog.find("input");

											self.log(pb.text.nbsp(input.attr("value")));
										},

										Close: function(){
											$(this).dialog("close");
										}

									}

								});
							}

						},

						source: function(){
							return 'pb.text.nbsp("hello     <em>world</em>");';
						}
					},

					{

						id: "nl2br",
						title: "NL2BR",
						link: "text#nl2br",
						listeners: {

							click: function(){
								var what = this;

								pb.window.dialog("dialog_" + this.id, {

									title: what.title,
									html: "<textarea style='width: 99%'>hello\nworld</textarea>",

									buttons: {

										"NL2BR": function(){
											var dialog = $("#dialog_" + what.id);
											var input = dialog.find("textarea");

											self.log(pb.text.nl2br(input.attr("value")));
										},

										Close: function(){
											$(this).dialog("close");
										}

									}

								});
							}

						},

						source: function(){
							return 'pb.text.nl2br("hello\\nworld");';
						}
					}

				];

				this.apply_handlers(buttons, text_buttons);

				$("#content").append(text_buttons);
			},

			create_data_api_examples: function() {
			  var self        = this,
			    data_buttons  = this.container.clone();

			  data_buttons.find('.title').html('pb.data <a href="http://proboards.com/developer/js/class/pb#data">' + this.link_image + '</a>');

			  var buttons = [

			  	{
			  		id: 'user_group_ids',
			  		title: 'User Group IDs',
			  		link: 'data',
			  		listeners: {

			  			click: function () {
			  				self.log(pb.data('user').group_ids,
			  					'An array of IDs of the groups the user belongs to.');
			  			}

			  		},

			  		source: function () {
			  			return "pb.data('user').group_ids;";
			  		}
			  	},

			  	{
			  		id: 'user_groups',
			  		title: 'User Groups',
			  		link: 'data',
			  		listeners: {

			  			click: function () {
			  				self.log(JSON.stringify(pb.data('user').groups),
			  					'An object containing all groups (by name and ID) the user belongs to.');
			  			}

			  		},

			  		source: function () {
			  			return "pb.data('user').groups;";
			  		}
			  	},

			  	{
			  		id: 'user_id',
			  		title: 'User ID',
			  		link: 'data',
			  		listeners: {

			  			click: function () {
			  				self.log(pb.data('user').id);
			  			}

			  		},

			  		source: function () {
			  			return "pb.data('user').id;";
			  		}
			  	},

			  	{
			  		id: 'user_is_staff',
			  		title: 'User Is Staff?',
			  		link: 'data',
			  		listeners: {

			  			click: function () {
			  				self.log(pb.data('user').is_staff,
			  					'Returns: 1 (true) or 0 (false)');
			  			}

			  		},

			  		source: function () {
			  			return "pb.data('user').is_staff;";
			  		}
			  	},

			  	{
			  		id: 'user_name',
			  		title: 'User Name',
			  		link: 'data',
			  		listeners: {

			  			click: function () {
			  				self.log(pb.data('user').name,
			  					'Current display name of the user.');
			  			}

			  		},

			  		source: function () {
			  			return "pb.data('user').name;";
			  		}
			  	},

			    {

			      id: 'route_name',
			      title: 'Route Name',
			      link: 'data',
			      listeners: {

			        click: function () {
			          self.log(pb.data('route').name);
			        }

			      },

			      source: function () {
			        return "pb.data('route').name;";
			      }

			    },

			    {

			    	id: 'route_params',
			    	title: 'Route Params',
			    	link: 'data',
			    	listeners: {

			    		click: function () {
			    			self.log(JSON.stringify(pb.data('route').params),
			          	'Results in an object containing URI parameters (thread_id in a thread, for example).')
			    		}

			    	},

			    	source: function () {
			    		return "pb.data('route').params;";
			    	}
			    }

			  ];

			  this.apply_handlers(buttons, data_buttons);

			  $('#content').append(data_buttons);
			},

			create_number_api_examples: function(){
				var self = this;
				var number_buttons = this.container.clone();

				number_buttons.find(".title").html("pb.number <a href='http://proboards.com/developer/js/class/number'>" + this.link_image + "</a>");

				var buttons = [

					{

						id: "add_commified_numbers",
						title: "Add Commified Numbers",
						link: "number#add_commified_numbers",
						listeners: {

							click: function(){
								var what = this;

								pb.window.dialog("dialog_" + this.id, {

									title: what.title,
									html: "<input type='text' value='\"1,000\", 50, 78' style='width: 99%' />",

									buttons: {

										"Add Commified Numbers": function(){
											var dialog = $("#dialog_" + what.id);
											var input = dialog.find("input");
											var val = input.attr("value");

											if(val.length){
												val = val.match(/((\'|\")?[^\"\']+(\"|\')|[^,]+)/g);

												val = val.join("@@").replace(/\s+|\"|\'/g, "").split("@@");
											}

											self.log(pb.number.add_commified_numbers(val));
										},

										Close: function(){
											$(this).dialog("close");
										}

									}

								});
							}

						},

						source: function(){
							return 'pb.number.add_commified_numbers(["1,000", 50, 78]);';
						}
					},

					{

						id: "commify",
						title: "Commify",
						link: "number#commify",
						listeners: {

							click: function(){
								var what = this;

								pb.window.dialog("dialog_" + this.id, {

									title: what.title,
									html: "<input type='text' value='100000000' style='width: 99%' />",

									buttons: {

										"commify": function(){
											var dialog = $("#dialog_" + what.id);
											var input = dialog.find("input");
											var val = input.attr("value");

											if(val.length){
												val = val.replace(/[^\d]+/g, "");
											}

											self.log(pb.number.commify(val));
										},

										Close: function(){
											$(this).dialog("close");
										}

									}

								});
							}

						},

						source: function(){
							return 'pb.number.commify(100000000);';
						}
					}

				];

				this.apply_handlers(buttons, number_buttons);

				$("#content").append(number_buttons);
			},

			create_window_api_examples: function(){
				var self = this;
				var window_buttons = this.container.clone();

				window_buttons.find(".title").html("pb.window <a href='http://proboards.com/developer/js/class/window'>" + this.link_image + "</a>");

				var buttons = [

					{

						id: "basic_alert1",
						title: "Basic Alert",
						link: "window#alert",
						text: "Hi, I'm an alert",
						listeners: {

							click: function(){
								pb.window.alert(this.title, this.text);
							}

						},

						source: function(){
							return 'pb.window.alert("' + this.title + '", "' + this.text + '");';
						}
					},

					{

						id: "basic_alert2",
						title: "Alert With Options",
						link: "window#alert",
						text: "Hi, I'm an alert with options",
						notes: [
							"More options: <a href='http://api.jqueryui.com/dialog/'>http://api.jqueryui.com/dialog/</a><br />",
							"There are different animations you can try: <a href='http://api.jqueryui.com/category/effects/'>http://api.jqueryui.com/category/effects/</a>",
						].join(""),

						options: {

							hide: {

								effect: "puff",
								duration: 600

							},

							modal: true,
							buttons: {

								"Hit Me": function(){
									$(this).dialog("close");
								},

								"No, Hit Me": function(){
									$(this).dialog("close");
								},

							}

						},

						listeners: {

							click: function(){
								pb.window.alert(this.title, this.text, this.options);
							}

						},

						source: function(){
							return 'pb.window.alert("' + this.title + '", "' + this.text + '", ' + self.dump(this.options) + ');';
						}
					},

					{

						id: "basic_alert3",
						title: "Alert With More Options",
						link: "window#alert",
						text: "Hi, I'm an alert with more options",
						notes: [
							"More options: <a href='http://api.jqueryui.com/dialog/'>http://api.jqueryui.com/dialog/</a><br />",
							"There are different animations you can try: <a href='http://api.jqueryui.com/category/effects/'>http://api.jqueryui.com/category/effects/</a>",
						].join(""),

						options: {

							modal: true,
							draggable: false,
							resizable: false,

							close: function(){
								self.log("You just closed an alert");
							},

							show: {

								effect: "fade",
								duration: 600
							},

							hide: {

								effect: "explode",
								duration: 1000

							},

							buttons: {

								"Alert Me": function(){
									pb.window.alert("Oi", "I'm another alert");
								},

								"Close": function(){
									$(this).dialog("close");
								}

							}

						},

						listeners: {

							click: function(){
								pb.window.alert(this.title, this.text, this.options);
							}

						},

						source: function(){
							return 'pb.window.alert("' + this.title + '", "' + this.text + '", ' + self.dump(this.options) + ');';
						}
					},

					{

						id: "basic_confirm1",
						title: "Basic Confirm",
						link: "window#confirm",
						question: "Are you confirming this confirm?",
						onYes: function(){
							self.log("Yes yes yes");
						},

						listeners: {

							click: function(){
								pb.window.confirm(this.question, this.onYes, this.options);
							}

						},

						source: function(){
							return 'pb.window.confirm("' + this.question + '", ' + self.dump(this.onYes) + ');';
						}
					},

					{

						id: "basic_confirm2",
						title: "Confirm With Options",
						link: "window#confirm",
						question: "Are you really sure?",
						notes: [

							"Some options aren't passed to the dialog.  If you need to use more options, use the dialog class to create your own confirm.<br />",
							"There are different animations you can try: <a href='http://api.jqueryui.com/category/effects/'>http://api.jqueryui.com/category/effects/</a>",
						].join(""),

						onYes: function(){
							self.log("Yes");
						},

						options: {

							title: "My Confirm",

							onNo: function(){
								self.log("No");
							}

						},

						listeners: {

							click: function(){
								pb.window.confirm(this.question, this.onYes, this.options);
							}

						},

						source: function(){
							return 'pb.window.confirm("' + this.question + '", ' + self.dump(this.onYes) + ', ' + self.dump(this.options) + ');';
						}
					},

					{

						id: "basic_error1",
						title: "Error",
						link: "window#error",
						html: "This is an error you foo",

						listeners: {

							click: function(){
								pb.window.error(this.html);
							}

						},

						source: function(){
							return 'pb.window.error("' + this.html + '");';
						}

					}

				];

				this.apply_handlers(buttons, window_buttons, true);

				$("#content").append(window_buttons);
			},

			create_date_api_examples: function(){
				var self = this;
				var container = this.container.clone();

				container.find(".title").html("pb.date <a href='http://proboards.com/developer/js/class/date'>" + this.link_image + "</a>");

				var buttons = [

					{

						id: "create_date",
						title: "Create Date",
						link: "date#create_date",
						listeners: {

							click: function(){
								var what = this;

								pb.window.dialog("dialog_" + this.id, {

									title: what.title,
									html: "Date: <input type='text' value='2014-10-03' style='width: 30%' /> Time <input type='text' value='4:00am' style='width: 30%' />",

									buttons: {

										"Create Date": function(){
											var dialog = $("#dialog_" + what.id);
											var date = dialog.find("input").get(0);
											var time = dialog.find("input").get(1);

											self.log(pb.date.create_date(date.value, time.value));
										},

										Close: function(){
											$(this).dialog("close");
										}

									}

								});
							}

						},

						source: function(){
							return 'pb.date.create_date("2014-10-03", "4:00am")';
						}
					}

				];

				this.apply_handlers(buttons, container, true);

				$("#content").append(container);
			},

			apply_handlers: function(buttons, container, beautify){
				var self = this;

				$(buttons).each(function(){
					var button = $("<button id='" + this.id + "'>" + this.title + "</button>");

					if(this.listeners){
						var what = this;

						for(var e in this.listeners){
							button[e](function(){
								$.proxy(what.listeners[e], what)();

								if(what.source){
									self.log(what.source(), (what.notes)? what.notes : "", beautify, (what.link)? what.link : "");
								}
							});
						}
					}

					container.find(".body").append(button);
				});
			}

		};

	})().init();

});