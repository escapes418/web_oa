import { uniqueId } from '../common';
import eventBus from "../common/eventBus";

class Editor {
    constructor() {
      this.id = uniqueId();
    }
    getGrpah() {
      return this.graph
    }
    emit(event, params) {
      if (event === 'afterAddPage') {
        this.graph = params.graph
      }
      eventBus.$emit(event, params)
    }
    on(event) {
      switch (event) {
        case 'changeNodeData':
          this.graph.refresh()
          break
      }
    }
    add(type, item) {
      this.graph.add(type, item)
    }
    update(item, model) {
      this.graph.update(item, model)
    }
    remove(item) {
      const node = this.graph.findById(item.id)
      this.graph.remove(node)
    }
  }

export default Editor