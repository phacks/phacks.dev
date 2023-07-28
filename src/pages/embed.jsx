import Head from 'next/head'

export default function Embed() {
  return (
    <>
      <Head>
        <title>Test embed</title>
        <meta
          name="description"
          content="Testing an embed"
        />
      </Head>
      <iframe id='orbit-activity-feed-6v2Im6'
        title='Review App Activity Feed (Activity Feed)'
        className='mx-auto mt-8'
        width='660'
        height='600'
        src='https://app-staging.orbit.love/orbit-love/embedded/NvGtlY'
      />
    </>
  )
}
