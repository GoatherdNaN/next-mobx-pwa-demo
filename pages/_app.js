import '@babel/polyfill'
import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'mobx-react'
import NProgress from 'nprogress'
import Router from 'next/router'
import withMobxStore from '../lib/with-mobx-store'
import Head from 'components/Head'
import Header from 'components/Header'
import Page from 'components/Page';

import reset from '../static/css/reset.less';


Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())


@withMobxStore
export default class MyApp extends App {
  componentDidCatch (error, errorInfo) {
    console.log('CUSTOM ERROR HANDLING', error)
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo)
  }
  render () {
    const {Component, pageProps, mobxStore} = this.props;
    return (
      <Container>
        <Head />
        <Header />
        <Provider {...mobxStore}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </Provider>
        <style global jsx>{reset}</style>
      </Container>
    )
  }
}