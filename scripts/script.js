

var colorRange = ["blue", "red"]
        
var color = d3.scaleLinear().range(colorRange).domain([50, 350]);
  

function main(){
	


function updateData(){ 
    //temp = currNodes.pop();
    restart() 
  } 
  
function resetData(){
    currNodes = graph.nodes
    currLinks = graph.links
    //currLinks = graph.links
    //currLinks.push(temp)
    restart()
  }
  
   
function distanceFromCenter(x,y){
  
  return Math.sqrt((x-width/2)*(x-width/2)+(y-height/2)*(y-height/2))
}



//var color = d3.

  

var tooltip = d3.select("body")
	.append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

var graph = {  
nodes: [
    
  ],
links : []
}  
 
 tab = Array.from(Array(150), (_,x) => x);
 
for (i in tab)
{
	console.log(i)
	graph.nodes.push({id:i,x:Math.floor(Math.random() * 1200),y:Math.floor(Math.random() * 500),vx:0,vy:0})
}

  var currNodes = graph.nodes
  var currLinks = graph.links

  
	mySvg = document.getElementById("svg")
	  var width = mySvg.width.animVal.value;
	  var height = mySvg.height.animVal.value;
 	const svg = d3.select("#svg")
   
   console.log(width,height)
    

  

  var simulation = d3.forceSimulation(currNodes) 
    //.force('link', d3.forceLink().id(d => d.id))
  	.force("charge", d3.forceManyBody().strength(-10))
  	.force('collide', d3.forceCollide(25))
  	//.alphaTarget(1)
    .on('tick', ticked);

  var R = 8; 
  
	var g = svg.append("g")
  			//.attr("transform", "translate(" + width / 2 + "," + height/ 2 + ")")
    link = g.append("g").selectAll(".link"),
    node = g.append("g").selectAll(".node");
   
  //simulation.force('link')
    //.links(currLinks);
	restart();

  //Add mouseover events to links
  

  // Add Dragging Behavior to nodes
  var node = g.selectAll('.node')
    .data(currNodes)
    .enter().append('g')
    .attr('class', 'node')
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  // Draw nodes 
  node.append('circle')
	.attr('class', "nodes")
    .attr('r', R)
	.attr('cx', 0)
	.attr('cy', 0)
	.attr('transform', d => `translate(${d.x},${d.y})`)
  	.attr("fill", function(d) { return "#CCC";}) 	
	//console.log(currLinks.length)
   
//   d3.interval(function (){
//   	updateData();
//     restart();
//     console.log(currLinks.length)
//   }, 4000, d3.now());
  
//   d3.interval(function() {
//     resetData(); 
//     restart(); 
//   }, 4000, d3.now()+2000);
   
  var temp;
  
  function restart(){
  }
 

  function ticked() {
	  //console.log(currNodes)
	  simulation.alpha(1)
	  _.each(currNodes,d => {
		  mod = 1
		  if(d.x < (width/2) || (d.y < (height/2) && d.y > (height/2) - 100)){
			mod = 1
		 }
		  
		  d.vx = d.vx /2
		  d.vy = d.vy /2
		  
		  di = distanceFromCenter(d.x,d.y)
		  
		  //console.log(di/width/2)
		  if(di > 20){
			  if(d.x < (width/2)){d.vx += (30/di)+1}
			  else{d.vx -= (30/di)+1 }
			  if(d.y < (height/2)){d.vy += (30/di)+1}
			  else{d.vy -= (30/di)+1 }
		  }
		  
		  if(d.x < (width/2)){d.vy += ((5/di)+2)*mod}
		  else{d.vy -= ((5/di)+2)*mod}
		  if(d.y > (height/2)){d.vx += ((5/di)+2)*mod}
		  else{d.vx -= ((5/di)+2)*mod	}
		  
		  
		  if(d.x < (width/2)){d.vy +=  50 * (di/width) * Math.random()}
		  else{d.vy -= 50 * (di/width) * Math.random() }
		  if(d.y > (height/2)){d.vx += 50 * (di/width) * Math.random()}
		  else{d.vx -= 50 * (di/width) * Math.random()	}
		  
		  d.y += (Math.floor(d.vy /(di *20)))
		  d.x += (Math.floor(d.vx /(di *20)))
		  //console.log(d.x)
		  //console.log(d.y)
		  //d.y += Math.floor((di/width/2)*100)
		  //d.x += Math.floor((di/width/2)*100)
	  }
	  
	  )
	  
	  //node.attr('transform', d => `translate(${d.x}px,${d.y}px)`);
//     link
//       .attr('x1', d => d.source.x)
//       .attr('y1', d => d.source.y)
//       .attr('x2', d => d.target.x)
//       .attr('y2', d => d.target.y);
    //
    svg.selectAll(".nodes").attr('transform', d => `translate(${d.x},${d.y})`)
						   .attr('fill', d => color(distanceFromCenter(d.x,d.y)))
  }

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    } 
 
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      //d.fx = null;
      //d.fy = null;
    }
    function releasenode(d) {
        d.fx = null;
        d.fy = null;
    }
  
 }
setTimeout(main,1000)

