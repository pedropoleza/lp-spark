/**
 * Tour guiado do showcase, narrado pelo SparkBot. Cada step destaca um elemento
 * (data-tour) e conta a "historinha" do módulo. Auto-start por tela; pulável.
 * Chave = ScreenId do AppShell.
 */
export type TourStep = { target?: string; text: string };

export const TOUR: Record<string, TourStep[]> = {
  ai: [
    { target: "bot-composer", text: "Sou o SparkBot. Você fala comigo em português, por texto ou áudio, e eu opero o CRM por você." },
    { target: "bot-chips", text: "Toque numa sugestão pra me ver agir de verdade: agendar, importar lista, reativar lead." },
    { text: "Tudo o que você vê a seguir, dá pra fazer falando comigo. Eu sou o atalho pra tudo." },
  ],
  contacts: [
    { target: "contacts-table", text: "Tudo no CRM gira em torno do contato. Clique numa linha pra abrir a ficha." },
    { text: "Na ficha tem Lead Score, notas, documentos, tarefas e todo o histórico. E você cria tudo falando comigo." },
  ],
  calendars: [
    { target: "cal-link", text: "Compartilhe este link e o lead escolhe o horário livre." },
    { target: "cal-slots", text: "Cai direto na sua agenda, com lembretes. Ou só me peça: marca com a Ana quinta 14h." },
  ],
  funil: [
    { target: "funil-board", text: "Cada card é uma oportunidade. Arraste entre as etapas e os totais recalculam." },
    { text: "Seus clientes entram sozinhos da Five Rings, com aniversário e revisão. E eu reativo quem está parado." },
  ],
  conversations: [
    { target: "conv-list", text: "WhatsApp, SMS, Instagram e ligações gravadas, tudo num lugar de backup." },
    { text: "No dia a dia, você fala comigo no WhatsApp e eu cuido do resto." },
  ],
  automation: [
    { target: "auto-list", text: "O pós-venda roda sozinho: follow-up mensal, aniversário e revisão anual." },
    { text: "Isso mantém o relacionamento e evita cancelamento. Quer um fluxo novo? É só me pedir." },
  ],
  dashboard: [
    { target: "dash-cards", text: "Seus números em tempo real." },
    { target: "dash-askai", text: "Peça qualquer métrica pra IA e agende o resumo da semana toda sexta." },
  ],
};

/**
 * Benefícios por módulo (bullets curtos). Vira o painel-guia do apresentador no
 * modo Zoom: o foco é "pra que serve / vantagem", não onde clicar.
 */
export const BENEFITS: Record<string, { title: string; points: string[] }> = {
  ai: {
    title: "SparkBot",
    points: ["Um funcionário de IA no seu WhatsApp", "Agenda, importa, reativa e responde por você", "Sabe o underwriting da National Life", "Proativo: te cobra o lead parado"],
  },
  contacts: {
    title: "Contatos",
    points: ["Tudo do cliente num lugar só", "Lead Score mostra quem está quente", "Notas, documentos e tarefas juntos"],
  },
  funil: {
    title: "Funil de vendas",
    points: ["Ninguém fica pra trás", "Você enxerga onde o dinheiro trava", "Clientes entram sozinhos da Five Rings"],
  },
  calendars: {
    title: "Agenda",
    points: ["O lead marca pelo seu link", "Lembretes automáticos, menos no-show"],
  },
  conversations: {
    title: "Conversas",
    points: ["WhatsApp, Instagram e ligações num lugar", "Backup de tudo, automático"],
  },
  automation: {
    title: "Automações",
    points: ["Pós-venda no automático", "Evita cancelamento e chargeback"],
  },
  dashboard: {
    title: "Dashboard",
    points: ["Seus números sem esforço", "A IA monta a métrica que você pedir"],
  },
};
