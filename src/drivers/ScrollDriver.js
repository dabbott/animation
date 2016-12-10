import { Animated } from 'react-native';

/**
 * Animation driver that creates animated value changed on scroll event.
 * Assign onScroll as onScroll prop of React Native ScrollView, and
 * pass instance to any @shoutem/animation animation to run it
 * e.g.:
 * driver = new ScrollDriver();
 * animation = new Animation({
 *  driver
 * });
 * ...
 * <ScrollView onScroll={onScroll()}>
 */
export class ScrollDriver {
  constructor() {
    this.value = new Animated.Value(0);
    this.onScrollViewLayout = this.onScrollViewLayout.bind(this);
    this.scrollViewProps = {
      // onScroll doesn't fire as expected, so use direct manipulation by
      // listening to scroll directly on the DOM node.
      ref: (scrollView) => {
        const node = scrollView.getScrollableNode();

        node.addEventListener('scroll', () => {
          this.value.setValue(node.scrollTop)
        });
      },
      scrollEventThrottle: 1,
      onLayout: this.onScrollViewLayout,
    };
  }

  onScrollViewLayout(event) {
    this.layout = event.nativeEvent.layout;
  }
}
