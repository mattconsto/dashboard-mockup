// Automatically compile simple templates
$("script.auto-component[type='text/ractive']").each((index, element) => {Ractive.components[element.id] = Ractive.extend({template: element.innerHTML, isolated: false})});
$("script.auto-partial[type='text/ractive']").each((index, element) => {Ractive.partials[element.id] = element.innerHTML});

Ractive.components["om2m-trendline"] = Ractive.extend({
	template: "#om2m-trendline",
	on: {
		complete: function() {
			var datapoints = [0, 20, 20, 60, 60, 120, 160, 180, 120, 125, 105, 110, 170];
			var config = {
				type: 'line',
				data: {
					labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
					datasets: [{
						label: "Trendline",
						data: datapoints,
						borderWidth: 1,
						borderColor: "black",
						backgroundColor: 'rgba(0, 0, 0, 0)',
						lineTension: 0
					}]
				},
				options: {
					legend: {display: false},
					responsive: true,
					maintainAspectRatio: false,
					elements: {point: {radius: 0}},
					scales: {
						xAxes: [{display: false}],
						yAxes: [{display: false}]
					}
				}
			};
			var that = this;
			var text = this.find('.value');
			var chart = new Chart(this.find('canvas').getContext("2d"), config);
			setInterval(function() {
				datapoints.push(datapoints[datapoints.length - 1] + (Math.random() - 0.5) * 20);
				text.innerText = Math.round(datapoints[datapoints.length - 1]) + " " + that.get("unit");
				datapoints.shift();
				chart.update();
			}, 1000);
		},
		teardown: function() {},
	}
});

Ractive.components["om2m-compass"] = Ractive.extend({
	template: "#om2m-compass",
	on: {
		complete: function() {
			var graph = this.find('canvas');
			graph.context = graph.getContext("2d");
			graph.context.font = "30px Arial";
			graph.context.fillText("120°",10,50);
		},
		teardown: function() {},
	}
});

function toggleLED() {
	$.ajax({
		type: "POST",
		headers: {"X-M2M-Origin": "admin:admin", "Accept": "application/xml"},
		url: "http://localhost:8080/~/mn-cse/mn-name/LAMP_ALL?op=allToggle",
		data: {"op": "allToggle"},
		success: function() {console.log("success")},
	});
}

window.onload = function() {
	var ractive = new Ractive({
		el: "#target",
		template: "#om2m-dashboard",
		data: {
			gateways: [
				{name: "Alpha Gateway", sensors: [
					[{name: "Temperature", icon: "fa fa-thermometer-full", unit: "°C"}, {name: "Temperature", icon: "fa fa-thermometer-full", unit: "°F"}],
					[{name: "Pressure", icon: "fa fa-balance-scale", unit: "pascals"}],
					[{name: "Humidity", icon: "fa fa-tint", unit: "whatever"}],
					[{name: "Measures", icon: "fa fa-square", unit: "units"}]
				]},
				{name: "Bravo Gateway", sensors: [
					[{name: "Temperature", icon: "fa fa-thermometer-full", unit: "°C"}, {name: "Temperature", icon: "fa fa-thermometer-full", unit: "°F"}],
					[{name: "Pressure", icon: "fa fa-balance-scale", unit: "pascals"}],
					[{name: "Humidity", icon: "fa fa-tint", unit: "whatever"}],
					[{name: "Measures", icon: "fa fa-square", unit: "units"}]
				]},
				{name: "Charlie Gateway", sensors: [
					[{name: "Temperature", icon: "fa fa-thermometer-full", unit: "°C"}, {name: "Temperature", icon: "fa fa-thermometer-full", unit: "°F"}],
					[{name: "Pressure", icon: "fa fa-balance-scale", unit: "pascals"}],
					[{name: "Humidity", icon: "fa fa-tint", unit: "whatever"}],
					[{name: "Measures", icon: "fa fa-square", unit: "units"}]
				]},
				{name: "Delta Gateway", sensors: [
					[{name: "Temperature", icon: "fa fa-thermometer-full", unit: "°C"}, {name: "Temperature", icon: "fa fa-thermometer-full", unit: "°F"}],
					[{name: "Pressure", icon: "fa fa-balance-scale", unit: "pascals"}],
					[{name: "Humidity", icon: "fa fa-tint", unit: "whatever"}],
					[{name: "Measures", icon: "fa fa-square", unit: "units"}]
				]},
				{name: "Echo Gateway", sensors: [
					[{name: "Temperature", icon: "fa fa-thermometer-full", unit: "°C"}, {name: "Temperature", icon: "fa fa-thermometer-full", unit: "°F"}],
					[{name: "Pressure", icon: "fa fa-balance-scale", unit: "pascals"}],
					[{name: "Humidity", icon: "fa fa-tint", unit: "whatever"}],
					[{name: "Measures", icon: "fa fa-square", unit: "units"}]
				]}
			]
		},
	});

	// $( ".sortable" ).sortable({placeholder: "sortable-placeholder"});
	// $( ".sortable" ).disableSelection();
	
	$(function() {
		initSort($('.list .connectedSortable'));
});

function initSort(element) {
		element.sortable({
			placeholder: "sortable-placeholder",
			tolerance: "pointer",
		connectWith: '.list .connectedSortable',
		beforeStop: function(event, ui) {
			var parent = ui.helper.parent();
			if(parent.hasClass('new')) {
				parent.removeClass('new');
				initSort($('.list .connectedSortable'));
			}
			cleanUp();
		}
	}).disableSelection();
}

function cleanUp() {
	$(".list").each(function(i, e) {
		$(e).find('.connectedSortable:not(.hide)').each(function(index, value) {
			if($(this).find('div').length == 0) $(this).remove();
		});
		
		$(e).find('.connectedSortable').each(function(index, value) {
			var clone = $(e).find('.connectedSortable.new.hide').clone();
			clone.insertBefore($(value)).removeClass('hide');
		});
		
		// var clone = $(e).find('.connectedSortable.new.hide').clone();
		// clone.insertBefore($(e).find('.connectedSortable:first-child')).removeClass('hide');
		// initSort($(e).find('.connectedSortable'));
	})
}

	// $(".droppable").droppable({
	// 	activeClass: 'active',
	// 	hoverClass:'hovered',
	// 	drop:function(event,ui){}});
};