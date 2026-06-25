
function makeViewer(containerId, modelName){
  const container = document.getElementById(containerId);
  if(!container) return;
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let rot = -0.7;
  let auto = true;
  let dragging = false;
  let lastX = 0;

  const resize = ()=>{
    canvas.width = container.clientWidth * devicePixelRatio;
    canvas.height = container.clientHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  };
  window.addEventListener('resize', resize);
  resize();

  container.addEventListener('pointerdown', e => { dragging = true; auto = false; lastX = e.clientX; });
  window.addEventListener('pointerup', ()=> dragging = false);
  window.addEventListener('pointermove', e => {
    if(!dragging) return;
    const dx = e.clientX - lastX;
    rot += dx * 0.01;
    lastX = e.clientX;
  });

  const W = () => container.clientWidth;
  const H = () => container.clientHeight;

  function project(p){
    const cos = Math.cos(rot), sin = Math.sin(rot);
    const x = p.x * cos - p.z * sin;
    const z = p.x * sin + p.z * cos;
    const y = p.y;
    const scale = 520 / (z + 18);
    return {
      x: W()/2 + x * scale,
      y: H()*0.72 - y * scale,
      z,
      scale
    };
  }

  function poly(points, fill, stroke='rgba(90,60,30,.35)'){
    const pts = points.map(project);
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for(let i=1;i<pts.length;i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.closePath();
    if(fill){ ctx.fillStyle = fill; ctx.fill(); }
    if(stroke){ ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.stroke(); }
  }

  function cuboid(x,y,z,w,h,d, colors){
    const x2=x+w,y2=y+h,z2=z+d;
    const A={x,y,z}, B={x:x2,y,z}, C={x:x2,y:y2,z}, D={x,y:y2,z};
    const E={x,y,z:z2}, F={x:x2,y,z:z2}, G={x:x2,y:y2,z:z2}, H={x,y:y2,z:z2};
    const faces = [
      {pts:[A,B,C,D], color:colors.top || '#d8c1a0', depth:(A.z+B.z+C.z+D.z)/4},
      {pts:[B,F,G,C], color:colors.right || '#c5a17d', depth:(B.z+F.z+G.z+C.z)/4},
      {pts:[A,D,H,E], color:colors.left || '#b88d68', depth:(A.z+D.z+H.z+E.z)/4},
      {pts:[D,C,G,H], color:colors.front || '#d0b08c', depth:(D.z+C.z+G.z+H.z)/4},
    ];
    return faces;
  }

  function cylinder(cx, y, cz, r, h, color='#d5bea0'){
    const faces = [];
    const steps = 18;
    for(let i=0;i<steps;i++){
      const a1 = (i/steps)*Math.PI*2;
      const a2 = ((i+1)/steps)*Math.PI*2;
      const p1 = {x:cx+Math.cos(a1)*r, y, z:cz+Math.sin(a1)*r};
      const p2 = {x:cx+Math.cos(a2)*r, y, z:cz+Math.sin(a2)*r};
      const p3 = {x:cx+Math.cos(a2)*r, y:y+h, z:cz+Math.sin(a2)*r};
      const p4 = {x:cx+Math.cos(a1)*r, y:y+h, z:cz+Math.sin(a1)*r};
      faces.push({pts:[p1,p2,p3,p4], color, depth:(p1.z+p2.z+p3.z+p4.z)/4});
    }
    return faces;
  }

  function ring(cx, y, cz, r1, r2, h, color='#d4c0a2'){
    const faces = [];
    const steps = 34;
    for(let i=0;i<steps;i++){
      const a1 = (i/steps)*Math.PI*2;
      const a2 = ((i+1)/steps)*Math.PI*2;
      const outer1={x:cx+Math.cos(a1)*r2,y,z:cz+Math.sin(a1)*r2};
      const outer2={x:cx+Math.cos(a2)*r2,y,z:cz+Math.sin(a2)*r2};
      const outer3={x:cx+Math.cos(a2)*r2,y:y+h,z:cz+Math.sin(a2)*r2};
      const outer4={x:cx+Math.cos(a1)*r2,y:y+h,z:cz+Math.sin(a1)*r2};
      const inner1={x:cx+Math.cos(a1)*r1,y,z:cz+Math.sin(a1)*r1};
      const inner2={x:cx+Math.cos(a2)*r1,y,z:cz+Math.sin(a2)*r1};
      const inner3={x:cx+Math.cos(a2)*r1,y:y+h,z:cz+Math.sin(a2)*r1};
      const inner4={x:cx+Math.cos(a1)*r1,y:y+h,z:cz+Math.sin(a1)*r1};
      faces.push({pts:[outer1,outer2,outer3,outer4], color, depth:(outer1.z+outer2.z+outer3.z+outer4.z)/4});
      faces.push({pts:[inner2,inner1,inner4,inner3], color:'#b88d68', depth:(inner1.z+inner2.z+inner3.z+inner4.z)/4});
    }
    return faces;
  }

  function arch(x, y, z, w, h, d, color='#d6c2a4'){
    const faces = [];
    faces.push(...cuboid(x, y, z, w*0.22, h, d, {left:'#b88d68', right:'#c6a17b', front:color, top:'#dac6a8'}));
    faces.push(...cuboid(x+w*0.78, y, z, w*0.22, h, d, {left:'#b88d68', right:'#c6a17b', front:color, top:'#dac6a8'}));
    faces.push(...cuboid(x, y+h*0.82, z, w, h*0.18, d, {left:'#b88d68', right:'#c6a17b', front:'#bea07b', top:'#d9c4a4'}));
    return faces;
  }

  function pipeX(x, y, z, length, radius, color='#58636a'){
    const faces = [];
    const steps = 14;
    for(let i=0;i<steps;i++){
      const a1 = (i/steps)*Math.PI*2;
      const a2 = ((i+1)/steps)*Math.PI*2;
      const p1 = {x, y:y+Math.cos(a1)*radius, z:z+Math.sin(a1)*radius};
      const p2 = {x, y:y+Math.cos(a2)*radius, z:z+Math.sin(a2)*radius};
      const p3 = {x:x+length, y:y+Math.cos(a2)*radius, z:z+Math.sin(a2)*radius};
      const p4 = {x:x+length, y:y+Math.cos(a1)*radius, z:z+Math.sin(a1)*radius};
      faces.push({pts:[p1,p2,p3,p4], color, depth:(p1.z+p2.z+p3.z+p4.z)/4});
    }
    return faces;
  }

  function aqueductArchRow(startX, y, z, count, w, h, d, color){
    const faces = [];
    for(let i=0;i<count;i++){
      faces.push(...arch(startX+i*w*0.92, y, z, w, h, d, color));
    }
    return faces;
  }

  function slabLine(x, y, z, w, d, color='#8c6846'){
    return cuboid(x, y, z, w, 0.035, d, {left:color,right:color,front:color,top:color});
  }

  function sceneFaces(name){
    const faces = [];
    const stone = '#d7c2a0', stone2 = '#c49d74', dark = '#ab825a', roof = '#9b5b38', grass = '#8da86a', water='#79b5d8';

    faces.push(...cylinder(0,-0.7,0,9,0.8, name==='palatin' ? grass : '#c8a77f'));

    if(name==='kolosseum'){
      faces.push(...ring(0,0,-0.2,3.2,5.8,2.8,stone));
      faces.push(...cylinder(0,0.05,-0.2,2.5,0.18,dark));
      for(let i=0;i<16;i++){
        const a = i/16*Math.PI*2;
        faces.push(...arch(Math.cos(a)*5-0.35,0.6,Math.sin(a)*5-0.22,0.7,1.0,0.4,stone));
      }
    } else if(name==='curia-julia'){
      faces.push(...cuboid(-3,0,-3,6,4.2,6,{left:stone2,right:stone2,front:stone,top:'#e1cfb2'}));
      faces.push(...cuboid(-3.2,4.2,-3.2,6.4,0.4,6.4,{left:roof,right:roof,front:roof,top:roof}));
      faces.push(...cuboid(-0.8,0,-3.25,1.6,2.2,0.25,{left:dark,right:dark,front:dark,top:dark}));
    } else if(name==='forum-romanum'){
      faces.push(...cuboid(-5,0,-4,10,0.35,8,{left:stone2,right:stone2,front:stone,top:'#e1cfb2'}));
      for(let x=-3.5;x<=2.5;x+=2){
        faces.push(...cylinder(x,0.35,-2.4,0.18,3.1,stone));
      }
      faces.push(...cuboid(-4.2,3.45,-2.65,7.2,0.28,0.5,{left:dark,right:dark,front:dark,top:dark}));
      faces.push(...cuboid(1.7,0.35,-0.5,2.8,2.2,4.6,{left:stone2,right:stone2,front:stone,top:'#ddd'}));
      faces.push(...cuboid(-4.5,0.35,0.8,2.5,1.8,2.5,{left:stone2,right:stone2,front:stone,top:'#ddd'}));
    } else if(name==='triumphbogen'){
      faces.push(...cuboid(-2.7,0,-1.2,1.5,3.1,2.2,{left:stone2,right:stone2,front:stone,top:'#e1cfb2'}));
      faces.push(...cuboid(1.2,0,-1.2,1.5,3.1,2.2,{left:stone2,right:stone2,front:stone,top:'#e1cfb2'}));
      faces.push(...cuboid(-2.9,3.1,-1.3,5.8,0.55,2.4,{left:dark,right:dark,front:dark,top:dark}));
      faces.push(...cuboid(-3.2,3.65,-1.4,6.4,1.1,2.6,{left:stone2,right:stone2,front:stone,top:'#ddd'}));
    } else if(name==='wohnhaus'){
      faces.push(...cuboid(-3,0,-2.4,6,5.8,4.8,{left:stone2,right:stone2,front:stone,top:'#ddd'}));
      faces.push(...cuboid(-3.2,5.8,-2.6,6.4,0.3,5.2,{left:roof,right:roof,front:roof,top:roof}));
      faces.push(...cuboid(-0.7,0,-2.55,1.4,1.6,0.2,{left:dark,right:dark,front:dark,top:dark}));
    } else if(name==='aquaedukt'){
      const aqueductStone = '#d8c2a0';
      const aqueductSide = '#b98f65';
      const aqueductDark = '#8c6846';
      const pipe = '#56616b';

      faces.push(...cuboid(-7.1,0,-1.2,12.2,0.22,2.15,{left:aqueductSide,right:aqueductSide,front:'#caa77d',top:'#d8c09a'}));
      faces.push(...aqueductArchRow(-6.75,0.2,-1.05,7,1.75,2.1,0.72,aqueductStone));
      faces.push(...aqueductArchRow(-6.55,2.22,-1.05,7,1.68,1.75,0.72,'#d2b991'));
      faces.push(...aqueductArchRow(-6.25,3.86,-1.05,6,1.58,1.25,0.72,'#dccaac'));
      faces.push(...cuboid(-7.05,5.02,-1.16,11.7,0.34,0.94,{left:aqueductDark,right:aqueductDark,front:'#b89166',top:'#d2bb98'}));
      faces.push(...cuboid(-6.85,5.35,-1.05,11.3,0.38,0.72,{left:aqueductSide,right:aqueductSide,front:aqueductStone,top:'#ead8b8'}));
      faces.push(...cuboid(-6.55,5.46,-0.87,10.7,0.07,0.35,{left:water,right:water,front:water,top:'#91c9e4'}));
      faces.push(...cuboid(-6.98,5.72,-1.12,11.6,0.18,0.12,{left:aqueductDark,right:aqueductDark,front:aqueductDark,top:'#cbb08c'}));
      faces.push(...cuboid(-6.98,5.72,-0.34,11.6,0.18,0.12,{left:aqueductDark,right:aqueductDark,front:aqueductDark,top:'#cbb08c'}));
      for(let y=0.78;y<5.0;y+=0.46){
        faces.push(...slabLine(-6.95,y,-1.18,11.85,0.08,'rgba(116,82,52,.55)'));
      }

      faces.push(...cuboid(4.95,0,-2.15,3.15,3.05,3.6,{left:'#b78c62',right:'#c7a27a',front:'#d8c2a1',top:'#e4d0b2'}));
      faces.push(...cuboid(5.25,3.05,-1.82,2.55,0.42,2.92,{left:aqueductDark,right:aqueductDark,front:'#b89166',top:'#d3bd9c'}));
      faces.push(...cuboid(5.55,3.46,-1.52,1.95,0.32,2.32,{left:'#c9ab82',right:'#c9ab82',front:'#d8c2a0',top:'#e8d8bf'}));
      faces.push(...cuboid(5.78,3.52,-1.28,1.48,0.05,1.84,{left:water,right:water,front:water,top:'#8ec9e5'}));
      faces.push(...cuboid(6.05,0.28,-2.18,0.72,1.12,0.16,{left:aqueductDark,right:aqueductDark,front:aqueductDark,top:aqueductDark}));

      faces.push(...pipeX(4.2,4.68,-0.78,1.15,0.11,pipe));
      faces.push(...pipeX(4.05,4.4,-0.42,1.28,0.09,'#48525c'));
      faces.push(...cuboid(4.8,4.08,-0.65,0.28,0.82,0.26,{left:pipe,right:pipe,front:pipe,top:pipe}));
      faces.push(...cuboid(7.82,0.55,-0.28,0.18,2.42,0.22,{left:pipe,right:pipe,front:pipe,top:pipe}));
      faces.push(...pipeX(7.05,0.5,-0.16,0.95,0.1,'#48525c'));

      faces.push(...cuboid(-0.8,0.08,1.7,7.55,0.26,1.55,{left:aqueductSide,right:aqueductSide,front:'#c9a476',top:'#d7bd92'}));
      faces.push(...arch(-0.45,0.32,1.72,1.55,1.25,0.75,aqueductStone));
      faces.push(...arch(1.05,0.32,1.72,1.55,1.25,0.75,aqueductStone));
      faces.push(...arch(2.55,0.32,1.72,1.55,1.25,0.75,aqueductStone));
      faces.push(...cuboid(-0.95,1.56,1.66,7.85,0.36,0.9,{left:aqueductDark,right:aqueductDark,front:'#b89266',top:'#d7bf9a'}));
      faces.push(...cuboid(-1.15,1.92,1.58,8.25,0.22,1.05,{left:aqueductSide,right:aqueductSide,front:aqueductStone,top:'#ead8ba'}));
      faces.push(...cuboid(5.5,0.05,1.72,2.95,1.7,0.95,{left:'#b78c62',right:'#c7a27a',front:'#d6bd98',top:'#e4d0b2'}));
      faces.push(...cuboid(-2.15,0.06,1.72,1.25,1.05,0.95,{left:'#a77d58',right:'#b88f65',front:'#d3b88e',top:'#dac39d'}));
      faces.push(...cuboid(-3.15,0.04,1.74,1.0,0.72,0.9,{left:'#9f7652',right:'#b48961',front:'#d1b48a',top:'#d9c09a'}));
      faces.push(...arch(-3.1,0.08,1.75,0.95,0.68,0.82,'#cdb087'));
    } else if(name==='baeckerei-kornspeicher'){
      faces.push(...cuboid(-5.0,0,-3.4,4.2,2.8,4.6,{left:stone2,right:stone2,front:stone,top:'#dfc9a9'}));
      faces.push(...cuboid(-5.25,2.8,-3.65,4.7,0.35,5.1,{left:roof,right:roof,front:roof,top:roof}));
      faces.push(...cuboid(-3.9,0,-3.62,1.2,1.6,0.2,{left:dark,right:dark,front:dark,top:dark}));
      faces.push(...cuboid(-4.65,1.35,-3.66,0.55,0.65,0.16,{left:dark,right:dark,front:dark,top:dark}));
      faces.push(...cuboid(-1.9,0,-2.8,5.0,3.8,5.2,{left:'#b98f65',right:'#c9a276',front:'#d8bd95',top:'#ead7ba'}));
      faces.push(...cuboid(-2.15,3.8,-3.05,5.5,0.35,5.7,{left:roof,right:roof,front:roof,top:roof}));
      for(let x=-1.1;x<=2.0;x+=1.05){
        faces.push(...cuboid(x,0.3,-3.12,0.45,2.6,0.32,{left:dark,right:dark,front:'#8f6844',top:dark}));
      }
      faces.push(...cuboid(3.8,0,-2.0,1.25,2.3,1.25,{left:'#caa77d',right:'#b98f65',front:'#d7bd97',top:'#e5d2b5'}));
      faces.push(...cuboid(3.45,2.3,-2.25,1.95,0.35,1.75,{left:roof,right:roof,front:roof,top:roof}));
      faces.push(...cylinder(4.4,0,-0.15,0.65,1.35,'#b48a5e'));
      faces.push(...cylinder(5.35,0,-0.05,0.55,1.05,'#c99a65'));
      faces.push(...cylinder(3.55,0,0.05,0.48,0.95,'#d4aa73'));
    } else if(name==='trajansthermen'){
      faces.push(...cuboid(-4,0,-3,8,0.3,6,{left:dark,right:dark,front:dark,top:dark}));
      faces.push(...cuboid(-1.8,0.3,-1.8,3.6,3.2,3.6,{left:stone2,right:stone2,front:stone,top:'#ddd'}));
      faces.push(...cuboid(-3.8,0.3,-2.2,1.8,2,4.4,{left:stone2,right:stone2,front:stone,top:'#ddd'}));
      faces.push(...cuboid(2.0,0.3,-2.2,1.8,2,4.4,{left:stone2,right:stone2,front:stone,top:'#ddd'}));
      faces.push(...cuboid(-1.2,0.32,1.3,2.4,0.2,1.4,{left:water,right:water,front:water,top:water}));
    } else if(name==='palatin'){
      faces.push(...cylinder(0,0,0,6.5,2.2,grass));
      faces.push(...cuboid(-3.6,2.1,-2.8,7.2,0.35,5.6,{left:dark,right:dark,front:dark,top:dark}));
      faces.push(...cuboid(-2.4,2.45,-1.8,4.8,2.7,3.6,{left:stone2,right:stone2,front:stone,top:'#ddd'}));
      faces.push(...cuboid(-4.2,2.45,-1.4,1.3,2.0,2.8,{left:stone2,right:stone2,front:stone,top:'#ddd'}));
      faces.push(...cuboid(2.9,2.45,-1.4,1.3,2.0,2.8,{left:stone2,right:stone2,front:stone,top:'#ddd'}));
    } else if(name==='circus-maximus'){
      faces.push(...ring(0,0,0,3.2,6.2,0.2,'#cda876'));
      faces.push(...cylinder(0,0.03,0,2.6,0.1,grass));
      faces.push(...cuboid(-0.25,0.18,-3.1,0.5,0.35,6.2,{left:dark,right:dark,front:dark,top:dark}));
      faces.push(...cuboid(-7.3,0,-4.2,1.2,1.2,8.4,{left:stone2,right:stone2,front:stone,top:'#ddd'}));
      faces.push(...cuboid(6.1,0,-4.2,1.2,1.2,8.4,{left:stone2,right:stone2,front:stone,top:'#ddd'}));
    }
    return faces;
  }

  function draw(){
    if(auto && !dragging) rot += 0.006;
    ctx.clearRect(0,0,W(),H());

    const g = ctx.createLinearGradient(0, 0, 0, H());
    g.addColorStop(0, '#eff7ff');
    g.addColorStop(0.6, '#e5f0fb');
    g.addColorStop(0.61, '#d7c09a');
    g.addColorStop(1, '#c5a077');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,W(),H());

    const faces = sceneFaces(modelName);
    faces.sort((a,b)=> a.depth - b.depth);
    for(const f of faces) poly(f.pts, f.color);

    ctx.fillStyle = 'rgba(90,60,30,.16)';
    ctx.beginPath();
    ctx.ellipse(W()/2, H()*0.8, 140, 24, 0, 0, Math.PI*2);
    ctx.fill();

    if(modelName === 'aquaedukt') drawAqueductTemplateLabels();

    requestAnimationFrame(draw);
  }

  function drawAqueductTemplateLabels(){
    const labels = [
      {text:'HAUPTKANAL (SPECUS)', p:{x:-5.85,y:5.92,z:-0.74}, dx:-135, dy:-20},
      {text:'AQUÄDUKT-VORLAGE', p:{x:-6.1,y:0.25,z:-1.05}, dx:-95, dy:58},
      {text:'WASSERRESERVOIR', p:{x:6.6,y:3.85,z:-1.0}, dx:68, dy:-34},
      {text:'GRUNDABLASS', p:{x:7.9,y:0.75,z:-0.22}, dx:48, dy:34},
      {text:'BOGENBRÜCKE', p:{x:2.5,y:1.95,z:1.75}, dx:48, dy:46},
      {text:'TUNNELÜBERGANG', p:{x:-2.85,y:0.65,z:1.75}, dx:-120, dy:64}
    ];
    ctx.save();
    ctx.font = '700 11px Georgia, serif';
    ctx.textBaseline = 'middle';
    labels.forEach(label => {
      const point = project(label.p);
      const x = point.x + label.dx;
      const y = point.y + label.dy;
      ctx.strokeStyle = 'rgba(73,49,29,.65)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.fillStyle = 'rgba(255,250,240,.94)';
      const width = ctx.measureText(label.text).width + 12;
      ctx.fillRect(x - 6, y - 10, width, 20);
      ctx.strokeStyle = 'rgba(73,49,29,.28)';
      ctx.strokeRect(x - 6, y - 10, width, 20);
      ctx.fillStyle = '#49311d';
      ctx.fillText(label.text, x, y);
    });
    ctx.restore();
  }
  draw();
}

window.makeViewer = makeViewer;
