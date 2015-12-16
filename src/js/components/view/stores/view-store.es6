import alt from '../../utils/alt';

import ViewActions from '../actions/view-actions';

class ViewStore {

  constructor() {
    this.loading = false;
    this.bars = {
      action: {
        use: false,
        title: null,
        subtitle: null,
        description: null,
        actions: [],
        visible: false,
        scroll: {
          elem: null,
          enter: 500,
          exit: 250,
          height: 0,
          top: 0,
        },
      },
    };

    this.bindActions(ViewActions);
  }

  onSetDimensions() {
    const {
      innerHeight,
    } = window;

    this.bars.action.scroll.height = innerHeight;
  }


  onScrollWatch(bool) {
    const {
      use,
      scroll,
    } = this.bars.action;

    let scrollableElement = scroll.elem;

    if (!scrollableElement) {
      scrollableElement = document.body
    }

    if (use) {

      if (bool) {

        scrollableElement.addEventListener('scroll', ViewActions.scrolling);
        window.addEventListener('resize', ViewActions.setDimensions);
        ViewActions.setDimensions.defer();
        ViewActions.scrolling.defer();

      } else {

        scrollableElement.removeEventListener('scroll', ViewActions.scrolling);
        window.removeEventListener('resize', ViewActions.setDimensions);
      }

    } else {
      scrollableElement.removeEventListener('scroll', ViewActions.scrolling);
    }

  }


  onScrolling() {
    const {
      elem,
      enter,
      exit,
      height,
    } = this.bars.action.scroll;

    const {
      scrollHeight,
      scrollTop,
    } = elem;

    if ( (scrollTop > enter) && !(scrollHeight - height - exit < scrollTop) ) {

      ViewActions.showActionBar.defer(true);

    } else {

      ViewActions.showActionBar.defer(false);

    }

  }


  onCreateActionBar(obj) {

    for (var key in obj) {

      if (obj.hasOwnProperty(key)) {
        this.bars.action[key] = obj[key];
        this.bars.action.use = true;
      }

    }

    ViewActions.scrollWatch.defer(true);
  }


  onShowActionBar(bool) {
    this.bars.action.visible = bool;
  }


  onScrollListenTo(elem) {
    this.bars.action.scroll.elem = elem;
  }


  onToggleActionBar() {
    this.bars.action.use = !this.bars.action.use;
    ViewActions.scrollWatch.defer(this.bars.action.use);
  }

  onLoading(bool) {
    this.loading = bool;
  }

  onFlush() {
    alt.flush();
  }

  onActionBarEnter(int) {
    this.bars.action.scroll.enter = int;
  }

  onActionBarExit(int) {
    this.bars.action.scroll.exit = int;
  }

}


module.exports = alt.createStore(ViewStore, 'ViewStore');
