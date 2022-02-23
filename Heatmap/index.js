//Heatmap

        var width = 440,
        height = 800,
        margintop = 100,
        marginbottom= 50,
        marginright= 120,
        marginleft=185;

        //Read the data
        d3.csv("https://raw.githubusercontent.com/Lea1216/MasterThesis/main/heatmap_update.csv", function(data) {

          var axis = d3.select("#my_dataviz")
       .append("svg")
       .attr("width", width + marginleft +marginright)
       .attr("height",margintop +1)
       .append("g")
       .attr("transform", "translate(" + marginleft + ", " + margintop + ")");



                  // append the svg object to the body of the page
                  var svg2 = d3.select("#my_dataviz")
                  .append("div")
                  .attr("class","chart")
                  .append("svg")
                  .attr("width",width +marginleft + marginright)
                  .attr("height",height + marginbottom)
                  .append("g")
                  .attr("transform", "translate(" + marginleft + ", 0)");

                   //Add customized legend
                      svg2.append("rect").attr('x', 450).attr('y', 5).attr('width', 20).attr('height', 20).attr('fill', '#3e989a').attr("class", "rect");
                      svg2.append("rect").attr('x', 450).attr('y', 30).attr('width', 20).attr('height', 20).attr('fill', '#9FCCCD').attr("class", "rect");
                      svg2.append("rect").attr('x', 450).attr('y', 55).attr('width', 20).attr('height', 20).attr('fill', "#FFFFFF").attr("class", "rect").style("stroke", "#9FCCCD")
                      svg2.append("text").attr("x", 475).attr("y", 20).text("applies well").attr("alignment-baseline","middle").attr("class", "legendtext")
                      svg2.append("text").attr("x", 475).attr("y", 45).text("applies").attr("alignment-baseline","middle").attr("class", "legendtext")
                      svg2.append("text").attr("x", 475).attr("y", 70).text("does not apply").attr("alignment-baseline","middle").attr("class", "legendtext")

                  //Add descriptions for rows and colums
                      svg2.append("text").attr("x", -60).attr("y", -3).text("Activities").attr("alignment-baseline","middle").attr("class","yaxisdescription")

                  // Build X scales and axis:
                  var x_axis = d3.scaleBand()
                    .range([ 0, width ])
                    //Binds x-axis description to array
                    .domain(data.map(function(d) { return d.group; }))
                    .padding(0.01);


                  var click_xaxis =
                  axis.call(d3.axisTop(x_axis))
                      .selectAll("text")
                      .style("text-anchor", "start")
                      .style("position","fixed")
                      .attr("dx",15)
                      .attr("dy",5)
                      .attr("class","x_axis")
                      .attr("transform", "rotate(-65)")

                  // Build Y scales and axis:
                  var y_axis = d3.scaleBand()
                    .range([ height, 0 ])
                    .domain(data.map(function(d) { return d.activity; }))
                    .padding(0.01);

                  var click_yaxis =  svg2.append("g")
                        .call(d3.axisLeft(y_axis).tickFormat(function(d,i) { return data[i].activity }))
                        .selectAll("text")
                        .attr("class","y_axis")
                        .on("click", function(d,i){window.open(data[i].url,"_self")})

                  // Build color scale
                  var myColor = d3.scaleLinear()
                    .range(["white", "#3e989a"])
                    .domain([1,100])

        //create a tooltips
          var tooltip = d3.select("#imgcol")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("padding", "7px")
            .attr("class","tooltip")

          // var tooltip2 = d3.select("#imgcol")
          //     .append("div")
          //     .style("opacity", 0)
          //     .attr("class", "tooltip")
          //     .attr("class","tooltip")

          // var tooltip3 = d3.select("#imgcol")
          //     .append("div")
          //     .style("opacity", 0)
          //     .attr("class", "tooltip")
          //     .style("background-color", "white")
          //     .style("border-radius", "5px")
          //     .style("padding", "5px")
          //     .attr("class","tooltip")

        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function(d) {
          tooltip.style("opacity", 1)
          // tooltip2.style("opacity", 1)
          d3.select(this)
            .style("opacity", 1)
        }


        var mousemove = function(d,i) {
          tooltip
            // .html("<img src=" + d.card + " class=image>")
             .html("<a href=" + data[i].url + "><img src=" + data[i].card + "></a>")
        }

        var mouseover_y = function(d) {
          tooltip.style("opacity", 1)
        }

        var mousemove_y = function(d,i) {
          tooltip
            // .html("<img src=" + data[i].card + " class=image>")
            .html("<a href=" + data[i].url + "><img src=" + data[i].card + "></a>")
        }

        click_yaxis.on("mouseover", mouseover_y)
                  .on("mousemove", mousemove_y)

    // add the squares
      svg2.selectAll()
        .data(data, function(d) {return d.group+':'+d.activity;})
        .enter()
        .append("rect")
          .attr("x", function(d) { return x_axis(d.group) })
          .attr("y", function(d) { return y_axis(d.activity) })
          .attr("width", x_axis.bandwidth() )
          .attr("height", y_axis.bandwidth() )
          .style("fill", function(d) { return myColor(d.value)} )
          .style("stroke-width", 1)
          .style("stroke", "none")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
      })

