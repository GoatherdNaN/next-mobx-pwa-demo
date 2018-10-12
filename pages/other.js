import React from 'react'
import Router from 'next/router'
import { Carousel, Button } from 'antd';
import Head from 'components/Head'

export default class Other extends React.Component {
  static async getInitialProps () {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
    return {}
  }

  componentDidMount() {
    const { query } = Router;
    if(query) {
      this.slider.goTo(+query.currentIndex ,true);
    }
  }

  render () {
    return (
      <div className="banner">
        <Head title="Other" />
        <Carousel ref={node => (this.slider = node)} autoplay>
          <div>
            <img src="/static/img/1.jpg" alt="图片加载错误" />
          </div>
          <div>
            <img src="/static/img/2.jpg" alt="图片加载错误" />
          </div>
          <div>
            <img src="/static/img/3.jpg" alt="图片加载错误" />
          </div>
        </Carousel>
        <Button type="primary">测试样式</Button>
        <style jsx>{`
          .banner {
            width: 830px;
            margin: 0 auto;
            border: 4px solid #f00;
          }
          img {
            height: 100%;
          }
        `}</style>
      </div>
    )
  }
}