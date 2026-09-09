# CyberReady busca responder una pregunta simple pero crítica:

> **Si mañana ocurre un ciberincidente, ¿nuestro plan realmente funcionaría?**

# &#x20;AI

> **Simula hoy. Descubre dónde fallarías mañana.**

**CyberReady AI** es una propuesta de innovación en **ciberseguridad e inteligencia artificial agéntica** que busca ayudar a CISOs y organizaciones a re

El proyecto se encuentra actualmente en **fase de prototipado y validación del MVP**.

Estamos utilizando una **demo simulada** para validar el problema, la propuesta de valor y las funcionalidades prioritarias con expertos de la industria, potenciales usuarios y aliados tecnológicos antes de avanzar hacia el desarrollo del producto mínimo viable.

---

## El problema

Las organizaciones cuentan con:

* planes de respuesta a incidentes;
* responsables de ciberseguridad;
* proveedores tecnológicos;
* herramientas de monitoreo;
* políticas y procedimientos;
* contratos;
* inventarios de activos;
* controles de seguridad.

Sin embargo, tener un plan documentado no significa necesariamente que este pueda ejecutarse correctamente durante una crisis.

Un incidente puede ocurrir a las **02:00 de la mañana**, cuando:

* el CISO no está disponible;
* un proveedor crítico no responde;
* el inventario de activos está desactualizado;
* faltan evidencias;
* no está claro qué datos fueron comprometidos;
* Legal, TI y privacidad necesitan información diferente;
* existen dependencias que nunca habían sido probadas.

Muchas de estas fallas se descubren cuando el incidente ya está ocurriendo.

**CyberReady AI propone descubrirlas antes.**

---

# La solución

CyberReady AI plantea la creación de un **Decision Twin de Ciberseguridad y Resiliencia Regulatoria**.

Este modelo representa digitalmente las relaciones entre:

```text
PERSONAS
   +
PROCESOS
   +
TECNOLOGÍA
   +
DATOS
   +
PROVEEDORES
   +
REGULACIÓN
        ↓
   CYBERREADY AI
        ↓
SIMULACIÓN DE CRISIS
        ↓
¿PODEMOS RESPONDER?
```

Sobre este modelo, distintos agentes especializados podrán analizar escenarios hipotéticos y determinar dónde existen dependencias, bloqueos o puntos únicos de falla.

---

# ¿Qué hace diferente a CyberReady?

Las plataformas tradicionales de GRC suelen responder:

> **¿Tenemos el control?**

CyberReady busca responder:

> **¿Podemos ejecutar realmente ese control cuando algo falla?**

La propuesta combina conceptos de:

* Agentic AI.
* Cybersecurity.
* Digital Twins.
* Regulatory Intelligence.
* Incident Response.
* Cyber Resilience.
* Chaos Engineering.
* Human-in-the-Loop.

Esto da origen a un concepto que estamos explorando como diferenciador:

## Regulatory Chaos Engineering

En ingeniería de software, **Chaos Engineering** introduce fallas controladas para comprobar la resiliencia de los sistemas.

CyberReady aplica una lógica similar a la capacidad organizacional:

> **Simular fallas antes de una crisis para descubrir si las personas, procesos, proveedores y decisiones siguen funcionando bajo presión.**

Ejemplos:

```text
¿Qué pasa si...

el CISO no está disponible?

el proveedor crítico no responde?

el SIEM pierde telemetría?

el inventario está desactualizado?

el DPO no está disponible?

el incidente ocurre durante el fin de semana?

no sabemos inicialmente qué datos fueron afectados?
```

---

# IA agéntica

CyberReady no está pensado como un chatbot tradicional.

La arquitectura conceptual contempla múltiples agentes especializados que trabajan sobre un objetivo común.

```text
                   OBJETIVO
         "Evaluar la preparación"
                      │
                      ▼
                ORCHESTRATOR
                      │
      ┌───────────────┼───────────────┐
      ▼               ▼               ▼
  Scenario        Dependency      Regulatory
   Agent            Agent           Agent
      │               │               │
      └───────────────┼───────────────┘
                      ▼
                 Evidence Agent
                      │
                      ▼
                 Decision Agent
                      │
                      ▼
                  Risk Engine
                      │
                      ▼
               HUMAN-IN-THE-LOOP
```

## Agentes propuestos

### Scenario Agent

Interpreta y clasifica el incidente simulado.

Ejemplo:

```text
Ransomware
Activo: CRM
Severidad: crítica
Horario: sábado 02:13 AM
```

---

### Dependency Agent

Determina qué elementos podrían verse afectados.

Por ejemplo:

