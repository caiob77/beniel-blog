import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SocialLink } from "@/components/ui/SocialLink";
import { PostCard } from "@/components/PostCard";
import { StaggerGrid } from "@/components/StaggerGrid";
import { MotionDiv } from "@/components/MotionDiv";
import { GlowRing } from "@/components/GlowRing";
import { heroReveal, fadeInUpTween } from "@/lib/motion";
import { getAllPosts } from "@/lib/posts";
import { projects } from "@/content/projects";

const projectVisuals = [
  {
    frame: "from-[#242424] via-[#101010] to-black",
    accent: "from-accent to-[#ff8a66]",
    label: "BLOG",
  },
  {
    frame: "from-[#1d222b] via-[#101218] to-black",
    accent: "from-[#4f8cff] to-[#8bb6ff]",
    label: "API",
  },
  {
    frame: "from-[#23252a] via-[#0f1014] to-black",
    accent: "from-[#d4b36a] to-[#ff4625]",
    label: "LAB",
  },
];

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const allPosts = await getAllPosts();
  const latest = allPosts.slice(0, 5);
  const featuredProjects = projects.slice(0, 3);

  return (
    <main className="pb-32">
      <section className="relative -mt-[78px] flex min-h-[100svh] items-end overflow-hidden">
        <MotionDiv
          as="div"
          inView={false}
          variants={heroReveal}
          aria-hidden
          className="absolute inset-0"
        >
          <Image
            src="/images/about/caio-home.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_22%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/85 via-bg/15 to-transparent" />
        </MotionDiv>

        <Container className="relative w-full pb-20 pt-32 md:pb-28">
          <MotionDiv inView={false} className="max-w-3xl space-y-6">
            <Eyebrow>Desenvolvedor de Software</Eyebrow>
            <h1 className="font-display text-7xl font-bold leading-[0.9] md:text-9xl">
              BENIEL<span className="text-accent">+</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-text-muted md:text-xl">
              Escrevo sobre arquitetura, performance e fundamentos de
              desenvolvimento — o tipo de conteúdo que eu gostaria de ter lido
              quando comecei.
            </p>
            <MotionDiv
              as="div"
              inView={false}
              variants={fadeInUpTween}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <Link
                href="/archive"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-sm font-bold text-bg transition-all duration-200 [transition-timing-function:cubic-bezier(0.42,0,0.58,1)] hover:scale-[1.03] hover:bg-accent-hover"
              >
                Ler os artigos
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-6 py-3 font-display text-sm font-bold text-text transition-all duration-200 [transition-timing-function:cubic-bezier(0.42,0,0.58,1)] hover:scale-[1.03] hover:border-accent/60 hover:text-accent"
              >
                Explorar projetos
              </Link>
            </MotionDiv>
            <div className="flex items-center gap-3 pt-2">
              <SocialLink
                kind="github"
                href="https://github.com/caiob77"
                className="h-11 w-11"
              />
              <SocialLink
                kind="linkedin"
                href="https://www.linkedin.com/in/caio-beniel-82381b22b/"
                className="h-11 w-11"
              />
              <SocialLink
                kind="instagram"
                href="https://www.instagram.com/benielsena_bx/"
                className="h-11 w-11"
              />
            </div>
          </MotionDiv>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-4xl">
          <MotionDiv>
            <blockquote className="relative border-l-2 border-accent py-6 pl-8 md:py-10 md:pl-12">
              <p className="font-display text-2xl font-medium italic leading-snug text-text md:text-4xl">
                &ldquo;Tenha coragem para se tornar aquilo que sonha.&rdquo;
              </p>
            </blockquote>
          </MotionDiv>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <MotionDiv className="mb-12 flex items-end justify-between gap-6">
            <div className="space-y-2">
              <Eyebrow>Latest Articles</Eyebrow>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Últimos artigos
              </h2>
            </div>
            <Link
              href="/archive"
              className="hidden text-sm text-text-muted transition-colors hover:text-accent md:inline-block"
            >
              Ver todos →
            </Link>
          </MotionDiv>

          <StaggerGrid className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </StaggerGrid>

          <div className="mt-10 md:hidden">
            <Link
              href="/archive"
              className="text-sm text-text-muted transition-colors hover:text-accent"
            >
              Ver todos os artigos →
            </Link>
          </div>
        </Container>
      </section>

      <HomeAbout />

      <section className="relative overflow-hidden py-24 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />

        <Container className="relative">
          <MotionDiv className="mb-12 md:mb-14">
            <Eyebrow>Projetos</Eyebrow>
            <div className="mt-3 flex items-start gap-5">
              <h2 className="font-display text-6xl font-bold leading-[0.9] md:text-8xl">
                Coisas que andei construindo
              </h2>
              <span className="mt-1 text-5xl font-black leading-none text-accent md:text-6xl">
                +
              </span>
            </div>
          </MotionDiv>

          <StaggerGrid className="space-y-5">
            {featuredProjects.map((project, index) => (
              <ProjectFeatureCard
                key={project.slug}
                project={project}
                visual={projectVisuals[index % projectVisuals.length]}
              />
            ))}
          </StaggerGrid>

          <div className="mt-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-6 py-3 font-display text-sm font-bold text-text transition-all duration-200 [transition-timing-function:cubic-bezier(0.42,0,0.58,1)] hover:scale-[1.03] hover:border-accent/60 hover:text-accent"
            >
              Ver todos os projetos
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}

