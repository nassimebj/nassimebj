import { Controller, Get, Header, NotFoundException, Param } from '@nestjs/common';
import { AppService } from './app.service';

function layout(content: string, title = 'Nassime Benjeddou — Transformation Digitale') {
  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta name="description" content="Site officiel de Nassime Benjeddou — Consultant en transformation digitale, formateur IT & IA, développeur web et mobile." />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="Transformer vos idées en applications, formations et projets digitaux concrets." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://nassimebj.com" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <header class="site-header">
    <a class="brand" href="/" aria-label="Accueil Nassime Benjeddou">
      <span class="brand-mark">NJ</span><span>NassimeBJ</span>
    </a>
    <button class="menu-btn" aria-label="Ouvrir le menu" data-menu>Menu</button>
    <nav class="nav" data-nav>
      <a href="/#expertise">Expertise</a>
      <a href="/#projets">Projets</a>
      <a href="/blog">Blog</a>
      <a href="/#contact" class="nav-cta">Contact</a>
    </nav>
  </header>
  <main>${content}</main>
  <footer class="footer">
    <div>
      <strong>Nassime Benjeddou</strong>
      <p>Transformation digitale • Formation IT & IA • Développement Web & Mobile</p>
    </div>
    <a href="https://nassimebj.com">nassimebj.com</a>
  </footer>
  <script src="/app.js"></script>
</body>
</html>`;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'text/html; charset=utf-8')
  home() {
    const data = this.appService.getSiteData();
    const services = data.services
      .map(
        (service) => `<article class="card"><span class="card-icon">✦</span><h3>${service.title}</h3><p>${service.text}</p></article>`,
      )
      .join('');

    const projects = data.projects
      .map(
        (project) => `<article class="project-card"><p class="eyebrow">${project.type}</p><h3>${project.name}</h3><p>${project.text}</p></article>`,
      )
      .join('');

    const articles = data.articles
      .map(
        (article) => `<a class="article-card" href="/blog/${article.slug}"><span>${article.category}</span><h3>${article.title}</h3><p>${article.excerpt}</p><small>${article.readingTime}</small></a>`,
      )
      .join('');

    return layout(`
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">${data.site.domain}</p>
          <h1>Je transforme les idées en <span>produits digitaux</span> utiles, visibles et prêts à grandir.</h1>
          <p class="lead">${data.site.subheadline}</p>
          <div class="hero-actions">
            <a class="btn primary" href="#contact">Discuter d’un projet</a>
            <a class="btn secondary" href="/blog">Voir les ressources</a>
          </div>
          <div class="metrics">
            <div><strong>IT & IA</strong><small>Formation pratique</small></div>
            <div><strong>Web & Mobile</strong><small>Architecture produit</small></div>
            <div><strong>Digital</strong><small>Communication & Ads</small></div>
          </div>
        </div>
        <div class="hero-panel">
          <div class="portrait-placeholder">NJ</div>
          <div class="profile-card">
            <p>Consultant en Transformation Digitale</p>
            <h2>Nassime Benjeddou</h2>
            <span>Formateur IT & IA • Développeur • Communication Digitale</span>
          </div>
        </div>
      </section>

      <section class="section intro" id="expertise">
        <div>
          <p class="eyebrow">Positionnement</p>
          <h2>Un profil hybride pour accompagner un projet de l’idée jusqu’au lancement.</h2>
        </div>
        <p>Comme le site de référence, cette structure met en avant l’autorité professionnelle, les expertises, les ressources et un parcours clair vers le contact. Le contenu est adapté à ton personal branding et à tes services.</p>
      </section>

      <section class="grid cards">${services}</section>

      <section class="section split" id="projets">
        <div>
          <p class="eyebrow">Réalisations</p>
          <h2>Projets et expériences à valoriser.</h2>
        </div>
        <div class="project-list">${projects}</div>
      </section>

      <section class="section blog-preview">
        <div class="section-head">
          <div><p class="eyebrow">Blog & ressources</p><h2>Publier pour construire ton autorité.</h2></div>
          <a class="btn secondary" href="/blog">Tous les articles</a>
        </div>
        <div class="grid articles">${articles}</div>
      </section>

      <section class="cta" id="contact">
        <p class="eyebrow">Contact</p>
        <h2>Tu as une idée de plateforme, d’application ou de formation ?</h2>
        <p>Explique ton besoin, ton public cible et l’objectif du projet. Je peux t’aider à clarifier le produit, le design, la technologie et le plan de lancement.</p>
        <a class="btn primary" href="mailto:${data.site.email}">Envoyer un email</a>
      </section>
    `);
  }

  @Get('blog')
  @Header('Content-Type', 'text/html; charset=utf-8')
  blog() {
    const articles = this.appService
      .getArticles()
      .map(
        (article) => `<a class="article-row" href="/blog/${article.slug}"><div><span>${article.category}</span><h2>${article.title}</h2><p>${article.excerpt}</p></div><small>${article.date} • ${article.readingTime}</small></a>`,
      )
      .join('');

    return layout(`
      <section class="page-hero"><p class="eyebrow">Blog du consultant</p><h1>Ressources pour entrepreneurs, formateurs et porteurs de projets digitaux.</h1></section>
      <section class="article-list">${articles}</section>
    `, 'Blog — Nassime Benjeddou');
  }

  @Get('blog/:slug')
  @Header('Content-Type', 'text/html; charset=utf-8')
  article(@Param('slug') slug: string) {
    const article = this.appService.getArticle(slug);
    if (!article) throw new NotFoundException('Article introuvable');

    return layout(`
      <article class="article-page">
        <a class="back" href="/blog">← Retour au blog</a>
        <p class="eyebrow">${article.category}</p>
        <h1>${article.title}</h1>
        <p class="lead">${article.excerpt}</p>
        <div class="article-meta">${article.date} • ${article.readingTime}</div>
        <div class="article-content">
          <p>Ce contenu est un modèle éditorial prêt à personnaliser. Il est conçu pour attirer les porteurs de projets, expliquer ta méthode et convertir les visiteurs en prospects qualifiés.</p>
          <h2>Structure recommandée</h2>
          <p>Commence par le problème du lecteur, explique les erreurs fréquentes, propose une méthode simple, puis termine par une invitation à te contacter pour un diagnostic.</p>
          <h2>Prochaine étape</h2>
          <p>Remplace ce texte par tes vrais articles, ajoute des cas clients et connecte le formulaire de contact à ton CRM ou à ton email professionnel.</p>
        </div>
      </article>
    `, `${article.title} — Nassime Benjeddou`);
  }

  @Get('api/site')
  apiSite() {
    return this.appService.getSiteData();
  }

  @Get('api/articles')
  apiArticles() {
    return this.appService.getArticles();
  }
}
