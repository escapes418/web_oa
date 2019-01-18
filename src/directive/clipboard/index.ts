import Clipboard from './clipboard';

const install = function(Vue) {
    Vue.directive('Clipboard', Clipboard);
};

if ((window as any).Vue) {
    (window as any).clipboard = Clipboard;
    (window as any).Vue.use(install); // eslint-disable-line
}

(Clipboard as any).install = install;
export default Clipboard;
