
import eventBus from "../common/eventBus";
export default {
    getDefaultCfg() {
        return {
            // backKeyCode: 8,
            deleteKeyCode: 46
        };
    },
    getEvents() {
        return {
            keyup: 'onKeyUp',
            keydown: 'onKeyDown'
        };
    },

    onKeyDown(e) {
        const code = e.keyCode || e.which;
        console.log(code)
        switch (code) {
            case this.deleteKeyCode:
            // case this.backKeyCode:
                eventBus.$emit('deleteItem')
                break
        }
    },
    onKeyUp() {
        this.keydown = false;
    }
};
