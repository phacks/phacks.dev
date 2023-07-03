import Head from 'next/head'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({ children, ...props }) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({ title, href, children }) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export default function Uses() {
  return (
    <>
      <Head>
        <title>Uses — Nicolas Goutay</title>
        <meta
          name="description"
          content="Things I use to make my day better."
        />
      </Head>
      <SimpleLayout
        title="Things I use to make my day better."
        intro="A growing collection of hardward and software I find myself using often, and/or with delight."
      >
        <div className="space-y-20">
          <ToolsSection title="Workstation">
            <Tool title="14” MacBook Pro, M1 Max, 64GB RAM (2021)">
              Once I dipped my toes into M1-land I never looked back. This beast
              never fails to impress me.
            </Tool>
            <Tool title="32” Samsung 4K Space Monitor">
              I am working from a tiny desk at home, so space is an important
              factor when I’m looking at monitor. The clamp mechanism saves
              up precious footprint, and the screen is really nice.
            </Tool>
            <Tool title="Sonos One SL">
              The entry-level Sonos speaker makes for a great speaker on my desk,
              though I’m considering an upgrade to the Era 100 for the line input.
            </Tool>
            <Tool title="Elgato Wave:1">
              An essential buy at the beginning of the pandemic as work and community
              events now required folks to basically invest in a home studio.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Development tools">
            <Tool title="Visual Studio Code">
              As much as I yearn to use NeoVim as my regular code editor, I always
              end back up in the comfort of VS Code (in Vim mode). It’s snappy,
              feature-rich but not overly complex, and familiar. VS Code is my
              comfort-food for software editing.
            </Tool>
            <Tool title="iTerm2 & Tmux">
              iTerm2 is the first piece of software I install on a new computer.
              Reliable to the point I’m forgetting it’s a software I’m using all day,
              every day, and it never disappoint. I use Tmux and its keyboard shortcuts
              to manage windows and panes in the terminal—and tmuxinator to make
              starting my working days a matter of seconds.
            </Tool>
            <Tool title="TablePlus">
              My favorite database-related tool, by a long shot. It’s intuitive,
              beautifully made, and fast. A must if you find yourself poking at
              Postgres frequently.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Design">
            <Tool title="Figma & FigJam">
              While I started my (modest) UI/UX endeavors in Sketch, I find that
              the web-based Figma makes collaborating much easier. FigJam is my go-to
              tool for rapid prototyping, whiteboarding and diagramming.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Productivity">
            <Tool title="CleanShot X">
              The best screenshot and screen recording utility on macOS, bar none.
            </Tool>
            <Tool title="Tuple">
              Leagues ahead of Zoom and Google Meet when pair-programming. Intuitive
              yet powerful, and the video quality is no joke.
            </Tool>
            <Tool title="ScreenFlow">
              While I’m probably only using 10% of its capacities, ScreenFlow is a
              handy video editing tool I’m using to record presentations.
            </Tool>
            <Tool title="1Password">
              Few tools are as essential to my life as 1Password. Investing early in a
              good password manager was easily one of the best decisions I took long ago.
            </Tool>
          </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  )
}
