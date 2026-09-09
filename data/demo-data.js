window.CYBERREADY_DEMO = {
  organization: {
    name: 'AndinaPay Chile', industry: 'Fintech ficticia', stage: 'Escenario de validación',
    profile: 'Empresa ficticia usada solo para explorar el concepto con expertos de industria.', score: 78,
    assets: [
      { id:'crm', name:'CRM Clientes', type:'Aplicación', criticality:'Alta', owner:'Tecnología', data:'PII / clientes' },
      { id:'api', name:'API Pagos', type:'Servicio', criticality:'Crítica', owner:'Plataforma', data:'Transaccional' },
      { id:'db', name:'Base Clientes', type:'Datos', criticality:'Crítica', owner:'Data', data:'RUT, email, teléfono' },
      { id:'siem', name:'SIEM', type:'Seguridad', criticality:'Alta', owner:'SOC', data:'Telemetría' },
      { id:'idp', name:'Identity Provider', type:'Identidad', criticality:'Crítica', owner:'IAM', data:'Credenciales' }
    ],
    people: ['CISO','DPO / Privacidad','SOC Lead','CTO','Legal','Gerencia'],
    providers: [
      {name:'CloudOne', role:'Infraestructura cloud', sla:'6 h', critical:true},
      {name:'SOCSecure', role:'Monitoreo externo', sla:'30 min', critical:true},
      {name:'MailProvider', role:'Correo transaccional', sla:'4 h', critical:false}
    ]
  },
  scenarios: [
    { id:'ransomware', title:'Ransomware en CRM', subtitle:'Ataque fuera de horario con posible afectación de datos personales.', icon:'⚡', baseScore:78,
      event:{time:'02:13', day:'Sábado', asset:'CRM Clientes', records:'340.000', severity:'Crítica'},
      agents:[['Scenario Agent','Clasifica el evento y define alcance inicial.'],['Dependency Agent','Relaciona activo, datos, responsables y proveedores.'],['Regulatory Agent','Identifica obligaciones potencialmente aplicables.'],['Evidence Agent','Busca evidencia disponible y vacíos operacionales.'],['Decision Agent','Prioriza hallazgos y propone próximos pasos.']],
      findings:[
        {sev:'critical',title:'No existe reemplazo formal del CISO',impact:'La escalación puede detenerse si el titular no está disponible.',evidence:'Playbook IR-01 / matriz de escalamiento',recommendation:'Definir suplencia formal y poder de decisión.'},
        {sev:'critical',title:'SLA de CloudOne: 6 horas',impact:'La evidencia del proveedor podría llegar demasiado tarde para decisiones urgentes.',evidence:'Contrato CloudOne — cláusula simulada 8.3',recommendation:'Negociar canal de emergencia y SLA de incidentes críticos.'},
        {sev:'high',title:'Inventario de datos incompleto',impact:'Dificulta determinar rápidamente si hay titulares o datos sensibles afectados.',evidence:'Catálogo de datos demo',recommendation:'Mantener inventario de datos y criticidad conectado a activos.'},
        {sev:'high',title:'DPO no participa del playbook de ransomware',impact:'Puede retrasar la evaluación de impacto en privacidad.',evidence:'Playbook IR-01',recommendation:'Incluir privacidad en la ruta de decisión del incidente.'},
        {sev:'medium',title:'Contactos sin fecha de última prueba',impact:'Aumenta la incertidumbre operacional fuera de horario.',evidence:'Matriz de contactos demo',recommendation:'Probar contactos y escalamiento trimestralmente.'}
      ]},
    { id:'exfiltration', title:'Exfiltración desde API', subtitle:'Credencial comprometida extrae registros de clientes.', icon:'◎', baseScore:72,
      event:{time:'11:42', day:'Martes', asset:'API Pagos', records:'85.000', severity:'Alta'},
      agents:[['Scenario Agent','Clasifica acceso no autorizado y posible exfiltración.'],['Dependency Agent','Mapea API → identidad → base clientes → terceros.'],['Regulatory Agent','Evalúa potenciales deberes cyber y privacidad.'],['Evidence Agent','Comprueba logs, owner y trazabilidad del dato.'],['Decision Agent','Ordena decisiones de contención y evidencia.']],
      findings:[
        {sev:'critical',title:'No hay owner único del dato',impact:'Retrasa la confirmación de alcance y clasificación del incidente.',evidence:'Matriz RACI demo',recommendation:'Asignar data owner responsable por dominio.'},
        {sev:'high',title:'Retención de logs limitada',impact:'La investigación puede quedar sin evidencia suficiente.',evidence:'Política logging demo',recommendation:'Alinear retención a criticidad e investigación.'},
        {sev:'high',title:'No existe decisión preautorizada para revocar tokens',impact:'La contención requiere coordinación manual.',evidence:'Runbook API demo',recommendation:'Definir acciones de contención preautorizadas.'}
      ]},
    { id:'provider', title:'Proveedor crítico no responde', subtitle:'Falla externa durante un incidente de alta severidad.', icon:'⌁', baseScore:61,
      event:{time:'18:20', day:'Viernes', asset:'CloudOne', records:'N/D', severity:'Alta'},
      agents:[['Scenario Agent','Clasifica dependencia externa crítica.'],['Dependency Agent','Busca servicios internos que dependen del proveedor.'],['Regulatory Agent','Evalúa consecuencias operacionales y regulatorias.'],['Evidence Agent','Revisa contrato, contactos y planes alternativos.'],['Decision Agent','Propone contingencia y remediación contractual.']],
      findings:[
        {sev:'critical',title:'Punto único de falla: CloudOne',impact:'No existe fuente alternativa de logs para dos sistemas críticos.',evidence:'Mapa de dependencias demo',recommendation:'Diseñar fuente alternativa y exportación independiente de logs.'},
        {sev:'critical',title:'Escalamiento fuera de horario no probado',impact:'La organización no puede asegurar respuesta del tercero en una crisis.',evidence:'Plan de terceros demo',recommendation:'Ejecutar pruebas conjuntas y registrar tiempos.'},
        {sev:'medium',title:'Contrato sin evidencia técnica mínima definida',impact:'No queda claro qué artefactos debe entregar el proveedor.',evidence:'Contrato CloudOne demo',recommendation:'Agregar obligaciones de evidencia y cooperación forense.'}
      ]}
  ],
  chaos: [
    {id:'ciso',label:'CISO no disponible',penalty:13,reason:'Se pierde el principal decisor y no existe suplencia formal.'},
    {id:'dpo',label:'DPO / Privacidad no disponible',penalty:8,reason:'Se retrasa la evaluación de impacto sobre datos personales.'},
    {id:'provider',label:'Proveedor crítico no responde',penalty:24,reason:'La organización queda sin una fuente crítica de evidencia.'},
    {id:'siem',label:'SIEM sin telemetría',penalty:18,reason:'Disminuye la visibilidad técnica del alcance.'},
    {id:'inventory',label:'Inventario desactualizado',penalty:11,reason:'Aumenta el tiempo para relacionar activos y datos.'}
  ]
};