```text
CRM
 ↓
Base de clientes
 ↓
Datos personales
 ↓
Proveedor Cloud
 ↓
CISO
 ↓
DPO
 ↓
Legal
```

---

### Regulatory Agent

Analiza qué requerimientos regulatorios podrían ser relevantes para el escenario.

En futuras versiones podrá utilizar **Regulatory Packs** específicos por país.

---

### Evidence Agent

Evalúa si existe información suficiente para tomar las decisiones necesarias.

Ejemplos:

* procedimientos;
* contratos;
* responsables;
* matrices;
* logs;
* evidencia documental;
* inventarios;
* SLAs.

---

### Decision Agent

Correlaciona los resultados y prioriza los principales puntos de falla.

Su objetivo no es reemplazar al CISO.

Su función es facilitar información para una mejor decisión.

---

# Human-in-the-Loop

CyberReady se diseña bajo un principio fundamental:

> **La IA analiza, simula y recomienda. Las personas toman las decisiones críticas.**

Las acciones con impacto legal, regulatorio, contractual o operacional deben requerir validación humana.

---

# Demo conceptual

El repositorio contiene actualmente una **demo simulada del concepto**.

La aplicación permite recorrer una empresa ficticia y visualizar cómo podría funcionar el futuro producto.

> **Importante:** los agentes, resultados, organizaciones, scores y hallazgos utilizados en esta demo son simulados.

La demo no realiza evaluaciones reales de cumplimiento ni representa una implementación comercial terminada.

---

## Funcionalidades disponibles en la demo

### Dashboard

Visualiza un indicador conceptual de preparación y los principales componentes de la organización ficticia.

---

### Decision Twin

Representa visualmente relaciones entre:

* activos;
* datos;
* proveedores;
* CISO;
* DPO;
* Legal;
* sistemas;
* herramientas de seguridad.

---

### Simulación de incidentes

La demo incluye escenarios como:

* ransomware sobre un CRM;
* posible exfiltración de información;
* indisponibilidad de un proveedor crítico.

---

### Agent Engine

Durante la simulación se representa la ejecución de:

```text
Scenario Agent
Dependency Agent
Regulatory Agent
Evidence Agent
Decision Agent
```

---

### Hallazgos

Los resultados pueden mostrar:

* severidad;
* impacto;
* evidencia;
* dependencia afectada;
* recomendación;
* confianza estimada;
* necesidad de revisión humana.

---

### Chaos Mode

Permite modificar condiciones del escenario.

Ejemplo:

```text
CISO disponible       ON
DPO disponible        ON
Proveedor disponible  ON
SIEM disponible       ON
Inventario actualizado ON
```

Al desactivar:

```text
Proveedor disponible  OFF
```

la simulación vuelve a ejecutarse.

Un escenario conceptual puede pasar, por ejemplo, de:

```text
78 / 100
```

a:

```text
54 / 100
```

permitiendo visualizar que un proveedor puede convertirse en un **Single Point of Failure** para la respuesta de la organización.

---

# Estado del proyecto

Actualmente CyberReady AI se encuentra en:

## Fase de prototipado y validación

Estamos validando:

* relevancia del problema;
* perfil del usuario;
* funcionalidades prioritarias;
* utilidad del Decision Twin;
* valor del Regulatory Chaos Engineering;
* disposición a realizar pilotos;
* modelo de negocio;
* factibilidad técnica;
* arquitectura futura del MVP.

La definición definitiva del MVP todavía puede cambiar como resultado de estas validaciones.

---

# Validación con la industria

Estamos utilizando la demo como herramienta para conversar con:

* CISOs;
* responsables de ciberseguridad;
* especialistas GRC;
* DPOs;
* profesionales de riesgo;
* especialistas en continuidad;
* proveedores tecnológicos;
* expertos en inteligencia artificial.

El proyecto también se encuentra en proceso de validación técnica mediante colaboración con especialistas de IA como potencial **alianza estratégica para el desarrollo futuro**.

---

# Early adopters

Nuestra hipótesis inicial considera como primeros adoptantes a organizaciones donde un incidente pueda producir un alto impacto operacional y regulatorio.

### Organizaciones objetivo

* empresas medianas y grandes;
* organizaciones reguladas;
* servicios esenciales;
* empresas con múltiples proveedores tecnológicos;
* empresas con infraestructura crítica;
* compañías que manejan grandes volúmenes de información;
* multinacionales con operaciones en Latinoamérica.

### Sectores iniciales

* financiero y fintech;
* telecomunicaciones;
* energía;
* utilities;
* salud;
* retail;
* servicios digitales;
* tecnología.

---

# Usuarios clave

## Usuario principal

**CISO / Responsable de Ciberseguridad**

Busca conocer:

