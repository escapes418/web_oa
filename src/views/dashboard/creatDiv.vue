<script>
export default {
    render(h){
        return h('div',{
            staticClass: 'atom-slide'
        },[
            h('div',{
                staticClass: 'slide-content',
                on: {
                    touchstart: () => {
                        this.startX = event.targetTouches[0].pageX;
                    },
                    touchmove: () => {
                        event.preventDefault();
                        const slideDom = event.currentTarget;
                        const leftActionDom = slideDom.children.item(0);
                        const rightActionDom = slideDom.children.item(slideDom.children.length - 1);
                        this.moveX = event.changedTouches[0].pageX - this.startX;
                        this.tempMoveX = this.moveX + this.preMoveX;
                        if ((this.tempMoveX < 0 && Math.abs(this.tempMoveX) >= rightActionDom.offsetWidth) || (this.tempMoveX > 0 && Math.abs(this.tempMoveX) >= leftActionDom.offsetWidth)) return;
                        if (this.$slots.leftAction === void 0 && this.tempMoveX > 0) return;
                        else if (this.$slots.rightAction === void 0 && this.tempMoveX < 0) return;
                        slideDom.style.transform = `translate3d(${this.tempMoveX.toFixed(0)}px, 0, 0)`;
                    },
                    touchend: () => {
                        if (!this.tempMoveX) return;
                        const slideDom = event.currentTarget;
                        const leftActionDom = slideDom.children.item(0);
                        const rightActionDom = slideDom.children.item(slideDom.children.length - 1);
                        let animWidth = 0;
                        const leftWidthTotal = leftActionDom.offsetWidth;
                        const rightWidthTotal = rightActionDom.offsetWidth;

                        if (this.$slots.rightAction !== void 0 && this.tempMoveX < 0) {
                        // left slide
                        this.moveX < 0 && Math.abs(this.tempMoveX) > rightActionDom.children.item(0).offsetWidth / 2 && (animWidth = -1 * rightActionDom.offsetWidth);
                        this.moveX > 0 && Math.abs(this.tempMoveX) < (rightWidthTotal - rightActionDom.children.item(rightActionDom.children.length - 1).offsetWidth / 2) && (animWidth = 0);
                        } else if (this.$slots.leftAction !== void 0 && this.tempMoveX > 0) {
                        // right slide
                        this.moveX < 0 && Math.abs(this.tempMoveX) > (leftWidthTotal - leftActionDom.children.item(0).offsetWidth / 2) && (animWidth = 0);
                        this.moveX > 0 && Math.abs(this.tempMoveX) > leftActionDom.children.item(leftActionDom.children.length - 1).offsetWidth / 2 && (animWidth = leftActionDom.offsetWidth);
                        }
                        slideDom.style['transition-duration'] = '100ms';
                        slideDom.style.transform = `translate3d(${animWidth}px, 0, 0)`;
                        slideDom.addEventListener('transitionend', () => {
                        this.preMoveX = animWidth;
                        event.currentTarget.style['transition-duration'] = '0ms';
                        }, {capture: false, once: true});
                    }
                }
            },[
                this.$slots.leftAction,
                this.$slots.default,
                this.$slots.rightAction
            ])
        ])
    }
}
</script>
