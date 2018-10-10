export default (props) => (
  <div className="wrapper">
    {props.children}
    <style jsx>{`
      .wrapper {
        position: absolute;
        top: 47px;
        bottom: 0;
        left: 0;
        right: 0;
        box-sizing: border-box;
        padding: 20px;
        overflow-y: auto;
        background: url(/static/img/wrapperBc.jpg) no-repeat 0 0;
      }
    `}</style>
  </div>
)