* dónde podría fallar su organización;
* qué dependencia es crítica;
* qué debe priorizar;
* qué decisiones deben prepararse antes del incidente.

## Usuarios secundarios

* DPO / Privacidad.
* Riesgo.
* Compliance.
* Continuidad Operacional.
* SOC.
* Legal.
* TI.
* Auditoría.

## Stakeholders

* Gerencia General.
* Directorio.
* Comité de Riesgos.
* Dueños de procesos críticos.

---

# Propuesta de valor

> **CyberReady AI permite descubrir antes de una crisis las dependencias y decisiones que podrían impedir que una organización ejecute correctamente su respuesta ante un ciberincidente.**

Para el CISO:

```text
menos incertidumbre
+
más visibilidad
+
mejor priorización
+
simulación
+
evidencia
```

Para la organización:

```text
mayor resiliencia
+
menor exposición operacional
+
mejor preparación
+
mejor toma de decisiones
```

---

# Arquitectura conceptual

```text
                     FRONTEND
                         │
                         ▼
                    API GATEWAY
                         │
                         ▼
                  AGENT ORCHESTRATOR
                         │
       ┌─────────────────┼──────────────────┐
       ▼                 ▼                  ▼
 Scenario Agent    Dependency Agent   Regulatory Agent
       │                 │                  │
       └─────────────────┼──────────────────┘
                         ▼
                   Evidence Agent
                         │
                         ▼
                   Decision Engine
                         │
            ┌────────────┴────────────┐
            ▼                         ▼
      Knowledge Graph             Vector DB
            │
            ▼
      Regulatory Packs
            │
     ┌──────┼───────┐
     ▼      ▼       ▼
   Chile  Brasil Colombia
```

---

# Escalabilidad hacia Latinoamérica

CyberReady nace en Chile, pero la arquitectura está pensada para evolucionar mediante **Regulatory Packs** independientes del motor principal.

```text
CyberReady Core
      │
      ├── Chile Pack
      ├── Brazil Pack
      ├── Colombia Pack
      ├── Mexico Pack
      ├── Peru Pack
      └── ...
```

El motor de simulación puede reutilizarse.

Lo que cambia entre mercados son principalmente:

* normativa;
* autoridades;
* obligaciones;
* plazos;
* taxonomías;
* criterios regulatorios.

Esto permite plantear una estrategia:

```text
CHILE
  ↓
VALIDACIÓN
  ↓
MVP
  ↓
PILOTOS
  ↓
BRASIL / COLOMBIA / MÉXICO
  ↓
LATAM
```

---

# Modelo de negocio

La hipótesis comercial inicial es un modelo:

## SaaS B2B

Ingresos recurrentes mediante suscripciones empresariales.

Posibles componentes:

### CyberReady Core

Acceso al:

* Decision Twin;
* motor de simulación;
* agentes;
* dashboards;
* gestión de escenarios.

### Regulatory Packs

Módulos adicionales por país.

### Enterprise

Funciones como:

* múltiples unidades;
* múltiples organizaciones;
* integraciones;
* usuarios;
* simulaciones avanzadas;
* reporting ejecutivo.

### Servicios complementarios

Potencialmente:

* onboarding;
* implementación;
* workshops;
* construcción del Decision Twin;
* soporte empresarial.

---

# Hipótesis financiera

El modelo SaaS busca que el costo marginal de incorporar nuevos clientes disminuya a medida que aumenta la base instalada.

Una vez desarrollado el núcleo:

```text
CyberReady Core
     ↓
Cliente Chile
     ↓
Cliente Chile
     ↓
Cliente Colombia
     ↓
Cliente Brasil
```

el mismo motor puede atender múltiples organizaciones.

Los nuevos mercados se habilitan principalmente mediante:

```text
Regulatory Packs
+
localización
+
validación jurídica
```

en lugar de desarrollar un producto completamente diferente.

Esto favorece:

* ingreso recurrente;
* economía de escala;
* expansión regional;
* upselling;
* menor costo marginal por cliente.

---

# KPIs de validación

Durante la fase de prototipado buscamos validar:

### Problema

* % de CISOs que reconocen la problemática.
* importancia asignada al problema.
* frecuencia de ejercicios actuales.
* principales puntos de falla mencionados.

### Producto

* valoración del Decision Twin.
* valoración del Chaos Mode.
* claridad de los resultados.
* utilidad percibida de los hallazgos.

### Negocio

* organizaciones interesadas en piloto.
* disposición a pagar.
* perfiles decisores.
* ciclo estimado de adquisición.

### MVP

Una primera señal positiva podría considerar:

```text
≥ 70% reconoce el problema
≥ 60% considera útil la propuesta
≥ 40% acepta evaluar un piloto
≥ 20% demuestra intención comercial
```

