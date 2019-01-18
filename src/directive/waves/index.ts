import waves from './waves';

const install = function(Vue) {
    Vue.directive('waves', waves);
};

if ((<any>window).Vue) {
    (window as any).waves = (waves as any)(window as any).Vue.use(install); // eslint-disable-line
}

(waves as any).install = install;
export default waves;
