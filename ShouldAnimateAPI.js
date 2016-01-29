<ShouldAnimate
  // Is this necessary?
  // init={(node) => {
  //   console.log(node);
  //   return {
  //     some: -1,
  //     init: 0.5,
  //     props: '#020202'
  //   }
  // }}

  enter={(node) => {
    console.log(node);
    return {
      some: 0,
      enter: 1,
      props: '#343434'
    }
  }}

  update={(node) => {
    console.log(node);
    return {
      some: 1,
      update: 0,
      props: '#ababab'
    }
  }}

  exit={(node) => {
    console.log(node);
    return {
      some: 20,
      exit: 30,
      props: '#efefef'
    }
  }}
>
  {(node) => {
    console.log(node);
    return <component uses={node.props.some} props={node.props.props} />;
  }}
</ShouldAnimate>

class ShouldAnimate extends Component {
  constructor() {
    super();

    console.log(this.props);
  }

  // componentWillMount() {}

  // componentDidMount() {}

  componentWillEnter(cb) {

  }

  // componentDidEnter() {}

  // componentWillUpdate() {}

  componentDidUpdate(oldprops, oldstate) {
    // Run the update animation
  }

  componentWillLeave(cb) {
    // Play animation, then call cb
  }

  // componentDidLeave() {}

  render() {

  }
}