Estos valores son actualmente **hipótesis de validación**, no resultados alcanzados.

---

# Roadmap

## Etapa 0: Ideación

* definición del problema;
* investigación de mercado;
* demo conceptual;
* entrevistas;
* validación con expertos;
* definición de MVP.

---

## Etapa 1: MVP

**En desarrollo**

Objetivo:

Construir una primera versión funcional.

Posibles capacidades:

* Decision Twin;
* simulaciones;
* Regulatory Pack Chile;
* agentes especializados;
* hallazgos;
* Human-in-the-Loop.

---

## Etapa 2: Piloto

Validación con organizaciones reales.

Incorporación progresiva de:

* activos;
* procesos;
* personas;
* proveedores;
* documentación.

---

## Etapa 3: Integraciones

Posibles integraciones futuras:

* SIEM.
* EDR.
* CMDB.
* ServiceNow.
* Jira.
* Microsoft.
* AWS.
* Google Cloud.

---

## Etapa 4: LATAM

Desarrollo de nuevos Regulatory Packs.

Prioridades por validar:

```text
Brasil
Colombia
México
Perú
Argentina
```

---

# Financiamiento e innovación

CyberReady AI se está perfilando para postular a:

* programas de innovación;
* aceleradoras;
* fondos para startups;
* programas de transformación digital;
* fondos públicos y privados;
* iniciativas especializadas en ciberseguridad e inteligencia artificial.

El financiamiento permitiría avanzar principalmente en:

* desarrollo del MVP;
* IA agéntica;
* arquitectura;
* ciberseguridad;
* Regulatory Packs;
* pilotos;
* validación comercial.

---

# Ciberseguridad del producto

CyberReady debe aplicar seguridad desde su diseño.

Principios considerados:

* Secure-by-Design.
* Zero Trust.
* Least Privilege.
* Human-in-the-Loop.
* trazabilidad.
* cifrado.
* segregación de datos.
* auditabilidad.

Como referencias de trabajo se consideran frameworks y buenas prácticas como:

* NIST Cybersecurity Framework.
* OWASP Top 10.
* OWASP ASVS.
* controles de seguridad para aplicaciones con IA/LLM.

---

# Riesgos asociados a IA

Al tratarse potencialmente de una plataforma basada en IA, también deben abordarse riesgos específicos.

Entre ellos:

### Prompt Injection

Separación entre datos, instrucciones y fuentes confiables.

### Alucinaciones

Los agentes regulatorios deberán utilizar información trazable y fuentes verificadas.

### Exposición de información

Aplicación de:

* minimización;
* segregación;
* cifrado;
* control de acceso.

### Acciones autónomas

Las operaciones de alto impacto requieren:

> **Human-in-the-Loop.**

---

# Stack actual de la demo

La demo conceptual está diseñada para ser liviana y fácil de ejecutar.

Utiliza principalmente:

```text
HTML
CSS
JavaScript
```

No requiere:

* backend;
* base de datos;
* API de IA;
* credenciales;
* conexión con infraestructura empresarial.

Esto permite utilizarla de manera segura durante entrevistas y actividades de validación.

---

# Ejecutar la demo

Descarga o clona el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresa al proyecto:

```bash
cd cyberready-ai
```

Puedes abrir directamente:

```text
index.html
```

También pueden existir scripts de inicio específicos según el sistema operativo.

### Windows

```text
ABRIR_DEMO_WINDOWS.bat
```

### macOS

```text
ABRIR_DEMO_MAC.command
```

---

# Disclaimer

> **CyberReady AI se encuentra actualmente en etapa de prototipado y validación.**

La aplicación incluida en este repositorio corresponde a una **demo conceptual con datos, escenarios, agentes, resultados y organizaciones simuladas**.

No constituye:

* asesoría legal;
* auditoría;
* certificación;
* evaluación real de cumplimiento;
* producto comercial terminado.

Los resultados mostrados existen únicamente para ilustrar cómo podría funcionar el futuro producto.

---

# Proyecto relacionado al Programa WomenCISO

CyberReady AI surge como proyecto enfocado en:

**Ciberseguridad + Inteligencia Artificial Agéntica + Innovación.**

El objetivo es validar una nueva manera de preparar a las organizaciones frente a crisis:

> **No esperar a que ocurra un incidente para descubrir dónde fallaría la respuesta.**

---

# Visión

Hoy:

```text
Chile
+
Cybersecurity
+
Agentic AI
```

Mañana:

```text
LATAM
+
Regulatory Intelligence
+
Cyber Resilience
+
Decision Intelligence
```

---

## CyberReady AI

> **Descubre hoy dónde fallaría tu organización, antes de que mañana sea demasiado tarde.**
