var dy = 30,dx = 40,margin = ({top: 10, right: 120, bottom: 10, left: 40}),width = 1300 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;
var root;
var x = d3.scaleLinear().range([0, width]);

var tree = d3.tree()
.size([width, height]);

var diagonal = d3.linkVertical().x(d => d.x).y(d => d.y);
var svg, gLink, gNode;
var actual_node;

var data = {
    "name": "root",
    "metadata":{"id":"1","type":"mandatory","typeson":null},
    "children": [
      { 
    "name": "leaf1",
    "metadata":{"id":"1_1","type":"mandatory","typeson":"or"},
        "children": [
          { "name": "leaf 1_1" ,
            "metadata":{"id":"1_1_1","type":"optional","typeson":null}},
          { "name": "leaf 1_2" ,
            "metadata":{"id":"1_1_2","type":"optional","typeson":null}}
        ]
      },
      { "name": "leaf 2" ,
        "metadata":{"id":"1_2","type":"mandatory","typeson":null}}
    ]
  };
//d3.json(enlace)
//.then(function(data){


  root = d3.hierarchy(data);
  root.x0 = width/2;
  root.y0 = 50  ;



  svg = d3.select("#net_canvas");

  gLink = svg.append("g")
  .attr("fill", "none")
  .attr("stroke", "#555")
  .attr("stroke-opacity", 0.4)
  .attr("stroke-width", 1.5);

  gNode = svg.append("g")
  .attr("cursor", "pointer");
  root.descendants().forEach((d, i) => {
    d.id = i;
    d._children = d.children;
    if (d.depth && d.data.name.length !== 7) d.children = null;
  }); 

  update(root);
//});

var current_object;

function borrar_hijos(child){

  child.forEach(function(o,i,a){
    o.children = null;
    if(typeof o._children != "undefined" && o._children != null){
      borrar_hijos(o._children);
    }
  });
}

