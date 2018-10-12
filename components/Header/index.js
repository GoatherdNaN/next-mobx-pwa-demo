import React from 'react';
import { withRouter } from 'next/router'
import { Menu, Icon } from 'antd';
import styles from './index.less';

@withRouter
export default class Header extends React.Component {
  state = {
    current: 'index'
  }

  componentDidMount() {
    const { pathname } = this.props.router;
    let current = pathname.replace(/\//i, '');
    if (!current) {
      current = 'index';
    }
    this.setState({ current });
  }

  handleClick = ({ key }) => {
    if(key === this.state.current) return;
    this.setState({ current: key }, () => {
      let target = { pathname: `/${key}` };
      if(key === 'other') {
        target.query= { currentIndex: Math.floor(Math.random() * (2 - 0 + 1)) + 0 };
      }
      this.props.router.push(target);
    });
  };

  render() {
    return (
      <div className={styles.header}>
        <div className={styles.logo}>Mobx Demo</div>
        <div className={styles.menu}>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            theme="dark"
            mode="horizontal">
            <Menu.Item key="index">
              Todos
            </Menu.Item>
            <Menu.Item key="other">
              其他
            </Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
};