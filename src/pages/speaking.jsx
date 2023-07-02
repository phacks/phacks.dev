import Head from 'next/head'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function SpeakingSection({ children, ...props }) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({ title, description, event, cta, href }) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{event}</Card.Eyebrow>
      {description && <Card.Description>{description}</Card.Description>}
      {cta && <Card.Cta>{cta}</Card.Cta>}
    </Card>
  )
}

export default function Speaking() {
  const intro = `
    I believe that speaking at meetups and conferences is a very formative experience, a perfect occasion to make friends and have meaningful discussions with people throughout the community.
    <br /><br />
    However, securing a talk at a meetup or a conference can be way harder for people in under-represented and marginalized communities.
    <br /><br />
    If you feel like this applies to you, I would gladly help you on securing your next talk (help writing your proposal, rehearsing…). Just contact me (links are in the <a href="/about" class="text-teal-500 hover:underline">About page</a>) and we’ll figure out how to best make it happen!
  `
  return (
    <>
      <Head>
        <title>Speaking - Nicolas Goutay</title>
        <meta
          name="description"
          content="I’ve spoken at various conference and meetups all around Europe."
        />
      </Head>
      <SimpleLayout
        title="I’ve spoken at various conference and meetups all around Europe."
        intro={intro}
      >
        <div className="space-y-20">
          <SpeakingSection title="Conferences">
          <Appearance
              href="https://www.youtube.com/watch?v=taOyVmLgym4"
              title="Eleventy, Alpine and Tailwind: towards a lightweight Jamstack"
              description="Thoughts about curbing the JavaScript tax in Jamstack websites."
              event="Jamstack Berlin (2020)"
              cta="Watch video"
            />
            <Appearance
              href="https://www.youtube.com/watch?v=m3XL0LVJaUo"
              title="Getting your Team Passionate About Web Performance to Achieve Performant Web Apps"
              description="Being a 100+ developers Web consultancy, our team at Theodo faced a lot of challenges regarding Web Performance. I spearheaded the effort in the last year to ensure that our developers had the right culture, focus, tools and skills to enforce high performance standards across all projects."
              event="GDG DevFest Wrocław (2019), FrontEndConnect Warsaw (2018)"
              cta="Watch video"
            />
            <Appearance
              href="https://youtu.be/p14g-Sep7HY"
              title="Fast by Default: Near-Instant Load Times at Scale with GatsbyJS"
              description="Discussed about the game-changing impact of GatsbyJS on performance, accessibility and scalability of modern webapps, and how to integrate it with complex business requirements — be it for a brand new project or an existing ReactJS codebase."
              event="GOTO Berlin (2019)"
              cta="Watch video"
            />
            <Appearance
              href="https://noti.st/phacks/bwG0IQ/fast-by-default-extending-gatsbyjs-with-plugins"
              title="Fast by Default: Extending GatsbyJS with Plugins"
              description="GatsbyJS is a library that adds powerful static capabilities to React-powered webapps and packs many performance optimizations, making websites load instantly, by default."
              event="FrontConf Munich (2019)"
              cta="Read slides"
            />
            <Appearance
              href="https://www.youtube.com/watch?v=7pbFDBXiuAA"
              title="Pourquoi, et comment, créer son propre plugin Gatsby ? 🇫🇷"
              event="Jamstack Paris (2018)"
              cta="Watch video"
            />
            <Appearance
              href="https://www.youtube.com/watch?v=wMaJ8sCuZcg"
              title="Enhance your User and Developer Experience with React & Redux"
              description="After years of experiences building complex React & Redux web apps at Theodo, I’ve learned quite a bit of tools and techniques that make me more productive as a developer, and my users (and clients) happier with the products."
              event="Web2Day Nantes (2018), FrontConf Munich (2017)"
              cta="Watch video"
            />
            <Appearance
              title="Getting the most out of Redux for Web & Mobile"
              event="DevExperience Iasi (2016)"
            />
          </SpeakingSection>
          <SpeakingSection title="Podcasts">
            <Appearance
              href="#"
              title="À propos de la Jamstack 🇫🇷"
              description="The story of how we built one of the most promising space startups in the world without taking any capital from investors."
              event="Génération Statique #2"
              cta="Listen to podcast"
            />
          </SpeakingSection>
        </div>
      </SimpleLayout>
    </>
  )
}
