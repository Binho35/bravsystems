export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  specialty: string;
  description: string;
  initials: string;
  kind: "human" | "mascot";
  portraitSrc: string;
  portraitStatus: "approved";
};

export const founder: TeamMember = {
  slug: "robson",
  name: "Robson",
  role: "Founder & CEO",
  specialty: "Visão, estratégia e decisão final",
  description: "Fundador da BravSystems. Define a visão do negócio, as prioridades do portfólio e a direção final dos produtos e serviços.",
  initials: "RF",
  kind: "human",
  portraitSrc: "/team/robson.svg",
  portraitStatus: "approved",
};

export const harpia: TeamMember = {
  slug: "harpia",
  name: "Harpia",
  role: "Mascote oficial da BravSystems",
  specialty: "Inteligência, tecnologia e identidade da marca",
  description: "A Harpia representa a inteligência da BravSystems e acompanha Robson como símbolo oficial da marca em todo o ecossistema.",
  initials: "HA",
  kind: "mascot",
  portraitSrc: "/bravsystems-logo.png",
  portraitStatus: "approved",
};

export const team = [founder, harpia] as const;
