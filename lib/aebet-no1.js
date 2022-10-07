'use babel';

import AebetNo1View from './aebet-no1-view';
import { CompositeDisposable } from 'atom';

export default {

  aebetNo1View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.aebetNo1View = new AebetNo1View(state.aebetNo1ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.aebetNo1View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'aebet-no1:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.aebetNo1View.destroy();
  },

  serialize() {
    return {
      aebetNo1ViewState: this.aebetNo1View.serialize()
    };
  },

  toggle() {
    console.log('AebetNo1 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