//Zoomable Circles

      // var svg = d3.select("svg");
      // var diameter = +svg.attr("width");
      //
      // var g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
      //
      // var pack = d3.pack()
                  //Sets the size of the rendering area
                   // .size([diameter,diameter])
                  //Adds space between the circles
                   // .padding(2)

      // var tooltip4 = d3.select("#imgcol2")
      //                 .append("div")
      //                 .style("visibility", "hidden")
      //                 .attr("class","tooltip4")


      // Load data & create bubbles
      // d3.json("https://raw.githubusercontent.com/Lea1216/MasterThesis/main/zoomableCircles", function(error,root) {
      //   if (error) throw error;
      //
      //   root = d3.hierarchy(root)
      //            .sum(function(d) {return d.size})
      //            .sort(function(a, b) { return b.value - a.value; });
      //
      //
      //   var focus = root,
      //       nodes = pack(root).descendants(),
      //       view;
      //
      //   var circle = g.selectAll("circle")
      //                 .data(nodes)
      //                 .enter()
      //                 .append("circle")
      //                 .attr("class", function(d){ return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
      //                 .style("fill", function(d) { return d.data.color})
      //                 .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); })
      //
      //
      //   var headline = g.selectAll("text")
      //               .data(nodes)
      //               .enter()
      //               .append("text")
      //               .attr("class","label")
      //               .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      //               .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
      //               .text(function(d) { return d.data.name; })
      //               .on("mouseover", function(d){return tooltip4.html("<img src="+d.data.card+">").style("visibility", "visible");})
      //               .on("mouseout", function(){return tooltip4.style("visibility", "hidden");});
      //
      //
      //     var description = g.selectAll("text")
      //                       .append("tspan")
      //                       .attr("class","description")
      //                       .text(function (d) {return d.data.description;});
      //
      //   var node = g.selectAll("circle,text")

        //style svg background color & add zoom
        // svg.style("background","#FBFBFB")
        //    .on("click", function() { zoom(root); });
        //
        // zoomTo([root.x, root.y, root.r * 2 ]);
        //
        // function zoom (d) {
        //   var focus0 = focus; focus = d;

          //With transition the zooming goes smoothly to the new position
          // var transition = d3.transition()
          //     .duration(750)
          //     .tween("zoom", function(d) {
          //       var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 ]);
          //       return function(t) { zoomTo(i(t)); };
          //       });

                //Only display parents text
              //   transition.selectAll(".label")
              //       .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
              //       .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
              //       .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
              //       .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
              // }
              //
              // function zoomTo(v) {
              //   var k = diameter / v[2]; view = v;
              //   node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
              //   circle.attr("r", function(d) { return d.r * k; });
              // }
              // function hovered(hover) {
              //   return function(d) {
              //      d3.selectAll(d.ancestors().map(function(d) {}));
              //    };
              //  }
              // });

// Website Javascript

              function myFunction1() {
                var x = document.getElementById("myinformation1");
                if (x.style.display === "none") {
                  x.style.display = "block";
                } else {
                  x.style.display = "none";
                  }
                }

                // function myFunction2() {
                //   var x = document.getElementById("myinformation2");
                //   if (x.style.display === "none") {
                //     x.style.display = "block";
                //   } else {
                //     x.style.display = "none";
                //     }
                //   }
