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
