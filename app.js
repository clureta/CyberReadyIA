(()=>{
  const D=window.CYBERREADY_DEMO;
  let selected=D.scenarios[0];
  let completedScenario=null;
  let currentChaos=[];
  let humanDecision=null;
  let auditEvents=[];
  const ratings=JSON.parse(localStorage.getItem('cyberready-ratings')||'{}');
  const $=(s,c=document)=>c.querySelector(s);
  const $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const titles={
    home:'¿Estamos realmente preparados?',
    twin:'Decision Twin conceptual',
    simulate:'Simular antes de la crisis',
    results:'De datos a decisiones',
    chaos:'Romper para aprender',
    hitl:'La IA propone. El CISO decide.',
    value:'Hipótesis de valor',
    feedback:'Validar antes de construir'
  };

  function go(v){
    $$('.view').forEach(x=>x.classList.toggle('active',x.id===`view-${v}`));
    $$('#nav button').forEach(b=>b.classList.toggle('active',b.dataset.view===v));
    $('#pageTitle').textContent=titles[v]||'CyberReady AI';
    if(v==='hitl') renderHitl();
    window.scrollTo({top:0,behavior:'smooth'});
  }

  $$('[data-view]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.view)));
  $$('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));

  function renderScenarios(){
    $('#scenarioCards').innerHTML=D.scenarios.map(s=>`<article class="scenario-card ${s.id===selected.id?'selected':''}" data-scenario="${s.id}"><div class="scenario-icon">${s.icon}</div><h3>${s.title}</h3><p>${s.subtitle}</p><small>Score base simulado: ${s.baseScore}/100</small></article>`).join('');
    $$('.scenario-card').forEach(c=>c.addEventListener('click',()=>selectScenario(c.dataset.scenario)));
  }

  function selectScenario(id){
    selected=D.scenarios.find(s=>s.id===id);
    renderScenarios();
    $('#simulationPanel').classList.remove('hidden');
    $('#incidentTitle').textContent=selected.title;
    const f=selected.event;
    $('#incidentFacts').innerHTML=[['Hora',f.time],['Momento',f.day],['Activo',f.asset],['Registros',f.records],['Severidad',f.severity]].map(x=>`<div class="fact"><span>${x[0]}</span><b>${x[1]}</b></div>`).join('');
    $('#agentSteps').innerHTML=selected.agents.map((a,i)=>`<div class="agent-step" data-agent="${i}"><span class="agent-state">${i+1}</span><div><b>${a[0]}</b><small>${a[1]}</small></div></div>`).join('');
    $('#runAgents').disabled=false;
    $('#runAgents').textContent='Iniciar simulación de agentes';
  }

  $('#cancelSim').addEventListener('click',()=>$('#simulationPanel').classList.add('hidden'));

  function runAgents(){
    const btn=$('#runAgents');
    btn.disabled=true;
    btn.textContent='Simulando…';
    const steps=$$('.agent-step');
    let i=0;
    function next(){
      if(i>0){
        steps[i-1].classList.remove('running');
        steps[i-1].classList.add('done');
        steps[i-1].querySelector('.agent-state').textContent='✓';
      }
      if(i<steps.length){
        steps[i].classList.add('running');
        i++;
        setTimeout(next,620);
      }else{
        completedScenario=selected;
        currentChaos=[];
        initializeHumanDecision();
        setTimeout(()=>{
          renderResults();
          renderChaos();
          go('results');
          toast('Simulación completada');
        },380);
      }
    }
    next();
  }
  $('#runAgents').addEventListener('click',runAgents);

  function renderResults(){
    if(!completedScenario)return;
    $('#emptyResults').classList.add('hidden');
    $('#resultsContent').classList.remove('hidden');
    $('#resultScenario').textContent=completedScenario.title;
    $('#resultScore').textContent=completedScenario.baseScore;
    $('#findings').innerHTML=completedScenario.findings.map(f=>`<article class="finding"><div class="finding-head"><span class="sev ${f.sev}">${f.sev==='critical'?'CRÍTICO':f.sev==='high'?'ALTO':'MEDIO'}</span><b>${f.title}</b><span>＋</span></div><div class="finding-body"><p><strong>Impacto:</strong> ${f.impact}</p><p><strong>Evidencia simulada:</strong> ${f.evidence}</p><p><strong>Recomendación:</strong> ${f.recommendation}</p><p><strong>HITL:</strong> la decisión final requiere revisión humana antes de cualquier acción.</p></div></article>`).join('');
    $$('.finding-head').forEach(h=>h.addEventListener('click',()=>h.parentElement.classList.toggle('open')));
  }

  function renderChaos(){
    const base=(completedScenario||selected).baseScore;
    $('#chaosBase').textContent=base;
    $('#chaosScore').textContent=base;
    $('#chaosOptions').innerHTML=D.chaos.map(c=>`<label class="chaos-option"><input type="checkbox" value="${c.id}"><div><b>${c.label}</b><small>${c.reason}</small></div><span class="penalty">−${c.penalty}</span></label>`).join('');
    $$('#chaosOptions input').forEach(i=>i.addEventListener('change',updateChaos));
    updateChaos();
  }

  function updateChaos(){
    const base=(completedScenario||selected).baseScore;
    currentChaos=$$('#chaosOptions input:checked').map(x=>D.chaos.find(c=>c.id===x.value));
    const penalty=currentChaos.reduce((a,c)=>a+c.penalty,0);
    const score=Math.max(15,base-penalty);
    $('#chaosScore').textContent=score;
    const d=$('#chaosDelta');
    d.textContent=currentChaos.length?`−${base-score} puntos por ${currentChaos.length} falla${currentChaos.length>1?'s':''}`:'Sin fallas adicionales';
    d.className=`delta ${currentChaos.length?'bad':'neutral'}`;
    $('#chaosReasons').innerHTML=currentChaos.map(c=>`<div class="reason">${c.label}: ${c.reason}</div>`).join('');
    if(completedScenario) initializeHumanDecision();
  }

  $('#clearChaos').addEventListener('click',()=>{
    $$('#chaosOptions input').forEach(i=>i.checked=false);
    updateChaos();
  });

  $('#goHitl').addEventListener('click',()=>{
    if(!completedScenario){
      toast('Primero ejecuta una simulación');
      go('simulate');
      return;
    }
    renderHitl();
    go('hitl');
  });

  function hitlRecommendation(){
    const activeIds=currentChaos.map(c=>c.id);
    const scenario=completedScenario||selected;
    if(activeIds.includes('provider')) return {
      title:'Proveedor crítico sin respuesta',
      action:'Activar el procedimiento alternativo de contingencia y escalar el incidente al responsable de continuidad operacional.',
      evidence:['Contrato CloudOne — SLA simulado','Playbook IR-01','Mapa de dependencias del Decision Twin'],
      confidence:92
    };
    if(activeIds.includes('ciso')) return {
      title:'CISO no disponible',
      action:'Activar la suplencia autorizada del CISO y transferir temporalmente las decisiones definidas en el playbook de crisis.',
      evidence:['Matriz de escalamiento','Playbook IR-01','RACI de respuesta a incidentes'],
      confidence:90
    };
    if(activeIds.includes('siem')) return {
      title:'Pérdida de telemetría del SIEM',
      action:'Activar fuentes alternativas de telemetría y preservar evidencia disponible antes de continuar con la clasificación del alcance.',
      evidence:['Mapa de fuentes de logs','Runbook SOC','Inventario de activos críticos'],
      confidence:88
    };
    if(activeIds.includes('dpo')) return {
      title:'Privacidad no disponible',
      action:'Escalar la revisión de impacto de datos al responsable alternativo definido y mantener bloqueadas las conclusiones regulatorias hasta su validación.',
      evidence:['Matriz RACI','Playbook de privacidad','Inventario de datos demo'],
      confidence:86
    };
    if(activeIds.includes('inventory')) return {
      title:'Inventario desactualizado',
      action:'Iniciar una verificación manual priorizada de activos y datos afectados antes de confirmar el alcance del incidente.',
      evidence:['CMDB / inventario demo','Catálogo de datos','Mapa de dependencias'],
      confidence:81
    };
    const f=(scenario.findings||[]).find(x=>x.sev==='critical') || scenario.findings[0];
    return {
      title:f?f.title:'Recomendación prioritaria',
      action:f?f.recommendation:'Revisar el hallazgo prioritario y definir la acción de remediación.',
      evidence:f?[f.evidence,'Resultado de la simulación','Mapa de dependencias']:['Resultado de la simulación'],
      confidence:f?.sev==='critical'?89:82
    };
  }

  function clock(){
    return new Date().toLocaleTimeString('es-CL',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
  }

  function baseAudit(){
    const scenario=completedScenario||selected;
    const now=Date.now();
    const t=(offset)=>new Date(now+offset).toLocaleTimeString('es-CL',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
    return [
      {time:t(-12000),label:'Scenario Agent analizó el incidente',type:'agent'},
      {time:t(-9000),label:'Dependency Agent identificó dependencias',type:'agent'},
      {time:t(-6000),label:'Evidence Agent consolidó evidencia simulada',type:'agent'},
      {time:t(-3000),label:'Decision Agent generó una recomendación',type:'agent'},
      {time:t(0),label:`Acción bloqueada: esperando revisión humana (${scenario.title})`,type:'pending'}
    ];
  }

  function initializeHumanDecision(){
    if(!completedScenario)return;
    const rec=hitlRecommendation();
    humanDecision={
      scenarioId:completedScenario.id,
      chaosKey:currentChaos.map(c=>c.id).sort().join(','),
      title:rec.title,
      originalAction:rec.action,
      action:rec.action,
      evidence:rec.evidence,
      confidence:rec.confidence,
      status:'PENDING_HUMAN_REVIEW',
      decidedBy:null,
      decidedAt:null
    };
    auditEvents=baseAudit();
  }

  function renderHitl(){
    if(!completedScenario){
      $('#hitlEmpty').classList.remove('hidden');
      $('#hitlContent').classList.add('hidden');
      return;
    }
    if(!humanDecision) initializeHumanDecision();
    $('#hitlEmpty').classList.add('hidden');
    $('#hitlContent').classList.remove('hidden');
    $('#hitlTitle').textContent=humanDecision.title;
    $('#hitlAction').textContent=humanDecision.action;
    $('#hitlConfidence').textContent=`${humanDecision.confidence}%`;
    $('#hitlEvidence').innerHTML=humanDecision.evidence.map(x=>`<li>${x}</li>`).join('');
    $('#modifiedAction').value=humanDecision.action;
    $('#modifyBox').classList.add('hidden');
    updateHitlStatus();
    renderAudit();
  }

  function updateHitlStatus(){
    const badge=$('#hitlStateBadge');
    const actions=$('#hitlActions');
    const outcome=$('#decisionOutcome');
    const status=humanDecision.status;
    const map={
      PENDING_HUMAN_REVIEW:['ESPERANDO REVISIÓN HUMANA','pending'],
      APPROVED:['APROBADA POR CISO','approved'],
      REJECTED:['RECHAZADA POR CISO','rejected'],
      MODIFIED_AND_APPROVED:['MODIFICADA Y APROBADA','approved']
    };
    badge.textContent=map[status][0];
    badge.className=`status-badge ${map[status][1]}`;
    if(status==='PENDING_HUMAN_REVIEW'){
      actions.classList.remove('hidden');
      outcome.classList.add('hidden');
    }else{
      actions.classList.add('hidden');
      outcome.classList.remove('hidden');
      const verb=status==='REJECTED'?'Rechazada':status==='MODIFIED_AND_APPROVED'?'Modificada y aprobada':'Aprobada';
      outcome.className=`decision-outcome ${status==='REJECTED'?'rejected':'approved'}`;
      outcome.innerHTML=`<div><span>${status==='REJECTED'?'✕':'✓'}</span><div><b>Decisión ${verb.toLowerCase()}</b><p><strong>Responsable:</strong> ${humanDecision.decidedBy} · <strong>Hora:</strong> ${humanDecision.decidedAt}</p>${status==='MODIFIED_AND_APPROVED'?`<p><strong>Acción final:</strong> ${humanDecision.action}</p>`:''}</div></div><button id="resetDecision" class="ghost">Reiniciar Human Review</button>`;
      $('#resetDecision').addEventListener('click',()=>{initializeHumanDecision();renderHitl();});
    }
  }

  function renderAudit(){
    $('#auditTrail').innerHTML=auditEvents.map(e=>`<div class="audit-event ${e.type}"><span>${e.time}</span><i></i><p>${e.label}</p></div>`).join('');
  }

  function decide(status,action){
    humanDecision.status=status;
    humanDecision.action=action||humanDecision.action;
    humanDecision.decidedBy='CISO Demo';
    humanDecision.decidedAt=clock();
    const label=status==='APPROVED'?'CISO Demo aprobó la recomendación':status==='REJECTED'?'CISO Demo rechazó la recomendación':'CISO Demo modificó y aprobó la recomendación';
    auditEvents.push({time:humanDecision.decidedAt,label,type:status==='REJECTED'?'rejected':'approved'});
    auditEvents.push({time:humanDecision.decidedAt,label:'Decisión registrada en Audit Trail',type:'logged'});
    $('#modifyBox').classList.add('hidden');
    updateHitlStatus();
    renderAudit();
    toast(status==='REJECTED'?'Recomendación rechazada':'Decisión registrada');
  }

  $('#approveDecision').addEventListener('click',()=>decide('APPROVED'));
  $('#rejectDecision').addEventListener('click',()=>decide('REJECTED'));
  $('#modifyDecision').addEventListener('click',()=>{
    $('#modifiedAction').value=humanDecision.action;
    $('#modifyBox').classList.remove('hidden');
  });
  $('#cancelModify').addEventListener('click',()=>$('#modifyBox').classList.add('hidden'));
  $('#confirmModify').addEventListener('click',()=>{
    const text=$('#modifiedAction').value.trim();
    if(!text){toast('Escribe una acción modificada');return;}
    decide('MODIFIED_AND_APPROVED',text);
  });

  const qs=[
    ['¿El problema refleja una preocupación real?','1 = baja relevancia · 5 = crítica'],
    ['¿El Decision Twin aporta algo distinto a un GRC o tabletop?','Evalúa diferenciación percibida'],
    ['¿Los hallazgos mostrados serían accionables?','Valida valor operacional'],
    ['¿Qué tan útil sería simular fallas de proveedores/personas?','Valida Regulatory Chaos'],
    ['¿El control Human-in-the-Loop genera confianza?','Valida gobernanza de IA y responsabilidad humana'],
    ['¿Pagaría por una solución así si demostrara ROI?','Valida intención comercial'],
    ['¿Un piloto de 4–6 semanas sería razonable?','Valida formato de adopción']
  ];
  $('#questions').innerHTML=qs.map((q,i)=>`<article class="question"><b>${q[0]}</b><span>${q[1]}</span><div class="rating" data-q="${i}">${[1,2,3,4,5].map(n=>`<button class="${ratings[i]===n?'selected':''}">${n}</button>`).join('')}</div></article>`).join('');
  $$('.rating button').forEach(b=>b.addEventListener('click',()=>{
    const r=b.parentElement;
    $$('button',r).forEach(x=>x.classList.remove('selected'));
    b.classList.add('selected');
    ratings[r.dataset.q]=Number(b.textContent);
    localStorage.setItem('cyberready-ratings',JSON.stringify(ratings));
  }));

  $('#notes').value=localStorage.getItem('cyberready-notes')||'';
  $('#notes').addEventListener('input',e=>localStorage.setItem('cyberready-notes',e.target.value));

  function feedbackText(){
    return`CYBERREADY AI — ENTREVISTA DE VALIDACIÓN\nFecha: ${new Date().toLocaleString()}\n\nPuntajes (1-5):\n${qs.map((q,i)=>`- ${q[0]}: ${ratings[i]||'sin respuesta'}`).join('\n')}\n\nNotas:\n${$('#notes').value||'(sin notas)'}\n\nDemo de ideación. No representa cumplimiento ni resultados reales.`;
  }

  $('#copyNotes').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(feedbackText());toast('Resumen copiado')}catch{fallbackCopy(feedbackText())}
  });
  $('#downloadNotes').addEventListener('click',()=>{
    const a=document.createElement('a');
    a.href=URL.createObjectURL(new Blob([feedbackText()],{type:'text/plain'}));
    a.download='cyberready-validacion.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  function fallbackCopy(t){
    const ta=document.createElement('textarea');
    ta.value=t;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    toast('Resumen copiado');
  }
  function toast(t){
    const el=$('#toast');
    el.textContent=t;
    el.classList.add('show');
    setTimeout(()=>el.classList.remove('show'),1800);
  }

  $('#resetBtn').addEventListener('click',()=>{
    completedScenario=null;
    selected=D.scenarios[0];
    currentChaos=[];
    humanDecision=null;
    auditEvents=[];
    localStorage.removeItem('cyberready-ratings');
    localStorage.removeItem('cyberready-notes');
    location.reload();
  });

  renderScenarios();
  selectScenario(selected.id);
  renderChaos();
})();
