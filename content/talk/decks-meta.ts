/**
 * Metadados leves das cenas (id + rótulo, na ordem) para telas que não montam
 * o deck inteiro, como a página de notas/teleprompter. Mantém a MESMA ordem e
 * ids das listas em TalkExperience.tsx.
 */
export type SceneMeta = { id: string; label: string };

export const FOLLOWUP_SCENE_META: SceneMeta[] = [
  { id: "capa", label: "Capa" },
  { id: "gancho", label: "O gancho" },
  { id: "pedro", label: "Quem sou eu" },
  { id: "rotina", label: "Seu dia" },
  { id: "enquete", label: "Enquete" },
  { id: "lacuna", label: "A lacuna" },
  { id: "sistema", label: "Falta sistema" },
  { id: "calculadora", label: "Calculadora" },
  { id: "cadencia", label: "A cadência" },
  { id: "roteiro", label: "O que dizer" },
  { id: "mina", label: "Mina de ouro" },
  { id: "antes-depois", label: "Antes × depois" },
  { id: "ponte", label: "A virada" },
  { id: "spark", label: "Funcionando" },
  { id: "motivos", label: "3 motivos" },
  { id: "fechamento", label: "Começar" },
];

export const ORG_SCENE_META: SceneMeta[] = [
  { id: "capa", label: "Capa" },
  { id: "gancho", label: "O gancho" },
  { id: "pedro", label: "Quem sou eu" },
  { id: "amador-pro", label: "Amador × Pro" },
  { id: "caos", label: "Seu dia" },
  { id: "calculadora", label: "Custo do caos" },
  { id: "ficar-atras", label: "Ficar pra trás" },
  { id: "crm", label: "O que é CRM" },
  { id: "ja-tem", label: "Você já tem" },
  { id: "comece-simples", label: "Comece simples" },
  { id: "planilha-quebra", label: "A virada" },
  { id: "spark", label: "Funcionando" },
  { id: "motivos", label: "3 motivos" },
  { id: "oferta", label: "A oferta" },
  { id: "fechamento", label: "Agendar demo" },
];

export const BOSSGRUPO_SCENE_META: SceneMeta[] = [
  { id: "capa", label: "Abertura" },
  { id: "natalia", label: "Endosso Natália" },
  { id: "pedro", label: "Quem é o Spark" },
  { id: "gancho", label: "O gancho" },
  { id: "rotina", label: "Seu dia" },
  { id: "socio", label: "O sócio" },
  { id: "sparkbot", label: "SparkBot (WhatsApp)" },
  { id: "produto", label: "Funcionando" },
  { id: "valor", label: "O valor" },
  { id: "antes-depois", label: "Antes × depois" },
  { id: "oferta", label: "A condição" },
  { id: "planos", label: "Planos + QR" },
  { id: "demo", label: "Agendar demo" },
];

export const BOSS_SCENE_META: SceneMeta[] = [
  { id: "capa", label: "Abertura" },
  { id: "momento", label: "O momento" },
  { id: "agenda", label: "Agenda" },
  { id: "paridade", label: "Tudo num lugar" },
  { id: "produto", label: "Funcionando" },
  { id: "migracao", label: "Sair do Kommo" },
  { id: "arquiteta", label: "De usuária a arquiteta" },
  { id: "snapshots", label: "Snapshots" },
  { id: "fiverings", label: "Five Rings" },
  { id: "seguranca", label: "Segurança" },
  { id: "recap", label: "A estrutura" },
  { id: "fechamento", label: "Próximo passo" },
];
