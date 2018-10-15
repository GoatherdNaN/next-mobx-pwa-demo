import React from 'react';
import Head from 'next/head';
// import manifest from '../../.next/build-manifest.json';
import { log } from 'util';

const PublicHead = props => {
  // const cssPath = manifest.pages['/_app'].filter(v=>/(?:css)$/.test(v))[1];
  return (
    <Head>
      <meta charSet="utf-8"/>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1"/>
      <meta name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
      <meta name="renderer" content="webkit"/>
      <meta httpEquiv="description" content="Next 7"/>
      <meta name="Keywords" content="Next7 mobx ant"/>
      <meta name="Description" content="Next 7 demo"/>
      <meta name="author" content="edlan"/>
      <title>{props.title}</title>
      <link rel='stylesheet' type='text/css' href='/static/css/nprogress.css' />
      {/* <link rel='stylesheet' type='text/css' href={`/_next/${cssPath}`} /> */}
    </Head>
  )
}
export default PublicHead