function HomeAbout() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:190px_100%] opacity-40" />
      {/* Anel luminoso (Light Circle) — entra pela direita da seção Sobre */}
      <GlowRing className="right-[-160px] top-1/2 -translate-y-1/2" />
      <Container className="relative">
        <MotionDiv className="max-w-5xl">
          <span className="text-5xl font-black leading-none text-accent">
            +
          </span>
          <p className="mt-4 text-[11px] font-black uppercase text-text-sub md:text-xs">
            Caio Beniel
          </p>
          <h2 className="mt-2 font-display text-[5.5rem] font-black leading-[0.82] md:text-[9.5rem]">
            Sobre
          </h2>

          <div className="mt-14 max-w-5xl space-y-6 text-base font-semibold leading-relaxed text-text-muted md:text-lg">
            <p>
              Ao longo da minha trajetória como desenvolvedor, venho construindo
              sistemas que unem arquitetura moderna, performance e Inteligência
              Artificial aplicada a problemas reais.
            </p>
            <p>
              O que diferencia meu trabalho é minha abordagem voltada para
              engenharia de software sólida: não busco apenas fazer sistemas
              funcionarem, mas construir soluções escaláveis, organizadas e
              preparadas para cenários reais de produção.
            </p>
            <p>
              Minha jornada na tecnologia começou movida pela curiosidade sobre
              como grandes sistemas funcionam internamente — desde
              infraestrutura e bancos de dados até arquitetura voltada para
              atender qualquer tipo de requisitos funcionais e não funcionais.
            </p>
          </div>

          <Link
            href="/about"
            className="mt-12 inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-7 py-3 font-display text-base font-bold text-text transition-all duration-200 [transition-timing-function:cubic-bezier(0.42,0,0.58,1)] hover:scale-[1.03] hover:border-accent/60 hover:text-accent"
          >
            Saiba a história completa
            <span aria-hidden>↗</span>
          </Link>
        </MotionDiv>
      </Container>
    </section>
  );
}

type ProjectFeatureCardProps = {
  project: (typeof projects)[number];
  visual: (typeof projectVisuals)[number];
};

function ProjectFeatureCard({ project, visual }: ProjectFeatureCardProps) {
  const href = project.href ?? project.repo ?? "#";
  const external = href.startsWith("http");

  return (
    <article className="lumi-card group relative overflow-hidden rounded-[22px] border border-white/15 bg-black transition-all duration-200 [transition-timing-function:cubic-bezier(0.42,0,0.58,1)] hover:-translate-y-1 hover:scale-[1.01] hover:border-accent/40">
      <div className="grid min-h-[196px] md:grid-cols-[290px_1fr] lg:grid-cols-[330px_1fr]">
        <ProjectVisual project={project} visual={visual} />

        <div className="flex flex-col justify-center border-t border-white/10 p-7 md:border-l md:border-t-0 md:p-9">
          <h3 className="font-display text-2xl font-bold leading-tight text-text">
            {project.title}
          </h3>
          <p className="mt-3 max-w-3xl text-base font-medium leading-relaxed text-text-muted">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-xs font-semibold uppercase text-text-sub">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <Link
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="mt-5 inline-flex w-fit items-center gap-2 font-display text-base font-bold text-text transition-colors group-hover:text-accent"
          >
            Saiba mais
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

type ProjectVisualProps = {
  project: (typeof projects)[number];
  visual: (typeof projectVisuals)[number];
};

function ProjectVisual({ project, visual }: ProjectVisualProps) {
  return (
    <div
      aria-label={`Imagem ilustrativa do projeto ${project.title}`}
      className={`relative min-h-[190px] overflow-hidden bg-gradient-to-br ${visual.frame}`}
      role="img"
    >
      <Image
        src={project.image}
        alt=""
        fill
        className="object-cover transition duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        sizes="(min-width: 1024px) 330px, (min-width: 768px) 290px, 100vw"
      />
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute left-4 top-4 rounded bg-black/70 px-3 py-1.5 text-[10px] font-black uppercase text-white">
        {visual.label}
      </div>
    </div>
  );
}
