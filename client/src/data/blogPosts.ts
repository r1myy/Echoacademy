export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  institution: string;
  category: string;
  author: string;
  image: string;
}

export const blogPostsDatabase: BlogPost[] = [
  {
    id: "1",
    title: "Université Quisqueya lance un nouveau programme de recherche en santé publique",
    excerpt: "L'Université Quisqueya annonce le lancement d'un programme de recherche interdisciplinaire visant à améliorer l'accès aux services de santé en Haïti.",
    content: "L'Université Quisqueya a annoncé le lancement d'un nouveau programme de recherche en santé publique qui réunira des chercheurs de plusieurs disciplines. Ce programme vise à développer des solutions innovantes pour améliorer l'accès aux services de santé dans les zones rurales d'Haïti.",
    date: "2024-04-20",
    institution: "Université Quisqueya",
    category: "Recherche",
    author: "Dr. Marie-Josée Dufour",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
  },
  {
    id: "2",
    title: "GHESKIO organise une conférence internationale sur la santé mentale",
    excerpt: "GHESKIO accueillera une conférence internationale réunissant des experts en santé mentale pour discuter des défis spécifiques au contexte caribéen.",
    content: "GHESKIO organise une conférence internationale de trois jours réunissant des experts en santé mentale du monde entier. Cette conférence portera sur les approches innovantes pour améliorer l'accès aux services de santé mentale dans les contextes de ressources limitées.",
    date: "2024-04-18",
    institution: "GHESKIO",
    category: "Événement",
    author: "Dr. Jean-Claude Toussaint",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Université d'État d'Haïti reçoit une subvention pour la recherche en écologie",
    excerpt: "L'Université d'État d'Haïti a reçu une subvention majeure pour financer un projet de recherche sur la conservation de la biodiversité de la Chaîne de la Selle.",
    content: "L'Université d'État d'Haïti a été sélectionnée pour recevoir une subvention de recherche importante destinée à financer un projet de trois ans sur la conservation de la biodiversité. Ce projet impliquera des chercheurs locaux et internationaux.",
    date: "2024-04-15",
    institution: "Université d'État d'Haïti",
    category: "Financement",
    author: "Pierre Dufour",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
  },
  {
    id: "4",
    title: "Colloque sur l'éducation et l'égalité des genres en Haïti",
    excerpt: "Un colloque international se tiendra à l'Université Quisqueya pour discuter des défis et opportunités pour l'égalité des genres dans l'éducation haïtienne.",
    content: "L'Université Quisqueya organise un colloque international réunissant des chercheurs, des décideurs politiques et des acteurs de la société civile pour discuter des stratégies visant à améliorer l'égalité des genres dans l'éducation.",
    date: "2024-04-12",
    institution: "Université Quisqueya",
    category: "Événement",
    author: "Dr. Sylvie Moreau",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
  },
  {
    id: "5",
    title: "Nouvelle initiative de partenariat entre universités haïtiennes et internationales",
    excerpt: "Plusieurs universités haïtiennes ont signé des accords de partenariat avec des institutions internationales pour renforcer la collaboration en recherche et en enseignement.",
    content: "Dans le cadre d'une initiative visant à renforcer la collaboration académique, plusieurs universités haïtiennes ont signé des accords de partenariat avec des institutions de recherche internationales. Ces partenariats faciliteront l'échange de chercheurs et d'étudiants.",
    date: "2024-04-10",
    institution: "Universités haïtiennes",
    category: "Partenariat",
    author: "Équipe de coordination",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
  },
  {
    id: "6",
    title: "Archéologie haïtienne : découvertes importantes à Port-au-Prince",
    excerpt: "Des archéologues haïtiens ont découvert des artefacts importants qui éclairent la préhistoire et l'histoire coloniale d'Haïti.",
    content: "Une équipe d'archéologues de l'Université d'État d'Haïti a annoncé la découverte de plusieurs artefacts importants qui fournissent de nouvelles perspectives sur l'histoire précoloniale et coloniale d'Haïti. Ces découvertes seront exposées au musée national.",
    date: "2024-04-08",
    institution: "Université d'État d'Haïti",
    category: "Découverte",
    author: "Dr. Alain Beauvoir",
    image: "https://images.unsplash.com/photo-1578926078328-123456789012?w=600&h=400&fit=crop",
  },
  {
    id: "7",
    title: "Agriculture durable : nouveaux projets pilotes en Haïti",
    excerpt: "L'Université d'État d'Haïti lance plusieurs projets pilotes visant à promouvoir l'agriculture durable et la sécurité alimentaire dans les zones rurales.",
    content: "L'Université d'État d'Haïti a lancé une série de projets pilotes en partenariat avec les communautés locales pour tester et promouvoir les pratiques d'agriculture durable. Ces projets visent à améliorer la sécurité alimentaire tout en protégeant l'environnement.",
    date: "2024-04-05",
    institution: "Université d'État d'Haïti",
    category: "Projet",
    author: "Dr. Jean-Pierre Leclerc",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop",
  },
  {
    id: "8",
    title: "Littérature haïtienne : nouvelle anthologie de chercheurs haïtiens",
    excerpt: "Une nouvelle anthologie de la littérature haïtienne contemporaine a été publiée, mettant en avant les voix des auteurs haïtiens contemporains.",
    content: "Une nouvelle anthologie de la littérature haïtienne contemporaine a été publiée par un collectif de chercheurs haïtiens et internationaux. Cette anthologie met en avant les voix des auteurs haïtiens modernes et leur contribution à la littérature mondiale.",
    date: "2024-04-01",
    institution: "Université de Montréal",
    category: "Publication",
    author: "Edwidge Danticat",
    image: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=600&h=400&fit=crop",
  },
];