function update(source) {
  actual_node = source;
  choose_object(source.data)
  const duration = d3.event && d3.event.altKey ? 2500 : 250;
  const nodes = root.descendants();//.reverse();
  const links = root.links();

    // Compute the new tree layout.
    tree(root);

    let upper = root;
    let lower = root;
    root.eachBefore(node => {
      if (node.y < upper.y) upper = node;
      if (node.y > lower.y) lower = node;
    });

    const height = lower.y - upper.y + margin.left + margin.right;

    const transition = svg.transition()
    .duration(duration)
    .attr("height", height)
    .attr("viewBox", [-margin.left, upper.y - margin.top, width, height])
    .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

    // Update the nodes…
    const node = gNode.selectAll("g")
    .data(nodes, d => d.id);

    // Enter any new nodes at the parent's previous position.
    const nodeEnter = node.enter().append("g")
    .attr("transform", d => `translate(${source.x0},${source.y0})`)
    .attr("fill-opacity", 1)
    .attr("stroke-opacity", 1)
    .on("click", d => {
      d.children = d.children ? borrar_hijos(d._children) : d._children;
      

      update(d);
    });

    nodeEnter.append("rect")
    .attr("height", 30)
    .attr("width",120)
    .attr("fill-opacity",1)
    .attr("stroke-width", 3)
    .attr("x",-50);
    
    nodeEnter.append("circle")
    .attr("opacity",d=>(d.parent && d.parent.data.metadata.typeson == null)?.7:0)
    .attr("fill",d=> d.data.metadata.type=="mandatory"?"black":"white")
    .attr("r",9);

    nodeEnter.append("text")
    .attr("dy", "1.3em")
    .attr("x", -45)
    .text(function(d){return d.data.name})
    .attr("text-anchor",  "start")
    .clone(true).lower()
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 1);

    // Transition nodes to their new position.
    const nodeUpdate = node.merge(nodeEnter).transition(transition)
    .attr("transform", d => `translate(${d.x},${d.y})`)
    .attr("stroke", d => d._children ? "#5A1917" : "#214A36")
    .attr("fill", d => d._children ? "#E4C9C2" : "#E9F5CA")
    .select("text").text(function(d){return d.data.name});
    node.selectAll("text")
    .text(function(d){return d.data.name})
    ;

    nodeUpdate.select("circle")
    .transition(transition)
    .attr("fill",d=> d.data.metadata.type=="mandatory"?"black":"white");
    

    // Transition exiting nodes to the parent's new position.
    const nodeExit = node.exit().transition(transition).remove()
    .attr("transform", d => `translate(${source.x},${source.y})`)
    .attr("fill-opacity", 0)
    .attr("stroke-opacity", 0);

    // Update the links…
    const link = gLink.selectAll("path")
    .data(links, d => d.target.id);

    // Enter any new links at the parent's previous position.
    const linkEnter = link.enter().append("path")
    .attr("d", d => {
      const o = {x: source.x0, y: source.y0};
      return diagonal({source: o, target: o});
    })
    .style("stroke-dasharray",d=>{

      var sal = (d.source.data.metadata.typeson == "or")?"9":"600";
      return  (sal+",3");
    });

    // Transition links to their new position.
    link.merge(linkEnter).transition(transition)
    .attr("d", diagonal)
    .style("stroke-dasharray",d=>{
      var sal = (d.source.data.metadata.typeson == "or")?"9":"600";
      return  (sal+",3");
    });
    
    // Transition exiting nodes to the parent's new position.
    link.exit().transition(transition).remove()
    .attr("d", d => {
      const o = {x: source.x, y: source.y};
      return diagonal({source: o, target: o});
    })
    .style("stroke-dasharray",d=>{
      var sal = (d.source.data.metadata.typeson == "or")?"9":"600";

      return  (sal+",3");
    });

    // Stash the old positions for transition.
    root.eachBefore(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  function choose_object(node){
    d3.select("#d1").text(node.name);
    d3.select("#d2").attr("value",node.name);


  }
  
  function add_node(){
    var valor = d3.select("#d2").property("value");
    var repetido = false;
    root.descendants().forEach(function(o,i,a){
      if(o.data.name == valor)
        repetido = true;
    });
    if(!repetido){
      var tam = actual_node.children?actual_node.children.length:0;
      var obj = {};
      obj.children = [];
      obj.name = valor;
      obj.metadata = {};
      obj.metadata.id = actual_node.data.metadata.id+"_"+(1+tam);
      obj.metadata.type = d3.select("#human").property("checked")?"mandatory":"optional";
    //obj.metadata.typeson = d3.select("#priority-high").property("checked")?null:d3.select("#priority-normal").property("checked")?"xor":"or";

    obj = d3.hierarchy(obj);
    obj.parent = actual_node;
    actual_node.data.metadata.typeson = d3.select("#priority-high").property("checked")?null:d3.select("#priority-normal").property("checked")?"xor":"or";
    obj.height = tam;
    obj.depth = actual_node.depth +1;
    
    if(typeof actual_node.data.children == "undefined"){
      actual_node.data["children"] = [];
    }
    if(actual_node.data.children == null){
      actual_node.data.children = [];
    }
    if(actual_node.children == null){
      if(actual_node._children != null)
        actual_node.children = actual_node._children;
      else{
        actual_node._children = [];
        actual_node.children = []
      }

    }
    if(typeof actual_node.children == "undefined"){
      actual_node.children = [];
      actual_node._children = [];
    }
    actual_node.data.metadata.typeson = d3.select("#priority-high").property("checked")?null:d3.select("#priority-normal").property("checked")?"xor":"or";
    actual_node.data.children.push(obj);
    actual_node.children.push(obj);
    actual_node._children = actual_node.children;
    update(actual_node);
  }else{
    alert("Este nombre ya existe")
  }

}
function delete_node(){
  var index =actual_node.parent.children.indexOf(actual_node);

  if(actual_node.parent.data.children.length>1)
    actual_node.parent.data.children = actual_node.parent.children.splice(index,1);
  else{
    actual_node.parent.data.children = null;
    actual_node.parent.children = null;
    actual_node.parent._children = null;
  }
  update(actual_node.parent);
}
function edit_node(){
  var valor = d3.select("#d2").property("value");
  var repetido = false;
  root.descendants().forEach(function(o,i,a){
    if(o.data.name == valor)
      repetido = true;
  });
  if(!repetido){
    var type = d3.select("#human").property("checked")?"mandatory":"optional";
    actual_node.data.name = valor;
    actual_node.data.metadata.type = type;
    actual_node.data.metadata.typeson = d3.select("#priority-high").property("checked")?null:d3.select("#priority-normal").property("checked")?"xor":"or";
    update(actual_node);
  }else{
    var type = d3.select("#human").property("checked")?"mandatory":"optional";
    actual_node.data.metadata.type = type;
    actual_node.data.metadata.typeson = d3.select("#priority-high").property("checked")?null:d3.select("#priority-normal").property("checked")?"xor":"or";
    update(actual_node);
    alert("El nombre no fue actualizado por que ya existe")
  }
}