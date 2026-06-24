import { Injectable } from '@nestjs/common';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
}

@Injectable()
export class AppService {
  private readonly site = {
    name: 'Nassime Benjeddou',
    domain: 'nassimebj.com',
    headline:
      'Consultant en Transformation Digitale | Formateur IT & IA | Développeur Web & Mobile',
    subheadline:
      'J’aide les entrepreneurs, associations et organisations à transformer leurs idées en plateformes web, applications mobiles et stratégies digitales concrètes.',
    email: process.env.CONTACT_EMAIL || 'nassimeben@outlook.com',
    socials: {
      github: 'https://github.com/nassimebj',
      linkedin: 'https://linkedin.com/in/nassimebj',
      facebook: 'https://fb.com/nassimebj',
      youtube: 'https://www.youtube.com/c/nassimebj',
    },
  };

  private readonly articles: Article[] = [
    {
      slug: 'transformer-idee-en-application',
      title: 'Transformer une idée en application digitale',
      excerpt:
        'Une méthode simple pour passer du besoin métier au prototype, puis au produit prêt à être lancé.',
      category: 'Produit digital',
      date: '2026-06-24',
      readingTime: '6 min',
    },
    {
      slug: 'ia-pour-formateurs',
      title: 'IA pour formateurs : usages pratiques',
      excerpt:
        'Comment utiliser l’IA pour créer des supports, évaluer les apprenants et automatiser les tâches pédagogiques.',
      category: 'Formation IT & IA',
      date: '2026-06-24',
      readingTime: '5 min',
    },
    {
      slug: 'communication-digitale-associations',
      title: 'Communication digitale pour associations',
      excerpt:
        'Structurer une présence digitale professionnelle avec une ligne éditoriale, des visuels et des indicateurs simples.',
      category: 'Communication digitale',
      date: '2026-06-24',
      readingTime: '4 min',
    },
  ];

  getSiteData() {
    return {
      site: this.site,
      services: [
        {
          title: 'Transformation digitale',
          text: 'Audit, cahier des charges, PRD, architecture technique et accompagnement au lancement.',
        },
        {
          title: 'Développement Web & Mobile',
          text: 'Sites professionnels, plateformes métier, dashboards admin et applications mobiles hybrides.',
        },
        {
          title: 'Formation IT & IA',
          text: 'Programmes pratiques pour jeunes, formateurs, associations et équipes professionnelles.',
        },
        {
          title: 'Communication digitale',
          text: 'Branding, stratégie de contenu, community management, Meta Ads et supports visuels.',
        },
      ],
      projects: [
        {
          name: 'STARLAB by CMED',
          type: 'Plateforme de microfranchise',
          text: 'Application client, application professionnel et dashboard admin pour connecter les services de proximité.',
        },
        {
          name: 'Autovargo',
          type: 'Plateforme de location de voitures',
          text: 'Produit digital reliant clients et agences avec gestion des réservations et opérations.',
        },
        {
          name: 'Green Bina Maroc',
          type: 'Communication & reporting',
          text: 'Production de contenus, rapports, supports visuels et campagnes digitales institutionnelles.',
        },
      ],
      articles: this.articles,
    };
  }

  getArticles() {
    return this.articles;
  }

  getArticle(slug: string) {
    return this.articles.find((article) => article.slug === slug) || null;
  }
}
