import React from 'react';
import Head from 'next/head';

const PublicHead = ()=>(
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
    <title>Next7</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.5.4/antd.min.css" rel="stylesheet" />
    <link rel='stylesheet' type='text/css' href='/static/css/nprogress.css' />
  </Head>
)
export default PublicHead